import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

const services = [
  {
    n: '01',
    title: 'Első benyomás, ami komolyabbnak mutat',
    desc: 'A látogató pár másodperc alatt eldönti, hogy megbízik-e benned. Az oldal célja, hogy a vállalkozásod profi, rendezett és választásra érdemes legyen.',
  },
  {
    n: '02',
    title: 'Érthető üzenet, nem túlbonyolított szöveg',
    desc: 'Nem hosszú marketingdumára van szükség, hanem tiszta válaszokra: mit kínálsz, kinek segítesz, miért téged válasszanak, és hogyan tudnak kapcsolatba lépni.',
  },
  {
    n: '03',
    title: 'Több megkeresésre épített felépítés',
    desc: 'Az oldal nem csak információt ad. Úgy vezetjük végig a látogatót, hogy könnyebb legyen ajánlatot kérnie, időpontot foglalnia vagy felvennie veled a kapcsolatot.',
  },
  {
    n: '04',
    title: 'Mobilon is kényelmes használat',
    desc: 'Sokan telefonról nézik meg először a vállalkozásod. Ezért az oldalnak mobilon is gyorsnak, átláthatónak és könnyen használhatónak kell lennie.',
  },
  {
    n: '05',
    title: 'Prémium megjelenés, ami illik az iparágadhoz',
    desc: 'Egy fogászatnak, hotelnek, étteremnek vagy szépségszalonnak más hangulat kell. Nem sablont kapsz, hanem az üzletedhez illő irányt.',
  },
]

const goalBullets = ['több bizalom', 'több érdeklődő', 'jobb első benyomás', 'tisztább ajánlat']

export default function Ajanlat() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-end">
          <div className="w-[500px] h-[500px] rounded-full bg-sp-gold/[0.04] blur-[120px] translate-x-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: copy + buttons */}
            <motion.div variants={reveal} initial="hidden" animate="show">
              <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
                Az ajánlat
              </span>
              <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-[0.95] mb-8 max-w-xl">
                A weboldalad legyen több, mint egy online névjegykártya.
              </h1>
              <p className="font-body text-lg md:text-xl text-sp-text-muted max-w-md leading-relaxed mb-8">
                Egy jó weboldal nem csak bemutatja a vállalkozásod. Segít bizalmat építeni,
                elmagyarázza miért téged válasszanak, és megkönnyíti, hogy az érdeklődő
                írjon, hívjon vagy foglaljon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  to="/kapcsolat"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                             bg-sp-gold text-[#0a0908] rounded-full px-7 py-3.5
                             hover:bg-sp-gold-hi transition-colors duration-200"
                >
                  Áttekintést kérek
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                             text-sp-text-muted border border-white/15 rounded-full px-7 py-3.5
                             hover:text-sp-text hover:border-white/30 transition-all duration-200"
                >
                  Megnézem, mit tartalmaz
                  <ArrowRight size={14} />
                </a>
              </div>
              <p className="font-body text-xs text-sp-text-muted/40 leading-relaxed">
                Nincs kötelezettség · Konkrét javaslatot kapsz
              </p>
            </motion.div>

            {/* Right: goal card */}
            <motion.div custom={1} variants={reveal} initial="hidden" animate="show">
              <div className="rounded-2xl border border-white/10 bg-sp-surface p-8 md:p-10 lg:mt-16">
                <p className="font-display text-xl font-semibold text-sp-text mb-2">A cél egyszerű:</p>
                <p className="font-body text-base text-sp-text-muted leading-relaxed mb-8">
                  Aki megnézi az oldalad, gyorsabban értse, miért érdemes téged választania.
                </p>
                <ul className="space-y-3">
                  {goalBullets.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-sp-gold flex-shrink-0" />
                      <span className="font-body text-sm text-sp-text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pb-24 md:pb-36 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pt-16 md:pt-20 pb-12 md:pb-16 max-w-2xl"
          >
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text leading-tight mb-5">
              Mitől lesz jobb az új weboldalad?
            </h2>
            <p className="font-body text-lg text-sp-text-muted leading-relaxed">
              Nem attól működik egy weboldal, hogy modernnek néz ki. Attól, hogy a látogató
              gyorsan megérti, mivel foglalkozol, miért vagy megbízható, és mi a következő lépés.
            </p>
          </motion.div>

          <div className="divide-y divide-white/6">
            {services.map(({ n, title, desc }, i) => (
              <motion.div
                key={n}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_1.2fr] gap-6 md:gap-12 py-10 md:py-14 items-start"
              >
                <span className="font-display text-5xl font-semibold text-sp-gold/20 leading-none">
                  {n}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-sp-text leading-tight">
                  {title}
                </h3>
                <p className="font-body text-base md:text-lg text-sp-text-muted leading-relaxed">
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
              Nézzük meg együtt, mire van szükséged.
            </h2>
            <p className="font-body text-lg text-sp-text-muted mb-10 max-w-md mx-auto leading-relaxed">
              Írd le röviden a vállalkozásod és a helyzeted — visszajelzek a reális iránnyal
              és a következő lépéssel.
            </p>
            <Link
              to="/kapcsolat"
              className="inline-flex items-center gap-2 font-body text-sm font-medium bg-sp-gold text-[#0a0908] rounded-full px-7 py-3.5 hover:bg-sp-gold-hi transition-colors duration-200"
            >
              Áttekintést kérek
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
