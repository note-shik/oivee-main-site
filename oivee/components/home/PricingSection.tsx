import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

const PACKAGES = [
  {
    name: 'Launchpad',
    tagline: 'Get your brand off the ground.',
    price: '₹25,000',
    period: '/mo',
    description: 'Everything you need to build a credible digital presence and start generating leads.',
    features: [
      'Brand identity (logo + style guide)',
      'Social media setup (2 platforms)',
      '12 posts/month with copy',
      'Basic SEO setup',
      'Monthly report',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    tagline: 'Scale with paid + organic.',
    price: '₹65,000',
    period: '/mo',
    description: 'A full-stack growth system — content, ads, and strategy working together to drive consistent revenue.',
    features: [
      'Everything in Launchpad',
      'Meta + Google Ads management',
      'Creative strategy & A/B testing',
      '20 posts/month + Reels production',
      'Landing page design',
      'Weekly performance reviews',
    ],
    cta: 'Start Growing',
    highlight: true,
  },
  {
    name: 'Dominate',
    tagline: 'Category leadership.',
    price: 'Custom',
    period: '',
    description: 'Built for brands ready to own their market. Full execution across every channel — no limits.',
    features: [
      'Everything in Growth',
      'Dedicated strategist',
      'Website development',
      'Video production',
      'PR & influencer outreach',
      'Priority support',
    ],
    cta: 'Book a Call',
    highlight: false,
  },
] as const

export default function PricingSection() {
  return (
    <SectionWrapper id="pricing">
      <ScrollReveal>
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            Invest in growth.{' '}
            <span className="text-brand-textMuted">Not guesswork.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-textMuted" style={{ lineHeight: '1.7' }}>
            Every package is a system, not a service list. Pick the level that matches where you want to go.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {PACKAGES.map((pkg, i) => (
          <ScrollReveal key={pkg.name} delay={i * 120}>
            <div
              className={`relative flex h-full flex-col rounded-sm border p-8 transition-shadow duration-300 ${
                pkg.highlight
                  ? 'border-brand-primary/40 bg-brand-primary/[0.04] shadow-gold-md'
                  : 'border-brand-border bg-brand-surface hover:border-brand-primary/20 hover:shadow-gold-sm'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-brand-bg">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                  {pkg.name}
                </p>
                <p className="mt-1 text-sm text-brand-textMuted">{pkg.tagline}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="font-heading text-4xl font-bold text-brand-text">
                    {pkg.price}
                  </span>
                  {pkg.period && (
                    <span className="mb-1 text-sm text-brand-textMuted">{pkg.period}</span>
                  )}
                </div>

                <p className="mt-4 text-sm text-brand-textMuted" style={{ lineHeight: '1.7' }}>
                  {pkg.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-brand-text">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Button
                  href="/contact"
                  variant={pkg.highlight ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full justify-center"
                  trackingEvent={`pricing_cta_${pkg.name.toLowerCase()}`}
                >
                  {pkg.cta}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={400}>
        <p className="mt-10 text-center text-sm text-brand-textMuted">
          Not sure which plan fits?{' '}
          <a href="/contact" className="text-brand-primary underline-offset-2 hover:underline">
            Book a free 30-min strategy call
          </a>{' '}
          — we&apos;ll tell you exactly what you need.
        </p>
      </ScrollReveal>
    </SectionWrapper>
  )
}
