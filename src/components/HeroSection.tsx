import HeroAnimation from './HeroAnimation'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const sectorLabels = ['Vendéglátás', 'Hotel', 'Egészségügy', 'Szépségipar']

const valuePoints = [
  { label: 'Több bizalom' },
  { label: 'Több megkeresés' },
  { label: 'Prémium megjelenés' },
]

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-lux-black">
      {/* ─── Animated background — absolutely positioned, no layout height ───── */}
      <HeroAnimation />

      {/* Dark overlays — absolutely positioned, no layout height */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* ─── Main content — normal document flow ─────────────────────────────── */}
      {/*
        Previously this was `absolute inset-0 flex flex-col justify-center`
        which centered content at 50 % of 100vh (≈450px from top on a 900px
        screen), leaving ~386px of empty black space between the fixed navbar
        and the first line of copy.

        Fix: normal flow, pt-28/md:pt-32 clears the 64px fixed navbar plus
        ~48–64px of breathing room, so the headline is visible immediately.
        pb-28 keeps the bottom value-bar from overlapping the trust line.
      */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-6 md:px-10 pt-28 md:pt-32 pb-28">

        {/* Sector labels */}
        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-down">
          {sectorLabels.map((label) => (
            <span
              key={label}
              className="text-[9px] tracking-[0.2em] uppercase font-body font-medium
                         text-lux-cream-dim/55 border border-white/12 rounded-full px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Eyebrow */}
        <div className="mb-6 md:mb-8 animate-fade-in-down">
          <span className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-lux-gold animate-pulse flex-shrink-0" />
            Weboldalak, amik ügyfelet hoznak
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-1 mb-6 md:mb-8">
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

        {/* Sub-paragraph */}
        <div className="relative max-w-xl mb-8 md:mb-10">
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

        {/* Trust line */}
        <p className="mt-6 font-body text-xs md:text-sm text-zinc-200/80 tracking-wide animate-fade-in animation-delay-1000">
          Átlagban 24 órán belül válaszolok&nbsp; •&nbsp; Konverzióra tervezve&nbsp; •&nbsp; Mobilra optimalizálva
        </p>
      </div>

      {/* ─── Bottom value bar — absolute so it never affects content height ──── */}
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
