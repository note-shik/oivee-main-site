/**
 * Transactional email via SMTP (nodemailer).
 *
 * Works with any SMTP provider — Gmail App Password, Resend, Brevo, Mailgun,
 * Postmark — by changing env vars only. No code change needed to switch.
 *
 * Setup (Gmail, free forever, ~500/day):
 *   1. Enable 2-Step Verification on your Google account.
 *   2. Generate an App Password at https://myaccount.google.com/apppasswords
 *   3. Set in .env.local and Vercel:
 *        SMTP_HOST=smtp.gmail.com
 *        SMTP_PORT=587
 *        SMTP_USER=your.address@gmail.com
 *        SMTP_PASS=<16-char app password>
 *        SMTP_FROM="Oivee <support@oivee.com>"   # display "from" — Gmail rewrites
 *        OWNER_EMAIL=support@oivee.com           # where lead notifications go
 *
 * Setup (Resend, 3,000/mo free, requires DNS):
 *        SMTP_HOST=smtp.resend.com
 *        SMTP_PORT=465
 *        SMTP_USER=resend
 *        SMTP_PASS=<resend api key>
 *
 * Falls back to a no-op if env vars are not set (dev-safe).
 */

import nodemailer, { type Transporter } from 'nodemailer'
import type { LeadData } from '@/lib/schemas'
import { logger } from '@/lib/logger'

let cachedTransporter: Transporter | null = null

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter

  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const port = Number(process.env.SMTP_PORT ?? 587)

  if (!host || !user || !pass) return null

  // No pool — Vercel Functions are short-lived; module-level cache already
  // gives per-instance reuse. Pooling just keeps a connection we'll throw away.
  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // implicit TLS on 465; STARTTLS on 587
    auth: { user, pass },
  })

  return cachedTransporter
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return ''
  return `<tr><td style="padding:6px 12px 6px 0;color:#8E8E93;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#111;font-size:14px;">${escapeHtml(value)}</td></tr>`
}

interface SendResult {
  success: boolean
  error?: string
  skipped?: boolean
}

/** Notify the agency that a new lead came in. Owner inbox. */
export async function sendLeadNotification(
  lead: LeadData,
  userAgent: string,
  ip: string
): Promise<SendResult> {
  const transporter = getTransporter()
  if (!transporter) {
    logger.warn('email', 'SMTP not configured — skipping owner notification')
    return { success: false, skipped: true, error: 'SMTP not configured' }
  }

  const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER!

  if (!ownerEmail) {
    logger.warn('email', 'OWNER_EMAIL not set — skipping owner notification')
    return { success: false, skipped: true, error: 'OWNER_EMAIL not set' }
  }

  const subject = `New lead: ${lead.name}${lead.business_name ? ` (${lead.business_name})` : ''}`

  const text = [
    `New lead from ${lead.source}`,
    ``,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : '',
    lead.business_name ? `Business: ${lead.business_name}` : '',
    lead.message ? `\nMessage:\n${lead.message}` : '',
    ``,
    `---`,
    `IP: ${ip}`,
    `User agent: ${userAgent}`,
    `Time: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fafafa;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #eaeaea;">
    <div style="background:#0B0B0C;color:#C9A84C;padding:18px 24px;font-size:13px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;">
      Oivee · New lead
    </div>
    <div style="padding:24px;">
      <h2 style="margin:0 0 4px 0;font-size:20px;color:#111;">${escapeHtml(lead.name)}</h2>
      <p style="margin:0 0 18px 0;color:#8E8E93;font-size:13px;">via ${escapeHtml(lead.source)} · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #eaeaea;border-bottom:1px solid #eaeaea;margin-bottom:16px;">
        ${row('Email', lead.email)}
        ${row('Phone', lead.phone)}
        ${row('Business', lead.business_name)}
      </table>
      ${
        lead.message
          ? `<div style="background:#f7f7f7;border-left:3px solid #C9A84C;padding:14px 16px;border-radius:0 4px 4px 0;font-size:14px;color:#222;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.message)}</div>`
          : ''
      }
      <p style="margin:20px 0 0 0;font-size:12px;color:#aaa;">IP ${escapeHtml(ip)} · ${escapeHtml(userAgent.slice(0, 120))}</p>
    </div>
  </div>
</div>`.trim()

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: ownerEmail,
      replyTo: `${lead.name} <${lead.email}>`,
      subject,
      text,
      html,
    })
    logger.info('email', 'Owner notification sent', { to: ownerEmail })
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    logger.error('email', 'Owner notification failed', { error: message })
    return { success: false, error: message }
  }
}

/** Confirmation auto-reply to the lead. Friendly receipt — sets expectation. */
export async function sendLeadAutoReply(lead: LeadData): Promise<SendResult> {
  const transporter = getTransporter()
  if (!transporter) {
    return { success: false, skipped: true, error: 'SMTP not configured' }
  }

  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER!
  const firstName = lead.name.split(' ')[0] || lead.name

  const subject = "We've got your enquiry — Oivee"

  const text = [
    `Hi ${firstName},`,
    ``,
    `Thanks for reaching out to Oivee. We've received your enquiry and a senior member of the team will get back to you within one business day — usually faster.`,
    ``,
    `If it helps to share more context in the meantime, just reply to this email.`,
    ``,
    `— Oivee`,
    `https://oivee.com`,
  ].join('\n')

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fafafa;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #eaeaea;">
    <div style="background:#0B0B0C;color:#C9A84C;padding:20px 24px;font-family:'Times New Roman',serif;font-size:22px;font-weight:600;letter-spacing:-0.01em;">
      Oivee
    </div>
    <div style="padding:28px 24px;color:#222;font-size:15px;line-height:1.65;">
      <p style="margin:0 0 14px 0;">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 14px 0;">Thanks for reaching out. We&rsquo;ve received your enquiry and a senior member of the team will get back to you within one business day — usually faster.</p>
      <p style="margin:0 0 14px 0;">If it helps to share more context in the meantime, just reply to this email.</p>
      <p style="margin:24px 0 0 0;color:#8E8E93;font-size:13px;">— The Oivee team</p>
    </div>
    <div style="border-top:1px solid #eaeaea;padding:14px 24px;font-size:12px;color:#aaa;">
      <a href="https://oivee.com" style="color:#C9A84C;text-decoration:none;">oivee.com</a>
    </div>
  </div>
</div>`.trim()

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: lead.email,
      subject,
      text,
      html,
    })
    logger.info('email', 'Auto-reply sent', { to: lead.email })
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    logger.error('email', 'Auto-reply failed', { error: message })
    return { success: false, error: message }
  }
}
