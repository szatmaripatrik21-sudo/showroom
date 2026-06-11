import { useEffect, useRef, useState } from 'react'

interface BrowserMockupProps {
  gradient: string
  accentColor?: string
  className?: string
  contentHeight?: string
  videoSrc?: string
  posterSrc?: string
  videoLabel?: string
  videoDelay?: number
}

function videoAllowed(): boolean {
  if (typeof window === 'undefined') return false
  if (window.innerWidth < 768) return false
  const conn = (navigator as any).connection
  if (conn?.saveData) return false
  if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return false
  return true
}

export default function BrowserMockup({
  gradient,
  accentColor = '#c9a84c',
  className = '',
  contentHeight = 'h-52',
  videoSrc,
  posterSrc,
  videoLabel = 'Weboldal animált előnézete',
  videoDelay = 0,
}: BrowserMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [enabled] = useState(() => videoAllowed())

  useEffect(() => {
    if (!enabled || !videoSrc || !containerRef.current || !videoRef.current) return

    const video = videoRef.current
    let started = false
    let timer: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true
          video.src = videoSrc
          video.load()
          timer = setTimeout(() => video.play().catch(() => {}), videoDelay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => { observer.disconnect(); clearTimeout(timer) }
  }, [enabled, videoSrc, videoDelay])

  const showVideo = enabled && !!videoSrc

  return (
    <div className={`rounded-xl overflow-hidden border border-white/8 shadow-2xl ${className}`}>
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
          className={`relative ${contentHeight} overflow-hidden`}
          style={{ background: gradient }}
        >
          {/* Pre-load gradient placeholder */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: videoReady ? 0 : 1, background: gradient }}
            aria-hidden="true"
          />

          <video
            ref={videoRef}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="none"
            onCanPlay={() => setVideoReady(true)}
            aria-label={videoLabel}
            className="w-full h-full object-cover block transition-opacity duration-700 ease-out motion-reduce:transition-none"
            style={{ opacity: videoReady ? 1 : 0, borderRadius: 0 }}
          />

          {/* Subtle video indicator — appears once the video is playing */}
          {videoReady && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-white/10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-lux-gold/80 animate-pulse" />
              <span className="text-[8px] font-body tracking-[0.18em] uppercase text-white/50">Előnézet</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={`relative ${contentHeight}`} style={{ background: gradient }}>
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
