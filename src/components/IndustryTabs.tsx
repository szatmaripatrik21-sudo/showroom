import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { industries } from '@/data/content'
import type { Industry } from '@/data/content'
import type { ProjectCategory } from '@/data/projects'

export default function IndustryTabs() {
  const [active, setActive] = useState<ProjectCategory>('hospitality')

  const current = industries.find((i) => i.id === active) as Industry

  return (
    <section id="szolgaltatasok" className="border-t border-white/6 py-20 md:py-36 bg-lux-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Kiknek dolgozom
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight">
            Minden iparágnak megvan a maga logikája.
          </h2>
        </motion.div>

        {/* Tab navigation — horizontally scrollable on mobile, wraps on desktop */}
        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-1 mb-12 border-b border-white/8 pb-0
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`flex-shrink-0 whitespace-nowrap px-4 md:px-5 py-3 text-xs font-body font-medium tracking-[0.1em] uppercase transition-all duration-200 border-b-2 -mb-px ${
                active === ind.id
                  ? 'text-lux-gold border-lux-gold'
                  : 'text-lux-muted border-transparent hover:text-lux-cream hover:border-white/20'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Left: description */}
            <div className="space-y-6">
              <div>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-body font-medium block mb-4"
                  style={{ color: current.accentColor }}
                >
                  {current.shortLabel}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-lux-cream leading-tight mb-5">
                  {current.tagline}
                </h3>
                <p className="font-body text-sm md:text-base text-lux-muted leading-relaxed">
                  {current.description}
                </p>
              </div>

              {current.id !== 'hospitality' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-lux-black/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-lux-gold/60" />
                  <span className="text-xs font-body text-lux-muted">Koncepció / hamarosan</span>
                </div>
              )}
            </div>

            {/* Right: focus points */}
            <div className="space-y-3">
              {current.focus.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 p-5 rounded-xl border border-white/6 bg-lux-black/40 hover:border-lux-gold/20 transition-colors duration-300"
                >
                  <CheckCircle2
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: current.accentColor }}
                  />
                  <div>
                    <span className="font-body text-sm font-medium text-lux-cream block mb-0.5">{title}</span>
                    <span className="font-body text-xs text-lux-muted leading-snug">{desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
