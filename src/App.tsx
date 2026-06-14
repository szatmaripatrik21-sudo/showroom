import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'

// ── Sections in IA order (Phase 1 skeleton) ─────────────────────────────────
// 1. Hero
import HeroSection from '@/components/HeroSection'
// 2. Problem — stub, content in Phase 3
import ProblemSection from '@/components/ProblemSection'
// 3. Business value — current SolutionSection content, rewritten in Phase 3
import SolutionSection from '@/components/SolutionSection'
// 4. Industry logic — reframed in Phase 4
import IndustryTabs from '@/components/IndustryTabs'
// 5. Selected work — real/concept labels added in Phase 5
import PortfolioSection from '@/components/PortfolioSection'
// 6. SP method — stub, content in Phase 6
import MethodSection from '@/components/MethodSection'
// 7. Offer package — restructured in Phase 6
import OfferBlock from '@/components/OfferBlock'
// 8. Process — refined in Phase 7
import ProcessSection from '@/components/ProcessSection'
// 9. Pricing logic — stub, content in Phase 7
import PricingSection from '@/components/PricingSection'
// 10. Final CTA + form — refined in Phase 8
import ContactSection from '@/components/ContactSection'
// ─────────────────────────────────────────────────────────────────────────────

import Footer from '@/components/Footer'
import MobileStickyBar from '@/components/MobileStickyBar'

// Retired sections (not rendered):
//   HeroSocialProof — was disabled (ENABLED=false); no real content to migrate
//   ResultsStrip    — self-declared benchmarks; Truth rule prevents carrying forward

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-sp-bg text-sp-text">
        <Navbar />

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Problem */}
        <ProblemSection />

        {/* 3. Business value */}
        <SolutionSection />

        {/* 4. Industry logic */}
        <IndustryTabs />

        {/* 5. Selected work */}
        <PortfolioSection />

        {/* 6. SP method */}
        <MethodSection />

        {/* 7. Offer package */}
        <OfferBlock />

        {/* 8. Process */}
        <ProcessSection />

        {/* 9. Pricing logic */}
        <PricingSection />

        {/* 10. Final CTA + form */}
        <ContactSection />

        <Footer />
        <MobileStickyBar />
      </div>
    </MotionConfig>
  )
}
