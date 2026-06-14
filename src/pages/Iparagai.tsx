import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/data/projects'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' } }),
}

export default function Iparagai() {
  return (
    <>
      <section className="pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Iparágak
            </span>
            <h1 className="font-display font-semibold text-6xl md:text-7xl lg:text-8xl text-sp-text leading-[0.93] max-w-3xl mb-8">
              Nem minden weboldalnak ugyanazt kell eladnia.
            </h1>
            <p className="font-body text-xl text-sp-text-muted max-w-lg leading-relaxed">
              Más kérdése van egy hotelvendégnek és egy páciensnek. A weboldal akkor működik,
              ha pontosan a te látogatód bizonytalanságára válaszol.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 md:pb-48 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="divide-y divide-white/6">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.slug}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                <Link
                  to={`/iparagai/${ind.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 py-12 md:py-16 items-center"
                >
                  <div>
                    <span className="block mb-3 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
                      {ind.label}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-sp-text group-hover:text-sp-gold transition-colors duration-200 leading-tight mb-3">
                      {ind.headline}
                    </h2>
                    <p className="font-body text-base text-sp-text-muted leading-relaxed max-w-xl">
                      {ind.conversionPoint}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-sp-text-muted group-hover:text-sp-gold group-hover:translate-x-1 transition-all duration-200 shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
