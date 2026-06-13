import { motion } from 'framer-motion'
import { processSteps } from '@/data/content'

export default function ProcessSection() {
  return (
    <section id="folyamat" className="border-t border-white/6 py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Folyamat
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-5">
            Így készül el a weboldalad.
          </h2>
          <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed">
            Átlátható folyamat, felesleges körök nélkül. Először megértjük az üzleti célt, utána épül rá a
            struktúra, a design és a technikai megvalósítás.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                        lg:grid lg:grid-cols-4 lg:gap-px lg:bg-white/6 lg:rounded-2xl lg:overflow-hidden lg:pb-0">
          {processSteps.map(({ number, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative snap-start shrink-0 w-[78%] sm:w-[55%] rounded-2xl border border-white/8 p-6 bg-lux-black hover:bg-lux-dark/70 transition-colors duration-300 group lg:w-auto lg:rounded-none lg:border-0 lg:p-8"
            >
              {/* Step number */}
              <div className="font-display text-5xl font-bold text-gradient-gold mb-6 leading-none">
                {number}
              </div>

              {/* Connector arrow on desktop */}
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-4 h-4 translate-x-2 z-10">
                  <div className="w-2 h-px bg-lux-gold/30 absolute top-1/2 -translate-y-1/2 right-0 translate-x-full" />
                </div>
              )}

              <h3 className="font-display text-xl font-semibold text-lux-cream mb-3 leading-tight">
                {title}
              </h3>
              <p className="font-body text-sm text-lux-cream-dim/80 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
