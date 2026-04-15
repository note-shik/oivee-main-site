import type { Metadata } from 'next'
import Image from 'next/image'
import { CASE_STUDIES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real results for real brands. See how Oivee has helped businesses scale through strategy, design, and performance marketing.',
  openGraph: {
    title: 'Case Studies | Oivee',
    description: 'Real results for real brands. See our work.',
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Case Studies
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl lg:text-6xl">
            Proof over promises.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-textMuted" style={{ lineHeight: '1.7' }}>
            Every number here is real. Every brand here trusted us to deliver — and we did.
          </p>
        </div>
      </SectionWrapper>

      {/* Case studies */}
      <SectionWrapper className="bg-brand-surface">
        <div className="space-y-16">
          {CASE_STUDIES.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={i * 150}>
            <div
              id={cs.slug}
              className="scroll-mt-24 overflow-hidden rounded-sm border border-brand-border bg-brand-bg"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src={cs.image}
                    alt={cs.client}
                    fill
                    className="object-cover"
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
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Want results like these?"
          subtext="Let's build a growth strategy tailored to your brand."
          ctaLabel="Start Growing"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
