import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '@/data/content'

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="border-b border-white/8">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center justify-between gap-4 w-full text-left py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/50 focus-visible:rounded-md"
        >
          <span className="font-display text-lg md:text-xl font-semibold text-lux-cream group-hover:text-lux-gold-light transition-colors duration-200 leading-snug">
            {q}
          </span>
          <span
            className={`flex-shrink-0 w-8 h-8 rounded-full border border-lux-gold/30 flex items-center justify-center text-lux-gold transition-transform duration-300 motion-reduce:transition-none ${
              open ? 'rotate-45 bg-lux-gold/10' : ''
            }`}
            aria-hidden="true"
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed pb-6 pr-12 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  return (
    <section id="gyik" className="border-t border-white/6 py-12 md:py-20 lg:py-36">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-12"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
            Gyakori kérdések
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-lux-cream font-semibold leading-tight">
            Amit érdemes tudni, mielőtt belevágunk.
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/8"
        >
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
