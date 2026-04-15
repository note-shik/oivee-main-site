/**
 * Production rate limiter using Upstash Redis.
 *
 * Setup:
 * 1. Create a free Redis database at https://console.upstash.com
 * 2. Copy REST URL + token to your .env.local and Vercel env vars:
 *      UPSTASH_REDIS_REST_URL=https://...upstash.io
 *      UPSTASH_REDIS_REST_TOKEN=...
 * 3. npm install @upstash/ratelimit @upstash/redis  (run in oivee/)
 *
 * Falls back to allow-all if env vars are not set (dev-safe).
 */

import { logger } from '@/lib/logger'

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

// Lazy-load so the module works even if packages aren't installed yet
async function getUpstashLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null

  const { Ratelimit } = await import('@upstash/ratelimit')
  const { Redis } = await import('@upstash/redis')

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: false,
    prefix: 'oivee:rl',
  })
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  try {
    const limiter = await getUpstashLimiter()

    if (!limiter) {
      logger.warn('ratelimit', 'Upstash not configured — rate limiting disabled')
      return { allowed: true, remaining: 99, resetAt: 0 }
    }

    const result = await limiter.limit(ip)

    if (!result.success) {
      logger.warn('ratelimit', 'Rate limit exceeded', { ip, reset: result.reset })
    }

    return {
      allowed: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    }
  } catch (err) {
    // Fail open — a Redis outage must not block legitimate submissions
    logger.error('ratelimit', 'Rate limit check threw — allowing request', {
      error: err instanceof Error ? err.message : String(err),
    })
    return { allowed: true, remaining: 0, resetAt: 0 }
  }
}
