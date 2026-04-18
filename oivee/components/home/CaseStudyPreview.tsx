import Image from 'next/image'
import Link from 'next/link'
import { CASE_STUDIES } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function CaseStudyPreview() {
  const featured = CASE_STUDIES.slice(0, 2)

  return (
    <SectionWrapper className="bg-brand-surface" grain>
      <ScrollReveal>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
              Selected work
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.05] md:text-4xl lg:text-[2.75rem]">
              Numbers that outlast the pitch deck.
            </h2>
          </div>
          <Button href="/case-studies" variant="secondary" size="sm" trackingEvent="case_study_view_all">
            See all case studies
          </Button>
        </div>
      </ScrollReveal>

      <div className="grid gap-8 md:grid-cols-2">
        {featured.map((cs, i) => (
          <ScrollReveal key={cs.slug} delay={i * 200}>
            <Link
              href={`/case-studies#${cs.slug}`}
              className="group block overflow-hidden rounded-sm border border-brand-border bg-brand-bg hover:border-brand-primary/25 hover:shadow-gold-md"
              style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={cs.image}
                  alt={cs.client}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-brand-primary/[0.04] mix-blend-multiply" />
              </div>
              <div className="p-8">
                <p className="text-xs font-medium text-brand-primary">{cs.industry}</p>
                <h3 className="mt-2 text-xl font-bold">{cs.title}</h3>
                <p className="mt-2 text-sm text-brand-textMuted">{cs.summary}</p>
                <div className="mt-6 flex gap-6">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-lg font-bold text-brand-primary">{m.value}</p>
                      <p className="text-xs text-brand-textMuted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}
