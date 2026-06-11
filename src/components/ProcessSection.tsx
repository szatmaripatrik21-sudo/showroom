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
            Így működik
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-5">
            Így készül el a weboldalad.
          </h2>
          <p className="font-body text-sm md:text-base text-lux-muted leading-relaxed">
            Egyszerű, átlátható folyamat — meglepetés nélkül. A cél, hogy az átadáskor pontosan azt kapd, amit elterveztünk.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden">
          {processSteps.map(({ number, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6 md:p-8 bg-lux-black hover:bg-lux-dark/70 transition-colors duration-300 group"
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
              <p className="font-body text-sm text-lux-muted leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
