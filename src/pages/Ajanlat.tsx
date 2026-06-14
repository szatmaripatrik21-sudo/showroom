import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

const services = [
  {
    n: '01',
    title: 'Stratégia',
    desc: 'Pontosan tudjuk, kinek szól az oldal, mit kell megértenie, és mi vezeti tovább.',
  },
  {
    n: '02',
    title: 'Szöveg és struktúra',
    desc: 'A tartalom nem kitöltés. A szöveg feladata, hogy csökkentse a bizonytalanságot és döntést segítsen.',
  },
  {
    n: '03',
    title: 'Vizuális irány',
    desc: 'Egyedi, iparághoz illő prémium megjelenés — sablonhatás nélkül.',
  },
  {
    n: '04',
    title: 'Kivitelezés',
    desc: 'Reszponzív, gyors, mobilra optimalizált oldal, tiszta felépítéssel.',
  },
  {
    n: '05',
    title: 'Finomhangolás',
    desc: 'Átadás után egy stratégiai finomhangolási kör az első visszajelzések alapján.',
  },
]

export default function Ajanlat() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Az ajánlat
            </span>
            <h1 className="font-display font-semibold text-6xl md:text-7xl lg:text-8xl text-sp-text leading-[0.93] max-w-3xl mb-8">
              Nem csak weboldal. Döntési útvonal.
            </h1>
            <p className="font-body text-xl text-sp-text-muted max-w-lg leading-relaxed">
              A cél nem az, hogy az oldal szép legyen. A cél az, hogy a látogató
              gyorsan értse, bízzon, és lépjen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-32 md:pb-48 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="divide-y divide-white/6">
            {services.map(({ n, title, desc }, i) => (
              <motion.div
                key={n}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-12 py-10 md:py-14 items-start"
              >
                <span className="font-display text-5xl font-semibold text-sp-gold/20 leading-none">
                  {n}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-sp-text leading-tight">
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

      {/* CTA */}
      <section className="py-24 md:py-36 border-t border-white/6 bg-sp-surface text-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text mb-6">
              Kérek egy áttekintést
            </h2>
            <p className="font-body text-lg text-sp-text-muted mb-10 max-w-md mx-auto leading-relaxed">
              Írd le röviden a projektedet — az első válaszban megadom a reális irányt.
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
