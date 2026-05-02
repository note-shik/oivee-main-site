import type { Metadata } from 'next'
import { SERVICES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'
import ServiceCard from '@/components/services/ServiceCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import {
  breadcrumbSchema,
  servicesItemListSchema,
  jsonLdScriptProps,
} from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Services — Brand, Paid Ads, SEO & Web | Oivee',
  description:
    'Full-service digital marketing in India — Meta & Google Ads, SEO, brand identity, social media, reels, and web development. Engineered as one growth system.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services · Oivee',
    description: 'Brand, content, paid media, and web — engineered as one growth system.',
    url: '/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ])
        )}
      />
      <script {...jsonLdScriptProps(servicesItemListSchema())} />
      {/* Hero */}
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            Services
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
            Everything a modern brand needs{' '}
            <span className="text-gold-gradient italic">in one room.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-[1.6] text-brand-textMuted">
            No piecemeal vendors, no creative-versus-performance standoff. Every service is a
            module of one growth system — and most clients end up running all of it with us.
          </p>
        </div>
      </SectionWrapper>

      {/* Service cards */}
      <SectionWrapper className="bg-brand-surface">
        <div className="grid gap-8">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 80}>
              <ServiceCard service={service} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Not sure what you need?"
          subtext="Describe what you're trying to grow. We'll write back with the smallest engagement that moves the needle — or tell you honestly if you don't need us yet."
          ctaLabel="Book a Strategy Call"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
