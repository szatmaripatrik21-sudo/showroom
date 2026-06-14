import HeroAnimation from './HeroAnimation'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const sectorLabels = ['Vendéglátás', 'Hotel', 'Egészségügy', 'Szépségipar']

const valueBand = [
  { cause: 'Érthetőbb ajánlat', effect: 'több bizalom' },
  { cause: 'Egyértelmű útvonal', effect: 'több megkeresés' },
  { cause: 'Iparági vizuál', effect: 'prémium benyomás' },
]

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-[100svh] overflow-hidden bg-sp-bg">
      {/* Animated background — zero layout height */}
      <HeroAnimation />

      {/* Dark overlays — zero layout height */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Main content — normal flow, clears fixed 64px navbar */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-6 md:px-10 pt-28 md:pt-32 pb-32">

        {/* Industry scope — who this is for */}
        <div className="flex flex-wrap gap-2 mb-7 animate-fade-in-down">
          {sectorLabels.map((label) => (
            <span
              key={label}
              className="text-[9px] tracking-[0.22em] uppercase font-body font-medium
                         text-sp-text-muted border border-white/12 rounded-full px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Eyebrow */}
        <div className="mb-7 animate-fade-in-down">
          <span className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-body font-medium text-sp-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-sp-gold animate-pulse flex-shrink-0" />
            Weboldalak, amik ügyfelet hoznak
          </span>
        </div>

        {/* Headline — who/what/outcome in one read */}
        <div className="mb-7">
          <h1 className="font-display font-semibold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-sp-text animate-fade-in-up animation-delay-200">
            Prémium weboldal,
          </h1>
          <h1 className="font-display font-semibold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-gold animate-fade-in-up animation-delay-400">
            ami ügyfelet hoz.
          </h1>
          <h1 className="font-display font-semibold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-sp-text/90 animate-fade-in-up animation-delay-600">
            Nem sablonból.
          </h1>
        </div>

        {/* Subhead — differentiates from generic template sites */}
        <div className="relative max-w-xl mb-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-5 -z-10 rounded-[2rem] blur-2xl
                       bg-[radial-gradient(ellipse_at_center,rgba(8,7,6,0.94)_0%,rgba(8,7,6,0.72)_45%,rgba(8,7,6,0)_80%)]
                       md:-inset-x-4 md:-inset-y-4
                       md:bg-[radial-gradient(ellipse_at_center,rgba(8,7,6,0.7)_0%,rgba(8,7,6,0.42)_48%,rgba(8,7,6,0)_82%)]"
          />
          <p className="font-body text-base md:text-lg text-sp-text-dim leading-relaxed animate-fade-in-up animation-delay-800">
            Egyedi, konverzióra tervezett weboldalakat készítek vállalkozásoknak.
            Nem bemutatkozó oldalt — hanem olyan felületet, ahol a látogató gyorsan érti,
            miért téged válasszon, és egyszerűen tud lépni.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1000">
          <Button size="lg" asChild>
            <a href="#kapcsolat">Kérek egy rövid weboldal-áttekintést</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#munkak">Munkáim megtekintése</a>
          </Button>
        </div>

        {/* Credibility microline */}
        <p className="mt-5 font-body text-xs text-sp-text-muted tracking-wide animate-fade-in animation-delay-1000">
          Egyedi struktúra&nbsp; ·&nbsp; Magyar piacra írt szöveg&nbsp; ·&nbsp; Mobilra optimalizált döntési útvonal
        </p>
      </div>

      {/* Value band — cause → effect, not adjectives */}
      <div className="absolute bottom-0 left-0 right-0 z-20
                      bg-black/50 backdrop-blur-md
                      border-t border-amber-400/20
                      shadow-[0_-8px_40px_rgba(0,0,0,0.75)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {valueBand.map(({ cause, effect }) => (
              <div key={cause} className="py-4 px-3 md:px-8 text-center">
                <span className="block font-body text-[10px] md:text-xs text-sp-text font-medium tracking-wide leading-snug">
                  {cause}
                </span>
                <span className="block font-body text-[9px] md:text-[11px] text-sp-gold tracking-wide mt-0.5">
                  → {effect}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#problem"
        aria-label="Görgetés"
        className="absolute bottom-[76px] right-8 md:right-12 z-20 text-white/35 hover:text-sp-gold transition-colors duration-200 animate-bounce"
      >
        <ChevronDown size={20} />
      </a>
    </section>
  )
}
