import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BrowserMockup from '@/components/BrowserMockup'
import { projects } from '@/data/projects'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' } }),
}

const homePreviews = projects.filter(p => ['ambrus-dental-klinika', 'beauty-embassy'].includes(p.slug))

const problemPoints = ['érthető ajánlat', 'gyors döntés', 'látható kapcsolatfelvétel']

const whyCards = [
  {
    title: 'Első benyomás',
    text: 'Pár másodperc alatt eldől, hogy a vállalkozásod profinak, megbízhatónak és választásra érdemesnek tűnik-e.',
    label: 'Cél: bizalom az első képernyőtől',
  },
  {
    title: 'Tiszta ajánlat',
    text: 'A látogató gyorsan értse, mivel foglalkozol, kinek segítesz, és miért érdemes nálad érdeklődnie.',
    label: 'Cél: kevesebb bizonytalanság',
  },
  {
    title: 'Iparágra szabott felépítés',
    text: 'Egy fogászat, hotel, étterem vagy szépségszalon más logika alapján győz meg. Az oldal szerkezete ehhez igazodik.',
    label: 'Cél: relevánsabb oldalélmény',
  },
  {
    title: 'Egyértelmű következő lépés',
    text: 'Ajánlatkérés, időpontfoglalás, telefonhívás vagy üzenetküldés — a látogatónak mindig tudnia kell, mit tegyen.',
    label: 'Cél: több megkeresés',
  },
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
      <section className="relative min-h-[100svh] flex flex-col bg-sp-bg overflow-hidden">
        {/* Subtle bottom vignette for depth — no animation layer */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-sp-bg to-transparent" />

        <div className="relative z-20 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

            {/* ── LEFT: copy ───────────────────────────────────────── */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="block mb-8 text-[10px] tracking-[0.38em] uppercase font-body font-medium text-sp-gold/70"
              >
                SP. / webdesign
              </motion.span>

              {/*
                ALTERNATE HEADLINES (A/B — do not render):
                "Weboldal, ami vendéget hoz, nem csak szépen mutat."
                "A weboldala lehet, hogy épp vendégeket veszít Önnek."
              */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                className="font-display font-semibold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-sp-text max-w-xl mb-7"
              >
                Olyan weboldal, ami miatt Önt választják, nem a konkurenciát.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className="font-body text-base md:text-lg text-sp-text-muted max-w-md mb-10 leading-relaxed"
              >
                Éttermeknek, szállodáknak, rendelőknek és szalonoknak építek weboldalt, ami nem csak igényes — foglalást és telefonhívást is hoz.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/kapcsolat"
                  className="inline-flex items-center justify-center font-body text-sm font-medium
                             bg-sp-text text-sp-bg rounded-full px-7 py-3.5
                             hover:bg-sp-text-dim transition-colors duration-200"
                >
                  Kérek egy ingyenes átnézést
                </Link>
                <Link
                  to="/munkak"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                             text-sp-text-muted border border-white/15 rounded-full px-7 py-3.5
                             hover:text-sp-text hover:border-white/30 transition-all duration-200"
                >
                  Munkáim megtekintése
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* ── RIGHT: phone mockup ───────────────────────────────
                {{PLACEHOLDER: phone mockup screenshot — Aranypinty or
                Pesti6 hero view, portrait device frame ~390×844px.
                Supply as /public/hero-mockup.png or similar and replace
                the placeholder div below with:
                  <img src="/hero-mockup.png" alt="..." className="..." />
                Recommended: export from Figma/browser at 2× retina,
                device frame optional but preferred.}}
            ─────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="hidden lg:flex justify-center items-center"
            >
              <div
                className="w-[260px] rounded-[2.5rem] border border-white/10 bg-sp-surface flex flex-col items-center justify-center gap-3 text-center px-6"
                style={{ aspectRatio: '9/19' }}
              >
                <div className="w-8 h-1 rounded-full bg-white/10" />
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-sp-gold/50">
                  Placeholder
                </p>
                <p className="font-body text-xs text-sp-text-muted/50 leading-relaxed">
                  Phone mockup<br />Aranypinty / Pesti6<br />hero screenshot
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-tight mb-6 max-w-2xl">
              A látogató nem vár.
            </h2>
            <p className="font-body text-lg md:text-xl text-sp-text-muted max-w-xl leading-relaxed mb-8">
              Pár másodperc alatt eldönti, hogy marad-e. Ha nem érti az ajánlatod,
              nem érzi a bizalmat, vagy nem találja a következő lépést — továbbmegy.
            </p>
            <div className="flex flex-wrap gap-3">
              {problemPoints.map((pt) => (
                <span
                  key={pt}
                  className="font-body text-xs tracking-wide text-sp-text-muted/60 border border-white/8 rounded-full px-4 py-1.5"
                >
                  {pt}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONCEPTS PREVIEW ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 md:mb-16"
          >
            <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight">
              Kiválasztott koncepciók.
            </h2>
            <Link
              to="/munkak"
              className="flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200 shrink-0"
            >
              Összes koncepció <ArrowRight size={14} />
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

      {/* ── WHY IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Section header: two-column */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 md:mb-16"
          >
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Miért működik
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight">
                Egy jó weboldal nem dísz. Ügyfeleket terel a következő lépés felé.
              </h2>
              <div>
                <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-7">
                  A látogató nem elemzi a designodat. Érez valamit, ért valamit, majd dönt.
                  Ezért az oldalnak egyszerre kell profi benyomást keltenie, gyorsan
                  elmagyaráznia az ajánlatodat, és könnyűvé tennie a kapcsolatfelvételt.
                </p>
                <blockquote className="border-l-2 border-sp-gold/50 pl-5">
                  <p className="font-body text-base text-sp-text-muted/70 leading-relaxed italic">
                    Ha a látogató bizonytalan, továbbáll. Ha érti, miért téged válasszon, lépni fog.
                  </p>
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* 2×2 card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/6 rounded-2xl overflow-hidden mb-12 md:mb-14">
            {whyCards.map(({ title, text, label }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="p-8 md:p-10 bg-sp-bg flex flex-col gap-4"
              >
                <p className="font-display text-xl font-semibold text-sp-text">{title}</p>
                <p className="font-body text-base text-sp-text-muted leading-relaxed flex-1">{text}</p>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-sp-gold/60">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA row */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          >
            <p className="font-body text-base text-sp-text-muted leading-relaxed max-w-sm">
              Szeretnéd tudni, nálad melyik pont hiányzik most?
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <Link
                to="/kapcsolat"
                className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                           bg-sp-gold text-[#0a0908] rounded-full px-6 py-3
                           hover:bg-sp-gold-hi transition-colors duration-200"
              >
                Áttekintést kérek
              </Link>
              <Link
                to="/munkak"
                className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200"
              >
                Koncepciók megtekintése <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OFFER PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6 bg-sp-surface">
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
      <section className="py-24 md:py-32 border-t border-white/6">
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
