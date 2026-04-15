import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SITE } from '@/lib/content'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden grain">
      {/* Background layers */}
      <div className="absolute inset-0 bg-brand-bg" />
      <div className="absolute inset-0 bg-radial-gold opacity-60" />
      <div className="absolute inset-0 bg-radial-gold-top" />
      <div className="absolute inset-0 grid-overlay" />

      {/* Floating orbs */}
      <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-brand-primary/[0.04] blur-[120px] animate-pulse-gold" />
      <div className="absolute bottom-[10%] left-[5%] h-[300px] w-[300px] rounded-full bg-brand-accent/[0.03] blur-[80px] animate-pulse-gold" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 lg:px-8">
        <div className="max-w-3xl">
          {/* Tag */}
          <ScrollReveal delay={100}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/[0.05] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              <span className="text-xs font-medium uppercase tracking-widest text-brand-primary">
                Premium Digital Growth
              </span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={250}>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              We make brands{' '}
              <span className="text-gold-gradient">impossible to ignore.</span>
            </h1>
          </ScrollReveal>

          {/* Subtext */}
          <ScrollReveal delay={400}>
            <p className="mt-6 max-w-xl text-lg text-brand-textMuted md:text-xl" style={{ lineHeight: '1.7' }}>
              {SITE.description}
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={550}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" size="lg" trackingEvent="hero_cta_primary">
                Start Growing
              </Button>
              <Button
                href="/case-studies"
                variant="secondary"
                size="lg"
                trackingEvent="hero_cta_secondary"
              >
                See Our Work
              </Button>
            </div>
          </ScrollReveal>

          {/* Social proof hint */}
          <ScrollReveal delay={700}>
            <div className="mt-16 flex items-center gap-6 border-t border-brand-border pt-8">
              <div>
                <p className="text-2xl font-bold text-brand-text">50+</p>
                <p className="text-xs text-brand-textMuted">Brands Scaled</p>
              </div>
              <div className="h-8 w-px bg-brand-border" />
              <div>
                <p className="text-2xl font-bold text-brand-text">4.8x</p>
                <p className="text-xs text-brand-textMuted">Avg. ROAS</p>
              </div>
              <div className="h-8 w-px bg-brand-border" />
              <div>
                <p className="text-2xl font-bold text-brand-text">3M+</p>
                <p className="text-xs text-brand-textMuted">Reach Generated</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
