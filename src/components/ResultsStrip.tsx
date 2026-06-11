import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ─── Edit these once you have real client data ────────────────────────────────
// Set countTarget to a number to enable the count-up animation.
// Remove countTarget and change value to the display string for text/ratio values.
interface ResultMetric {
  value: string        // {nagy szám} — displayed as-is when countTarget is absent (use bracket placeholders)
  prefix?: string      // prepended before the count number (e.g. "+")
  suffix?: string      // appended after the count number (e.g. "%", " nap")
  countTarget?: number // when set, drives the count-up animation; leave undefined for placeholders
  label: string        // {rövid kontextus} — bold label below the number
  sublabel: string     // muted one-liner
  source: string       // {forrás / projekt} — where this number comes from (bracket until real)
}

// Toggle ON once any number above is representative rather than from one specific project.
const SHOW_REPRESENTATIVE_NOTE = false

const resultMetrics: ResultMetric[] = [
  {
    value: '[+X%]',
    label: 'több megkeresés',
    sublabel: 'átadást követő első időszakban',
    source: '[mérés forrása / projekt neve]',
  },
  {
    value: '[2.1s → 0.9s]',
    label: 'betöltési idő',
    sublabel: 'teljesítményoptimalizálás után',
    source: '[mérés forrása / projekt neve]',
  },
  {
    value: '[X]',
    suffix: '+',
    label: 'elkészült weboldal',
    sublabel: '[iparágak / projektek]',
    source: '[mérés forrása / projekt neve]',
  },
  {
    value: '[X]',
    suffix: ' nap',
    label: 'átlagos átadási idő',
    sublabel: 'az első megbeszéléstől az éles indulásig',
    source: '[mérés forrása / projekt neve]',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

// Small count-up hook — fires once on inView, respects prefers-reduced-motion.
// Returns 0 (and stays 0) when target is undefined (placeholder mode).
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
      setCount(target)
      return
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

function MetricTile({ metric, index }: { metric: ResultMetric; index: number }) {
  const [entered, setEntered] = useState(false)
  const count = useCountUp(metric.countTarget, entered)
  const isPlaceholder = metric.value.startsWith('[')

  const displayValue =
    metric.countTarget !== undefined
      ? `${metric.prefix ?? ''}${count}${metric.suffix ?? ''}`
      : metric.value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      onViewportEnter={() => setEntered(true)}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col card-luxury rounded-2xl p-7 md:p-8
                 hover:border-lux-gold/30 transition-colors duration-300"
    >
      {/* Kitöltendő badge — remove once real value is in */}
      {isPlaceholder && (
        <span
          aria-label="Kitöltendő adat"
          className="absolute top-4 right-4 text-[9px] font-body font-medium tracking-[0.2em]
                     uppercase text-lux-orange/70 border border-lux-orange/25 rounded-full
                     px-2.5 py-0.5 select-none"
        >
          Kitöltendő
        </span>
      )}

      {/* Value — big serif gold */}
      <p className="font-display text-5xl md:text-6xl font-semibold text-gradient-gold leading-none mb-4">
        {displayValue}
      </p>

      {/* Label */}
      <p className="font-body text-sm font-medium text-lux-cream mb-1 leading-snug">
        {metric.label}
      </p>

      {/* Sublabel */}
      <p className="font-body text-xs text-lux-muted/70 leading-relaxed mb-4">
        {metric.sublabel}
      </p>

      {/* Source / project — pushed to the bottom of the tile */}
      <p className="mt-auto pt-3 border-t border-white/6 font-body text-[10px] text-lux-muted/50 tracking-wide leading-snug">
        {metric.source}
        {SHOW_REPRESENTATIVE_NOTE && <span className="text-lux-orange/50"> *</span>}
      </p>
    </motion.div>
  )
}

export default function ResultsStrip() {
  return (
    <section id="eredmeny" className="border-t border-white/6 py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Számokban
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-4">
            Eredmények, amik számítanak.
          </h2>
          <p className="font-body text-sm md:text-base text-lux-muted leading-relaxed">
            Minden szám valós ügyfélmunkából kerül be — a struktúra és a mérési logika már a helyén van.
          </p>
        </motion.div>

        {/* 4-tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {resultMetrics.map((metric, i) => (
            <MetricTile key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Truth disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-[10px] font-body text-lux-muted/40 tracking-wide text-center"
        >
          {SHOW_REPRESENTATIVE_NOTE
            ? '[* Reprezentatív / korábbi projekt adatai]'
            : 'A fenti adatok valós ügyféladat alapján kerülnek kitöltésre — nem becsült vagy fiktív értékek.'}
        </motion.p>
      </div>
    </section>
  )
}
