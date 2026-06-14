import { motion } from 'framer-motion'

const contrast = [
  {
    bad: 'Sablonos bemutatkozó oldal',
    good: 'Üzleti célra épített weboldal',
    bad_desc: 'Szép, de nem érti meg, mit akar a látogató. Az értéket nehéz megtalálni, a következő lépés nem egyértelmű.',
    good_desc: 'Gyorsan közvetíti, miért érdemes téged választani, és elvezeti a látogatót a kapcsolatfelvételig.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="sp-section bg-sp-surface">
      <div className="sp-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sp-section-header"
        >
          <span className="sp-eyebrow">A valódi probléma</span>
          <h2 className="sp-h2 mb-5">
            A legtöbb weboldal elveszíti<br className="hidden sm:block" /> az
            érdeklődőt az első 10 másodpercben.
          </h2>
          <p className="sp-body max-w-2xl">
            Nem azért, mert csúnya. Hanem mert a látogató nem érti elég gyorsan, hogy
            miért érdemes téged választani — és inkább továbblép. A probléma nem az esztétika.
            A probléma a lassú értékátadás.
          </p>
        </motion.div>

        {/* Contrast block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl">
          {contrast.map(({ bad, bad_desc, good, good_desc }) => (
            <div key={bad} className="space-y-4">
              {/* Bad */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-white/8 bg-sp-bg/60 p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-0.5 bg-white/30 rounded-full" />
                  </span>
                  <span className="font-body text-xs font-medium text-sp-text-muted tracking-wide">{bad}</span>
                </div>
                <p className="font-body text-sm text-sp-text-muted/75 leading-relaxed">{bad_desc}</p>
              </motion.div>

              {/* Good */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-sp-gold/25 bg-sp-bg/60 p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 rounded-full border border-sp-gold/40 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-sp-gold/70" />
                  </span>
                  <span className="font-body text-xs font-medium text-sp-gold tracking-wide">{good}</span>
                </div>
                <p className="font-body text-sm text-sp-text-dim leading-relaxed">{good_desc}</p>
              </motion.div>
            </div>
          ))}

          {/* Closer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-1 rounded-xl border border-white/6 bg-sp-bg/40 p-5 flex flex-col justify-center"
          >
            <p className="font-display text-xl md:text-2xl text-sp-text/90 leading-snug italic">
              „Ha a weboldalad nem győz meg az első 10 másodpercben,
              a látogató máshol köt ki."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
