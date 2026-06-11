import { Globe, Mail, AtSign } from 'lucide-react'

const navLinks = [
  { label: 'Munkák', href: '#munkak' },
  { label: 'Szolgáltatások', href: '#szolgaltatasok' },
  { label: 'Folyamat', href: '#folyamat' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-12 pb-28 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <a href="#" className="font-display text-2xl font-semibold text-lux-cream tracking-wide hover:text-lux-gold transition-colors">
              SP<span className="text-lux-gold">.</span>
            </a>
            <p className="font-body text-xs text-lux-muted max-w-xs leading-relaxed">
              Prémium weboldalak, amik ügyfelet hoznak.
            </p>
          </div>

          {/* Nav */}
          <nav>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-body text-lux-muted hover:text-lux-gold transition-colors tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Globe, label: 'Portfólió' },
              { icon: AtSign, label: 'Közösségi' },
              { icon: Mail, label: 'E-mail', href: 'mailto:hello@example.com' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href ?? '#'}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-gold-subtle flex items-center justify-center text-lux-muted hover:text-lux-gold hover:border-lux-gold/40 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-body text-lux-muted/40">
            © 2025 SP. Minden jog fenntartva.
          </p>
          <p className="text-[11px] font-body text-lux-muted/30">
            Konverziófókuszú webdizájn · Budapest
          </p>
        </div>
      </div>
    </footer>
  )
}
