import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CASE_STUDIES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'

type Params = { slug: string }

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug)
  if (!cs) return { title: 'Case study not found' }
  return {
    title: `${cs.title} — ${cs.client}`,
    description: cs.summary,
    openGraph: {
      title: `${cs.title} · Oivee`,
      description: cs.summary,
      images: [{ url: cs.image }],
    },
  }
}

export default function CaseStudyDetailPage({ params }: { params: Params }) {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug)
  if (!cs) notFound()

  const idx = CASE_STUDIES.findIndex((c) => c.slug === cs.slug)
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length]

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 md:pt-40" grain>
        <div className="max-w-3xl">
          <Link
            href="/case-studies"
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary transition-opacity hover:opacity-70"
          >
            ← All case studies
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
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
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
            {cs.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-brand-textMuted">
            {cs.summary}
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest text-brand-textMuted/70">
            Client: {cs.client} · Engagement: {cs.duration}
          </p>
        </div>
      </SectionWrapper>

      {/* Hero image */}
      <SectionWrapper className="!py-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-brand-border">
          <Image
            src={cs.image}
            alt={cs.client}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-brand-primary/[0.04] mix-blend-multiply" />
        </div>
      </SectionWrapper>

      {/* Metrics */}
      <SectionWrapper className="bg-brand-surface">
        <ScrollReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-sm border border-brand-border bg-brand-bg p-8 text-center"
              >
                <p className="text-3xl font-bold text-brand-primary md:text-4xl">
                  {m.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-brand-textMuted">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Narrative */}
      <SectionWrapper>
        <div className="grid gap-16 md:grid-cols-3">
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-brand-primary">
              The challenge
            </h2>
            <p className="mt-4 leading-[1.7] text-brand-textMuted">{cs.challenge}</p>
          </div>
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-brand-primary">
              Our approach
            </h2>
            <ul className="mt-4 space-y-3">
              {cs.approach.map((step) => (
                <li
                  key={step}
                  className="flex items-start gap-3 leading-[1.6] text-brand-text"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-primary" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-brand-primary">
              The outcome
            </h2>
            <p className="mt-4 leading-[1.7] text-brand-textMuted">{cs.outcome}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonial */}
      <SectionWrapper className="bg-brand-surface">
        <ScrollReveal>
          <figure className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden
              className="font-heading text-6xl text-brand-primary/30"
            >
              &ldquo;
            </span>
            <blockquote className="mt-2 text-2xl font-bold leading-[1.3] md:text-3xl">
              {cs.testimonial.quote}
            </blockquote>
            <figcaption className="mt-6 text-sm text-brand-textMuted">
              <span className="font-semibold text-brand-text">
                {cs.testimonial.name}
              </span>{' '}
              · {cs.testimonial.role}
            </figcaption>
          </figure>
        </ScrollReveal>
      </SectionWrapper>

      {/* Next case study */}
      <SectionWrapper>
        <ScrollReveal>
          <Link
            href={`/case-studies/${next.slug}`}
            className="group block overflow-hidden rounded-sm border border-brand-border bg-brand-surface transition-colors hover:border-brand-primary/40"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={next.image}
                  alt={next.client}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
                  Next case study
                </p>
                <h3 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
                  {next.title}
                </h3>
                <p className="mt-3 text-sm text-brand-textMuted">{next.summary}</p>
                <p className="mt-6 text-sm font-semibold text-brand-primary">
                  Read the story →
                </p>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Want a case study like this?"
          subtext="Tell us where you're stuck. We'll tell you — honestly — if we can move it."
          ctaLabel="Book a Strategy Call"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
