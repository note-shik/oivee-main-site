import Link from 'next/link'
import Image from 'next/image'
import { SITE, FOOTER_LINKS } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-heading text-2xl font-bold tracking-display">
              <Image src="/favicon.svg" alt="" width={28} height={28} />
              <span className="text-gold-gradient">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-textMuted">
              {SITE.tagline}
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-brand-textMuted/70">
              Brand, content, and paid media — under one roof, for founders who want the
              category to notice.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
              Services
            </h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-textMuted transition-colors duration-200 hover:text-brand-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-textMuted transition-colors duration-200 hover:text-brand-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Oivee! I'd love to learn how you can help grow my brand.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-textMuted transition-colors duration-200 hover:text-brand-text"
                >
                  {SITE.phone}
                </a>
                <p className="text-xs text-brand-textMuted/60 mt-0.5">WhatsApp / Call</p>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-brand-textMuted transition-colors duration-200 hover:text-brand-text break-all"
                >
                  {SITE.email}
                </a>
                <p className="text-xs text-brand-textMuted/60 mt-0.5">Email us</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 md:flex-row">
          <p className="text-xs text-brand-textMuted/60">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-brand-textMuted/60">
            Crafted in India. Obsessed everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
