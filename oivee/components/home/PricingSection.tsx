import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'
import { ENGAGEMENT_TIERS } from '@/lib/content'

export default function PricingSection() {
  return (
    <SectionWrapper id="engagements">
      <ScrollReveal>
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            Engagements
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] md:text-4xl lg:text-[2.75rem]">
            Three ways to work with us.
          </h2>
          <p className="mt-5 max-w-xl text-brand-textMuted">
            We keep our roster small on purpose. Every engagement is scoped around your stage,
            your budget, and the outcome you&apos;re actually trying to reach.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 md:grid-cols-3">
        {ENGAGEMENT_TIERS.map((tier, i) => {
          const highlight = 'highlight' in tier && tier.highlight
          return (
            <ScrollReveal key={tier.name} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-sm border p-8 transition-[border-color,box-shadow] duration-300 ${
                  highlight
                    ? 'border-brand-primary/40 bg-gradient-to-b from-brand-primary/[0.05] to-brand-surface shadow-gold-md'
                    : 'border-brand-border bg-brand-surface hover:border-brand-primary/25 hover:shadow-gold-sm'
                }`}
              >
                {highlight && (
                  <div className="absolute -top-[11px] left-8">
                    <span className="rounded-full bg-brand-primary px-3 py-[5px] text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-bg">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-brand-text">
                    {tier.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-brand-primary">{tier.tagline}</p>

                  <p className="mt-6 text-sm leading-[1.7] text-brand-textMuted">
                    {tier.description}
                  </p>

                  <div className="my-6 h-px w-full hairline-gold" />

                  <ul className="space-y-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-brand-text">
                        <svg
                          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-[11px] uppercase tracking-[0.14em] text-brand-textMuted">
                    {tier.commitment}
                  </p>
                </div>

                <div className="mt-8">
                  <Button
                    href="/contact"
                    variant={highlight ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full justify-center"
                    trackingEvent={`tier_cta_${tier.name.toLowerCase()}`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      <ScrollReveal delay={400}>
        <p className="mt-12 text-center text-sm text-brand-textMuted">
          Investment starts at a level most serious brands are already spending on one channel.{' '}
          <a href="/contact" className="text-brand-primary underline-offset-4 hover:underline">
            Book a call
          </a>{' '}
          and we&apos;ll tell you if we&apos;re a fit before you tell us a budget.
        </p>
      </ScrollReveal>
    </SectionWrapper>
  )
}
