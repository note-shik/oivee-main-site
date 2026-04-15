'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/services/tracking'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  trackingEvent?: string
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never
  }

type ButtonAsLink = ButtonBaseProps & {
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-brand-bg hover:shadow-gold-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg',
  secondary:
    'border border-brand-primary/30 text-brand-primary hover:border-brand-primary/60 hover:bg-brand-primary/5 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg',
  ghost:
    'text-brand-textMuted hover:text-brand-text active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  trackingEvent,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center font-heading font-semibold rounded-sm transition-transform transition-shadow duration-300 ease-out ${variants[variant]} ${sizes[size]} ${className}`

  const handleClick = (e: React.MouseEvent) => {
    if (trackingEvent) {
      trackEvent(trackingEvent)
    }
    if ('onClick' in props && typeof props.onClick === 'function') {
      ;(props.onClick as React.MouseEventHandler)(e)
    }
  }

  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        className={baseClasses}
        onClick={trackingEvent ? () => trackEvent(trackingEvent) : undefined}
      >
        {children}
      </Link>
    )
  }

  const { href: _h, ...buttonProps } = props as ButtonAsButton & { href?: never }
  return (
    <button className={baseClasses} onClick={handleClick} {...buttonProps}>
      {children}
    </button>
  )
}
