import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-bg" />
      <div className="absolute inset-0 bg-radial-gold-top opacity-80" />

      {/* Single ambient glow — calm, not a light show */}
      <div className="absolute right-[-10%] top-1/3 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-brand-primary/[0.05] blur-[140px] animate-pulse-gold" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-36 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <ScrollReveal delay={80}>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-brand-primary/25 bg-brand-primary/[0.04] px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-primary" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
                Digital Growth Studio
              </span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={180}>
            <h1 className="text-[2.75rem] leading-[1.02] tracking-tightest sm:text-5xl md:text-6xl lg:text-[5rem]">
              We make brands{' '}
              <span className="text-gold-gradient italic">impossible</span>
              <br className="hidden sm:block" />
              {' '}to ignore.
            </h1>
          </ScrollReveal>

          {/* Subhead — specific, who + what + how */}
          <ScrollReveal delay={300}>
            <p className="mt-8 max-w-xl text-lg leading-[1.6] text-brand-textMuted md:text-[1.2rem]">
              Brand, content, and paid media — engineered as one system.
              For founders who want the category to notice,
              <span className="text-brand-text"> and the revenue to follow.</span>
            </p>
          </ScrollReveal>

          {/* CTAs — clear hierarchy */}
          <ScrollReveal delay={420}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/contact" size="lg" trackingEvent="hero_cta_primary">
                Book a Strategy Call
              </Button>
              <Button
                href="/case-studies"
                variant="ghost"
                size="lg"
                trackingEvent="hero_cta_secondary"
              >
                <span className="inline-flex items-center gap-2">
                  See the work
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Button>
            </div>
          </ScrollReveal>

          {/* Social proof */}
          <ScrollReveal delay={560}>
            <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-brand-border pt-8">
              <div>
                <p className="font-heading text-[1.75rem] leading-none text-brand-text">
                  4.8<span className="text-brand-primary">×</span>
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-brand-textMuted">
                  Avg. ROAS
                </p>
              </div>
              <div className="hidden h-10 w-px bg-brand-border sm:block" />
              <div>
                <p className="font-heading text-[1.75rem] leading-none text-brand-text">
                  50<span className="text-brand-primary">+</span>
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-brand-textMuted">
                  Brands scaled
                </p>
              </div>
              <div className="hidden h-10 w-px bg-brand-border sm:block" />
              <div>
                <p className="font-heading text-[1.75rem] leading-none text-brand-text">
                  95<span className="text-brand-primary">%</span>
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-brand-textMuted">
                  Client retention
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-brand-border pt-1.5">
          <div className="h-2 w-px animate-pulse bg-brand-primary" />
        </div>
      </div>
    </section>
  )
}
