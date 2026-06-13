import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
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

export default function ProjectCard({ project }: { project: Project }) {
  const { activeId } = useVideoBus()
  const isActive = activeId === project.id

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group card-luxury rounded-2xl overflow-hidden transition-all duration-400 flex flex-col ${
        isActive
          ? 'ring-1 ring-lux-gold/55 shadow-[0_0_55px_-12px_rgba(201,168,76,0.45)]'
          : 'hover:border-lux-gold/30 hover:shadow-2xl hover:shadow-black/40'
      }`}
    >
      {/* Browser preview — full-bleed on mobile, inset on larger cards */}
      <div className="p-0 sm:p-2 sm:pb-0 flex-shrink-0">
        <BrowserMockup
          gradient={project.gradient}
          accentColor={project.accentColor}
          videoSrc={project.videoSrc}
          posterSrc={project.posterSrc}
          videoId={project.id}
          mode="secondary"
          projectName={project.name}
          videoPosition={project.videoPosition}
          videoFit={project.videoFit}
          className="rounded-none border-0 sm:rounded-xl sm:border sm:border-white/8 group-hover:scale-[1.01] transition-transform duration-500"
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
        <p className="font-body text-sm text-lux-cream-dim/80 leading-relaxed">
          {project.description}
        </p>

        {/* Goal line */}
        <div className="py-3 border-t border-b border-white/6">
          <div className="flex gap-2 items-baseline">
            <span className="font-body text-[10px] tracking-wider uppercase text-lux-gold font-semibold flex-shrink-0">Cél</span>
            <span className="font-body text-xs text-lux-cream-dim/85 leading-snug">{project.cel}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="text-[10px] font-body px-2.5 py-1 rounded-full bg-white/5 text-lux-cream-dim/75 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions — only real, working CTAs (no dead buttons) */}
        <div className="flex flex-col gap-2.5 pt-1 mt-auto">
          <Button size="sm" className="w-full gap-1.5 text-xs" asChild>
            <a href="#kapcsolat">
              Kérek hasonló oldalt
              <ArrowUpRight size={13} />
            </a>
          </Button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-lux-cream/20 px-4 py-2.5 font-body text-xs font-medium text-lux-cream-dim hover:border-lux-gold/60 hover:text-lux-gold transition-all duration-200"
            >
              Weboldal megtekintése
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
