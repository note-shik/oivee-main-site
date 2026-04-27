import Link from 'next/link'
import { SERVICES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { ServiceIcon } from '@/components/services/serviceIcons'

export default function ServicesGrid() {
  return (
    <SectionWrapper id="services" className="bg-brand-surface" grain>
      <ScrollReveal>
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            What we do
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] md:text-4xl lg:text-[2.75rem]">
            Full-stack growth.{' '}
            <span className="text-brand-textMuted">Zero gaps between strategy and shipping.</span>
          </h2>
          <p className="mt-5 text-brand-textMuted">
            Pick the discipline — or let us run the whole system. Either way, the work is built by
            the same senior team that pitched it.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <ScrollReveal key={service.id} delay={i * 100}>
            <Link
              href={`/services#${service.id}`}
              className="group block rounded-sm border border-brand-border bg-brand-bg p-8 hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-gold-md"
              style={{ transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-brand-primary/10 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary/20">
                <ServiceIcon icon={service.icon} />
              </div>
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-brand-textMuted" style={{ lineHeight: '1.7' }}>
                {service.shortDescription}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Learn more
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}
