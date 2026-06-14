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
              Munkák
            </span>
            <h1 className="font-display font-semibold text-6xl md:text-7xl lg:text-8xl text-sp-text leading-[0.95] mb-8 max-w-3xl">
              Kiválasztott munkák.
            </h1>
            <p className="font-body text-lg text-sp-text-muted max-w-lg leading-relaxed">
              Weboldal-koncepciók, amelyek a döntési logikát, vizuális irányt és
              konverziós útvonalat mutatják meg egy-egy iparági helyzetben.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-32 md:pb-48">
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
                    Esettanulmány megtekintése
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 border-t border-white/6 text-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text mb-6">
              Hasonló oldalt szeretnél?
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
