import { MotionConfig } from 'framer-motion'
import { VideoBusProvider } from '@/lib/videoBus'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HeroSocialProof from '@/components/HeroSocialProof'
import PortfolioSection from '@/components/PortfolioSection'
import SolutionSection from '@/components/SolutionSection'
import IndustryTabs from '@/components/IndustryTabs'
import ResultsStrip from '@/components/ResultsStrip'
import OfferBlock from '@/components/OfferBlock'
import ProcessSection from '@/components/ProcessSection'
import FaqSection from '@/components/FaqSection'
import ContactSection from '@/components/ContactSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import MobileStickyBar from '@/components/MobileStickyBar'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <VideoBusProvider>
    <div className="min-h-screen bg-lux-black text-lux-cream">
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Social-proof strip — flagged off until real content exists */}
      <HeroSocialProof />

      {/* 3. Gallery — the one filterable gallery, Aurum as the big featured card */}
      <PortfolioSection />

      {/* 4. Why-me feature grid (4 cards) + cost-of-inaction beat */}
      <SolutionSection />

      {/* 5. Industries — merged "tailored to you" section */}
      <IndustryTabs />

      {/* 6. Results */}
      <ResultsStrip />

      {/* 7. Pricing */}
      <OfferBlock />

      {/* 8. Process */}
      <ProcessSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. Final CTA — emotional closer that drives down to the form */}
      <FinalCTA />

      {/* 11. Contact / quote form */}
      <ContactSection />

      <Footer />

      {/* Persistent mobile CTA */}
      <MobileStickyBar />
    </div>
    </VideoBusProvider>
    </MotionConfig>
  )
}
