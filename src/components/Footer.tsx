import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

const navLinks = [
  { label: 'Munkák', href: '#munkak' },
  { label: 'Szolgáltatások', href: '#szolgaltatasok' },
  { label: 'Folyamat', href: '#folyamat' },
  { label: 'Eredmény', href: '#eredmeny' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/6 py-14 pb-28 lg:pb-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_auto] gap-10 md:gap-12 items-start">
          {/* Brand + positioning */}
          <div className="space-y-3">
            <a href="#" className="font-display text-2xl font-semibold text-lux-cream tracking-wide hover:text-lux-gold transition-colors">
              {site.brand}<span className="text-lux-gold">{site.brandDot}</span>
            </a>
            <p className="font-body text-sm text-lux-cream-dim/75 max-w-xs leading-relaxed">
              {site.positioning}
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 font-body text-sm text-lux-cream-dim/80 hover:text-lux-gold transition-colors pt-1"
            >
              <Mail size={14} />
              {site.contact.email}
            </a>
          </div>

          {/* Nav */}
          <nav aria-label="Lábléc navigáció">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-body text-lux-cream-dim/75 hover:text-lux-gold transition-colors tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <Button variant="gold" asChild className="w-full md:w-auto">
            <a href="#kapcsolat">Kérek egy ajánlatot</a>
          </Button>
        </div>

        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-body text-lux-cream-dim/45">
            © {year} {site.brand}. Minden jog fenntartva.
          </p>
          <p className="text-[11px] font-body text-lux-cream-dim/40">
            Konverziófókuszú webdizájn · {site.contact.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
