import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

const steps = [
  {
    n: '01',
    title: 'Rövid áttekintés',
    desc: 'Először megnézzük, milyen vállalkozásról van szó, van-e már weboldalad, és mi lenne a fő cél: több érdeklődő, több foglalás, jobb első benyomás vagy teljes újratervezés.',
  },
  {
    n: '02',
    title: 'Irány és tartalom',
    desc: 'Nem kell kész marketinganyagot hoznod. A meglévő szövegekből, képekből, szolgáltatásokból és példákból kialakítjuk, mit kell mondania az oldalnak.',
  },
  {
    n: '03',
    title: 'Első verzió',
    desc: 'Elkészül az oldal első komoly verziója: felépítés, szövegek, vizuális irány, mobilnézet és a fő CTA-k. Itt már látod, milyen lesz az oldal valódi hangulata.',
  },
  {
    n: '04',
    title: 'Finomhangolás',
    desc: 'Átnézzük, mi működik, mi nem pontos, mit kell egyszerűsíteni vagy erősíteni. A cél, hogy az oldal ne csak szép legyen, hanem érthető és meggyőző.',
  },
  {
    n: '05',
    title: 'Élesítés',
    desc: 'Ellenőrzöm a mobilnézetet, a gombokat, az űrlapokat, az alap technikai beállításokat és a betöltési élményt. Ezután az oldal készen áll az indulásra.',
  },
]

const reassuranceCards = [
  {
    title: 'Ha van meglévő weboldalad',
    text: 'Átnézem, mi tartható meg, mi zavaró, hol veszhetnek el az érdeklődők, és mit érdemes újragondolni.',
  },
  {
    title: 'Ha csak ötleted van',
    text: 'Elég, ha elmondod, mivel foglalkozol és milyen ügyfeleket szeretnél. Ebből felépíthető az oldal iránya.',
  },
  {
    title: 'Ha nincs kész szöveged',
    text: 'Segítek megfogalmazni az oldal fő üzeneteit úgy, hogy ne legyen erőltetett marketingduma, mégis meggyőző legyen.',
  },
]

const heroBullets = [
  'meglévő anyagból is tudunk indulni',
  'ha nincs szöveg, segítek megírni',
  'ha nincs pontos elképzelésed, kialakítjuk',
  'végig egyértelmű a következő lépés',
]

export default function Folyamat() {
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
                Folyamat
              </span>
              <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-[0.95] mb-8 max-w-xl">
                Így lesz az ötletből kész, használható weboldal.
              </h1>
              <p className="font-body text-lg md:text-xl text-sp-text-muted max-w-md leading-relaxed mb-8">
                Nem kell pontosan tudnod, milyen oldalt szeretnél. Elég, ha elmondod,
                mivel foglalkozol, kiket szeretnél elérni, és mi a cél: több megkeresés,
                foglalás vagy komolyabb online megjelenés.
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
                  href="#steps"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                             text-sp-text-muted border border-white/15 rounded-full px-7 py-3.5
                             hover:text-sp-text hover:border-white/30 transition-all duration-200"
                >
                  Megnézem a lépéseket
                  <ArrowRight size={14} />
                </a>
              </div>
              <p className="font-body text-xs text-sp-text-muted/40 leading-relaxed">
                Átlátható folyamat · Nincs felesleges kör · Végig tudod, hol tartunk
              </p>
            </motion.div>

            {/* Right: reassurance card */}
            <motion.div custom={1} variants={reveal} initial="hidden" animate="show">
              <div className="rounded-2xl border border-white/10 bg-sp-surface p-8 md:p-10 lg:mt-16">
                <p className="font-display text-xl font-semibold text-sp-text mb-2">
                  Neked nem kell webdesignernek lenned.
                </p>
                <p className="font-body text-base text-sp-text-muted leading-relaxed mb-8">
                  Segítek kitalálni, milyen szöveg, struktúra és oldalirány működne a vállalkozásodnak.
                </p>
                <ul className="space-y-3">
                  {heroBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-sp-gold flex-shrink-0" />
                      <span className="font-body text-sm text-sp-text-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="pb-0 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pt-16 md:pt-20 pb-12 md:pb-16 max-w-2xl"
          >
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text leading-tight mb-5">
              Lépésről lépésre, érthetően.
            </h2>
            <p className="font-body text-lg text-sp-text-muted leading-relaxed">
              A cél nem az, hogy neked kelljen mindent kitalálni. A cél az, hogy gyorsan kiderüljön,
              mire van szüksége a vállalkozásodnak, és abból elkészüljön egy profi, működő weboldal.
            </p>
          </motion.div>

          <div className="divide-y divide-white/6">
            {steps.map(({ n, title, desc }, i) => (
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

      {/* Reassurance cards */}
      <section className="py-16 md:py-24 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10 md:mb-12"
          >
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-sp-text leading-tight mb-4">
              Nem kell kész anyaggal érkezned.
            </h2>
            <p className="font-body text-lg text-sp-text-muted max-w-xl leading-relaxed">
              Sok vállalkozó azért halogatja az új weboldalt, mert nincs kész szövege, nincs tökéletes
              képe, vagy nem tudja pontosan, mit kellene mondania az oldalon. Ez normális.
              A folyamat része, hogy ezekből rendszert csinálunk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden">
            {reassuranceCards.map(({ title, text }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="p-8 md:p-10 bg-sp-surface"
              >
                <p className="font-display text-lg font-semibold text-sp-text mb-3">{title}</p>
                <p className="font-body text-base text-sp-text-muted leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="block mb-4 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Időigény
            </span>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-sp-text leading-tight mb-5">
              Mennyi idővel számolj?
            </h2>
            <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-4">
              Egy egyszerűbb szolgáltatói vagy bemutatkozó weboldal általában 7–14 napos
              indulási ütemezéssel tervezhető, ha a szükséges döntések és alapanyagok
              időben rendelkezésre állnak.
            </p>
            <p className="font-body text-sm text-sp-text-muted/50 leading-relaxed border-l border-sp-gold/30 pl-4">
              A pontos határidő mindig az oldal méretétől, funkcióitól, tartalomigényétől
              és a visszajelzések gyorsaságától függ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 border-t border-white/6 bg-sp-surface overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[400px] rounded-full bg-sp-gold/[0.04] blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="block mb-6 text-[10px] tracking-[0.35em] uppercase font-body font-medium text-sp-gold">
              Következő lépés
            </span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-[3.25rem] text-sp-text leading-[1.0] mb-6">
              Nézzük meg, nálad mi lenne a legegyszerűbb indulás.
            </h2>
            <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-8 max-w-lg">
              Írd le röviden, milyen vállalkozásról van szó, van-e már weboldalad,
              és mit szeretnél elérni vele. Nem kell kész terv — elég egy kiindulópont.
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
              <Link
                to="/munkak"
                className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                           text-sp-text-muted border border-white/15 rounded-full px-7 py-3.5
                           hover:text-sp-text hover:border-white/30 transition-all duration-200"
              >
                Megnézem a koncepciókat
                <ArrowRight size={14} />
              </Link>
            </div>
            <p className="font-body text-xs text-sp-text-muted/40 leading-relaxed">
              Nincs kötelezettség · Rövid válasz 24 órán belül · Egyértelmű következő lépést kapsz
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
