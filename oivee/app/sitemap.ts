import { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/lib/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oivee.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const caseStudyUrls: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...caseStudyUrls,
  ]
}
