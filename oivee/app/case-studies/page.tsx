import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CASE_STUDIES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Real brands, real numbers. A selection of engagements where Oivee moved the metric that actually mattered.',
  openGraph: {
    title: 'Case studies · Oivee',
    description: 'Real brands. Real numbers. Selected Oivee engagements.',
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            Selected work
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
            Proof, not promises.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-[1.6] text-brand-textMuted">
            A few of the engagements we&apos;re proud of. Every number here is audited against
            the client&apos;s own dashboards — we can share sources on request.
          </p>
        </div>
      </SectionWrapper>

      {/* Case studies */}
      <SectionWrapper className="bg-brand-surface">
        <div className="space-y-16">
          {CASE_STUDIES.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={i * 150}>
            <Link
              href={`/case-studies/${cs.slug}`}
              id={cs.slug}
              className="group block scroll-mt-24 overflow-hidden rounded-sm border border-brand-border bg-brand-bg transition-colors hover:border-brand-primary/40"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src={cs.image}
                    alt={cs.client}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-surface/80 md:bg-gradient-to-r" />
                  <div className="absolute inset-0 bg-brand-primary/[0.05] mix-blend-multiply" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
                      {cs.industry}
                    </span>
                    {cs.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-textMuted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-6 text-2xl font-bold md:text-3xl">{cs.title}</h2>
                  <p className="mt-3 text-brand-textMuted" style={{ lineHeight: '1.7' }}>
                    {cs.summary}
                  </p>

                  {/* Metrics */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {cs.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-sm border border-brand-border bg-brand-surface p-4 text-center"
                      >
                        <p className="text-xl font-bold text-brand-primary md:text-2xl">
                          {m.value}
                        </p>
                        <p className="mt-1 text-xs text-brand-textMuted">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 text-sm font-semibold text-brand-primary opacity-80 transition-opacity group-hover:opacity-100">
                    Read the full story →
                  </p>
                </div>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Want numbers like these?"
          subtext="Tell us where you're stuck. We'll tell you — honestly — if we can move it."
          ctaLabel="Book a Strategy Call"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
