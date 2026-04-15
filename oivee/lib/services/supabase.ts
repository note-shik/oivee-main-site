import { createClient } from '@supabase/supabase-js'
import type { LeadData } from '@/lib/schemas'
import { logger } from '@/lib/logger'

const DEDUP_WINDOW_MINUTES = 30

function getClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured')
  }

  return createClient(url, key, { auth: { persistSession: false } })
}

/** Returns true if the same email submitted within the dedup window. */
export async function isRecentDuplicate(email: string): Promise<boolean> {
  try {
    const supabase = getClient()
    const since = new Date(Date.now() - DEDUP_WINDOW_MINUTES * 60 * 1000).toISOString()

    const { count, error } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', since)

    if (error) {
      logger.warn('supabase', 'Duplicate check failed — allowing submission', { error: error.message })
      return false // fail open: if we can't check, don't block the lead
    }

    return (count ?? 0) > 0
  } catch (err) {
    logger.warn('supabase', 'Duplicate check threw — allowing submission', {
      error: err instanceof Error ? err.message : String(err),
    })
    return false
  }
}

export async function saveLeadToSupabase(
  lead: LeadData,
  userAgent: string,
  ip: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getClient()

    const { error } = await supabase.from('leads').insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? null,
      business_name: lead.business_name ?? null,
      message: lead.message ?? null,
      source: lead.source,
      user_agent: userAgent,
      ip,
      created_at: new Date().toISOString(),
    })

    if (error) {
      logger.error('supabase', 'Insert failed', { error: error.message })
      return { success: false, error: error.message }
    }

    logger.info('supabase', 'Lead saved', { email: lead.email, source: lead.source })
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    logger.error('supabase', 'Unexpected error', { error: message })
    return { success: false, error: message }
  }
}
