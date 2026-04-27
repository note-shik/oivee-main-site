'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE } from '@/lib/content'
import Button from '@/components/ui/Button'
import Image from "next/image";


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-brand-border/70 bg-brand-bg/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={28}
            height={28}
            priority
          />
          <span className="font-heading text-2xl font-bold tracking-display text-gold-gradient">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active
                    ? 'text-brand-primary'
                    : 'text-brand-text hover:text-brand-primary'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Button href="/contact" size="sm" trackingEvent="nav_cta_click">
            Book a Call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 rounded-sm p-1.5 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
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

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-8 pt-2">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-heading text-2xl transition-colors duration-200 ${
                    active ? 'text-brand-primary' : 'text-brand-text hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-4">
              <Button href="/contact" size="md" className="w-full" trackingEvent="nav_mobile_cta_click">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
