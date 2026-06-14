import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

const drivers = [
  'Oldalak száma',
  'Funkciók és integrációk',
  'Tartalmi előkészítettség',
  'Vizuális komplexitás',
]

const trustNotes = [
  'Kötelezettségmentes első egyeztetés',
  'Nincs kötelezettség',
  'Konkrét nagyságrend az első válaszban',
]

export default function Ar() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Árazás
            </span>
            <h1 className="font-display font-semibold text-6xl md:text-7xl lg:text-8xl text-gradient-gold leading-[0.93] max-w-3xl mb-8">
              Akár 119.000 Ft-tól
            </h1>
            <p className="font-body text-xl text-sp-text-muted max-w-lg leading-relaxed">
              Az ár a projekt méretétől, funkcióitól és tartalmi előkészítettségétől függ.
              Az első válaszban mindig megadom a reális nagyságrendet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing block */}
      <section className="pb-16 md:pb-24 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pt-16 md:pt-24">

            {/* Starter */}
            <motion.div
              custom={0}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl border border-sp-gold/20 bg-sp-surface p-8 md:p-10"
            >
              <span className="block mb-4 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
                Induló weboldal
              </span>
              <p className="font-display text-5xl md:text-6xl font-semibold text-gradient-gold mb-6 leading-none">
                119.000 Ft
              </p>
              <p className="font-body text-base text-sp-text-muted mb-6 leading-relaxed">
                Egyoldalas bemutatkozó oldal meglévő tartalom és képanyag esetén,
                egyszerű struktúrával, gyors indulással.
              </p>
              <div className="border-t border-white/8 pt-6 mb-6">
                <p className="font-body text-sm font-medium text-sp-text mb-3">A legtöbb projekt:</p>
                <p className="font-display text-2xl text-sp-text">119.000–350.000 Ft</p>
              </div>
              <p className="font-body text-sm text-sp-text-muted/60 italic">
                A pontos összeget az első egyeztetésen adjuk meg.
              </p>
            </motion.div>

            {/* What affects price + trust */}
            <motion.div
              custom={1}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase font-medium text-sp-text-muted mb-6">
                  Mitől függ az ár?
                </p>
                <ul className="divide-y divide-white/6">
                  {drivers.map((d) => (
                    <li key={d} className="flex items-center gap-4 py-4">
                      <span className="w-1 h-1 rounded-full bg-sp-gold flex-shrink-0" />
                      <span className="font-body text-base text-sp-text">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/6 pt-10">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase font-medium text-sp-text-muted mb-6">
                  Amit az első válaszban kapsz
                </p>
                <ul className="space-y-3">
                  {trustNotes.map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-sp-gold flex-shrink-0" />
                      <span className="font-body text-base text-sp-text-muted">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 border-t border-white/6 bg-sp-surface text-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text mb-6">
              Árat kérek a projektemre
            </h2>
            <p className="font-body text-lg text-sp-text-muted mb-10 max-w-md mx-auto leading-relaxed">
              Röviden írd le a projektet — az első válaszban megadom a reális nagyságrendet.
            </p>
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
