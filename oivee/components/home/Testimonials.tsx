import { TESTIMONIALS } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Testimonials() {
  return (
    <SectionWrapper>
      <ScrollReveal>
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Client Love
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            Don&apos;t take our word for it.
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 150}>
            <div
              className="group rounded-sm border border-brand-border bg-brand-surface p-8 hover:border-brand-primary/20 hover:shadow-gold-sm"
              style={{ transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1 text-brand-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-brand-textMuted" style={{ lineHeight: '1.7' }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 font-heading text-sm font-bold text-brand-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-brand-textMuted">{t.role}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}
