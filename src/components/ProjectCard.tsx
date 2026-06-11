import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
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

export default function ProjectCard({ project, videoDelay = 0 }: { project: Project; videoDelay?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group card-luxury rounded-2xl overflow-hidden hover:border-lux-gold/30 transition-all duration-400 hover:shadow-2xl hover:shadow-black/40 flex flex-col"
    >
      {/* Browser preview */}
      <div className="p-4 pb-0 flex-shrink-0">
        <BrowserMockup
          gradient={project.gradient}
          accentColor={project.accentColor}
          videoSrc={project.videoSrc}
          posterSrc={project.posterSrc}
          videoDelay={videoDelay}
          className="group-hover:scale-[1.01] transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={categoryVariant[project.category]}>
              {categorySingular[project.category]}
            </Badge>
            {project.comingSoon && (
              <Badge variant="outline" className="text-lux-muted text-[10px]">Hamarosan</Badge>
            )}
          </div>
          <h3 className="font-display text-2xl font-semibold text-lux-cream leading-tight">
            {project.name}
          </h3>
          <p className="font-body text-sm text-lux-muted italic mt-1">{project.tagline}</p>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-lux-cream-dim/65 leading-relaxed">
          {project.description}
        </p>

        {/* Cél + Mit javít */}
        <div className="space-y-2 py-3 border-t border-b border-white/6">
          <div className="flex gap-2">
            <span className="font-body text-[10px] tracking-wider uppercase text-lux-gold font-medium flex-shrink-0 mt-0.5">Cél</span>
            <span className="font-body text-xs text-lux-muted leading-snug">{project.cel}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-body text-[10px] tracking-wider uppercase text-lux-muted/60 font-medium flex-shrink-0 mt-0.5 whitespace-nowrap">Mit javít</span>
            <span className="font-body text-xs text-lux-muted/70 leading-snug">{project.mitJavit}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="text-[10px] font-body px-2.5 py-1 rounded-full bg-white/4 text-lux-muted border border-white/8"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-lg border border-lux-gold/40 px-4 py-2.5 font-body text-xs font-medium text-lux-gold hover:bg-lux-gold/8 hover:border-lux-gold/70 transition-all duration-200"
            >
              Weboldal megtekintése
              <ExternalLink size={12} />
            </a>
          )}
          <div className="flex items-center gap-3">
            <Button variant="gold" size="sm" className="flex-1 gap-1.5 text-xs">
              Esettanulmány
              <ArrowUpRight size={13} />
            </Button>
            {!project.liveUrl && (
              <Button variant="ghost" size="sm" disabled className="opacity-25 text-xs cursor-not-allowed">
                Hamarosan elérhető
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
