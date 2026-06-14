import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' } }),
}

const statements = [
  'Nincs felesleges kör.',
  'Nincs sablonos folyamat.',
  'Csak egy tiszta weboldal, ami érthető, gyors és meggyőző.',
]

export default function Folyamat() {
  return (
    <section className="pt-40 pb-40 md:pt-52 md:pb-56">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <span className="block mb-8 text-[10px] tracking-[0.38em] uppercase font-body font-medium text-sp-gold/70">
            Folyamat
          </span>

          <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-[0.95] mb-10">
            Nem kell mindent előre kitalálnod.
          </h1>

          <div className="space-y-5 mb-14">
            <motion.p custom={1} variants={reveal} initial="hidden" animate="show"
              className="font-body text-lg md:text-xl text-sp-text-muted leading-relaxed">
              Elég egy kiindulópont: mivel foglalkozol, kiket szeretnél elérni,
              és mit kell elérnie az oldalnak.
            </motion.p>
            <motion.p custom={2} variants={reveal} initial="hidden" animate="show"
              className="font-body text-lg md:text-xl text-sp-text-muted leading-relaxed">
              A többit rendszerezzük: irány, struktúra, szöveg,
              vizuális megjelenés és élesítés.
            </motion.p>
          </div>

          <div className="space-y-2 border-l border-white/10 pl-5 mb-12">
            {statements.map((s, i) => (
              <motion.p
                key={s}
                custom={i + 3}
                variants={reveal}
                initial="hidden"
                animate="show"
                className="font-body text-base text-sp-text-muted/50 leading-relaxed"
              >
                {s}
              </motion.p>
            ))}
          </div>

          <motion.p custom={6} variants={reveal} initial="hidden" animate="show"
            className="font-body text-xs tracking-[0.2em] uppercase text-sp-text-muted/30 mb-10">
            Indulás általában 7–14 nap alatt.
          </motion.p>

          <motion.div custom={7} variants={reveal} initial="hidden" animate="show">
            <Link
              to="/kapcsolat"
              className="inline-flex items-center justify-center font-body text-sm font-medium
                         bg-sp-text text-sp-bg rounded-full px-7 py-3.5
                         hover:bg-sp-text-dim transition-colors duration-200"
            >
              Áttekintést kérek
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
