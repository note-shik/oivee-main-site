import Link from 'next/link'
import { SERVICES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'

const ICONS: Record<string, React.ReactNode> = {
  social: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  ads: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  brand: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  content: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  web: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  growth: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
}

export default function ServicesGrid() {
  return (
    <SectionWrapper id="services" className="bg-brand-surface" grain>
      <ScrollReveal>
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            Full-stack growth.{' '}
            <span className="text-brand-textMuted">Zero gaps.</span>
          </h2>
          <p className="mt-4 text-brand-textMuted" style={{ lineHeight: '1.7' }}>
            Every service is designed to work together — so your brand grows faster, looks sharper, and converts harder.
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
                {ICONS[service.icon]}
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
