import { SITE, SERVICES, FAQS, CASE_STUDIES, type CaseStudy } from './content'

const BASE_URL = SITE.url

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: SITE.name,
    legalName: 'Oivee',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/icon-512.png`,
    email: SITE.email,
    telephone: SITE.phoneE164,
    foundingDate: '2025',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneE164,
        contactType: 'customer service',
        email: SITE.email,
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Bengali'],
      },
    ],
  }
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#professionalservice`,
    name: SITE.name,
    description: SITE.seoDescription,
    url: BASE_URL,
    image: `${BASE_URL}/icon-512.png`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Singapore' },
    ],
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital marketing services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.shortDescription,
          serviceType: s.title,
          provider: { '@id': `${BASE_URL}/#organization` },
        },
      })),
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE.name,
    description: SITE.seoDescription,
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}

export function faqSchema(faqs: ReadonlyArray<{ q: string; a: string }> = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function servicesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        '@id': `${BASE_URL}/services#${s.id}`,
        name: s.title,
        description: s.fullDescription,
        serviceType: s.title,
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
      },
    })),
  }
}

export function caseStudySchema(cs: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.summary,
    image: `${BASE_URL}${cs.image}`,
    datePublished: '2025-01-01',
    author: { '@id': `${BASE_URL}/#organization` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    about: {
      '@type': 'Thing',
      name: `${cs.client} — ${cs.industry}`,
    },
    mainEntityOfPage: `${BASE_URL}/case-studies/${cs.slug}`,
  }
}

export function caseStudyAlt(cs: CaseStudy) {
  const headline = cs.metrics[0]
  return `${cs.client} ${cs.industry} case study — ${headline.value} ${headline.label.toLowerCase()}`
}

export function caseStudiesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: CASE_STUDIES.map((cs, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      name: cs.title,
    })),
  }
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const
}
