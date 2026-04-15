import Image from 'next/image'
import type { Service } from '@/lib/content'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      id={service.id}
      className="scroll-mt-24 grid overflow-hidden rounded-sm border border-brand-border bg-brand-surface md:grid-cols-[1fr_2fr]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[220px] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-surface/60 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 to-transparent md:hidden" />
        <div className="absolute inset-0 bg-brand-primary/[0.04] mix-blend-multiply" />
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
