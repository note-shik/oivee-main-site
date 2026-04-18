'use client'

import { useState } from 'react'
import type { LeadInput } from '@/lib/schemas'
import { trackEvent } from '@/lib/services/tracking'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface LeadFormProps {
  source?: LeadInput['source']
  showBusinessName?: boolean
  showMessage?: boolean
  ctaLabel?: string
  className?: string
}

export default function LeadForm({
  source = 'website',
  showBusinessName = false,
  showMessage = true,
  ctaLabel = 'Book Strategy Call',
  className = '',
}: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrors({})
    setErrorMessage('')

    const form = new FormData(e.currentTarget)
    const data: LeadInput = {
      name: form.get('name') as string,
      email: form.get('email') as string,
      phone: (form.get('phone') as string) || undefined,
      business_name: (form.get('business_name') as string) || undefined,
      message: (form.get('message') as string) || undefined,
      source,
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      let result: { message?: string; errors?: Array<{ path: string[]; message: string }> } = {}
      try {
        result = await res.json()
      } catch {
        // Server returned non-JSON (e.g. upstream error page)
      }

      if (!res.ok) {
        if (result.errors) {
          const fieldErrors: Record<string, string> = {}
          for (const err of result.errors) {
            if (err.path?.[0]) {
              fieldErrors[err.path[0] as string] = err.message
            }
          }
          setErrors(fieldErrors)
        }
        setErrorMessage(result.message || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      trackEvent('form_submitted', { source })
      if (typeof window !== 'undefined' && 'fbq' in window) {
        ;(window as { fbq: (event: string, name: string) => void }).fbq('track', 'Lead')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-sm border border-brand-primary/25 bg-brand-primary/[0.04] p-10 text-center ${className}`}>
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/40 bg-brand-primary/10 text-brand-primary"
          aria-hidden="true"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-brand-text">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-brand-textMuted">
          A senior strategist will review your note and reply within one business day.
          If it&apos;s urgent, reply to our confirmation email and we&apos;ll move faster.
        </p>
      </div>
    )
  }

  const isLoading = status === 'loading'
  const inputClasses =
    'peer w-full border-b border-brand-border bg-transparent px-0 py-3.5 text-brand-text placeholder:text-brand-textMuted/60 transition-colors duration-200 focus:border-brand-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
  const errorClass = 'mt-1.5 text-xs text-red-400'

  return (
    <form onSubmit={handleSubmit} className={`space-y-7 ${className}`} noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            required
            disabled={isLoading}
            className={inputClasses}
            aria-label="Your name"
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Work email"
            required
            disabled={isLoading}
            className={inputClasses}
            aria-label="Work email"
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      {showBusinessName && (
        <div>
          <input
            name="business_name"
            type="text"
            placeholder="Company or brand"
            disabled={isLoading}
            className={inputClasses}
            aria-label="Company or brand"
          />
          {errors.business_name && <p className={errorClass}>{errors.business_name}</p>}
        </div>
      )}

      <div>
        <input
          name="phone"
          type="tel"
          placeholder="Phone (optional — we prefer WhatsApp)"
          disabled={isLoading}
          className={inputClasses}
          aria-label="Phone"
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      {showMessage && (
        <div>
          <textarea
            name="message"
            placeholder="What's the one growth problem you'd most like to solve?"
            rows={3}
            disabled={isLoading}
            className={`${inputClasses} resize-none`}
            aria-label="Growth problem"
          />
          {errors.message && <p className={errorClass}>{errors.message}</p>}
        </div>
      )}

      {status === 'error' && errorMessage && (
        <p className="rounded-sm border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full overflow-hidden rounded-sm bg-brand-primary px-6 py-4 font-heading text-base font-semibold text-brand-bg transition-[box-shadow,transform] duration-300 hover:shadow-gold-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            {ctaLabel}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        )}
      </button>

      <p className="text-[11px] leading-relaxed text-brand-textMuted/80">
        We reply within one business day. No newsletters, no drip sequences —
        just a real human reading your note.
      </p>
    </form>
  )
}
