'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE } from '@/lib/content'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 duration-300 ${
        scrolled
          ? 'border-b border-brand-border bg-brand-bg/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
      style={{ transition: 'background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-heading text-2xl font-bold tracking-display">
          <span className="text-gold-gradient">{SITE.name}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 hover:text-brand-primary ${
                pathname === link.href ? 'text-brand-primary' : 'text-brand-textMuted'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" size="sm" trackingEvent="nav_cta_click">
            Start Growing
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm p-1"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-brand-text transition-transform duration-200 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-text transition-opacity duration-200 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-text transition-transform duration-200 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden md:hidden ${
          mobileOpen ? 'max-h-96 border-b border-brand-border' : 'max-h-0'
        }`}
        style={{ transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="bg-brand-bg/95 px-6 py-6 backdrop-blur-md">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg transition-colors duration-200 hover:text-brand-primary ${
                  pathname === link.href ? 'text-brand-primary' : 'text-brand-textMuted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2">
              <Button href="/contact" size="md" className="w-full" trackingEvent="nav_mobile_cta_click">
                Start Growing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
