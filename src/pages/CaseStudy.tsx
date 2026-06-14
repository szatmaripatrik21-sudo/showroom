import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import BrowserMockup from '@/components/BrowserMockup'
import { projects } from '@/data/projects'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

const sections = [
  { key: 'context',    label: 'Mi volt a cél?' },
  { key: 'direction',  label: 'Milyen irány készült?' },
  { key: 'conversion', label: 'Hogyan vezeti a látogatót?' },
  { key: 'visual',     label: 'Vizuális irány' },
] as const

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/munkak" replace />

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]

  return (
    <>
      {/* Back */}
      <div className="pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            to="/munkak"
            className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-text transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Koncepciók
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-10 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show" className="mb-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="font-body text-[9px] tracking-[0.2em] uppercase text-sp-text-muted border border-white/12 rounded-full px-2.5 py-1">
                {project.industryLabel}
              </span>
              <span className="font-body text-[9px] tracking-[0.2em] uppercase text-sp-text-muted/50 border border-white/8 rounded-full px-2.5 py-1">
                Weboldal-koncepció
              </span>
            </div>
            <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-sp-text leading-[0.95] mb-4 max-w-3xl">
              {project.name}
            </h1>
            <p className="font-body text-xl text-sp-text-muted max-w-xl leading-relaxed">
              {project.tagline}
            </p>
          </motion.div>

          {/* Main visual */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="rounded-2xl overflow-hidden"
          >
            <BrowserMockup
              gradient={project.gradient}
              accentColor={project.accentColor}
              videoSrc={project.videoSrc}
              posterSrc={project.posterSrc}
              videoId={project.slug}
              mode="featured"
              projectName={project.name}
              videoFit={project.videoFit}
              className="rounded-none border-0"
            />
          </motion.div>
        </div>
      </section>

      {/* Case study sections */}
      <section className="py-16 md:py-24 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            {sections.map(({ key, label }, i) => (
              <motion.div
                key={key}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold mb-4">
                  {label}
                </p>
                <p className="font-body text-lg text-sp-text-dim leading-relaxed">
                  {project.caseStudy[key]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags + live link */}
      <section className="py-12 md:py-16 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-body text-xs text-sp-text-muted/70 bg-white/4 rounded-full px-3 py-1.5">
                {tag}
              </span>
            ))}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-text transition-colors duration-200"
            >
              Weboldal megtekintése <ExternalLink size={13} />
            </a>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 border-t border-white/6 bg-sp-surface text-center">
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

      {/* Next project */}
      <section className="border-t border-white/6">
        <Link
          to={`/munkak/${nextProject.slug}`}
          className="group block py-12 md:py-16"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
            <div>
              <p className="font-body text-xs text-sp-text-muted/50 tracking-widest uppercase mb-2">Következő koncepció</p>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-sp-text group-hover:text-sp-gold transition-colors duration-200">
                {nextProject.name}
              </h3>
            </div>
            <ArrowLeft size={20} className="text-sp-text-muted group-hover:text-sp-gold rotate-180 group-hover:translate-x-2 transition-all duration-200" />
          </div>
        </Link>
      </section>
    </>
  )
}
