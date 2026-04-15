import type { Metadata } from 'next'
import Image from 'next/image'
import { WHY_OIVEE } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Oivee is a premium digital growth agency built for founders and brands that refuse to blend in. Strategy-first. Results-obsessed.',
  openGraph: {
    title: 'About | Oivee',
    description: 'Strategy-first. Results-obsessed. Built for founders who care.',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
              About Oivee
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl lg:text-6xl">
              We exist to make brands{' '}
              <span className="text-gold-gradient">impossible to ignore.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-textMuted" style={{ lineHeight: '1.7' }}>
              Oivee was built on a simple belief: most brands don&apos;t have a visibility
              problem — they have a strategy problem. We fix that.
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Story */}
      <SectionWrapper className="bg-brand-surface">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-brand-textMuted" style={{ lineHeight: '1.7' }}>
            <p>
              We started Oivee because we were tired of seeing talented founders with
              incredible products get drowned out by brands with bigger budgets and louder
              marketing. The problem was never the product — it was the system around it.
            </p>
            <p>
              So we built a different kind of agency. One that combines strategic thinking
              with relentless execution. One that treats your brand like a system to be
              optimized — not a project to be delivered and forgotten.
            </p>
            <p>
              Every engagement starts with deep research. Every campaign is measured against
              real business outcomes. Every piece of creative is designed to convert, not just
              look good. We don&apos;t do vanity metrics. We do growth.
            </p>
            <p>
              Today, we work with founders, creators, and growing businesses across India.
              From social media to paid ads to complete brand builds — we&apos;re the team
              that makes it all work together.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-brand-border">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop"
              alt="Oivee team at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-brand-primary/[0.04] mix-blend-multiply" />
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper grain gridOverlay>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">What drives us.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_OIVEE.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className="group rounded-sm border border-brand-border bg-brand-surface/50 p-6 hover:border-brand-primary/20 hover:shadow-gold-sm"
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-bold text-brand-primary">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-textMuted" style={{ lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Numbers */}
      <SectionWrapper className="bg-brand-surface">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '50+', label: 'Brands Scaled' },
            { value: '4.8x', label: 'Avg. ROAS' },
            { value: '3M+', label: 'Reach Generated' },
            { value: '95%', label: 'Client Retention' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="rounded-sm border border-brand-border bg-brand-bg p-8">
                <p className="text-3xl font-bold text-brand-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-brand-textMuted">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Ready to work with a team that gets it?"
          subtext="Let's talk about what growth looks like for your brand."
          ctaLabel="Get in Touch"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
