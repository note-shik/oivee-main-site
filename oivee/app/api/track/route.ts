import { NextRequest, NextResponse } from 'next/server'
import { trackEventSchema } from '@/lib/schemas'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  const result = trackEventSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ message: 'Invalid event data' }, { status: 422 })
  }

  const { event, metadata } = result.data

  console.log(`[track] ${event}`, metadata ? JSON.stringify(metadata) : '')

  return NextResponse.json({ message: 'Event tracked' })
}
