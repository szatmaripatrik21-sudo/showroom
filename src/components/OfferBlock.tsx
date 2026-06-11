import { motion } from 'framer-motion'
import { CheckCircle2, Check, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Edit these once you have real pricing and terms ─────────────────────────
const deliverables = [
  '[Mobilra optimalizált weboldal — nem sablon, az üzletedre szabva]',
  '[Foglalási / ajánlatkérési CTA integráció (OpenTable, Resy, vagy saját form)]',
  '[SEO-alapstruktúra: meta-adatok, Google-kompatibilis szerkezet, helyi SEO]',
  '[Átadás után: kezelési útmutató + adminfelület-hozzáférés]',
]

const offer = {
  // Replace [X.000] with the actual starting price, e.g. "150.000"
  priceDisplay: '[X.000] Ft-tól',
  // Replace [X] with the actual delivery window, e.g. "14"
  deliveryDays: '[X] nap',
  deliveryNote: 'az első megbeszéléstől az éles indulásig',
  // Optional — fill in later, or set to '' and remove the Garancia block if none.
  guarantee:
    '[garancia, ha lesz — pl. "Az első dizájnkoncepció 5 napon belül elkészül, kötelezettség nélkül."]',
}
// ─────────────────────────────────────────────────────────────────────────────

export default function OfferBlock() {
  return (
    <section className="border-t border-white/6 py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Az ajánlat
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-4">
            Mit kapsz — és hogyan.
          </h2>
          <p className="font-body text-sm md:text-base text-lux-muted leading-relaxed">
            Nem óradíjas becslést kapsz, hanem egy konkrét eredményt: kész, éles weboldalt,
            ami a vállalkozásod üzleti céljaihoz van tervezve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: deliverables list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-muted block mb-6">
              Beleértve
            </p>
            <ul className="space-y-4">
              {deliverables.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-3 items-start"
                >
                  <CheckCircle2
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-lux-gold"
                    aria-hidden="true"
                  />
                  <span className="font-body text-sm text-lux-cream/80 leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: pricing card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative card-luxury rounded-2xl p-8 md:p-10"
          >
            {/* Kitöltendő badge */}
            <span
              aria-label="Kitöltendő adat"
              className="absolute top-5 right-5 text-[9px] font-body font-medium tracking-[0.2em]
                         uppercase text-lux-orange/70 border border-lux-orange/25 rounded-full
                         px-2.5 py-0.5 select-none"
            >
              Kitöltendő
            </span>

            {/* Price */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase font-body font-medium text-lux-muted mb-2">
                Ártól
              </p>
              <p className="font-display text-4xl md:text-5xl font-semibold text-gradient-gold leading-none">
                {offer.priceDisplay}
              </p>
            </div>

            <div className="border-t border-white/8 pt-6 mb-6">
              {/* Delivery */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-3xl font-semibold text-lux-cream leading-none">
                  {offer.deliveryDays}
                </span>
                <span className="font-body text-xs text-lux-muted">átadási idő</span>
              </div>
              <p className="font-body text-xs text-lux-muted/60 leading-snug">
                {offer.deliveryNote}
              </p>

              {/* Risk reversal — factual, always shown */}
              <div className="mt-4 flex items-center gap-2">
                <Check size={14} className="flex-shrink-0 text-lux-gold" aria-hidden="true" />
                <span className="font-body text-sm text-lux-cream/80">
                  Fix ár, fix határidő — meglepetések nélkül.
                </span>
              </div>
            </div>

            <div className="border-t border-white/8 pt-6 mb-8">
              {/* Optional guarantee — fill in later, or remove the block if none */}
              <p className="text-[10px] tracking-[0.2em] uppercase font-body font-medium text-lux-muted mb-3">
                Garancia
              </p>
              <p className="font-display text-lg italic text-lux-cream/75 leading-snug">
                {offer.guarantee}
              </p>
            </div>

            <Button size="lg" className="w-full gap-2.5" asChild>
              <a href="#kapcsolat">
                <CalendarDays size={17} />
                Kérek egy ajánlatot
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
