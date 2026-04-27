import type { Metadata } from 'next'
import SectionWrapper from '@/components/ui/SectionWrapper'
import LeadForm from '@/components/ui/LeadForm'
import { SITE } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Book a strategy call',
  description:
    'Book a strategy call with Oivee. Tell us what you\'re trying to grow — we\'ll come back within a business day with a clear read on whether we can help.',
  openGraph: {
    title: 'Book a strategy call · Oivee',
    description: 'Book a strategy call. One business-day response, no pitch decks.',
  },
}

export default function ContactPage() {
  return (
    <>
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Left — info */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
              Get in touch
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
              Tell us what you&apos;re{' '}
              <span className="text-gold-gradient italic">trying to grow.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-[1.6] text-brand-textMuted">
              Share a few sentences about your brand, where you&apos;re stuck, and what
              a big quarter would look like. A senior strategist reads every note and
              replies within one business day.
            </p>

            <div className="mt-14 space-y-10">
              <div>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
                  What happens next
                </h3>
                <ol className="mt-5 space-y-4">
                  {[
                    'We read your note and look at your brand.',
                    'If we\'re a fit, we book a 30-minute strategy call — no slides.',
                    'You leave with a clear, honest read on your growth levers.',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-brand-textMuted">
                      <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/5 font-heading text-[11px] font-bold text-brand-primary">
                        {i + 1}
                      </span>
                      <span className="leading-[1.65]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-sm border border-brand-border bg-brand-surface/60 p-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
                    Prefer a message?
                  </p>
                  <div className="mt-4 space-y-4">
                    <a
                      href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Oivee — I'd love to learn how you can help my brand grow.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline justify-between gap-4 text-sm text-brand-text transition-colors hover:text-brand-primary"
                    >
                      <span>{SITE.phone}</span>
                      <span className="text-xs text-brand-textMuted">WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="flex items-baseline justify-between gap-4 text-sm text-brand-text transition-colors hover:text-brand-primary break-all"
                    >
                      <span>{SITE.email}</span>
                      <span className="shrink-0 text-xs text-brand-textMuted">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-sm border border-brand-border bg-brand-surface/60 p-8 md:p-10">
            <LeadForm source="website" showBusinessName showMessage />
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
