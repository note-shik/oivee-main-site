export async function trackEvent(
  event: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, metadata }),
    })
  } catch {
    // Tracking is best-effort — never block the user experience
  }
}
