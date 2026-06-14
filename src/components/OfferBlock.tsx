import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Check, CalendarDays, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { offer } from '@/data/content'

export default function OfferBlock() {
  const { card } = offer
  const hasPrice = card.priceValue.trim().length > 0
  // Mobile-only: the deliverables list collapses behind a real accordion so the
  // price card sits near the top of the section. Desktop renders the full list.
  const [includesOpen, setIncludesOpen] = useState(false)

  return (
    <section id="ajanlat" className="border-t border-white/6 py-12 md:py-20 lg:py-36 bg-lux-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-8 md:mb-14"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Az ajánlat
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-4">
            Mit kapsz — és hogyan.
          </h2>
          <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed">
            Nem csak egy dizájnt kapsz, hanem egy konkrét üzleti célt szolgáló weboldalt, ami a vállalkozásod
            első benyomását és megkereséseit támogatja.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: what's included */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Desktop (≥lg): static label + full list — unchanged from baseline */}
            <div className="hidden lg:block">
              <p className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-cream-dim/70 block mb-6">
                A csomag tartalma
              </p>
              <ul className="space-y-4">
                {offer.includes.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3 items-start"
                  >
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-lux-gold" aria-hidden="true" />
                    <span className="font-body text-sm text-lux-cream/85 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Mobile (<lg): collapsed accordion — closed by default so the price
                card stays near the top of the section. Real button + region. */}
            <div className="lg:hidden">
              <button
                type="button"
                aria-expanded={includesOpen}
                aria-controls="csomag-panel"
                onClick={() => setIncludesOpen((v) => !v)}
                className="flex items-center justify-between gap-4 w-full text-left rounded-xl border border-white/10 bg-lux-black/40 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/50"
              >
                <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-cream-dim/80">
                  A csomag tartalma
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full border border-lux-gold/30 flex items-center justify-center text-lux-gold transition-transform duration-300 motion-reduce:transition-none ${
                    includesOpen ? 'rotate-45 bg-lux-gold/10' : ''
                  }`}
                  aria-hidden="true"
                >
                  <Plus size={15} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {includesOpen && (
                  <motion.div
                    id="csomag-panel"
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-4 px-5 pt-5">
                      {offer.includes.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-lux-gold" aria-hidden="true" />
                          <span className="font-body text-sm text-lux-cream/85 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: pricing card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative card-luxury rounded-2xl p-8 md:p-10 lg:sticky lg:top-28"
          >
            <h3 className="font-display text-2xl font-semibold text-lux-cream mb-6">
              {card.title}
            </h3>

            {/* Price — intentionally without a number until real pricing is set */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase font-body font-medium text-lux-cream-dim/70 mb-2">
                {card.priceLabel}
              </p>
              {hasPrice ? (
                <p className="font-display text-4xl md:text-5xl font-semibold text-gradient-gold leading-none">
                  {card.priceValue}
                </p>
              ) : (
                <div>
                  <p className="font-display text-3xl md:text-4xl font-semibold text-gradient-gold leading-tight">
                    Egyedi árazás
                  </p>
                  <p className="font-body text-xs text-lux-cream-dim/70 mt-2 leading-snug">
                    A projekt méretéhez, funkcióihoz és tartalmához igazítva — ajánlatkérés alapján.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white/8 pt-6 mb-6">
              {/* Timeline */}
              <div className="flex items-start gap-2.5 mb-4">
                <CalendarDays size={16} className="flex-shrink-0 mt-0.5 text-lux-gold" aria-hidden="true" />
                <span className="font-body text-sm text-lux-cream/85 leading-snug">{card.timeline}</span>
              </div>
              {/* Note */}
              <div className="flex items-start gap-2.5">
                <Check size={16} className="flex-shrink-0 mt-0.5 text-lux-gold" aria-hidden="true" />
                <span className="font-body text-sm text-lux-cream/85 leading-snug">{card.note}</span>
              </div>
            </div>

            {/* Reassurance / guarantee */}
            <div className="border-t border-white/8 pt-6 mb-8">
              <p className="text-[10px] tracking-[0.2em] uppercase font-body font-medium text-lux-cream-dim/70 mb-3">
                Nyugalom
              </p>
              <p className="font-display text-lg italic text-lux-cream/80 leading-snug">
                {card.guarantee}
              </p>
            </div>

            <Button size="lg" className="w-full gap-2.5" asChild>
              <a href={card.ctaHref}>
                <CalendarDays size={17} />
                {card.ctaLabel}
              </a>
            </Button>
            <p className="mt-4 font-body text-xs text-lux-cream-dim/65 leading-snug text-center">
              {card.smallText}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
