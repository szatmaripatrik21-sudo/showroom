import { motion } from 'framer-motion'

// Slim social-proof strip directly below the hero.
// OFF by default so the live site never shows an empty quote / placeholder logos.
// Flip ENABLED to true once you have a real quote or real logos.
const ENABLED = false

// Fill these once real content exists.
const quote = '[rövid vélemény]'
const attribution = '[Név, vállalkozás]'

export default function HeroSocialProof() {
  if (!ENABLED) return null

  return (
    <section className="border-t border-white/6 py-8 md:py-10 bg-lux-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          <p className="font-display text-lg md:text-xl italic text-lux-cream/80 leading-snug">
            „{quote}"
          </p>
          <span className="font-body text-xs text-lux-muted tracking-wide whitespace-nowrap">
            — {attribution}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
