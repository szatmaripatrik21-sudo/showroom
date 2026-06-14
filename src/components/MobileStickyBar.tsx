import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'

// Persistent mobile-only CTA. Hidden on lg+ (desktop nav already shows the CTA).
// Appears after the user scrolls past the hero, so it never covers the hero itself.
export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40
                  bg-lux-black/90 backdrop-blur-md border-t border-amber-400/20
                  shadow-[0_-8px_40px_rgba(0,0,0,0.75)]
                  px-4 py-3
                  transition-all duration-300
                  ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
    >
      <Button size="lg" className="w-full gap-2.5" asChild>
        <a href="#kapcsolat">
          <CalendarDays size={17} />
          Weboldal-áttekintés kérése
        </a>
      </Button>
    </div>
  )
}
