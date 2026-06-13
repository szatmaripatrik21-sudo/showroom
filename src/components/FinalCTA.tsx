import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CalendarDays, ArrowUpRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section id="egyutt" className="border-t border-white/6 py-20 md:py-40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] rounded-full bg-lux-gold/4 blur-[140px]" />
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-lux-gold/25" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-8">
          Dolgozzunk együtt
        </span>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-lux-cream leading-tight mb-8">
          A weboldalad ma is hat{' '}
          <span className="text-gradient-gold">a bevételedre.</span>
          <br />
          Kérdés, hogyan.
        </h2>

        <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed mb-8 max-w-2xl mx-auto">
          Ha vállalkozást vezetsz — bármilyen iparágban —, segítek olyan online jelenlétet
          építeni, ami prémiumabbnak mutatja a vállalkozásod, és könnyebbé teszi a megkeresést.
        </p>

        {/* Payoff line before CTA */}
        <p className="font-display text-xl md:text-2xl text-lux-gold/80 italic mb-10 max-w-xl mx-auto leading-snug">
          „A prémium megjelenés magasabb bizalmat és komolyabb érdeklődőket hozhat."
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2.5" asChild>
            <a href="#kapcsolat">
              <CalendarDays size={18} />
              Kérek weboldal-auditot
            </a>
          </Button>
          <Button variant="outline" size="lg" className="gap-2.5" asChild>
            <a href="#munkak">
              Megnézem a munkákat
              <ArrowUpRight size={18} />
            </a>
          </Button>
        </div>

        <p className="mt-12 text-[11px] md:text-xs font-body text-lux-cream-dim/55 tracking-wide">
          Nincs kötelezettség&nbsp; •&nbsp; Rövid válasz 24 órán belül&nbsp; •&nbsp; Egyértelmű következő lépés
        </p>
      </motion.div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-lux-gold/25" />
    </section>
  )
}
