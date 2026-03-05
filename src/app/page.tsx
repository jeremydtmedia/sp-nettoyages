import Hero from "@/components/sections/Hero"
import StatsBanner from "@/components/sections/StatsBanner"
import ServicesOverview from "@/components/sections/ServicesOverview"
import BeforeAfter from "@/components/sections/BeforeAfter"
import WhyUs from "@/components/sections/WhyUs"
import GoogleReviews from "@/components/sections/GoogleReviews"
import CTABanner from "@/components/sections/CTABanner"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <ServicesOverview />
      <BeforeAfter />
      <WhyUs />
      <GoogleReviews />
      <CTABanner />
    </>
  )
}
