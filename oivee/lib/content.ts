export const SITE = {
  name: 'Oivee',
  tagline: 'We make brands impossible to ignore.',
  description:
    'Oivee is a premium digital growth agency that combines bold strategy with flawless execution. We help brands scale through social media, paid ads, content, and design.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oivee.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919064982248',
  phone: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '+91 90649 82248',
  email: process.env.NEXT_PUBLIC_EMAIL || 'clg.oishiksamanta@gmail.com',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const SERVICES = [
  {
    id: 'social-media',
    title: 'Social Media Management',
    shortDescription: 'Strategy-led content that builds authority and drives engagement across every platform.',
    fullDescription:
      'We don\'t just post — we engineer social presence. From content calendars to community management, every piece is designed to position your brand as the one people follow, trust, and buy from.',
    icon: 'social',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=900&q=80&auto=format&fit=crop',
    features: [
      'Platform-specific content strategy',
      'Daily posting & community management',
      'Analytics & monthly reporting',
      'Audience growth & engagement optimization',
    ],
  },
  {
    id: 'paid-ads',
    title: 'Paid Ads (Meta + Google)',
    shortDescription: 'Performance campaigns that turn ad spend into predictable, scalable revenue.',
    fullDescription:
      'We build ad systems, not just campaigns. From creative testing to funnel optimization, every rupee is tracked and optimized for maximum return. Meta, Google, or both — we scale what works.',
    icon: 'ads',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    features: [
      'Meta & Google Ads management',
      'Creative strategy & A/B testing',
      'Funnel design & landing pages',
      'ROAS tracking & optimization',
    ],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    shortDescription: 'Visual systems that make your brand unmistakable at first glance.',
    fullDescription:
      'Your brand is more than a logo. We build complete visual identities — logo, typography, color systems, brand guidelines — that make you look like the category leader from day one.',
    icon: 'brand',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80&auto=format&fit=crop',
    features: [
      'Logo & visual identity design',
      'Brand guidelines & style system',
      'Typography & color palette',
      'Brand collateral & templates',
    ],
  },
  {
    id: 'content-creation',
    title: 'Reels & Content Creation',
    shortDescription: 'Scroll-stopping content that captures attention and drives action.',
    fullDescription:
      'Short-form video is the growth engine of modern brands. We concept, shoot, and edit reels and content that don\'t just get views — they convert viewers into customers.',
    icon: 'content',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80&auto=format&fit=crop',
    features: [
      'Reels & short-form video production',
      'Content scripting & storyboarding',
      'Professional editing & motion graphics',
      'Trend analysis & creative direction',
    ],
  },
  {
    id: 'web-development',
    title: 'Website Development',
    shortDescription: 'High-performance websites built to convert visitors into paying clients.',
    fullDescription:
      'We build websites that work as hard as your sales team. Fast, beautiful, conversion-optimized — every page is engineered to move visitors from interest to action.',
    icon: 'web',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format&fit=crop',
    features: [
      'Custom design & development',
      'Mobile-first responsive build',
      'SEO-optimized architecture',
      'Conversion rate optimization',
    ],
  },
  {
    id: 'seo-growth',
    title: 'SEO & Growth Strategy',
    shortDescription: 'Organic growth systems that compound over time and reduce your cost per lead.',
    fullDescription:
      'SEO isn\'t a hack — it\'s infrastructure. We build the technical foundation, content strategy, and backlink authority that puts you on page one and keeps you there.',
    icon: 'growth',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=80&auto=format&fit=crop',
    features: [
      'Technical SEO audit & fixes',
      'Keyword research & content strategy',
      'On-page & off-page optimization',
      'Monthly reporting & growth tracking',
    ],
  },
] as const

export type Service = (typeof SERVICES)[number]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dig deep into your brand, audience, and goals. No templates — just focused strategy built around what makes you different.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We map the plan — channels, content, campaigns, timelines. Every move is intentional, every metric is defined upfront.',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'We build, launch, and manage. From creative to campaigns, everything ships on time and on brand.',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'We analyze what works, double down on winners, and systematically scale your growth month over month.',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Arjun Mehta',
    role: 'Founder, TechScale',
    quote: 'Oivee transformed our online presence. Within 3 months, our leads tripled and our brand finally looked as premium as our product.',
    avatar: 'AM',
  },
  {
    name: 'Priya Sharma',
    role: 'CEO, StyleHive',
    quote: 'Working with Oivee felt like adding a full growth team overnight. Their strategy, design, and execution are on another level.',
    avatar: 'PS',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Co-founder, FreshBrew',
    quote: 'Our Meta ads ROAS went from 1.8x to 5.2x in the first month. Oivee doesn\'t just run ads — they build systems.',
    avatar: 'RK',
  },
] as const

export const CASE_STUDIES = [
  {
    slug: 'techscale-lead-generation',
    client: 'TechScale',
    industry: 'B2B SaaS',
    title: 'From Cold to 3x Leads in 90 Days',
    summary: 'A complete digital overhaul — brand refresh, paid ads, and SEO — that tripled qualified leads in a single quarter.',
    metrics: [
      { label: 'Lead Increase', value: '312%' },
      { label: 'Cost Per Lead', value: '-48%' },
      { label: 'ROAS', value: '4.7x' },
    ],
    services: ['Paid Ads', 'SEO', 'Brand Identity'],
    image: '/images/case_study_1.png',
  },
  {
    slug: 'stylehive-social-growth',
    client: 'StyleHive',
    industry: 'Fashion & Lifestyle',
    title: 'Building a 50K Community from Scratch',
    summary: 'Strategic content and reels that grew StyleHive from zero to 50,000 engaged followers — and a 6-figure revenue channel from social alone.',
    metrics: [
      { label: 'Followers', value: '50K+' },
      { label: 'Engagement Rate', value: '7.2%' },
      { label: 'Revenue from Social', value: '₹18L+' },
    ],
    services: ['Social Media', 'Content Creation', 'Paid Ads'],
    image: '/images/case_study_2.png',
  },
  {
    slug: 'freshbrew-ecommerce',
    client: 'FreshBrew',
    industry: 'D2C / E-commerce',
    title: '5.2x ROAS and a Brand People Remember',
    summary: 'End-to-end brand build plus performance marketing that turned FreshBrew into a recognizable D2C brand with profitable unit economics.',
    metrics: [
      { label: 'ROAS', value: '5.2x' },
      { label: 'Brand Recall', value: '+340%' },
      { label: 'Monthly Revenue', value: '₹12L+' },
    ],
    services: ['Brand Identity', 'Paid Ads', 'Website Development'],
    image: 'https://placehold.co/800x500/141414/C9A84C?text=FreshBrew',
  },
] as const

export type CaseStudy = (typeof CASE_STUDIES)[number]

export const WHY_OIVEE = [
  {
    title: 'Strategy First, Always',
    description: 'We don\'t start with tactics. Every engagement begins with deep research and a custom growth plan built for your specific goals.',
  },
  {
    title: 'Obsessed with ROI',
    description: 'Pretty design means nothing without results. Every pixel, every campaign, every piece of content is measured against real business outcomes.',
  },
  {
    title: 'Full-Stack Execution',
    description: 'From brand identity to paid ads to website development — one team, one vision, zero gaps between strategy and execution.',
  },
  {
    title: 'Built for Founders',
    description: 'We work with people who care deeply about their brand. If you\'re building something that matters, we\'re the team that makes it impossible to ignore.',
  },
] as const

export const FOOTER_LINKS = {
  services: [
    { label: 'Social Media Management', href: '/services#social-media' },
    { label: 'Paid Ads', href: '/services#paid-ads' },
    { label: 'Brand Identity', href: '/services#brand-identity' },
    { label: 'Content Creation', href: '/services#content-creation' },
    { label: 'Web Development', href: '/services#web-development' },
    { label: 'SEO & Growth', href: '/services#seo-growth' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Contact', href: '/contact' },
  ],
} as const
