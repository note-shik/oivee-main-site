import Hero from '@/components/home/Hero'
import ServicesGrid from '@/components/home/ServicesGrid'
import ProcessSection from '@/components/home/ProcessSection'
import WhyOivee from '@/components/home/WhyOivee'
import Testimonials from '@/components/home/Testimonials'
import CaseStudyPreview from '@/components/home/CaseStudyPreview'
import PricingSection from '@/components/home/PricingSection'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionCTA from '@/components/ui/SectionCTA'

// Flow: hook → services (what) → proof (did it work?) → process → why us → testimonials → engagements → CTA
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* What we do — answer the implicit first question */}
      <ServicesGrid />

      {/* Proof — numbers speak louder than adjectives */}
      <CaseStudyPreview />

      {/* Process — reduce the "how does this actually work?" friction */}
      <ProcessSection />

      {/* Why us — differentiation before testimonials seals it */}
      <WhyOivee />

      {/* Third-party validation */}
      <Testimonials />

      {/* Engagements — commercial next step */}
      <PricingSection />

      {/* Final close */}
      <SectionWrapper>
        <SectionCTA
          heading="Let's build a brand that compounds."
          subtext="Most of our partnerships start with a 30-minute strategy call. No slides, no pitch — just a clear read on whether we can help."
          ctaLabel="Book a Strategy Call"
          ctaHref="/contact"
          variant="gold"
        />
      </SectionWrapper>
    </>
  )
}
