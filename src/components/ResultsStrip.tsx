import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { stats } from '@/data/content'
import type { Stat } from '@/data/content'

// Small count-up hook — fires once on inView, respects prefers-reduced-motion.
function useCountUp(target: number | undefined, shouldStart: boolean): number {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!shouldStart || target === undefined || startedRef.current) return
    startedRef.current = true

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      // Snap to the final value on the next frame (avoids a synchronous
      // setState inside the effect body) — no animation for reduced motion.
      const id = requestAnimationFrame(() => setCount(target))
      return () => cancelAnimationFrame(id)
    }

    const duration = 1400
    const startTime = performance.now()
    let rafId: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.round(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [shouldStart, target])

  return count
}

function StatTile({ stat, index }: { stat: Stat; index: number }) {
  const [entered, setEntered] = useState(false)
  const count = useCountUp(stat.countTo, entered)

  const displayValue =
    stat.countTo !== undefined ? `${count}${stat.suffix ?? ''}` : stat.value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      onViewportEnter={() => setEntered(true)}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col card-luxury rounded-2xl p-4 lg:p-8
                 hover:border-lux-gold/30 transition-colors duration-300"
    >
      {/* Category badge */}
      <span
        className="absolute top-4 right-4 text-[9px] font-body font-medium tracking-[0.2em]
                   uppercase text-lux-gold/80 border border-lux-gold/30 rounded-full
                   px-2.5 py-0.5 select-none"
      >
        {stat.badge}
      </span>

      {/* Value — big serif gold */}
      <p className="font-display text-2xl sm:text-3xl lg:text-5xl font-semibold text-gradient-gold leading-tight lg:leading-none mb-2 lg:mb-4 pr-12 lg:pr-16">
        {displayValue}
      </p>

      {/* Title */}
      <p className="font-body text-sm font-semibold text-lux-cream mb-2 leading-snug">
        {stat.title}
      </p>

      {/* Text */}
      <p className="font-body text-xs text-lux-cream-dim/75 leading-relaxed">
        {stat.text}
      </p>
    </motion.div>
  )
}

export default function ResultsStrip() {
  return (
    <section id="eredmeny" className="border-t border-white/6 py-12 md:py-20 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-8 md:mb-14"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Számokban
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-4">
            A számok, amikre figyelek.
          </h2>
          <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed">
            Minden szép weboldal mögött mérhető szempontoknak kell állniuk. Nem az a cél, hogy az oldal csak
            jól nézzen ki, hanem hogy gyors, átlátható és üzletszerzésre alkalmas legyen.
          </p>
        </motion.div>

        {/* 4-tile grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {stats.map((stat, i) => (
            <StatTile key={stat.title} stat={stat} index={i} />
          ))}
        </div>

        {/* Honest framing — these reflect process & performance targets, not client results */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-[11px] font-body text-lux-cream-dim/45 tracking-wide text-center"
        >
          A fenti értékek fejlesztési folyamat- és teljesítménymérési szempontokat tükröznek — nem fiktív ügyféleredmények.
        </motion.p>
      </div>
    </section>
  )
}
