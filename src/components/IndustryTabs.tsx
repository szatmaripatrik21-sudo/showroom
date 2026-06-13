import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { industries } from '@/data/content'
import type { Industry } from '@/data/content'
import type { ProjectCategory } from '@/data/projects'

export default function IndustryTabs() {
  const [active, setActive] = useState<ProjectCategory>('hospitality')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const current = industries.find((i) => i.id === active) as Industry

  // Roving focus + arrow-key navigation for the tablist (WAI-ARIA pattern).
  const onTabKeyDown = (e: KeyboardEvent, index: number) => {
    const last = industries.length - 1
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === -1) return
    e.preventDefault()
    setActive(industries[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="szolgaltatasok" className="border-t border-white/6 py-20 md:py-36 bg-lux-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Miért dolgozom így
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-5">
            Minden iparágnak megvan a maga logikája.
          </h2>
          <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed">
            Más miatt dönt egy hotelvendég, egy páciens, egy éttermi vendég vagy egy szépségszalon új
            ügyfele. Ezért az oldal szerkezetét mindig az adott üzleti helyzethez igazítom.
          </p>
        </motion.div>

        {/* Tab navigation — horizontally scrollable on mobile, wraps on desktop */}
        <div
          role="tablist"
          aria-label="Iparágak"
          className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-1 mb-12 border-b border-white/8 pb-0
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {industries.map((ind, i) => {
            const selected = active === ind.id
            return (
              <button
                key={ind.id}
                ref={(el) => { tabRefs.current[i] = el }}
                role="tab"
                id={`tab-${ind.id}`}
                aria-selected={selected}
                aria-controls={`panel-${ind.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(ind.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`flex-shrink-0 whitespace-nowrap px-4 md:px-5 py-3 text-xs font-body font-medium tracking-[0.1em] uppercase transition-all duration-200 border-b-2 -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/60 focus-visible:rounded-sm ${
                  selected
                    ? 'text-lux-gold border-lux-gold'
                    : 'text-lux-cream-dim/70 border-transparent hover:text-lux-cream hover:border-white/20'
                }`}
              >
                {ind.label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Left: description */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-body font-medium block mb-1"
                style={{ color: current.accentColor }}
              >
                {current.shortLabel}
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-lux-cream leading-tight">
                {current.tagline}
              </h3>
              <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Right: focus points */}
            <div className="space-y-3">
              {current.focus.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 p-5 rounded-xl border border-white/8 bg-lux-black/40 hover:border-lux-gold/25 transition-colors duration-300"
                >
                  <CheckCircle2
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: current.accentColor }}
                  />
                  <div>
                    <span className="font-body text-sm font-medium text-lux-cream block mb-0.5">{title}</span>
                    <span className="font-body text-xs text-lux-cream-dim/75 leading-snug">{desc}</span>
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
