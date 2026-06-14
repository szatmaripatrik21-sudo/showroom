import { Link } from 'react-router-dom'
import { site } from '@/config/site'

const links = [
  { label: 'Munkák', href: '/munkak' },
  { label: 'Ajánlat', href: '/ajanlat' },
  { label: 'Folyamat', href: '/folyamat' },
  { label: 'Ár', href: '/ar' },
  { label: 'Kapcsolat', href: '/kapcsolat' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-1">
            <Link to="/" className="font-display text-xl font-semibold text-sp-text">
              SP<span className="text-sp-gold">.</span>
            </Link>
            <p className="font-body text-sm text-sp-text-muted">
              Prémium weboldalak vállalkozásoknak
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="font-body text-sm text-sp-text-muted hover:text-sp-text transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-xs text-sp-text-muted/50">
            © {year} {site.brand}. Minden jog fenntartva.
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="font-body text-xs text-sp-text-muted/50 hover:text-sp-gold transition-colors duration-200"
          >
            {site.contact.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
