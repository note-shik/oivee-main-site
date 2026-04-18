import { TESTIMONIALS } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Testimonials() {
  return (
    <SectionWrapper>
      <ScrollReveal>
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            In their words
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.05] md:text-4xl lg:text-[2.75rem]">
            Founders who bet on us — and won.
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-px bg-brand-border md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 120}>
            <figure className="flex h-full flex-col bg-brand-bg p-8 md:p-10">
              {/* Quote mark */}
              <div
                className="font-heading text-[4rem] leading-none text-brand-primary/25"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote className="-mt-4 font-heading text-[1.35rem] leading-[1.4] text-brand-text">
                {t.quote}
              </blockquote>

              <figcaption className="mt-auto pt-10">
                <p className="text-sm font-semibold text-brand-text">{t.name}</p>
                <p className="mt-0.5 text-xs text-brand-textMuted">
                  {t.role} · <span className="text-brand-primary">{t.company}</span>
                </p>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}
