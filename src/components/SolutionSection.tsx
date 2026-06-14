import { motion } from 'framer-motion'

const chain = [
  { step: 'Több bizalom', next: 'kevesebb bizonytalanság' },
  { step: 'Több kapcsolatfelvétel', next: 'több komoly érdeklődő' },
  { step: 'Több komoly érdeklődő', next: 'jobb esély a bevételre' },
]

const situations = [
  {
    industry: 'Vendéglátás',
    color: '#d06a32',
    situation:
      'Az új vendég telefonon keres rád, 20 másodperce van. Ha nem látja azonnal a menüt, a nyitvatartást és egy képet a helyről — továbblép.',
    job: 'Hangulat, kínálat és elérhetőség azonnal, mobilon is.',
  },
  {
    industry: 'Hotel',
    color: '#5a9aba',
    situation:
      'A potenciális vendég egyszerre néz öt szállást. Az a foglalás jön létre, ahol hamarabb érti meg az élmény értékét és találja meg a foglalás útját.',
    job: 'Egyértelmű szobabemutató és közvetlen foglalási útvonal.',
  },
  {
    industry: 'Egészségügy',
    color: '#7a9a50',
    situation:
      'A páciens nem a legolcsóbbat keresi — a leghitelesebbnek tűnőt. Az átlátható, szakmai megjelenés még mielőtt egyetlen szót elolvasna.',
    job: 'Szakmaiság, csapatbemutató és frictionless időpontfoglalás.',
  },
  {
    industry: 'Szépségipar',
    color: '#c080a0',
    situation:
      'A vendég az Instagram-oldaladon látott stílus alapján keresett rád. Ha a weboldalad nem tükrözi ezt a minőséget, a bizalom megtörik.',
    job: 'Portfólió, árjegyzék és online foglalás egy helyen, stílusban.',
  },
]

export default function SolutionSection() {
  return (
    <section id="ertek" className="sp-section">
      <div className="sp-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sp-section-header"
        >
          <span className="sp-eyebrow">Üzleti érték</span>
          <h2 className="sp-h2 mb-5">
            Hogyan hoz több megkeresést<br className="hidden sm:block" /> egy jobb weboldal?
          </h2>
          <p className="sp-body">
            Nem mágikus. A logika egyszerű — és végig követhető.
          </p>
        </motion.div>

        {/* Value chain */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-2 mb-14 md:mb-20"
        >
          <span className="font-body text-sm font-semibold text-sp-text px-3 py-1.5 rounded-full bg-sp-gold/15 border border-sp-gold/30">
            Jobb weboldal
          </span>
          {chain.map(({ step, next }) => (
            <span key={step} className="flex items-center gap-2 flex-wrap">
              <span className="text-sp-gold/50 font-body text-sm">→</span>
              <span className="font-body text-sm text-sp-text-dim px-3 py-1.5 rounded-full border border-white/10 bg-white/3">
                {step}
              </span>
              <span className="text-sp-gold/50 font-body text-sm">→</span>
              <span className="font-body text-sm text-sp-text-muted px-3 py-1.5 rounded-full border border-white/8">
                {next}
              </span>
            </span>
          ))}
          <span className="flex items-center gap-2">
            <span className="text-sp-gold/50 font-body text-sm">→</span>
            <span className="font-body text-sm font-semibold text-sp-gold px-3 py-1.5 rounded-full bg-sp-gold/15 border border-sp-gold/30">
              jobb esély a bevételre
            </span>
          </span>
        </motion.div>

        {/* Industry situations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {situations.map(({ industry, color, situation, job }, i) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-white/8 bg-sp-surface p-6 space-y-3"
            >
              <span
                className="text-[9px] font-body tracking-[0.22em] uppercase font-semibold block"
                style={{ color }}
              >
                {industry}
              </span>
              <p className="font-body text-sm text-sp-text-muted leading-relaxed">{situation}</p>
              <div className="pt-1 border-t border-white/6">
                <p className="font-body text-xs font-medium text-sp-text tracking-wide">
                  A weboldal feladata: {job}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
