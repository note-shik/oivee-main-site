import type { Service } from '@/lib/content'
import { ServiceIcon } from '@/components/services/serviceIcons'

interface ServiceCardProps {
  service: Service
  index?: number
}

// Per-service gradient — keeps each card visually distinct while staying on-brand.
const VISUALS: Record<string, { gradient: string; pattern: string }> = {
  social:   { gradient: 'from-[#1a1a1f] via-[#1d1a14] to-[#0B0B0C]',  pattern: 'radial-gradient(circle at 20% 30%, rgba(201,168,76,0.18), transparent 55%)' },
  ads:      { gradient: 'from-[#1f1a14] via-[#181412] to-[#0B0B0C]',  pattern: 'radial-gradient(circle at 80% 20%, rgba(201,168,76,0.22), transparent 50%)' },
  brand:    { gradient: 'from-[#161620] via-[#191614] to-[#0B0B0C]',  pattern: 'radial-gradient(circle at 50% 80%, rgba(201,168,76,0.20), transparent 55%)' },
  content:  { gradient: 'from-[#1a181f] via-[#1c1714] to-[#0B0B0C]',  pattern: 'radial-gradient(circle at 30% 70%, rgba(201,168,76,0.18), transparent 55%)' },
  web:      { gradient: 'from-[#141b1f] via-[#171614] to-[#0B0B0C]',  pattern: 'radial-gradient(circle at 70% 40%, rgba(201,168,76,0.20), transparent 50%)' },
  growth:   { gradient: 'from-[#1a1f1a] via-[#181714] to-[#0B0B0C]',  pattern: 'radial-gradient(circle at 25% 25%, rgba(201,168,76,0.20), transparent 55%)' },
}

const FALLBACK = { gradient: 'from-brand-surfaceAlt via-brand-surface to-brand-bg', pattern: 'radial-gradient(circle at 30% 30%, rgba(201,168,76,0.16), transparent 55%)' }

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const visual = VISUALS[service.icon] ?? FALLBACK
  const number = typeof index === 'number' ? String(index + 1).padStart(2, '0') : null

  return (
    <div
      id={service.id}
      className="scroll-mt-24 grid overflow-hidden rounded-sm border border-brand-border bg-brand-surface md:grid-cols-[1fr_2fr]"
    >
      {/* Branded visual — gradient + icon, no stock images */}
      <div
        className={`relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br md:aspect-auto md:min-h-[260px] ${visual.gradient}`}
      >
        {/* Soft gold wash */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: visual.pattern }}
          aria-hidden
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden
        />
        {/* Vignette into content edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-brand-surface/40" />

        {/* Content overlay */}
        <div className="relative z-10 flex w-full items-end justify-between gap-4 p-6 md:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-brand-bg/60 text-brand-primary backdrop-blur-sm ring-1 ring-brand-primary/20">
            <ServiceIcon icon={service.icon} className="h-7 w-7" />
          </div>
          {number && (
            <span className="font-heading text-5xl leading-none text-brand-primary/40 md:text-6xl">
              {number}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10">
        <h3 className="text-2xl font-bold">{service.title}</h3>
        <p className="mt-4 text-brand-textMuted" style={{ lineHeight: '1.7' }}>
          {service.fullDescription}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-brand-textMuted">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
