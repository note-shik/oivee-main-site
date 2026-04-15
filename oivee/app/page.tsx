import Hero from '@/components/home/Hero'
import ServicesGrid from '@/components/home/ServicesGrid'
import ProcessSection from '@/components/home/ProcessSection'
import WhyOivee from '@/components/home/WhyOivee'
import Testimonials from '@/components/home/Testimonials'
import CaseStudyPreview from '@/components/home/CaseStudyPreview'
import PricingSection from '@/components/home/PricingSection'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'

// Funnel order: hook → proof → services → process → trust → pricing → CTA
export default function HomePage() {
  return (
    <>
      {/* 1. Hook */}
      <Hero />

      {/* 2. Proof — results before pitch */}
      <CaseStudyPreview />
      <Testimonials />

      {/* 3. Mid-page CTA while trust is high */}
      <SectionWrapper>
        <SectionCTA
          heading="Ready to stop blending in?"
          subtext="Book a free strategy call and we'll show you exactly how to grow."
          ctaLabel="Get Free Audit"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>

      {/* 4. What we do */}
      <ServicesGrid />

      {/* 5. How we work */}
      <ProcessSection />

      {/* 6. Why us */}
      <WhyOivee />

      {/* 7. Pricing */}
      <PricingSection />

      {/* 8. Final CTA */}
      <SectionWrapper>
        <SectionCTA
          heading="Let's build something impossible to ignore."
          subtext="Your brand deserves better than average. Let's make it happen."
          ctaLabel="Start Growing"
          ctaHref="/contact"
        />
      </SectionWrapper>
    </>
  )
}
