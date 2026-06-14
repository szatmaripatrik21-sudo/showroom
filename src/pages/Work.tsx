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

export default function Work() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Koncepciók
            </span>
            <h1 className="font-display font-semibold text-6xl md:text-7xl lg:text-8xl text-sp-text leading-[0.95] mb-8 max-w-3xl">
              Weboldal-koncepciók.
            </h1>
            <p className="font-body text-lg text-sp-text-muted max-w-lg leading-relaxed">
              Weboldal-koncepciók, amelyek a döntési logikát, vizuális irányt és
              konverziós útvonalat mutatják meg egy-egy iparági helyzetben.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                to={`/munkak/${project.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/8 bg-sp-surface hover:border-white/15 transition-colors duration-300"
              >
                {/* Visual */}
                <div className="overflow-hidden">
                  <div className="transform group-hover:scale-[1.02] transition-transform duration-700 ease-out h-full">
                    <BrowserMockup
                      gradient={project.gradient}
                      accentColor={project.accentColor}
                      videoSrc={project.videoSrc}
                      posterSrc={project.posterSrc}
                      videoId={project.slug}
                      mode="secondary"
                      projectName={project.name}
                      videoFit={project.videoFit}
                      className="rounded-none border-0 h-full"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between p-8 md:p-12">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-body text-[9px] tracking-[0.2em] uppercase text-sp-text-muted border border-white/12 rounded-full px-2.5 py-1">
                        {project.industryLabel}
                      </span>
                      <span className="font-body text-[9px] tracking-[0.2em] uppercase text-sp-text-muted/50 border border-white/8 rounded-full px-2.5 py-1">
                        Weboldal-koncepció
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-sp-text mb-3 group-hover:text-sp-gold transition-colors duration-200">
                      {project.name}
                    </h2>
                    <p className="font-body text-base text-sp-text-muted leading-relaxed mb-6">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-body text-xs text-sp-text-muted/70 bg-white/4 rounded-full px-3 py-1.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-body text-sm text-sp-text-muted group-hover:text-sp-gold transition-colors duration-200">
                    Koncepció megtekintése
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 border-t border-white/6 overflow-hidden">
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[400px] rounded-full bg-sp-gold/[0.04] blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: copy + buttons */}
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="block mb-6 text-[10px] tracking-[0.35em] uppercase font-body font-medium text-sp-gold">
                Következő lépés
              </span>
              <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-[3.25rem] text-sp-text leading-[1.0] mb-6 max-w-lg">
                Nézzük meg, milyen weboldal illene a te vállalkozásodhoz.
              </h2>
              <p className="font-body text-base md:text-lg text-sp-text-muted leading-relaxed mb-8 max-w-md">
                Nem sablont ajánlok, hanem átnézem, milyen online jelenlét támogatná legjobban a céljaidat: több megkeresés, több foglalás, komolyabb első benyomás vagy teljes újratervezés.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  to="/kapcsolat"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                             bg-sp-gold text-[#0a0908] rounded-full px-7 py-3.5
                             hover:bg-sp-gold-hi transition-colors duration-200"
                >
                  Kérek egy áttekintést
                </Link>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                             text-sp-text-muted border border-white/15 rounded-full px-7 py-3.5
                             hover:text-sp-text hover:border-white/30 transition-all duration-200"
                >
                  Megnézem a koncepciókat
                  <ArrowRight size={14} />
                </a>
              </div>
              <p className="font-body text-xs text-sp-text-muted/40 leading-relaxed">
                Nincs kötelezettség · Konkrét következő lépést kapsz
              </p>
            </motion.div>

            {/* Right: audit card */}
            <motion.div
              custom={1}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="rounded-2xl border border-white/10 bg-sp-surface p-8 md:p-10">
                <p className="font-display text-xl font-semibold text-sp-text mb-6">Mit nézek át?</p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Milyen benyomást kelt most a weboldalad',
                    'Hol veszhetnek el az érdeklődők',
                    'Milyen szekciók, CTA-k és üzenetek hiányoznak',
                    'Milyen irány illene az iparágadhoz',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-sp-gold flex-shrink-0" />
                      <span className="font-body text-sm text-sp-text-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-sm text-sp-text-muted/55 leading-relaxed border-t border-white/6 pt-6">
                  Pár mondatban leírod a vállalkozásod, én pedig visszajelzek, merre lenne érdemes elindulni.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
