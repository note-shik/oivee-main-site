import { FAQS } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface FAQProps {
  eyebrow?: string
  heading?: string
  subhead?: string
  items?: ReadonlyArray<{ q: string; a: string }>
  className?: string
}

export default function FAQ({
  eyebrow = 'Frequently asked',
  heading = 'The questions every founder asks before saying yes.',
  subhead = "Short answers to what we get most. If we haven't covered yours, ask on the next call.",
  items = FAQS,
  className,
}: FAQProps) {
  // JSON-LD FAQPage schema for SEO. Google surfaces these as rich results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <SectionWrapper className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollReveal>
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] md:text-4xl lg:text-[2.5rem]">
            {heading}
          </h2>
          {subhead && (
            <p className="mt-5 text-brand-textMuted">{subhead}</p>
          )}
        </div>
      </ScrollReveal>

      <div className="mx-auto max-w-3xl divide-y divide-brand-border border-y border-brand-border">
        {items.map((item, i) => (
          <ScrollReveal key={item.q} delay={i * 60}>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors hover:text-brand-primary">
                <span className="text-base font-semibold text-brand-text md:text-lg">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-primary transition-transform duration-300 group-open:rotate-45"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </summary>
              <div
                className="pb-6 pr-12 text-brand-textMuted"
                style={{ lineHeight: '1.7' }}
              >
                {item.a}
              </div>
            </details>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}
