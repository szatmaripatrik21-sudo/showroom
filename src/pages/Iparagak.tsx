import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import BrowserMockup from '@/components/BrowserMockup'
import { industries, projects } from '@/data/projects'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

export default function Iparagak() {
  const { slug } = useParams<{ slug: string }>()
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) return <Navigate to="/iparagai" replace />

  const related = projects.filter((p) => industry.relatedSlugs.includes(p.slug))

  return (
    <>
      {/* Back */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/iparagai" className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-text transition-colors">
            <ArrowLeft size={14} /> Iparágak
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-10 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              {industry.label}
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-[0.95] max-w-3xl mb-12">
              {industry.headline}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden">
              {[
                { label: 'A látogató kérdése', text: industry.visitorQuestion },
                { label: 'A weboldal feladata', text: industry.websiteJob },
                { label: 'Fő konverziós pont', text: industry.conversionPoint },
              ].map(({ label, text }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  animate="show"
                  className="p-8 bg-sp-surface"
                >
                  <p className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-sp-gold mb-4">
                    {label}
                  </p>
                  <p className="font-body text-base text-sp-text-muted leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold mb-10">
              Kapcsolódó munka
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {related.map((project, i) => (
                <motion.div
                  key={project.slug}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <Link to={`/munkak/${project.slug}`} className="group block">
                    <div className="rounded-xl overflow-hidden mb-4">
                      <div className="group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                        <BrowserMockup
                          gradient={project.gradient}
                          accentColor={project.accentColor}
                          videoSrc={project.videoSrc}
                          videoId={project.slug}
                          mode="secondary"
                          projectName={project.name}
                          videoFit={project.videoFit}
                          className="rounded-none border-0"
                        />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-sp-text group-hover:text-sp-gold transition-colors duration-200">
                      {project.name}
                    </h3>
                    <p className="font-body text-sm text-sp-text-muted mt-1">{project.tagline}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-36 border-t border-white/6 bg-sp-surface text-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text mb-8">
              {industry.label}ra tervezett weboldalt szeretnél?
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
