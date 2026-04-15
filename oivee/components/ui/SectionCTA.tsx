import Button from './Button'
import ScrollReveal from './ScrollReveal'

interface SectionCTAProps {
  heading: string
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
  variant?: 'default' | 'gold'
}

export default function SectionCTA({
  heading,
  subtext,
  ctaLabel = 'Start Growing',
  ctaHref = '/contact',
  variant = 'default',
}: SectionCTAProps) {
  return (
    <ScrollReveal>
      <div
        className={`relative overflow-hidden rounded-sm border px-8 py-16 text-center md:px-16 md:py-20 ${
          variant === 'gold'
            ? 'border-brand-primary/20 bg-brand-surface'
            : 'border-brand-border bg-brand-surface'
        }`}
      >
        <div className="absolute inset-0 bg-radial-gold opacity-40" />
        <div className="relative z-10">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {subtext && (
            <p className="mx-auto mt-4 max-w-xl text-brand-textMuted">{subtext}</p>
          )}
          <div className="mt-8">
            <Button href={ctaHref} size="lg" trackingEvent="cta_section_click">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
