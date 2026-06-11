import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const solutionPoints = [
  {
    title: 'Egyértelmű ajánlat',
    description: 'A látogató azonnal érti, mit kap — és mit tegyen, ha érdekli.',
  },
  {
    title: 'Gyors mobilélmény',
    description: 'Telefonon is tökéletes — ahol az ügyfeleid többsége keres.',
  },
  {
    title: 'Bizalomépítő szerkezet',
    description: 'Vélemények, referenciák, fotók — minden, ami meggyőzi a bizonytalan látogatót.',
  },
  {
    title: 'Prémium márkaérzet',
    description: 'Az oldal tükrözze azt a minőséget, amit a vállalkozásod nyújt.',
  },
]

export default function SolutionSection() {
  return (
    <section className="border-t border-white/6 py-20 md:py-36 bg-lux-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            A megoldás
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-lux-cream font-semibold leading-tight mb-5">
            Nem csak szép weboldalt kapsz.{' '}
            <span className="text-gradient-gold">Üzleti eszközt.</span>
          </h2>

          {/* Core sales hook */}
          <p className="font-display text-2xl md:text-3xl text-lux-gold font-light italic leading-snug mb-6">
            A weboldalad nem dísz. Értékesítési felület.
          </p>

          <p className="font-body text-sm md:text-base text-lux-muted leading-relaxed mb-8">
            Minden weboldal, amit készítek, arra épül, hogy a látogatóból ügyfél legyen — nem hogy valaki
            csak megnézze az oldalad, hanem hogy vásároljon, érdeklődjön, vagy felvegye veled a kapcsolatot.
          </p>

          {/* Journey line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-lux-gold/40 flex-shrink-0" />
            <span className="font-body text-xs text-lux-muted/80 tracking-wide">
              A látogatót végigvezetjük: hangulat&nbsp;→&nbsp;ajánlat&nbsp;→&nbsp;bizalom&nbsp;→&nbsp;döntés.
            </span>
          </div>

          {/* Cost-of-inaction beat (salvaged from the removed ProblemSection) */}
          <p className="font-display text-xl md:text-2xl text-lux-cream/85 leading-snug">
            Ha a weboldalad nem győz meg, a látogató máshol köt ki.
          </p>
        </motion.div>

        {/* Solution grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {solutionPoints.map(({ title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-4 p-6 rounded-xl border border-white/6 hover:border-lux-gold/25 transition-colors duration-300 bg-lux-black/40"
            >
              <CheckCircle2
                size={18}
                className="flex-shrink-0 mt-0.5 text-lux-gold group-hover:text-lux-gold-light transition-colors"
              />
              <div>
                <h3 className="font-display text-lg font-semibold text-lux-cream mb-1.5">{title}</h3>
                <p className="font-body text-sm text-lux-muted leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
