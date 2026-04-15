interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  grain?: boolean
  gridOverlay?: boolean
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  grain = false,
  gridOverlay = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative px-6 py-24 md:py-32 lg:px-8 ${grain ? 'grain' : ''} ${gridOverlay ? 'grid-overlay' : ''} ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
