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


const whyCards = [
  {
    title: 'Több megkeresés és foglalás',
    text: 'Az oldal célja, hogy az érdeklődőből valódi ügyfél legyen. Ajánlatkérés, foglalás, telefonhívás — a következő lépés mindig egyértelmű és elérhető.',
    label: 'Cél: több megkeresés',
  },
  {
    title: 'Bizalom az első másodpercektől',
    text: 'A látogató pár másodperc alatt megítéli, megbízható-e a vállalkozás. A megjelenés és az egyértelmű üzenet ezt a döntést befolyásolja.',
    label: 'Cél: erősebb első benyomás',
  },
  {
    title: 'Iparágra szabott felépítés',
    text: 'Egy fogászat, hotel, étterem vagy szépségszalon más logika alapján győzi meg az érdeklődőt. Az oldal szerkezete ehhez igazodik.',
    label: 'Cél: relevánsabb oldal',
  },
  {
    title: 'Kevesebb elveszett érdeklődő',
    text: 'Sok vállalkozás veszít potenciális ügyfeleket, mert az oldal nem vezeti el őket a kapcsolatfelvételhez. Ezt az útvonalat tesszük egyértelművé.',
    label: 'Cél: kisebb elvándorlás',
  },
]

const offerPoints = [
  'Világos üzenet, amit azonnal megért a látogató',
  'Bizalomépítő felépítés szolgáltató vállalkozásoknak',
  'Mobilra optimalizált, gyors és letisztult megjelenés',
  'Erős CTA-k több ajánlatkéréshez és foglaláshoz',
  'Olyan struktúra, ami üzleti célt szolgál',
]

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-black text-[#F7F1E8]">
        <HeroAnimation />

        {/* Stronger composite overlay — radial gold hint + vertical vignette + left reading zone */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: [
              'radial-gradient(circle at 65% 50%, rgba(185,145,82,0.12) 0%, transparent 42%)',
              'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.52) 42%, rgba(0,0,0,0.88) 100%)',
              'linear-gradient(90deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 55%, transparent 100%)',
            ].join(','),
          }}
        />

        <div className="relative z-20 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-28 pb-16 md:pt-32 md:pb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="block mb-6 text-[10px] sm:text-xs tracking-[0.34em] uppercase font-body font-medium"
            style={{ color: '#B99152' }}
          >
            SP. / ügyfélszerző weboldalak
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="font-display font-semibold max-w-[760px] mb-6"
            style={{
              fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
              lineHeight: '0.98',
              letterSpacing: '-0.03em',
              color: '#F7F1E8',
              textShadow: '0 3px 18px rgba(0,0,0,0.75)',
            }}
          >
            A weboldalad ne csak szép legyen.<br />Hozzon is ügyfeleket.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="font-body mb-9"
            style={{
              maxWidth: 'min(560px, 92vw)',
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.1rem)',
              lineHeight: '1.55',
              color: '#DED2C2',
              textShadow: '0 2px 14px rgba(0,0,0,0.90)',
            }}
          >
            Prémium, gyors és mobilra optimalizált weboldalakat készítek
            vállalkozásoknak és szolgáltatóknak — több megkeresésért,
            foglalásért és bevételért.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <Link
              to="/kapcsolat"
              className="inline-flex items-center justify-center font-body font-semibold rounded-full transition-colors duration-200"
              style={{
                background: '#F2EBDD',
                color: '#11100E',
                padding: '1rem 2rem',
                fontSize: '0.9375rem',
                boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.background = '#F2EBDD')}
            >
              Kérem az ingyenes weboldal-átvilágítást
            </Link>
            <Link
              to="/folyamat"
              className="inline-flex items-center gap-1.5 font-body font-medium transition-colors duration-200"
              style={{ color: '#B8AA98', fontSize: '0.9375rem' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F7F1E8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#B8AA98')}
            >
              Megnézem, hogyan működik <ArrowRight size={14} />
            </Link>
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
              Iparágra szabott megoldások.
            </h2>
            <Link
              to="/munkak"
              className="flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200 shrink-0"
            >
              Összes megoldás <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {homePreviews.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl border border-white/8 bg-sp-bg overflow-hidden"
              >
                {/* Video: plays in place, does NOT navigate */}
                <div className="overflow-hidden">
                  <BrowserMockup
                    gradient={project.gradient}
                    accentColor={project.accentColor}
                    videoSrc={project.videoSrc}
                    posterSrc={project.posterSrc}
                    videoId={project.slug}
                    mode="secondary"
                    projectName={project.name}
                    videoFit={project.videoFit}
                    className="rounded-none border-0"
                  />
                </div>
                {/* Text: navigates to case study */}
                <Link
                  to={`/munkak/${project.slug}`}
                  className="group flex items-start justify-between gap-4 px-5 py-4 border-t border-white/8 hover:bg-white/[0.04] transition-colors duration-200"
                >
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
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 md:mb-16"
          >
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Miért hoz több ügyfelet
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight">
                Nem csak oldalt készítek. Ügyfélszerző útvonalat építek.
              </h2>
              <div>
                <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-7">
                  A cél, hogy az érdeklődő gyorsan megértse, miért Önt érdemes választania,
                  lássa a bizalmi jeleket, választ kapjon a kérdéseire, és könnyen tudjon
                  ajánlatot kérni, időpontot foglalni vagy felvenni a kapcsolatot.
                </p>
                <blockquote className="border-l-2 border-sp-gold/50 pl-5">
                  <p className="font-body text-base text-sp-text-muted/70 leading-relaxed italic">
                    Ha a látogató bizonytalan, továbbáll. Ha érti, miért Önt válassza, lépni fog.
                  </p>
                </blockquote>
              </div>
            </div>
          </motion.div>

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

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          >
            <p className="font-body text-base text-sp-text-muted leading-relaxed max-w-sm">
              Szeretné tudni, hol veszít érdeklődőket a vállalkozása?
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <Link
                to="/kapcsolat"
                className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                           bg-sp-gold text-sp-bg rounded-full px-6 py-3
                           hover:bg-sp-gold-hi transition-colors duration-200"
              >
                Kérek egy ingyenes átnézést
              </Link>
              <Link
                to="/munkak"
                className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200"
              >
                Megoldások megtekintése <ArrowRight size={14} />
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
                A weboldal, ami dolgozik a vállalkozásáért.
              </h2>
              <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-8">
                Nem csak dizájn és kód. Egy felépítés, amely meggyőzi az érdeklődőt,
                elvezeti a kapcsolatfelvételhez, és üzleti célt szolgál.
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
                Befektetés
              </span>
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-gradient-gold leading-tight mb-4">
                Akár 119.000 Ft-tól
              </h2>
              <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-6 max-w-md">
                Egy jól felépített weboldal segíthet abban, hogy több érdeklődőből
                legyen valódi ügyfél. Az első válaszban megadom a reális nagyságrendet
                — kötelezettség nélkül.
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
              Kérjen ingyenes átnézést a vállalkozásáról.
            </h2>
            <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-10 max-w-xl mx-auto">
              Írja le röviden, mivel foglalkozik és mi a célja. Visszajelzek a javasolt
              iránnyal, a reális nagyságrenddel és a következő lépéssel.
            </p>
            <Link
              to="/kapcsolat"
              className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                         bg-sp-gold text-sp-bg rounded-full px-8 py-4
                         hover:bg-sp-gold-hi transition-colors duration-200"
            >
              Kérek egy ingyenes átnézést
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
