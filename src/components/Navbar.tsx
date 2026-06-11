import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Munkák', href: '#munkak' },
  { label: 'Szolgáltatások', href: '#szolgaltatasok' },
  { label: 'Folyamat', href: '#folyamat' },
  { label: 'Eredmény', href: '#eredmeny' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-lux-black/92 backdrop-blur-md border-b border-white/6'
          : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-2xl font-semibold text-lux-cream tracking-wide hover:text-lux-gold transition-colors duration-200">
          SP<span className="text-lux-gold">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] font-body text-lux-muted hover:text-lux-cream transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <Button variant="gold" size="sm" asChild>
            <a href="#kapcsolat">Ajánlatkérés</a>
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-lux-cream hover:text-lux-gold transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menü megnyitása"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-lux-black/96 backdrop-blur-md border-b border-white/6 px-6 pb-8 pt-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base font-body text-lux-cream-dim hover:text-lux-gold transition-colors py-3 border-b border-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button variant="gold" className="w-full" asChild>
              <a href="#kapcsolat" onClick={() => setOpen(false)}>Ajánlatkérés</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
