import { PROCESS_STEPS } from '@/lib/content'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function ProcessSection() {
  return (
    <SectionWrapper gridOverlay>
      <ScrollReveal>
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Our Process
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            How we turn brands into{' '}
            <span className="text-gold-gradient">growth machines.</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 150}>
            <div className="relative">
              {/* Connector line (desktop) */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-8 translate-x-full bg-gradient-to-r from-brand-primary/25 to-transparent lg:block" />
              )}

              <div
                className="group rounded-sm border border-brand-border bg-brand-surface/50 p-8 hover:border-brand-primary/20 hover:shadow-gold-sm"
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
              >
                <span className="font-heading text-4xl font-bold text-brand-primary/20 transition-colors duration-500 group-hover:text-brand-primary/40">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-brand-textMuted" style={{ lineHeight: '1.7' }}>
                  {step.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}
