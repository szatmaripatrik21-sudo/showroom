import HeroAnimation from './HeroAnimation'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const valuePoints = [
  { label: 'Több bizalom' },
  { label: 'Több megkeresés' },
  { label: 'Prémium megjelenés' },
]

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-lux-black flex flex-col">
      {/* ─── Animated background — keep HeroAnimation here ─────────────────── */}
      <HeroAnimation />
      {/* ──────────────────────────────────────────────────────────────────── */}

      {/* Dark overlays for text readability */}
      {/* Layer 1: main top-to-bottom gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
      {/* Layer 2: left vignette for copy readability — tames bright streaks crossing the headline */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      {/* Layer 3: dedicated bottom bleed — makes value bar always readable */}
      <div className="absolute bottom-0 left-0 right-0 h-52 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Main content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-10 max-w-7xl mx-auto w-full left-0 right-0 mt-8">
        {/* Trust label */}
        <div className="animate-fade-in-down mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-lux-gold animate-pulse flex-shrink-0" />
            Weboldalak, amik ügyfelet hoznak
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-1 mb-8">
          <h1 className="font-display font-semibold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-lux-cream animate-fade-in-up animation-delay-200">
            Több ügyfél.
          </h1>
          <h1 className="font-display font-semibold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-gold animate-fade-in-up animation-delay-400">
            Több bevétel.
          </h1>
          <h1 className="font-display font-semibold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-lux-cream/90 animate-fade-in-up animation-delay-600">
            Erősebb online jelenlét.
          </h1>
        </div>

        {/* Subheadline — wrapped with a localized dark readability scrim so the
            bright shader streaks never wash out the copy. The scrim sits inside
            the z-20 content context (above the animation, below the text). */}
        <div className="relative max-w-xl mb-10">
          {/* Text-safe zone: soft dark radial layer behind the paragraph only.
              Stronger on mobile where streaks cross the copy, eased back on
              desktop where the left vignette already helps. Blurred edges blend
              naturally into the dark/gold theme. No layout impact. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-5 -z-10 rounded-[2rem] blur-2xl
                       bg-[radial-gradient(ellipse_at_center,rgba(8,7,6,0.94)_0%,rgba(8,7,6,0.72)_45%,rgba(8,7,6,0)_80%)]
                       md:-inset-x-4 md:-inset-y-4
                       md:bg-[radial-gradient(ellipse_at_center,rgba(8,7,6,0.7)_0%,rgba(8,7,6,0.42)_48%,rgba(8,7,6,0)_82%)]"
          />
          <p className="font-body text-base md:text-lg text-lux-cream-dim/90 leading-relaxed animate-fade-in-up animation-delay-800">
            Modern, gyors és értékesítésre épített weboldalakat készítek vállalkozásoknak, hogy a látogatóból
            könnyebben legyen megkeresés, foglalás vagy vásárló.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1000">
          <Button size="lg" asChild>
            <a href="#munkak">Munkáim megtekintése</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#kapcsolat">Kérek egy ajánlatot</a>
          </Button>
        </div>

        {/* Micro-trust line — mirrors the line under the final CTA */}
        <p className="mt-6 font-body text-xs md:text-sm text-zinc-200/80 tracking-wide animate-fade-in animation-delay-1000">
          Átlagban 24 órán belül válaszolok&nbsp; •&nbsp; Konverzióra tervezve&nbsp; •&nbsp; Mobilra optimalizálva
        </p>
      </div>

      {/* Bottom bar — 3 value points */}
      <div className="absolute bottom-0 left-0 right-0 z-20
                      bg-black/50 backdrop-blur-md
                      border-t border-amber-400/20
                      shadow-[0_-8px_40px_rgba(0,0,0,0.75)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {valuePoints.map(({ label }) => (
              <div key={label} className="py-5 px-4 md:px-8 text-center">
                <span className="font-body text-xs md:text-sm text-zinc-100 font-medium tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#munkak"
        aria-label="Görgetés"
        className="absolute bottom-[72px] right-8 md:right-12 z-20 text-white/40 hover:text-lux-gold transition-colors duration-200 animate-bounce"
      >
        <ChevronDown size={20} />
      </a>
    </section>
  )
}
