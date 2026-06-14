import { motion } from 'framer-motion'

const flow = [
  {
    label: 'Hangulat',
    desc: 'A látogató azonnal érzékeli, hogy ez a hely (vállalkozás, stílus) neki való-e.',
    job: 'Gyorsan megmutatja az értéked',
  },
  {
    label: 'Ajánlat',
    desc: 'Egyértelműen látja, mit kínálsz, kinek, és miért érdemes téged választani.',
    job: 'Csökkenti a bizonytalanságot',
  },
  {
    label: 'Bizalom',
    desc: 'Referenciák, munkabemutatás, csapat, folyamat — minden, ami megerősíti a döntést.',
    job: 'Megerősíti a döntést',
  },
  {
    label: 'Döntés',
    desc: 'A következő lépés egyértelmű: foglalás, ajánlatkérés, hívás — egy érintéssel.',
    job: 'Egyértelmű következő lépést ad',
  },
]

export default function MethodSection() {
  return (
    <section id="modszer" className="sp-section">
      <div className="sp-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sp-section-header"
        >
          <span className="sp-eyebrow">Az SP-módszer</span>
          <h2 className="sp-h2 mb-5">
            Minden oldal ugyanazon<br className="hidden sm:block" /> a logikán épül.
          </h2>
          <p className="sp-body">
            Nem esztétikai döntések sorozata — hanem egy bevált döntési útvonal,
            amelyen végigvezetjük a látogatót az első benyomástól a kapcsolatfelvételig.
          </p>
        </motion.div>

        {/* Flow: hangulat → ajánlat → bizalom → döntés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {flow.map(({ label, desc, job }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl border border-white/8 bg-sp-surface p-6 space-y-3"
            >
              {/* Step number + connector */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-4xl font-bold text-sp-gold/30 leading-none">
                  0{i + 1}
                </span>
                {i < flow.length - 1 && (
                  <span className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-sp-gold/25 text-lg z-10">
                    →
                  </span>
                )}
              </div>
              <p className="font-display text-xl font-semibold text-sp-text">{label}</p>
              <p className="font-body text-sm text-sp-text-muted leading-relaxed">{desc}</p>
              <div className="pt-2 border-t border-white/6">
                <p className="font-body text-[11px] text-sp-gold tracking-wide">{job}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
