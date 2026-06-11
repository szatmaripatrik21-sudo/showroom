import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Target, Layers, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BrowserMockup from './BrowserMockup'
import type { Project, ProjectCategory } from '@/data/projects'
import { categorySingular } from '@/data/projects'

const categoryVariant: Record<ProjectCategory, 'hospitality' | 'hotel' | 'beauty' | 'health'> = {
  hospitality: 'hospitality',
  hotel: 'hotel',
  beauty: 'beauty',
  health: 'health',
}

export default function FeaturedProjectCard({ project, videoDelay = 0 }: { project: Project; videoDelay?: number }) {
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
      className="card-luxury rounded-2xl overflow-hidden border border-lux-gold/20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: large browser mockup */}
        <div className="relative p-6 md:p-8 flex items-center">
          <div className="absolute -inset-2 bg-gradient-to-br from-lux-gold/6 to-lux-orange/4 blur-3xl pointer-events-none" />
          <BrowserMockup
            gradient={project.gradient}
            accentColor={project.accentColor}
            contentHeight="h-72"
            className="relative z-10 w-full"
            videoSrc={project.videoSrc}
            posterSrc={project.posterSrc}
            videoDelay={videoDelay}
          />
        </div>

        {/* Right: case-study content */}
        <div className="p-6 md:p-8 flex flex-col justify-center space-y-5">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold">
                Kiemelt munka
              </span>
              <Badge variant={categoryVariant[project.category]}>
                {project.badgeLabel ?? categorySingular[project.category]}
              </Badge>
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
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-body px-2.5 py-1 rounded-full bg-white/4 text-lux-cream-dim/60 border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <Button variant="gold" size="sm" className="gap-1.5 text-xs">
              Esettanulmány
              <ArrowUpRight size={13} />
            </Button>
            {project.liveUrl ? (
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  Weboldal
                  <ExternalLink size={12} />
                </a>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" disabled className="opacity-25 text-xs cursor-not-allowed">
                Weboldal
              </Button>
            )}
          </div>

        </div>
      </div>
    </motion.article>
  )
}
