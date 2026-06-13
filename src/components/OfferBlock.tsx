import { motion } from 'framer-motion'
import { CheckCircle2, Check, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { offer } from '@/data/content'

export default function OfferBlock() {
  const { card } = offer
  const hasPrice = card.priceValue.trim().length > 0

  return (
    <section className="border-t border-white/6 py-20 md:py-36 bg-lux-dark">
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
