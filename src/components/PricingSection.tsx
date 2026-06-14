import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const drivers = [
  { label: 'Oldalak száma', desc: 'Egy egyoldalas bemutató más, mint egy többoldalas, szekciókra tagolt oldal.' },
  { label: 'Funkciók', desc: 'Online foglalás, szűrők, belső keresés, integráció — ezek időt és tudást igényelnek.' },
  { label: 'Tartalmi előkészítés', desc: 'Ha a szövegek és képek rendelkezésre állnak, gyorsabb; ha nem, segítek kialakítani.' },
  { label: 'Vizuális komplexitás', desc: 'Alap vizuális irány, animációk és egyedi megoldások különböző szinteket képviselnek.' },
]

export default function PricingSection() {
  return (
    <section id="ar" className="sp-section bg-sp-surface">
      <div className="sp-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sp-section-header"
        >
          <span className="sp-eyebrow">Árazás</span>
          <h2 className="sp-h2 mb-5">Mennyibe kerül?</h2>
          <p className="sp-body">
            Az ár a projekt méretétől és igényeitől függ — ez nem kitérő, hanem a valóság.
            Amit az első válaszban mindig megadok: a nagyságrend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Price + logic */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Starting price */}
            <div className="rounded-xl border border-sp-gold/25 bg-sp-gold/4 p-6 md:p-8">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase font-medium text-sp-gold mb-3">
                Induló ár
              </p>
              <p className="font-display text-5xl md:text-6xl font-semibold text-gradient-gold leading-none mb-3">
                119.900 Ft
              </p>
              <p className="font-body text-sm text-sp-text-muted leading-relaxed">
                Ez az alap egyoldalas bemutatkozó weboldal ára, tartalom- és
                képanyag rendelkezésre állása esetén. A legtöbb projekt 119.900–350.000 Ft
                között végül elő van — az első egyeztetésen pontosítjuk.
              </p>
            </div>

            {/* What drives price */}
            <div className="space-y-3">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase font-medium text-sp-text-muted">
                Mitől függ az ár?
              </p>
              {drivers.map(({ label, desc }) => (
                <div key={label} className="flex gap-3 items-start">
                  <span className="w-1 h-1 rounded-full bg-sp-gold/50 mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-body text-sm font-medium text-sp-text">{label}: </span>
                    <span className="font-body text-sm text-sp-text-muted">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA side */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-white/8 bg-sp-bg/50 p-6 md:p-8 space-y-6 lg:sticky lg:top-28"
          >
            <div className="space-y-2">
              <p className="font-display text-2xl font-semibold text-sp-text leading-snug">
                Nem tudsz dönteni árismeret nélkül?
              </p>
              <p className="font-body text-sm text-sp-text-muted leading-relaxed">
                Röviden leírod a projektet — én az első válaszban megadom a nagyságrendet.
                Ajánlat csak akkor, ha mindkét oldalnak van értelme továbblépni.
              </p>
            </div>

            <div className="space-y-2 text-sm font-body text-sp-text-muted">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sp-gold flex-shrink-0" />
                <span>Nincs kötelezettség</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sp-gold flex-shrink-0" />
                <span>Átlagban 24 órán belül válaszolok</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sp-gold flex-shrink-0" />
                <span>Konkrét következő lépés, nem általánosság</span>
              </div>
            </div>

            <Button size="lg" className="w-full gap-2" asChild>
              <a href="#kapcsolat">Kérek egy rövid weboldal-áttekintést</a>
            </Button>
            <p className="font-body text-xs text-sp-text-muted/60 text-center leading-snug">
              Röviden leírod a helyzetet — én visszajelzek a javasolt iránnyal és a nagyságrenddel.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
