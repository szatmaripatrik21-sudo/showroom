import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Munkák', href: '/munkak' },
  { label: 'Ajánlat', href: '/ajanlat' },
  { label: 'Folyamat', href: '/folyamat' },
  { label: 'Ár', href: '/ar' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0908]/90 backdrop-blur-xl border-b border-white/6' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-semibold text-sp-text tracking-wide hover:text-sp-gold transition-colors duration-200"
        >
          SP<span className="text-sp-gold">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `font-body text-sm tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-sp-text' : 'text-sp-text-muted hover:text-sp-text'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/kapcsolat"
          className="hidden lg:inline-flex items-center font-body text-sm font-medium text-sp-gold
                     border border-sp-gold/40 rounded-full px-5 py-2
                     hover:bg-sp-gold/8 hover:border-sp-gold/70
                     transition-all duration-200"
        >
          Áttekintést kérek
        </Link>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-sp-text hover:text-sp-gold transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0a0908]/96 backdrop-blur-xl border-b border-white/6 px-6 pb-8 pt-2">
          <ul className="flex flex-col divide-y divide-white/6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `block py-4 font-body text-base transition-colors ${
                      isActive ? 'text-sp-text' : 'text-sp-text-muted'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/kapcsolat"
            className="mt-6 flex items-center justify-center font-body text-sm font-medium text-sp-gold
                       border border-sp-gold/40 rounded-full px-5 py-3
                       hover:bg-sp-gold/8 transition-all duration-200"
          >
            Áttekintést kérek
          </Link>
        </div>
      )}
    </header>
  )
}
