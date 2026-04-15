import type { LeadData } from '@/lib/schemas'
import { logger } from '@/lib/logger'

interface N8NPayload extends LeadData {
  timestamp: string
  user_agent: string
  ip: string
}

export async function sendToN8N(
  lead: LeadData,
  userAgent: string,
  ip: string
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    logger.warn('n8n', 'N8N_WEBHOOK_URL not configured — skipping')
    return { success: false, error: 'Webhook not configured' }
  }

  const payload: N8NPayload = {
    ...lead,
    timestamp: new Date().toISOString(),
    user_agent: userAgent,
    ip,
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      logger.error('n8n', 'Webhook returned non-2xx', { status: response.status })
      return { success: false, error: `Webhook error: ${response.status}` }
    }

    logger.info('n8n', 'Webhook delivered', { email: lead.email })
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    logger.error('n8n', 'Webhook threw', { error: message })
    return { success: false, error: message }
  }
}
