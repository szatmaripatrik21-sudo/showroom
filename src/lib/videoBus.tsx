import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Centralised single-playback bus for the portfolio video previews.
 *
 * Only ONE preview may play at a time. Every player claims the slot via
 * `requestPlay(id)` right before calling `video.play()`; any other player that
 * sees `activeId` change away from its own id pauses itself. A player frees the
 * slot with `release(id)` when it pauses for a reason that should let the
 * featured/hero video resume (scroll-away, manual pause, unmount).
 */
interface VideoBus {
  /** id of the preview currently allowed to play, or null when none is active */
  activeId: string | null
  /** claim the single playback slot for `id` */
  requestPlay: (id: string) => void
  /** free the slot, but only if `id` currently holds it */
  release: (id: string) => void
}

const NOOP = () => {}
const FALLBACK: VideoBus = { activeId: null, requestPlay: NOOP, release: NOOP }

const VideoBusContext = createContext<VideoBus | null>(null)

export function VideoBusProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const requestPlay = useCallback((id: string) => setActiveId(id), [])
  const release = useCallback(
    (id: string) => setActiveId((prev) => (prev === id ? null : prev)),
    [],
  )

  const value = useMemo<VideoBus>(
    () => ({ activeId, requestPlay, release }),
    [activeId, requestPlay, release],
  )

  return <VideoBusContext.Provider value={value}>{children}</VideoBusContext.Provider>
}

/** Reads the bus. Returns stable no-ops when used outside a provider. */
export function useVideoBus(): VideoBus {
  return useContext(VideoBusContext) ?? FALLBACK
}
