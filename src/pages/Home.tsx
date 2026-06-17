import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import HeroAnimation from '@/components/HeroAnimation'
import BrowserMockup from '@/components/BrowserMockup'
import { projects } from '@/data/projects'
import { homeCopy } from '@/data/homeCopy'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' } }),
}

const c = homeCopy.hu

export default function Home() {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const [canScrollLeft,  setCanScrollLeft]  = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIdx,      setActiveIdx]      = useState(0)
  const [nudged,         setNudged]         = useState(false)

  const syncScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    // Derive active card index from scroll position
    const approxCardW = el.scrollWidth / projects.length
    const idx = Math.round(el.scrollLeft / approxCardW)
    setActiveIdx(Math.min(Math.max(idx, 0), projects.length - 1))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    syncScrollState()
    el.addEventListener('scroll', syncScrollState, { passive: true })
    window.addEventListener('resize', syncScrollState)
    return () => {
      el.removeEventListener('scroll', syncScrollState)
      window.removeEventListener('resize', syncScrollState)
    }
  }, [syncScrollState])

  // One-time nudge when section enters viewport — signals swipeability on mobile
  useEffect(() => {
    const section = sectionRef.current
    if (!section || nudged) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      setNudged(true)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = scrollRef.current
      if (!el) return
      setTimeout(() => {
        el.scrollBy({ left: 40, behavior: 'smooth' })
        setTimeout(() => el.scrollBy({ left: -40, behavior: 'smooth' }), 520)
      }, 700)
    }, { threshold: 0.25 })
    obs.observe(section)
    return () => obs.disconnect()
  }, [nudged])

  // Card-by-card arrow navigation (reads live scroll position — never stale)
  const scrollCarousel = useCallback((dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    const approxCardW = el.scrollWidth / projects.length
    const cur  = Math.round(el.scrollLeft / approxCardW)
    const next = Math.max(0, Math.min(projects.length - 1, cur + dir))
    cardRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [])

  const goToCard = useCallback((i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-black text-[#F7F1E8]">
        <HeroAnimation />

        {/* Light global overlay — animation stays visible */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: [
              'radial-gradient(circle at 65% 42%, rgba(185,145,82,0.24) 0%, transparent 42%)',
              'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0.62) 100%)',
            ].join(','),
          }}
        />

<div className="relative z-20 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-28 pb-16 md:pt-32 md:pb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="block mb-6 text-[10px] sm:text-xs tracking-[0.34em] uppercase font-body font-medium"
            style={{ color: '#E8B86D', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            {c.hero.label}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="font-display font-semibold max-w-[760px] mb-6"
            style={{
              fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
              lineHeight: '0.98',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              textShadow: '0 4px 24px rgba(0,0,0,0.95)',
            }}
          >
            {c.hero.h1Line1}<br />{c.hero.h1Line2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="font-body mb-9"
            style={{
              maxWidth: 'min(560px, 92vw)',
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.1rem)',
              lineHeight: '1.55',
              color: '#FAF3EA',
              textShadow: '0 1px 2px rgba(0,0,0,0.55), 0 0 8px rgba(0,0,0,0.35)',
              WebkitTextStroke: '0.4px rgba(0,0,0,0.4)',
              paintOrder: 'stroke fill',
            }}
          >
            {c.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-start gap-5"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/kapcsolat"
                className="inline-flex items-center justify-center font-body font-semibold rounded-full transition-colors duration-200"
                style={{
                  background: '#F2EBDD',
                  color: '#11100E',
                  padding: '1rem 2rem',
                  fontSize: '0.9375rem',
                  boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.background = '#F2EBDD')}
              >
                {c.hero.cta}
              </Link>
              <Link
                to="/munkak"
                className="inline-flex items-center gap-1.5 font-body font-medium transition-colors duration-200"
                style={{ color: '#F0E8DC', fontSize: '0.9375rem', textShadow: '0 2px 12px rgba(0,0,0,0.75)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#F0E8DC')}
              >
                {c.hero.ctaSecondary} <ArrowRight size={14} />
              </Link>
            </div>
            <p
              className="font-body text-xs"
              style={{ color: 'rgba(240,232,220,0.45)', textShadow: '0 1px 6px rgba(0,0,0,0.6)', maxWidth: 'min(460px, 90vw)' }}
            >
              {c.hero.microcopy}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONCEPTS PREVIEW ─────────────────────────────────────────────── */}
      <section ref={sectionRef} className="py-24 md:py-32 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Header row */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6 md:mb-8"
          >
            <div>
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight">
                {c.demos.h2}<br />{c.demos.h2Cont}
              </h2>
              <p className="font-body text-sm text-sp-text-muted/70 mt-4 max-w-xl leading-relaxed">
                {c.demos.sub}
              </p>
            </div>

            {/* Controls row: arrows + desktop dots + all-demos link */}
            <div className="flex items-center gap-3 shrink-0 mt-2">
              <button
                onClick={() => scrollCarousel(-1)}
                aria-label="Előző demó"
                disabled={!canScrollLeft}
                className={[
                  'w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200',
                  canScrollLeft
                    ? 'border-white/20 text-sp-text-muted hover:border-sp-gold hover:text-sp-gold cursor-pointer'
                    : 'border-white/8 text-sp-text-muted/25 cursor-not-allowed',
                ].join(' ')}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                aria-label="Következő demó"
                disabled={!canScrollRight}
                className={[
                  'w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200',
                  canScrollRight
                    ? 'border-white/20 text-sp-text-muted hover:border-sp-gold hover:text-sp-gold cursor-pointer'
                    : 'border-white/8 text-sp-text-muted/25 cursor-not-allowed',
                ].join(' ')}
              >
                <ChevronRight size={16} />
              </button>

              {/* Pagination dots — desktop only; mobile dots sit below the carousel */}
              <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    tabIndex={-1}
                    onClick={() => goToCard(i)}
                    className={[
                      'rounded-full transition-all duration-300 ease-out',
                      i === activeIdx ? 'w-5 h-1 bg-sp-gold' : 'w-1 h-1 bg-white/25 hover:bg-white/50',
                    ].join(' ')}
                  />
                ))}
              </div>

              <Link
                to="/munkak"
                className="flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200"
              >
                {c.demos.allLink} <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Carousel — bleeds to viewport edges on mobile to allow the next-card
              peek; clipped by overflow-hidden so page never scrolls horizontally */}
          <div className="relative -mx-6 sm:mx-0 overflow-hidden">

            {/* Left edge fade — visible only when not at the first card */}
            <div
              aria-hidden
              className={[
                'absolute inset-y-0 left-0 w-10 sm:w-14 z-10 pointer-events-none',
                'transition-opacity duration-300',
                canScrollLeft ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
              style={{ background: 'linear-gradient(to right, #110d09 0%, transparent 100%)' }}
            />
            {/* Right edge fade — visible while more cards remain */}
            <div
              aria-hidden
              className={[
                'absolute inset-y-0 right-0 w-14 sm:w-20 z-10 pointer-events-none',
                'transition-opacity duration-300',
                canScrollRight ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
              style={{ background: 'linear-gradient(to left, #110d09 0%, transparent 100%)' }}
            />

            {/* Right-edge continuation cue — desktop only.
                Always-visible indicator that more cards exist; clicking advances the carousel. */}
            <button
              type="button"
              aria-label="Következő demó"
              onClick={() => scrollCarousel(1)}
              tabIndex={canScrollRight ? 0 : -1}
              className={[
                'group hidden lg:block',
                'absolute right-0 top-0 bottom-0 z-20',
                'cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sp-gold/50',
                'transition-opacity duration-300 ease-out',
                canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none',
              ].join(' ')}
              style={{ width: 'clamp(96px, 12vw, 160px)' }}
            >
              {/* Dark edge gradient — always on, darkens the right edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
              />
              {/* Gold tint — subtle at rest, stronger on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'linear-gradient(to left, rgba(201,164,89,0.14) 0%, transparent 100%)' }}
              />

              {/* Indicator — always visible, vertically centered, 16px from right edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              >
                <div
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                  style={{
                    border: '1px solid rgba(201,164,89,0.45)',
                    background: 'rgba(10,8,5,0.72)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <ChevronRight size={16} className="text-sp-gold" />
                </div>
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-sp-gold/55 select-none transition-colors duration-200 group-hover:text-sp-gold/85">
                  Tovább
                </span>
              </div>
            </button>

            {/* Scroll track
                pl-4: left breathing room on mobile so cards don't touch the edge
                pr-12: trailing space ensures the last card can snap into position
                gap-3 sm:gap-6: tighter gap on mobile (more peek), standard on desktop */}
            <div
              ref={scrollRef}
              className="no-scrollbar flex gap-6 overflow-x-auto pl-6 sm:pl-0 pr-16 sm:pr-0 scroll-pl-6 sm:scroll-pl-0 touch-pan-x"
              style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
            >
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null }}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="carousel-card rounded-2xl border border-white/8 bg-sp-bg overflow-hidden"
                >
                  {/* Video preview */}
                  <div className="overflow-hidden">
                    <BrowserMockup
                      gradient={project.gradient}
                      accentColor={project.accentColor}
                      videoSrc={project.videoSrc}
                      posterSrc={project.posterSrc}
                      videoId={project.slug}
                      mode="secondary"
                      projectName={project.name}
                      videoFit={project.videoFit}
                      className="rounded-none border-0"
                    />
                  </div>

                  {/* Text row — navigates to case study */}
                  <Link
                    to={`/munkak/${project.slug}`}
                    className="group flex items-start justify-between gap-4 px-5 py-4 border-t border-white/8 hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <div>
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-sp-text-muted mb-1">
                        {project.industryLabel} · {c.demos.cardBadge}
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-sp-text group-hover:text-sp-gold transition-colors duration-200">
                        {project.name}
                      </h3>
                      <p className="font-body text-sm text-sp-text-muted mt-1.5 leading-snug">
                        {project.tagline}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-sp-text-muted group-hover:text-sp-gold group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1"
                    />
                  </Link>

                  {/* Live site link */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/live flex items-center justify-between px-5 py-3 border-t border-white/8 hover:bg-white/[0.04] transition-colors duration-200"
                    >
                      <span className="font-body text-xs text-sp-gold/70 group-hover/live:text-sp-gold transition-colors duration-200 truncate">
                        {project.liveUrl.replace(/^https?:\/\//, '')}
                      </span>
                      <ExternalLink size={13} className="text-sp-gold/50 group-hover/live:text-sp-gold transition-colors duration-200 shrink-0 ml-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination dots — mobile only, below the carousel */}
          <div
            role="tablist"
            aria-label="Demó navigáció"
            className="flex sm:hidden items-center justify-center gap-2 mt-5"
          >
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                role="tab"
                aria-label={project.name}
                aria-selected={i === activeIdx}
                onClick={() => goToCard(i)}
                className={[
                  'rounded-full transition-all duration-300 ease-out',
                  i === activeIdx
                    ? 'w-6 h-1.5 bg-sp-gold'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40',
                ].join(' ')}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── WHY IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 md:mb-16"
          >
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              {c.why.label}
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight">
                {c.why.h2}
              </h2>
              <div>
                <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-7">
                  {c.why.sub}
                </p>
                <blockquote className="border-l-2 border-sp-gold/50 pl-5">
                  <p className="font-body text-base text-sp-text-muted/70 leading-relaxed italic">
                    {c.why.quote}
                  </p>
                </blockquote>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/6 rounded-2xl overflow-hidden mb-12 md:mb-14">
            {c.why.cards.map(({ title, text, label }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="p-8 md:p-10 bg-sp-bg flex flex-col gap-4"
              >
                <p className="font-display text-xl font-semibold text-sp-text">{title}</p>
                <p className="font-body text-base text-sp-text-muted leading-relaxed flex-1">{text}</p>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-sp-gold/60">{label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          >
            <p className="font-body text-base text-sp-text-muted leading-relaxed max-w-sm">
              {c.why.sectionCta}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <Link
                to="/kapcsolat"
                className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium
                           bg-sp-gold text-sp-bg rounded-full px-6 py-3
                           hover:bg-sp-gold-hi transition-colors duration-200"
              >
                {c.why.cta}
              </Link>
              <Link
                to="/munkak"
                className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200"
              >
                {c.why.demosLink} <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OFFER PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
                {c.offer.label}
              </span>
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-sp-text leading-tight mb-6">
                {c.offer.h2}<br />{c.offer.h2Cont}
              </h2>
              <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-8">
                {c.offer.sub}
              </p>
              <Link
                to="/ajanlat"
                className="inline-flex items-center gap-2 font-body text-sm text-sp-gold hover:text-sp-gold-hi transition-colors duration-200"
              >
                {c.offer.detailsLink} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.ul
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {c.offer.points.map((point) => (
                <li key={point} className="flex items-center gap-4 py-4 border-b border-white/6">
                  <span className="w-1 h-1 rounded-full bg-sp-gold flex-shrink-0" />
                  <span className="font-body text-base text-sp-text">{point}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
                {c.pricing.label}
              </span>
              <h2 className="font-display font-semibold text-5xl md:text-6xl text-gradient-gold leading-tight mb-4">
                {c.pricing.h2}
              </h2>
              <p className="font-body text-lg text-sp-text-muted leading-relaxed mb-6 max-w-md">
                {c.pricing.sub}
              </p>
              <Link
                to="/ar"
                className="inline-flex items-center gap-2 font-body text-sm text-sp-text-muted hover:text-sp-gold transition-colors duration-200"
              >
                {c.pricing.link} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — two-path ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-t border-white/6 bg-sp-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Section intro — centered */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-lg mx-auto text-center mb-10 md:mb-12"
          >
            <span className="block mb-4 text-[10px] tracking-[0.34em] uppercase font-body font-medium text-sp-gold">
              {c.finalCta.eyebrow}
            </span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-sp-text leading-tight mb-3">
              {c.finalCta.h2}
            </h2>
            <p className="font-body text-sm text-sp-text-muted/60">
              {c.finalCta.intro}
            </p>
          </motion.div>

          {/* Two-path cards — each is a single clickable unit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {c.finalCta.cards.map((card, i) => (
              <motion.div
                key={card.path}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-sp-bg overflow-hidden
                           transition-colors duration-300 hover:border-sp-gold/40 hover:bg-white/[0.02]"
              >
                <Link
                  to="/kapcsolat"
                  state={{ path: card.path }}
                  className="group flex flex-col h-full p-7 md:p-10"
                >
                  {/* Arrow — signals the whole card is clickable */}
                  <div className="flex justify-end mb-6">
                    <ArrowRight
                      size={16}
                      className="text-sp-text-muted/20 group-hover:text-sp-gold/55 group-hover:translate-x-0.5 transition-all duration-200"
                    />
                  </div>

                  {/* Main title — the situation, biggest text on the card */}
                  <h3 className="font-display text-4xl md:text-5xl font-semibold text-sp-text leading-tight mb-3 group-hover:text-white transition-colors duration-200">
                    {card.mainTitle}
                  </h3>

                  {/* Subtitle — the problem/desire, second most visible */}
                  <p className="font-body text-lg text-sp-gold/75 leading-snug mb-5 group-hover:text-sp-gold transition-colors duration-200">
                    {card.subtitle}
                  </p>

                  {/* Body — short, tertiary */}
                  <p className="font-body text-sm text-sp-text-muted/55 leading-relaxed mb-8 flex-1">
                    {card.body}
                  </p>

                  {/* CTA — span because the whole card is the link */}
                  <span className="flex items-center justify-center gap-2 font-body text-sm font-medium
                                   bg-sp-gold text-sp-bg rounded-full px-7 py-3.5 w-full
                                   group-hover:bg-sp-gold-hi transition-colors duration-200">
                    {card.cta}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
