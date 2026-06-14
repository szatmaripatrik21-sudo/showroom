import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Offer grouped into outcome buckets — owners buy fewer lost leads, not "meta-adatok"
const buckets = [
  {
    title: 'Stratégia',
    outcome: 'Pontosan tudod, mit és kinek kommunikál az oldal',
    items: [
      'Üzleti cél és célcsoport felmérése',
      'Versenykörnyezet és iparági logika áttekintése',
      'Struktúra- és IA-terv a döntési úthoz igazítva',
    ],
  },
  {
    title: 'Szöveg és struktúra',
    outcome: 'A látogató vernie kell meggyőzni, nem csak tájékoztatni',
    items: [
      'Magyar piacra írt, értékesítésre optimalizált szövegek',
      'Fejlécek, CTA-k és trust-jelek az egész oldalon',
      'A tartalom és a konverziós logika illeszkedik egymáshoz',
    ],
  },
  {
    title: 'Design és kivitelezés',
    outcome: 'Egyedi vizuális irány, sablontól mentes kivitelezés',
    items: [
      'Iparághoz illő, egyedi vizuális irány',
      'Reszponzív, mobilra optimalizált fejlesztés',
      'Animációk, mikro-interakciók — célzottan, nem öncélúan',
    ],
  },
  {
    title: 'Átadás és finomhangolás',
    outcome: 'Az oldal élesítés után is kezelhető marad',
    items: [
      'Élesítés, gyorsítás, alap SEO-struktúra',
      'Rövid kezelési útmutató és admin-hozzáférés',
      'Egy finomhangolási kör az első visszajelzések alapján',
    ],
  },
]

export default function OfferBlock() {
  return (
    <section id="ajanlat" className="sp-section bg-sp-surface">
      <div className="sp-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sp-section-header"
        >
          <span className="sp-eyebrow">Az ajánlat</span>
          <h2 className="sp-h2 mb-5">
            Mit kapsz — és miért éri meg.
          </h2>
          <p className="sp-body">
            Nem egy dizájnt kapsz. Egy üzleti eszközt — amelynek minden része azon dolgozik,
            hogy a látogató ne csak nézelődjön, hanem lépjen.
          </p>
        </motion.div>

        {/* Outcome buckets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-14">
          {buckets.map(({ title, outcome, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-white/8 bg-sp-bg/50 p-6 space-y-4"
            >
              <div>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold text-sp-gold block mb-2">
                  {title}
                </span>
                <p className="font-display text-lg font-semibold text-sp-text leading-snug">
                  {outcome}
                </p>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <span className="w-1 h-1 rounded-full bg-sp-gold/60 mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-sp-text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Guarantee + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-sp-gold/20 bg-sp-gold/4 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase font-medium text-sp-gold">
              Garancia
            </p>
            <p className="font-display text-lg md:text-xl text-sp-text/90 italic leading-snug max-w-lg">
              Ha az első irány nem találja el pontosan az elképzelést,
              egy stratégiai finomhangolási kört külön díj nélkül kapsz.
            </p>
            <div className="flex items-start gap-2 pt-1">
              <CalendarDays size={14} className="text-sp-gold flex-shrink-0 mt-0.5" />
              <span className="font-body text-sm text-sp-text-muted">
                7–14 napos indulási ütemezés a tartalmak beérkezése után
              </span>
            </div>
          </div>
          <Button size="lg" className="shrink-0 gap-2" asChild>
            <a href="#kapcsolat">Kérek egy rövid weboldal-áttekintést</a>
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
