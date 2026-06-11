import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import FeaturedProjectCard from './FeaturedProjectCard'
import { projects, CATEGORIES } from '@/data/projects'
import type { FilterId } from '@/data/projects'

export default function PortfolioSection() {
  const [active, setActive] = useState<FilterId>('all')

  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active)
  // The featured project renders large at the top of the gallery; the rest fill the grid.
  const featured = visible.find((p) => p.featured)
  const rest = visible.filter((p) => !p.featured)

  return (
    <section id="munkak" className="border-t border-white/6 py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
              Weboldal-koncepciók
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight">
              Iparágra szabott weboldal-koncepciók.
            </h2>
            <p className="mt-4 font-body text-sm text-lux-muted max-w-xl leading-relaxed">
              Ezek a tervek nem csak szépek. Arra épülnek, hogy a látogató gyorsabban megértse az ajánlatot,
              megbízzon a vállalkozásban, és könnyebben vásároljon, foglaljon vagy érdeklődjön.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-body font-medium tracking-wide transition-all duration-200 border ${
                  active === c.id
                    ? 'bg-lux-cream/10 text-lux-cream border-lux-cream/40'
                    : 'border-white/15 text-lux-muted hover:text-lux-cream hover:border-white/30 bg-transparent'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured card + grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {featured && <FeaturedProjectCard project={featured} videoDelay={0} />}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rest.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} videoDelay={(i + 1) * 1000} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
