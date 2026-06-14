import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroAnimation from '@/components/HeroAnimation'
import BrowserMockup from '@/components/BrowserMockup'
import { projects } from '@/data/projects'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' } }),
}

const homePreviews = projects.filter(p => ['ambrus-dental-klinika', 'beauty-embassy'].includes(p.slug))

const pillars = [
  { label: 'Bizalom', desc: 'Az első benyomás szakmai és prémium.' },
  { label: 'Egyértelműség', desc: 'A látogató azonnal érti, miért téged válasszon.' },
  { label: 'Konverzió', desc: 'A következő lépés mindig egyszerű és látható.' },
]

const offerPoints = [
  'Stratégiai struktúra',
  'Magyar piacra írt szöveg',
  'Egyedi prémium vizuális irány',
  'Mobilra optimalizált kivitelezés',
  'Átadás utáni finomhangolás',
]

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-sp-bg">
        <HeroAnimation />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/85" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

        <div className="relative z-20 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-36">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="block mb-8 text-[10px] tracking-[0.35em] uppercase font-body font-medium text-sp-gold"
          >
            SP. — Prémium weboldalak
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="font-display font-semibold leading-[0.93] text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] text-sp-text max-w-4xl mb-8"
          >
            Prémium weboldalak, amik első látásra bizalmat építenek.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="font-body text-lg md:text-xl text-sp-text-muted max-w-xl mb-3 leading-relaxed"
          >
            Egyedi, konverzióra tervezett weboldalak vendéglátásnak, hoteleknek, egészségügynek és szépségiparnak.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm text-sp-text-muted/50 tracking-widest uppercase mb-10"
          >
            Nem sablon. Nem dekoráció. Üzleti eszköz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/kapcsolat"
              className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                         bg-sp-gold text-[#0a0908] rounded-full px-7 py-3.5
                         hover:bg-sp-gold-hi transition-colors duration-200"
            >
              Kérek egy áttekintést
            </Link>
            <Link
              to="/munkak"
              className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                         text-sp-text-muted border border-white/15 rounded-full px-7 py-3.5
                         hover:text-sp-text hover:border-white/30 transition-all duration-200"
            >
              Munkák megtekintése
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-tight mb-8 max-w-2xl">
              A látogató nem vár.
            </h2>
            <p className="font-body text-lg md:text-xl text-sp-text-muted max-w-xl leading-relaxed">
              Pár másodperc alatt eldönti, hogy marad-e. Ha nem érti az ajánlatod,
              nem érzi a minőséget, vagy nem találja a következő lépést — továbblép.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              A megközelítés
            </span>
            <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight mb-6 max-w-2xl">
              Design, ami nem csak jól néz ki. Dolgozik.
            </h2>
            <p className="font-body text-lg text-sp-text-muted max-w-lg leading-relaxed">
              Stratégia. Szöveg. Vizuális irány. Fejlesztés. Minden döntés egy célért
              történik: hogy a látogató gyorsabban bízzon, értsen, és lépjen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden">
            {pillars.map(({ label, desc }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="p-8 md:p-10 bg-sp-bg"
              >
                <p className="font-display text-2xl font-semibold text-sp-text mb-3">{label}</p>
                <p className="font-body text-base text-sp-text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK PREVIEW ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 md:mb-16"
          >
            <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight">
              Kiválasztott munkák.
            </h2>
            <Link
              to="/munkak"
              className="flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200 shrink-0"
            >
              Összes munka <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {homePreviews.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link to={`/munkak/${project.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl mb-5">
                    <div className="transform group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                      <BrowserMockup
                        gradient={project.gradient}
                        accentColor={project.accentColor}
                        videoSrc={project.videoSrc}
                        posterSrc={project.posterSrc}
                        videoId={project.slug}
                        mode="secondary"
                        projectName={project.name}
                        videoFit={project.videoFit}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-sp-text-muted mb-1">
                        {project.industryLabel} · Weboldal-koncepció
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-sp-text group-hover:text-sp-gold transition-colors duration-200">
                        {project.name}
                      </h3>
                      <p className="font-body text-sm text-sp-text-muted mt-1.5 leading-snug max-w-sm">
                        {project.tagline}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-sp-text-muted group-hover:text-sp-gold group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFER PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
                Az ajánlat
              </span>
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight mb-6">
                Egy teljes weboldal-rendszer.
              </h2>
              <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-8">
                Nem dizájn. Nem kód. Egy eszköz, amely a látogatót döntésre vezeti.
              </p>
              <Link
                to="/ajanlat"
                className="inline-flex items-center gap-2 font-body text-sm text-sp-gold hover:text-sp-gold-hi transition-colors duration-200"
              >
                Részletek <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.ul
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {offerPoints.map((point) => (
                <li key={point} className="flex items-center gap-4 py-4 border-b border-white/6">
                  <span className="w-1 h-1 rounded-full bg-sp-gold flex-shrink-0" />
                  <span className="font-body text-base text-sp-text">{point}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
                Árazás
              </span>
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-gradient-gold leading-tight mb-4">
                Induló ár: 119.900 Ft
              </h2>
              <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-6 max-w-md">
                A legtöbb projekt 119.900–350.000 Ft között készül el. Az első válaszban megadom
                a reális nagyságrendet — kötelezettség nélkül.
              </p>
              <Link
                to="/ar"
                className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200"
              >
                Részletes árazás <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-32 md:py-48 border-t border-white/6 bg-sp-surface text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-tight mb-6">
              Alakítsuk az első benyomást üzletté.
            </h2>
            <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-10 max-w-xl mx-auto">
              Írd le röviden, mire van szükséged. Visszajelzek a javasolt iránnyal,
              nagyságrenddel és következő lépéssel.
            </p>
            <Link
              to="/kapcsolat"
              className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                         bg-sp-gold text-[#0a0908] rounded-full px-8 py-4
                         hover:bg-sp-gold-hi transition-colors duration-200"
            >
              Áttekintést kérek
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
