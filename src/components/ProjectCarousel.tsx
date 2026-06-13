import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from '@/data/projects'

/**
 * Secondary project cards.
 *
 * Below `lg` they become a horizontal scroll-snap carousel: one card visible at
 * rest with a peek of the next, native momentum swipe, plus dot indicators that
 * track the scroll position. At `lg`+ the very same DOM falls back to the
 * original 2-column grid (display switches flex→grid via Tailwind, no JS), so
 * desktop is byte-for-byte unchanged. One card set → no duplicate video players,
 * and the shared VideoBus still guarantees a single preview plays at a time.
 */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const multi = projects.length > 1

  // Track which card is snapped to the left edge so the dots reflect position.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el || !multi) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = el.scrollLeft
        let best = 0
        let bestDist = Infinity
        ;[...el.children].forEach((c, i) => {
          const d = Math.abs((c as HTMLElement).offsetLeft - x)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        setActiveIndex(best)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [multi, projects.length])

  const goTo = (i: number) => {
    const el = scrollerRef.current
    const child = el?.children[i] as HTMLElement | undefined
    if (el && child) el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
  }

  if (projects.length === 0) return null

  const cardWidth = multi ? 'w-[85%] sm:w-[72%]' : 'w-full'

  return (
    <div>
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Munkák — vízszintesen görgethető"
        tabIndex={0}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                   lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:pb-0
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/40 focus-visible:rounded-2xl"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`snap-start shrink-0 ${cardWidth} lg:w-auto`}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* Dot indicators — mobile/tablet only (the grid needs none) */}
      {multi && (
        <div className="flex justify-center gap-2 mt-5 lg:hidden">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ugrás ide: ${project.name}`}
              aria-current={i === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/60 ${
                i === activeIndex ? 'w-6 bg-lux-gold' : 'w-2 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
