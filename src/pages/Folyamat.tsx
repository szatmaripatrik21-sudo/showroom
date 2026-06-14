import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

const steps = [
  {
    n: '01',
    title: 'Irány',
    desc: 'Megértjük a célt, a célcsoportot és a döntési útvonalat. Nem kell kész anyaggal érkezned.',
  },
  {
    n: '02',
    title: 'Tervezés',
    desc: 'Felépül a szöveg, struktúra és vizuális irány. Először papíron — utána pixelben.',
  },
  {
    n: '03',
    title: 'Kivitelezés',
    desc: 'Elkészül, finomodik, majd élesedik az oldal. Átadás után egy kör finomhangolás.',
  },
]

export default function Folyamat() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Folyamat
            </span>
            <h1 className="font-display font-semibold text-6xl md:text-7xl lg:text-8xl text-sp-text leading-[0.93] max-w-3xl mb-8">
              Egyszerű folyamat. Felesleges körök nélkül.
            </h1>
            <p className="font-body text-xl text-sp-text-muted max-w-lg leading-relaxed">
              Minden lépésnek egy célja van: gyorsan eljutni egy tiszta,
              működő, prémium weboldalig.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-24 md:pb-36 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="divide-y divide-white/6">
            {steps.map(({ n, title, desc }, i) => (
              <motion.div
                key={n}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-12 py-14 md:py-20 items-start"
              >
                <span className="font-display text-6xl font-semibold text-sp-gold/20 leading-none">
                  {n}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-sp-text leading-tight">
                  {title}
                </h2>
                <p className="font-body text-lg text-sp-text-muted leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-16 md:py-24 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="font-display text-2xl md:text-3xl text-sp-text leading-snug mb-4">
              Nem kell kész anyaggal érkezned.
            </p>
            <p className="font-body text-lg text-sp-text-muted leading-relaxed">
              Ha van szöveg és képanyag, abból dolgozunk. Ha nincs, segítek kialakítani az irányt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 border-t border-white/6 text-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text mb-10">
              Indítsuk el.
            </h2>
            <Link
              to="/kapcsolat"
              className="inline-flex items-center gap-2 font-body text-sm font-medium bg-sp-gold text-[#0a0908] rounded-full px-7 py-3.5 hover:bg-sp-gold-hi transition-colors duration-200"
            >
              Kérek egy áttekintést
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
