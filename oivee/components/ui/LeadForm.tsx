'use client'

import { useState } from 'react'
import type { LeadInput } from '@/lib/schemas'
import { trackEvent } from '@/lib/services/tracking'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface LeadFormProps {
  source?: LeadInput['source']
  showBusinessName?: boolean
  showMessage?: boolean
  className?: string
}

export default function LeadForm({
  source = 'website',
  showBusinessName = true,
  showMessage = true,
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
      // Fire Meta Pixel Lead event if pixel is loaded
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
      <div className={`rounded-sm border border-brand-primary/20 bg-brand-primary/[0.03] p-8 text-center ${className}`}>
        <div className="mb-4 text-4xl">&#10003;</div>
        <h3 className="text-xl font-bold text-brand-text">Thank you!</h3>
        <p className="mt-2 text-brand-textMuted">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  const isLoading = status === 'loading'
  const inputClasses =
    'w-full rounded-sm border border-brand-border bg-brand-bg px-4 py-3 text-brand-text placeholder:text-brand-textMuted/50 transition-colors duration-200 focus:border-brand-primary/40 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed'
  const errorClass = 'mt-1 text-xs text-red-400'

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`} noValidate>
      <div>
        <input
          name="name"
          type="text"
          placeholder="Your Name *"
          required
          disabled={isLoading}
          className={inputClasses}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <input
          name="email"
          type="email"
          placeholder="Email Address *"
          required
          disabled={isLoading}
          className={inputClasses}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div>
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          disabled={isLoading}
          className={inputClasses}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      {showBusinessName && (
        <div>
          <input
            name="business_name"
            type="text"
            placeholder="Business / Brand Name"
            disabled={isLoading}
            className={inputClasses}
          />
          {errors.business_name && <p className={errorClass}>{errors.business_name}</p>}
        </div>
      )}

      {showMessage && (
        <div>
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows={4}
            disabled={isLoading}
            className={`${inputClasses} resize-none`}
          />
          {errors.message && <p className={errorClass}>{errors.message}</p>}
        </div>
      )}

      {status === 'error' && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-sm bg-brand-primary px-6 py-4 font-heading font-semibold text-brand-bg transition-shadow duration-300 hover:shadow-gold-lg focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Get in Touch'
        )}
      </button>
    </form>
  )
}
