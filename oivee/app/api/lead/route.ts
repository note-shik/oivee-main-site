import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/schemas'
import { saveLeadToSupabase, isRecentDuplicate } from '@/lib/services/supabase'
import { sendToN8N } from '@/lib/services/n8n'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

// Disposable/spam email domains blocklist
const BLOCKED_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
  'trashmail.com', 'fakeinbox.com', 'yopmail.com', 'sharklasers.com',
  'guerrillamailblock.com', 'spam4.me', 'dispostable.com',
])

function getIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? BLOCKED_DOMAINS.has(domain) : false
}

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/[<>'"]/g, '').trim()
}

/** Heuristic spam score — returns true if the submission looks like spam. */
function looksLikeSpam(name: string, message?: string): boolean {
  const combined = `${name} ${message ?? ''}`.toLowerCase()
  const spamSignals = [
    /\b(seo|buy|cheap|click here|free money|crypto|casino|forex|loan|diet pill|viagra)\b/,
    /https?:\/\//,         // URLs in name or message
    /[A-Z]{6,}/,           // excessive caps
  ]
  return spamSignals.some((re) => re.test(combined))
}

export async function POST(request: NextRequest) {
  const ip = getIp(request)

  // Rate limiting (Upstash Redis — falls back gracefully if not configured)
  const rate = await checkRateLimit(ip)
  if (!rate.allowed) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rate.resetAt - Date.now()) / 1000)) } }
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  // Validate with Zod
  const result = leadSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      {
        message: 'Validation failed.',
        errors: result.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      { status: 400 }
    )
  }

  const raw = result.data

  // Spam / disposable email checks
  if (isDisposableEmail(raw.email)) {
    logger.warn('lead', 'Disposable email rejected', { email: raw.email, ip })
    // Return 200 so bots don't retry — data is simply not saved
    return NextResponse.json({ message: "We've received your enquiry and will be in touch shortly." })
  }

  if (looksLikeSpam(raw.name, raw.message)) {
    logger.warn('lead', 'Spam heuristic triggered', { name: raw.name, ip })
    return NextResponse.json({ message: "We've received your enquiry and will be in touch shortly." })
  }

  // Sanitize after validation
  const lead = {
    ...raw,
    name: sanitize(raw.name),
    email: sanitize(raw.email),
    phone: raw.phone ? sanitize(raw.phone) : undefined,
    business_name: raw.business_name ? sanitize(raw.business_name) : undefined,
    message: raw.message ? sanitize(raw.message) : undefined,
  }

  // Duplicate detection — same email within 30 min
  const duplicate = await isRecentDuplicate(lead.email)
  if (duplicate) {
    logger.info('lead', 'Duplicate submission silently accepted', { email: lead.email })
    // Return success so the user isn't confused — data already exists
    return NextResponse.json({ message: "We've received your enquiry and will be in touch shortly." })
  }

  const userAgent = request.headers.get('user-agent') || 'unknown'

  // Primary: save to Supabase (blocking — failure = 500)
  const supabaseResult = await saveLeadToSupabase(lead, userAgent, ip)
  if (!supabaseResult.success) {
    logger.error('lead', 'Supabase save failed — returning 500', { error: supabaseResult.error })
    return NextResponse.json(
      { message: 'Failed to submit your enquiry. Please try again.' },
      { status: 500 }
    )
  }

  // Secondary: n8n email notification (fire-and-forget — failure is logged, never blocks)
  if (process.env.N8N_WEBHOOK_URL) {
    sendToN8N(lead, userAgent, ip).catch((err) => {
      logger.error('lead', 'n8n fire-and-forget threw', {
        error: err instanceof Error ? err.message : String(err),
      })
    })
  }

  return NextResponse.json({ message: "We've received your enquiry and will be in touch shortly." })
}
