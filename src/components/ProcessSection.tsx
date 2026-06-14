import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Felmérés és cél',
    description:
      'Megnézem, milyen vállalkozásról van szó, kiket szeretnél elérni, és mi számít sikernek: több foglalás, több ajánlatkérés, jobb első benyomás vagy erősebb márka.',
    fear: 'Mennyi időt vesz el tőlem?',
    answer: '~30 perces egyeztetés vagy kérdőív — nem kell órákat készülni.',
  },
  {
    number: '02',
    title: 'Ajánlat és struktúra',
    description:
      'Felépül az oldal logikája: milyen szekciók kellenek, milyen üzenetek győzik meg a látogatót, hol legyenek a konverziós pontok. Ezt először papíron, nem pixelben.',
    fear: 'Honnan tudom, hogy jó lesz a struktúra?',
    answer: 'Egyeztetünk az irányról — csak utána kezdődik a design.',
  },
  {
    number: '03',
    title: 'Szöveg és vizuális irány',
    description:
      'Szövegezés és moodboard — az oldal hangja és megjelenése előbb szóban és képekben megjelenik, mint kódban. Ha nincs tartalom, segítek kialakítani.',
    fear: 'Kell kész szöveget adnom?',
    answer: 'Nem feltétlenül. Ha van anyagod, abból dolgozom; ha nincs, segítek.',
  },
  {
    number: '04',
    title: 'Design és fejlesztés',
    description:
      'Az egyeztetett iránya alapján épül az oldal: egyedi vizuális irány, reszponzív fejlesztés, animációk és a konverziós útvonalak kialakítása.',
    fear: 'Hány módosítást kérhetek?',
    answer: 'Egy stratégiai finomhangolási kör benne van — kisebb javítások menet közben is.',
  },
  {
    number: '05',
    title: 'Átadás és finomhangolás',
    description:
      'Mobilnézet, sebesség, CTA-k, alapSEO-ellenőrzés, majd élesítés. Átadás után rövid útmutató és admin-hozzáférés, ha a rendszer támogatja.',
    fear: 'Mi történik az átadás után?',
    answer: 'Egy finomhangolási kört kapsz az első visszajelzések alapján, külön díj nélkül.',
  },
]

export default function ProcessSection() {
  return (
    <section id="folyamat" className="sp-section">
      <div className="sp-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sp-section-header"
        >
          <span className="sp-eyebrow">Folyamat</span>
          <h2 className="sp-h2 mb-5">Így készül el a weboldalad.</h2>
          <p className="sp-body">
            Átlátható lépések, felesleges körök nélkül. Minden fázis egy konkrét félelemet szüntet meg.
          </p>
        </motion.div>

        <div className="space-y-4">
          {steps.map(({ number, title, description, fear, answer }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 rounded-xl border border-white/8 bg-sp-surface p-6 items-start"
            >
              {/* Step number */}
              <div className="font-display text-4xl font-bold text-sp-gold/30 leading-none w-12">
                {number}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold text-sp-text">{title}</h3>
                <p className="font-body text-sm text-sp-text-muted leading-relaxed">{description}</p>
              </div>

              {/* Owner fear + answer */}
              <div className="md:w-56 rounded-lg bg-sp-bg/60 border border-white/6 p-3.5 space-y-1.5 flex-shrink-0">
                <p className="font-body text-[10px] text-sp-text-muted/70 italic leading-snug">„{fear}"</p>
                <p className="font-body text-[11px] text-sp-gold leading-snug">{answer}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
