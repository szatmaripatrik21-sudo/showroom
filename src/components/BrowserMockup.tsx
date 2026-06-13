import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { useVideoBus } from '@/lib/videoBus'

interface BrowserMockupProps {
  gradient: string
  accentColor?: string
  className?: string
  videoSrc?: string
  posterSrc?: string
  videoLabel?: string
  /** Unique id used by the single-playback bus (use the project id) */
  videoId?: string
  /** 'featured' may autoplay when in view; 'secondary' is click-to-play only */
  mode?: 'featured' | 'secondary'
  /** Project name — used for the accessible play/pause labels */
  projectName?: string
  /** object-position of the preview video, e.g. '80% center' to focus right */
  videoPosition?: string
  /** object-fit of the preview video — 'cover' (default, fills frame) or 'contain' (shows full video) */
  videoFit?: 'cover' | 'contain'
}

/** Only the FEATURED video autoplays — and only on connections that can afford it. */
function autoplayAllowed(): boolean {
  if (typeof window === 'undefined') return false
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }).connection
  if (conn?.saveData) return false
  if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return false
  return true
}

export default function BrowserMockup({
  gradient,
  accentColor = '#c9a84c',
  className = '',
  videoSrc,
  posterSrc,
  videoLabel = 'Weboldal animált előnézete',
  videoId = '',
  mode = 'secondary',
  projectName = 'projekt',
  videoPosition = 'center',
  videoFit = 'cover',
}: BrowserMockupProps) {
  const { activeId, requestPlay, release } = useVideoBus()

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const srcAttachedRef = useRef(false)

  const [inView, setInView] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasFrame, setHasFrame] = useState(false) // a still or live frame is ready to show
  const [frameRatio, setFrameRatio] = useState('16/9')
  const [autoplayOk] = useState(autoplayAllowed)
  const [controlsVisible, setControlsVisible] = useState(false) // pause hint auto-hides
  const hideTimerRef = useRef<number | null>(null)

  const isActive = activeId === videoId

  // Reveal the pause hint, then fade it after a beat of inactivity so it never
  // lingers indefinitely over a playing clip (classic video-player behaviour).
  const pokeControls = useCallback(() => {
    setControlsVisible(true)
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => setControlsVisible(false), 1600)
  }, [])
  const hideControls = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    setControlsVisible(false)
  }, [])
  useEffect(() => () => { if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current) }, [])

  // Attach the file's src lazily. `eager` → preload the whole clip (featured /
  // a user-initiated play); otherwise just metadata so a still frame renders.
  const attachSrc = useCallback(
    (eager: boolean) => {
      const v = videoRef.current
      if (!v || !videoSrc) return
      if (srcAttachedRef.current) {
        if (eager && v.preload !== 'auto') v.preload = 'auto'
        return
      }
      v.preload = eager ? 'auto' : 'metadata'
      v.src = videoSrc
      // Only the offscreen still-preview path forces a load(); when a play is
      // imminent, calling load() here would abort the very next play() promise.
      if (!eager) v.load()
      srcAttachedRef.current = true
    },
    [videoSrc],
  )

  const startPlayback = useCallback(() => {
    const v = videoRef.current
    if (!v || !videoSrc) return
    attachSrc(true)
    requestPlay(videoId) // claim the single slot — pauses every other player
    // `isPlaying` is driven by the element's real play/pause events (onPlay/
    // onPause below), never by this promise — so the play overlay can never get
    // stuck on top of a clip that is actually playing, even if play() rejects
    // after being interrupted by a concurrent pause.
    const played = v.play()
    if (played && typeof played.catch === 'function') {
      played.catch(() => {
        // Genuinely blocked (e.g. data-saver autoplay): only yield the slot if
        // the element truly didn't start. An interrupted-but-playing clip keeps
        // the slot and stays correct via onPlay.
        if (v.paused) release(videoId)
      })
    }
  }, [videoSrc, videoId, attachSrc, requestPlay, release])

  const pausePlayback = useCallback(
    (releaseSlot: boolean) => {
      const v = videoRef.current
      if (v && !v.paused) v.pause()
      setIsPlaying(false)
      if (releaseSlot) release(videoId)
    },
    [release, videoId],
  )

  const adoptNativeRatio = () => {
    const v = videoRef.current
    if (v && v.videoWidth > 0 && v.videoHeight > 0) setFrameRatio(`${v.videoWidth}/${v.videoHeight}`)
  }
  const revealFrame = () => setHasFrame(true)

  // Buffer a still ahead of arrival: featured eagerly, secondary as metadata.
  useEffect(() => {
    if (!videoSrc || !containerRef.current) return
    const el = containerRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          attachSrc(mode === 'featured' && autoplayOk)
          obs.disconnect()
        }
      },
      { rootMargin: '700px 0px 700px 0px', threshold: 0 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [videoSrc, attachSrc, mode, autoplayOk])

  // Track real visibility — drives featured autoplay and pause-on-leave.
  useEffect(() => {
    if (!videoSrc || !containerRef.current) return
    const el = containerRef.current
    const obs = new IntersectionObserver((entries) => setInView(entries[0].isIntersecting), {
      // Lower threshold so the large featured preview reliably counts as in-view
      // (and autoplays) even on shorter laptop viewports.
      threshold: 0.3,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [videoSrc])

  // FEATURED: autoplay when it scrolls into view and nothing else is active;
  // pause + yield the slot when it scrolls away (so a manual pick can resume it).
  useEffect(() => {
    if (mode !== 'featured' || !videoSrc || !autoplayOk) return
    if (inView && activeId === null) startPlayback()
    // Intentional reaction to visibility/bus changes — converges (guarded), no cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (!inView && isActive) pausePlayback(true)
  }, [mode, videoSrc, autoplayOk, inView, activeId, isActive, startPlayback, pausePlayback])

  // SECONDARY: never autoplays. Pause when it leaves the viewport; no auto-resume.
  useEffect(() => {
    if (mode !== 'secondary') return
    // Pause-on-leave: intentional, guarded reaction to visibility change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!inView && isPlaying) pausePlayback(true)
  }, [mode, inView, isPlaying, pausePlayback])

  // SINGLE-PLAY: another card claimed the slot → pause this one (it doesn't own
  // the slot, so it must NOT release it).
  useEffect(() => {
    if (activeId !== null && !isActive && isPlaying) {
      const v = videoRef.current
      if (v && !v.paused) v.pause()
      // Another card took the single slot — mirror that into local state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(false)
    }
  }, [activeId, isActive, isPlaying])

  // Free the slot if this player unmounts (e.g. category filter swap) while active.
  useEffect(() => () => release(videoId), [release, videoId])

  // Play affordance: secondary always (until it plays); featured only as a
  // graceful fallback when autoplay didn't start (blocked / data-saver).
  const showPlay =
    !isPlaying &&
    (mode === 'secondary' || (mode === 'featured' && inView && activeId === null))

  const showVideo = !!videoSrc

  return (
    <div className={`overflow-hidden shadow-2xl ${className}`}>
      {/* Browser chrome */}
      <div className="bg-[#1a1410] px-3 py-2.5 flex items-center gap-2.5 border-b border-white/8">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 bg-lux-brown rounded-md h-5 mx-1 flex items-center px-3">
          <div className="w-16 h-1.5 rounded-full bg-white/15" />
        </div>
      </div>

      {showVideo ? (
        <div
          ref={containerRef}
          className="group/media relative w-full overflow-hidden"
          style={{ background: gradient, aspectRatio: frameRatio }}
          onPointerMove={isPlaying ? pokeControls : undefined}
          onPointerDown={isPlaying ? pokeControls : undefined}
          onPointerLeave={hideControls}
        >
          {/* Gradient/dark placeholder — also the tasteful fallback for posterless stills */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: hasFrame ? 0 : 1, background: gradient }}
            aria-hidden="true"
          />

          <video
            ref={videoRef}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="none"
            onLoadedMetadata={adoptNativeRatio}
            onLoadedData={revealFrame}
            onCanPlay={revealFrame}
            onPlaying={revealFrame}
            onPlay={() => { setIsPlaying(true); pokeControls() }}
            onPause={() => { setIsPlaying(false); hideControls() }}
            aria-label={videoLabel}
            className="w-full h-full object-cover block transition-opacity duration-700 ease-out motion-reduce:transition-none"
            style={{ opacity: hasFrame ? 1 : 0, borderRadius: 0, objectFit: videoFit, objectPosition: videoPosition }}
          />

          {/* Small "video preview" tag on idle secondary cards */}
          {showPlay && mode === 'secondary' && (
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-white/10 pointer-events-none">
              <Play size={9} className="text-lux-gold/90" fill="currentColor" />
              <span className="text-[8px] font-body tracking-[0.18em] uppercase text-white/65">Videó előnézet</span>
            </div>
          )}

          {/* Soft scrim under the play affordance so labels stay readable on any still */}
          {showPlay && (
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35 transition-opacity duration-300"
              aria-hidden="true"
            />
          )}

          {/* PLAY — real button, full-area tap target, brightens on hover/focus */}
          {showPlay && (
            <button
              type="button"
              onClick={startPlayback}
              aria-label={`Videó lejátszása: ${projectName}`}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/70 focus-visible:ring-inset"
            >
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black/45 backdrop-blur-md border border-lux-gold/40 text-lux-gold shadow-lg shadow-black/40 transition-all duration-300 group-hover/media:scale-105 group-hover/media:bg-black/60 group-hover/media:border-lux-gold/70 motion-reduce:transition-none">
                <Play size={22} className="ml-0.5" fill="currentColor" />
              </span>
              <span className="flex flex-col items-center gap-0.5">
                <span className="font-body text-sm font-medium text-lux-cream tracking-wide">
                  Lejátszás
                </span>
                <span className="font-body text-[10px] tracking-[0.18em] uppercase text-white/55">
                  Kattints a demó megtekintéséhez
                </span>
              </span>
            </button>
          )}

          {/* PAUSE — active video; click anywhere pauses, icon appears on hover/focus */}
          {isPlaying && (
            <button
              type="button"
              onClick={() => pausePlayback(true)}
              onFocus={pokeControls}
              aria-label={`Videó szüneteltetése: ${projectName}`}
              className="absolute inset-0 z-20 flex items-center justify-center bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/60 focus-visible:ring-inset"
            >
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white/85 transition-opacity duration-300 motion-reduce:transition-none ${
                  controlsVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Pause size={18} fill="currentColor" />
              </span>
            </button>
          )}

          {/* Buffering chip while a started clip is still loading its first frame */}
          {isPlaying && !hasFrame && (
            <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-white/10 pointer-events-none">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: `${accentColor}cc` }}
              />
              <span className="text-[8px] font-body tracking-[0.18em] uppercase text-white/50">
                Előnézet betöltése…
              </span>
            </div>
          )}

          {/* Subtle "live" chip while actually playing */}
          {isPlaying && hasFrame && (
            <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-white/10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-lux-gold/80 animate-pulse" />
              <span className="text-[8px] font-body tracking-[0.18em] uppercase text-white/50">Élő előnézet</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="relative w-full" style={{ background: gradient, aspectRatio: '4/3' }}>
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-10 h-2 rounded-full bg-white/25" />
                <div className="flex gap-3">
                  <div className="w-6 h-1.5 rounded-full bg-white/20" />
                  <div className="w-6 h-1.5 rounded-full bg-white/20" />
                  <div className="w-6 h-1.5 rounded-full bg-white/20" />
                </div>
                <div className="w-14 h-5 rounded-full border border-white/30" />
              </div>
              <div className="space-y-2">
                <div className="w-3/4 h-3 rounded-full bg-white/30" />
                <div className="w-1/2 h-3 rounded-full bg-white/20" />
                <div className="w-5/6 h-2 rounded-full bg-white/15 mt-1" />
                <div className="flex gap-2 mt-3">
                  <div className="w-20 h-6 rounded-full" style={{ backgroundColor: `${accentColor}80` }} />
                  <div className="w-16 h-6 rounded-full border border-white/30" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0f0b07] px-5 py-4 space-y-2.5">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accentColor }} />
              <div className="flex-1 space-y-1.5">
                <div className="w-full h-2 rounded-full bg-white/12" />
                <div className="w-4/5 h-2 rounded-full bg-white/8" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-7 rounded-lg bg-white/5 border border-white/8" />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
