import type { Metadata } from 'next'
import SectionWrapper from '@/components/ui/SectionWrapper'
import LeadForm from '@/components/ui/LeadForm'
import { SITE } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Oivee. Tell us about your brand and goals — we\'ll come back with a custom growth plan.',
  openGraph: {
    title: 'Contact | Oivee',
    description: 'Start your growth journey. Get in touch today.',
  },
}

export default function ContactPage() {
  return (
    <>
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Get in Touch
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Let&apos;s make your brand{' '}
              <span className="text-gold-gradient">unforgettable.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-textMuted" style={{ lineHeight: '1.7' }}>
              Tell us about your business and goals. We&apos;ll get back within 24 hours
              with a tailored strategy — no obligation, no generic proposals.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
                  What happens next?
                </h3>
                <ol className="mt-4 space-y-4">
                  {[
                    'We review your submission and research your brand',
                    'We schedule a free 30-minute strategy call',
                    'You receive a custom growth plan tailored to your goals',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-textMuted">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-bold text-brand-primary">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-sm border border-brand-border bg-brand-surface p-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-2">
                    WhatsApp / Call
                  </p>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Oivee! I'd love to learn how you can help grow my brand.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-brand-text transition-colors hover:text-brand-primary"
                  >
                    {SITE.phone}
                  </a>
                  <p className="mt-1 text-sm text-brand-textMuted">
                    Tap to open WhatsApp — we respond within minutes.
                  </p>
                </div>
                <div className="border-t border-brand-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-lg font-semibold text-brand-text transition-colors hover:text-brand-primary"
                  >
                    {SITE.email}
                  </a>
                  <p className="mt-1 text-sm text-brand-textMuted">
                    Drop us a line — we reply within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-sm border border-brand-border bg-brand-surface p-8 md:p-10">
            <LeadForm source="website" showBusinessName showMessage />
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
