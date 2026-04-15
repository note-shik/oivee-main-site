import { WHY_OIVEE } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function WhyOivee() {
  return (
    <SectionWrapper className="bg-brand-surface" grain>
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Left — heading */}
        <ScrollReveal direction="right">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Why Oivee
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
              Not another agency.{' '}
              <span className="text-brand-textMuted">Your growth partner.</span>
            </h2>
            <p className="mt-6 text-brand-textMuted" style={{ lineHeight: '1.7' }}>
              Most agencies sell deliverables. We sell outcomes. Every engagement is built
              around one goal: making your brand the one people notice, trust, and choose.
            </p>
          </div>
        </ScrollReveal>

        {/* Right — points */}
        <div className="grid gap-6 sm:grid-cols-2">
          {WHY_OIVEE.map((point, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div
                className="group rounded-sm border border-brand-border bg-brand-bg/50 p-6 hover:border-brand-primary/20 hover:shadow-gold-sm"
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-bold text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary/20">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold">{point.title}</h3>
                <p className="mt-2 text-sm text-brand-textMuted" style={{ lineHeight: '1.7' }}>
                  {point.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
