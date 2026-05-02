export const SITE = {
  name: 'Oivee',
  tagline: 'Where brand meets performance.',
  description:
    'A digital growth studio building brand, content, and ad systems for founders who want compounding results — not another vendor. Strategy, design, and paid media under one roof.',
  // SEO-optimised meta strings — keyword-led, not brand-led. Used in <title>/<meta description>.
  seoTitle: 'Digital Marketing Agency in India — Brand, Paid Ads & SEO | Oivee',
  seoDescription:
    'Oivee is a full-service digital marketing agency in India delivering brand, Meta & Google Ads, content, web, and SEO under one roof. Book a strategy call.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oivee.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919064982248',
  phone: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '+91 90649 82248',
  phoneE164: process.env.NEXT_PUBLIC_PHONE_E164 || '+919064982248',
  email: process.env.NEXT_PUBLIC_EMAIL || 'support@oivee.com',
  address: {
    locality: 'Kolkata',
    region: 'WB',
    country: 'IN',
  },
  social: {
    instagram: 'https://www.instagram.com/oivee.in',
    linkedin: 'https://www.linkedin.com/company/oivee',
  },
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
] as const

export const SERVICES = [
  {
    id: 'social-media',
    title: 'Social Media Management',
    shortDescription: 'Strategy-led content that builds authority and drives engagement across every platform.',
    fullDescription:
      'We don\'t just post — we engineer social presence. From content calendars to community management, every piece is designed to position your brand as the one people follow, trust, and buy from.',
    icon: 'social',
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
    role: 'Founder',
    company: 'TechScale',
    quote: 'Within 90 days our qualified leads tripled and the brand finally looked as serious as the product. Oivee is the rare agency that obsesses over both.',
  },
  {
    name: 'Priya Sharma',
    role: 'CEO',
    company: 'StyleHive',
    quote: 'We hired Oivee for social. Six months later they\'re running our content, paid, and brand — because the work compounded faster than anything we\'d seen.',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Co-founder',
    company: 'FreshBrew',
    quote: 'ROAS moved from 1.8x to 5.2x in the first month. They didn\'t just run better ads — they rebuilt the whole funnel around what actually converts.',
  },
] as const

export const CASE_STUDIES = [
  {
    slug: 'techscale-lead-generation',
    client: 'TechScale',
    industry: 'B2B SaaS',
    title: 'From Cold to 3x Leads in 90 Days',
    summary:
      'A complete digital overhaul — brand refresh, paid ads, and SEO — that tripled qualified leads in a single quarter.',
    duration: '90 days',
    metrics: [
      { label: 'Lead Increase', value: '312%' },
      { label: 'Cost Per Lead', value: '-48%' },
      { label: 'ROAS', value: '4.7x' },
    ],
    services: ['Paid Ads', 'SEO', 'Brand Identity'],
    image: '/images/case_study_1.png',
    challenge:
      'TechScale had a strong product but a forgettable brand and an unpredictable lead engine. Demos were inconsistent, paid spend was leaking, and the sales team was prospecting cold most weeks. The mandate: make the pipeline predictable in one quarter without doubling the budget.',
    approach: [
      'Rebuilt the visual identity and messaging around a single category-defining promise.',
      'Audited every Meta and Google campaign — killed bottom-quartile creative, doubled down on winners.',
      'Launched 4 net-new landing pages, each tied to a single high-intent keyword cluster.',
      'Set up a weekly creative sprint: 8 new ad variants tested per week, top 2 scaled.',
    ],
    outcome:
      'Within 90 days qualified demos tripled and CPL dropped by nearly half. The brand refresh gave the sales team a story buyers remembered, and the new ad system made every rupee of spend traceable to pipeline.',
    testimonial: {
      quote:
        'Within 90 days our qualified leads tripled and the brand finally looked as serious as the product. Oivee is the rare agency that obsesses over both.',
      name: 'Arjun Mehta',
      role: 'Founder, TechScale',
    },
  },
  {
    slug: 'stylehive-social-growth',
    client: 'StyleHive',
    industry: 'Fashion & Lifestyle',
    title: 'Building a 50K Community from Scratch',
    summary:
      'Strategic content and reels that grew StyleHive from zero to 50,000 engaged followers — and a 6-figure revenue channel from social alone.',
    duration: '6 months',
    metrics: [
      { label: 'Followers', value: '50K+' },
      { label: 'Engagement Rate', value: '7.2%' },
      { label: 'Revenue from Social', value: '₹18L+' },
    ],
    services: ['Social Media', 'Content Creation', 'Paid Ads'],
    image: '/images/case_study_2.png',
    challenge:
      'StyleHive was launching into a saturated D2C fashion market with a small team and no audience. They needed to build a recognizable voice, a content engine that could ship daily, and a path from follower to first purchase — fast.',
    approach: [
      'Defined a content pillar system: 4 pillars, 3 formats, one voice.',
      'Set up an in-house reels production cadence — 5 reels/week, 2 photo posts.',
      'Layered paid amplification on top-performing organic content rather than fresh ads.',
      'Built a weekly engagement ritual: 30 minutes of founder-led DMs + comment replies.',
    ],
    outcome:
      'Six months in, StyleHive crossed 50K engaged followers, hit a 7%+ engagement rate (4x category average), and generated ₹18L+ in revenue directly attributable to social. Three of the top five SKUs were launched with reels-first campaigns.',
    testimonial: {
      quote:
        'We hired Oivee for social. Six months later they\'re running our content, paid, and brand — because the work compounded faster than anything we\'d seen.',
      name: 'Priya Sharma',
      role: 'CEO, StyleHive',
    },
  },
  {
    slug: 'freshbrew-ecommerce',
    client: 'FreshBrew',
    industry: 'D2C / E-commerce',
    title: '5.2x ROAS and a Brand People Remember',
    summary:
      'End-to-end brand build plus performance marketing that turned FreshBrew into a recognizable D2C brand with profitable unit economics.',
    duration: '4 months',
    metrics: [
      { label: 'ROAS', value: '5.2x' },
      { label: 'Brand Recall', value: '+340%' },
      { label: 'Monthly Revenue', value: '₹12L+' },
    ],
    services: ['Brand Identity', 'Paid Ads', 'Website Development'],
    image: '/images/case_study_3.svg',
    challenge:
      'FreshBrew was burning ad spend at a 1.8x ROAS — under their break-even — and had a brand that buyers couldn\'t pick out of a lineup. The funnel was leaking at every step from ad to checkout.',
    approach: [
      'Rebuilt the brand identity, packaging direction, and tone-of-voice from scratch.',
      'Re-architected the website around a single primary SKU and one high-converting bundle.',
      'Switched ad strategy from product-led to story-led creatives (UGC + founder POV).',
      'Implemented post-purchase upsells and a 7-email retention flow.',
    ],
    outcome:
      'In the first month after relaunch, ROAS jumped from 1.8x to 5.2x. Brand recall in unaided surveys grew 3.4x. Monthly revenue crossed ₹12L with healthier unit economics than they\'d ever had.',
    testimonial: {
      quote:
        'ROAS moved from 1.8x to 5.2x in the first month. They didn\'t just run better ads — they rebuilt the whole funnel around what actually converts.',
      name: 'Rohan Kapoor',
      role: 'Co-founder, FreshBrew',
    },
  },
] as const

export type CaseStudy = (typeof CASE_STUDIES)[number]

export const WHY_OIVEE = [
  {
    title: 'Strategy before tactics',
    description: 'Every engagement opens with research and a custom plan. No templates, no recycled decks — just work built around your category and your goals.',
  },
  {
    title: 'One room, one team',
    description: 'Brand, content, and media under the same roof. Fewer handoffs, tighter feedback loops, creative that stays on-brand all the way to the ad account.',
  },
  {
    title: 'Measured against revenue',
    description: 'Vanity metrics don\'t pay the bills. We tie every deliverable to pipeline, ROAS, or retention — and share the numbers every week.',
  },
  {
    title: 'Senior-led, always',
    description: 'The people pitching you are the people running the work. No juniors ghost-writing strategy, no account manager between you and the team.',
  },
] as const

export const ENGAGEMENT_TIERS = [
  {
    name: 'Foundations',
    tagline: 'For brands finding their voice.',
    description: 'Identity, messaging, and a launch-ready digital presence. Best for founders at pre-seed to seed stage building their first real story.',
    includes: [
      'Brand identity & style system',
      'Website design + build (up to 6 pages)',
      'Launch content kit (social + creative)',
      '60-day activation support',
    ],
    commitment: 'One-time project · 6 weeks',
    cta: 'Start the conversation',
  },
  {
    name: 'Growth',
    tagline: 'For brands ready to scale.',
    description: 'A full growth system across content, paid media, and creative. Built for teams spending on ads but not yet compounding.',
    includes: [
      'Paid media (Meta + Google)',
      'Content engine (social + reels)',
      'Monthly creative sprints',
      'Weekly reporting & strategy',
    ],
    commitment: 'Monthly retainer · 90-day minimum',
    cta: 'Book strategy call',
    highlight: true,
  },
  {
    name: 'Category',
    tagline: 'For brands built to lead.',
    description: 'End-to-end partnership for companies competing for category leadership. Custom scope, senior team, and shared growth KPIs.',
    includes: [
      'Dedicated senior strategist',
      'Full-funnel media + creative',
      'Brand, web, and production',
      'Executive reporting cadence',
    ],
    commitment: 'By application only',
    cta: 'Apply to work with us',
  },
] as const

export const FAQS = [
  {
    q: 'How much does it cost to work with Oivee?',
    a: 'Foundations projects typically start at ₹2.5–4 lakh for the full identity + launch-ready site. Growth retainers begin at ₹1.25 lakh/month with a 90-day minimum. Category engagements are scoped on application. Every quote is fixed-scope, in writing, before we start — no padded hourly billing.',
  },
  {
    q: 'How fast can we get started?',
    a: 'Most engagements kick off within 7–10 days of the first call. Discovery week happens immediately, strategy week follows, then execution begins by week three. If you need a faster start, tell us — we can usually accommodate.',
  },
  {
    q: 'Do you work with brands outside India?',
    a: 'Yes. Roughly a third of our clients are outside India — primarily UAE, UK, and Singapore. We invoice in INR, USD, GBP, or AED, and we run async by default so timezones rarely matter.',
  },
  {
    q: 'Do you offer one-off projects, or only retainers?',
    a: 'Both. Brand identity, websites, and audits are one-off projects with a clear deliverable. Paid media, content, and SEO are retainer-only — they compound, and one month tells you nothing.',
  },
  {
    q: 'Who actually does the work?',
    a: 'The senior team that pitched you. We don\'t hand off to junior account managers after signing. Your strategist, designer, and media lead are the same people from kickoff to scale — that\'s why we cap how many clients we take per quarter.',
  },
  {
    q: 'What if it isn\'t working after the first 90 days?',
    a: 'You leave, no questions asked. Retainers are 90-day minimums to give the work time to compound — but if the numbers don\'t move, that\'s on us. We\'ll exit cleanly and hand over assets.',
  },
  {
    q: 'What don\'t you do?',
    a: 'Influencer marketing as a standalone service, PR, traditional media (print/OOH/TV), and one-off social posts without a strategy attached. We\'re sharper when we run the full system — if you only want a single tactical deliverable, we\'ll usually point you to a better-fit partner.',
  },
  {
    q: 'How do you measure success?',
    a: 'Against the metric you actually care about — qualified pipeline, ROAS, MRR, or retention. We define the target in week one, share a dashboard you can open any time, and review numbers weekly. Vanity metrics (followers, impressions) are reported but never the goal.',
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
    { label: 'Pricing', href: '/pricing' },
  ],
} as const
