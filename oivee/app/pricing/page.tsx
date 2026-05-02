import type { Metadata } from 'next'
import { ENGAGEMENT_TIERS } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'
import FAQ from '@/components/ui/FAQ'
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pricing & Engagement Models | Oivee Digital Marketing Agency',
  description:
    'Transparent pricing for digital marketing in India — Foundations from ₹2.5L, Growth retainers from ₹1.25L/month. Senior-led, fixed-scope engagements.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing & engagements · Oivee',
    description:
      'Three engagement models built around the stage you are at. Transparent, senior-led, measurable.',
    url: '/pricing',
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ])
        )}
      />
      <script {...jsonLdScriptProps(faqSchema())} />
      {/* Hero */}
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            Engagements
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
            Built around your stage.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-[1.6] text-brand-textMuted">
            Three ways to work with us. Each one comes with a senior team, a clear scope,
            and reporting tied to the metrics you actually care about.
          </p>
        </div>
      </SectionWrapper>

      {/* Tiers */}
      <SectionWrapper className="bg-brand-surface">
        <div className="grid gap-6 md:grid-cols-3">
          {ENGAGEMENT_TIERS.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 120}>
              <div
                className={`flex h-full flex-col rounded-sm border p-8 transition-colors ${
                  'highlight' in tier && tier.highlight
                    ? 'border-brand-primary/60 bg-brand-bg shadow-gold-lg'
                    : 'border-brand-border bg-brand-bg hover:border-brand-primary/30'
                }`}
              >
                {'highlight' in tier && tier.highlight && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-primary">
                    Most popular
                  </span>
                )}
                <h2 className="font-heading text-2xl font-bold">{tier.name}</h2>
                <p className="mt-2 text-sm text-brand-primary">{tier.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-brand-textMuted">
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3 border-t border-brand-border pt-6">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-brand-text"
                    >
                      <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-4 border-t border-brand-border pt-6">
                  <p className="text-xs uppercase tracking-widest text-brand-textMuted/70">
                    {tier.commitment}
                  </p>
                  <Button
                    href="/contact"
                    variant={'highlight' in tier && tier.highlight ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full"
                    trackingEvent={`pricing_${tier.name.toLowerCase()}_cta`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-brand-textMuted/80">
          Not sure where you fit? Tell us where you are and where you want to be — we
          will recommend the engagement that gets you there fastest, even if it is the
          smallest one.
        </p>
      </SectionWrapper>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Let's map the right engagement."
          subtext="A 30-minute call. We'll diagnose, recommend, and quote — no pressure."
          ctaLabel="Book a Strategy Call"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
