import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Target, Layers, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BrowserMockup from './BrowserMockup'
import { useVideoBus } from '@/lib/videoBus'
import type { Project, ProjectCategory } from '@/data/projects'
import { categorySingular } from '@/data/projects'

const categoryVariant: Record<ProjectCategory, 'hospitality' | 'hotel' | 'beauty' | 'health'> = {
  hospitality: 'hospitality',
  hotel: 'hotel',
  beauty: 'beauty',
  health: 'health',
}

export default function FeaturedProjectCard({ project }: { project: Project }) {
  const { activeId } = useVideoBus()
  const isActive = activeId === project.id
  const cs = project.caseStudy
  const studyPoints = cs
    ? [
        { icon: Target,       label: 'Kihívás',  text: cs.challenge },
        { icon: Layers,       label: 'Megoldás', text: cs.solution  },
        { icon: CheckCircle2, label: 'Eredmény', text: cs.result    },
      ]
    : []

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`card-luxury rounded-2xl overflow-hidden border transition-all duration-500 ${
        isActive
          ? 'border-lux-gold/45 shadow-[0_0_70px_-16px_rgba(201,168,76,0.5)]'
          : 'border-lux-gold/20'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Left: large browser mockup — 3/5 of the card so the video dominates */}
        <div className="relative p-0 sm:p-3 md:p-4 flex items-center lg:col-span-3">
          <div className="absolute -inset-2 bg-gradient-to-br from-lux-gold/6 to-lux-orange/4 blur-3xl pointer-events-none" />
          <BrowserMockup
            gradient={project.gradient}
            accentColor={project.accentColor}
            className="relative z-10 w-full rounded-none border-0 sm:rounded-xl sm:border sm:border-white/8"
            videoSrc={project.videoSrc}
            posterSrc={project.posterSrc}
            videoId={project.id}
            mode="featured"
            projectName={project.name}
            videoPosition={project.videoPosition}
            videoFit={project.videoFit}
          />
        </div>

        {/* Right: case-study content */}
        <div className="p-6 md:p-8 flex flex-col justify-center space-y-5 lg:col-span-2">

          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold">
                Kiemelt munka
              </span>
              <Badge variant={categoryVariant[project.category]}>
                {project.badgeLabel ?? categorySingular[project.category]}
              </Badge>
              {/* Truth rule: always show real/concept status */}
              <span className="text-[9px] tracking-[0.15em] uppercase font-body font-medium text-white/45 border border-white/15 rounded-full px-2 py-0.5">
                {project.projectStatus === 'real' ? 'Valós projekt' : 'Weboldal-koncepció'}
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-lux-cream leading-tight">
              {project.name}
            </h3>
            <p className="font-body text-lux-cream-dim/80 italic text-sm mt-2 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Compact 3-point case-study summary */}
          {studyPoints.length > 0 && (
            <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/6 bg-lux-black/40">
              {studyPoints.map(({ icon: Icon, label, text }) => (
                <div key={label} className="flex gap-3.5 px-4 py-3.5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-md bg-lux-gold/10 flex items-center justify-center mt-0.5">
                    <Icon size={13} className="text-lux-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-body tracking-[0.2em] uppercase text-lux-gold font-semibold mb-1">
                      {label}
                    </p>
                    <p className="font-body text-[13px] text-lux-cream-dim leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="text-xs font-body px-2.5 py-1 rounded-full bg-white/4 text-lux-cream-dim/60 border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions — the case study is shown inline above; CTAs are real links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            {project.liveUrl && (
              <Button size="sm" asChild className="gap-1.5 text-xs">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Weboldal megtekintése
                  <ExternalLink size={12} />
                </a>
              </Button>
            )}
            <Button variant="gold" size="sm" asChild className="gap-1.5 text-xs">
              <a href="#kapcsolat">
                Kérek egy ajánlatot
                <ArrowUpRight size={13} />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </motion.article>
  )
}
