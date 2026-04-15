import type { Metadata } from 'next'
import { SERVICES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'
import ServiceCard from '@/components/services/ServiceCard'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'From social media and paid ads to brand identity and web development — Oivee delivers full-stack digital growth for ambitious brands.',
  openGraph: {
    title: 'Services | Oivee',
    description: 'Full-stack digital growth services for ambitious brands.',
  },
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Our Services
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl lg:text-6xl">
            Everything your brand needs to{' '}
            <span className="text-gold-gradient">dominate.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-textMuted" style={{ lineHeight: '1.7' }}>
            We don&apos;t do piecemeal. Every service is part of a unified growth system
            designed to compound results over time.
          </p>
        </div>
      </SectionWrapper>

      {/* Service cards */}
      <SectionWrapper className="bg-brand-surface">
        <div className="grid gap-8">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 80}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Not sure which service you need?"
          subtext="Tell us your goals and we'll build a custom plan — no obligation."
          ctaLabel="Get Free Audit"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
