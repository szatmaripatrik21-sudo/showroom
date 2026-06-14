import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { industries } from '@/data/content'
import type { Industry } from '@/data/content'
import type { ProjectCategory } from '@/data/projects'

// Decision logic per industry: hesitation → website's job → CTA
const industryLogic: Record<ProjectCategory, { hesitation: string; job: string; cta: string }> = {
  hospitality: {
    hesitation: 'Megtalálja a menüt és a nyitvatartást? Érti az első 5 másodpercben, milyen hely ez?',
    job: 'Gyorsan megmutatni a hangulatot, kínálatot és a helyszínt — mobilon is, útközben is.',
    cta: 'Asztalfoglalás vagy kapcsolatfelvétel egy érintéssel',
  },
  hotel: {
    hesitation: 'Érdemes itt megszállni? Milyen az élmény? Hogyan foglalok — és miért közvetlenül, ne OTA-n?',
    job: 'Megmutatni az élményt, egyértelművé tenni a szobákat, és a közvetlen foglalás útját rövidre szabni.',
    cta: 'Közvetlen foglalás — kevesebb közvetítő, több bevétel',
  },
  health: {
    hesitation: 'Megbízható ez a rendelő? Kompetens az orvos? Hogyan kérek időpontot?',
    job: 'Szakmaiságot és hitelt közvetíteni még mielőtt a páciens dönt — és frictionless időpontkérést adni.',
    cta: 'Egyszerű időpontfoglalás, félelem nélkül',
  },
  beauty: {
    hesitation: 'A stílusa illik hozzám? Milyen minőségű a munka? Hogyan foglalok?',
    job: 'A vizuális minőséget és a stílust egyből megmutatni — és az online foglalást egy lépéssé tenni.',
    cta: 'Portfólió, árak és foglalás egy helyen',
  },
}

export default function IndustryTabs() {
  const [active, setActive] = useState<ProjectCategory>('hospitality')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = industries.find((i) => i.id === active) as Industry
  const logic = industryLogic[active]

  const onTabKeyDown = (e: KeyboardEvent, index: number) => {
    const last = industries.length - 1
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === -1) return
    e.preventDefault()
    setActive(industries[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="szolgaltatasok" className="sp-section bg-sp-surface">
      <div className="sp-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sp-section-header"
        >
          <span className="sp-eyebrow">Iparági logika</span>
          <h2 className="sp-h2 mb-5">
            Nem minden weboldalnak<br className="hidden sm:block" /> ugyanazt kell eladnia.
          </h2>
          <p className="sp-body">
            Más kérdése van egy hotelvendégnek és egy páciensnek. A weboldal akkor működik,
            ha pontosan a te látogatód bizonytalanságára válaszol.
          </p>
        </motion.div>

        {/* Tab nav */}
        <div
          role="tablist"
          aria-label="Iparágak"
          className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-1 mb-10
                     border-b border-white/8 pb-0
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {industries.map((ind, i) => {
            const selected = active === ind.id
            return (
              <button
                key={ind.id}
                ref={(el) => { tabRefs.current[i] = el }}
                role="tab"
                id={`tab-${ind.id}`}
                aria-selected={selected}
                aria-controls={`panel-${ind.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(ind.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`flex-shrink-0 whitespace-nowrap px-4 md:px-5 py-3 text-xs font-body font-medium
                           tracking-[0.1em] uppercase transition-all duration-200 border-b-2 -mb-px
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sp-gold/60
                           focus-visible:rounded-sm ${
                             selected
                               ? 'text-sp-gold border-sp-gold'
                               : 'text-sp-text-muted border-transparent hover:text-sp-text hover:border-white/20'
                           }`}
              >
                {ind.label}
              </button>
            )
          })}
        </div>

        {/* Panel — decision logic format */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          >
            {/* Hesitation */}
            <div className="rounded-xl border border-white/8 bg-sp-bg/50 p-6 space-y-3">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold text-sp-text-muted">
                A látogató kérdése
              </p>
              <p className="font-body text-sm text-sp-text-dim leading-relaxed">
                „{logic.hesitation}"
              </p>
            </div>

            {/* Website's job */}
            <div
              className="rounded-xl border p-6 space-y-3"
              style={{ borderColor: `${current.accentColor}40`, background: `${current.accentColor}08` }}
            >
              <p
                className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold"
                style={{ color: current.accentColor }}
              >
                A weboldal feladata
              </p>
              <p className="font-body text-sm text-sp-text leading-relaxed">{logic.job}</p>
            </div>

            {/* CTA */}
            <div className="rounded-xl border border-sp-gold/20 bg-sp-gold/5 p-6 space-y-3">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold text-sp-gold">
                Fő konverziós pont
              </p>
              <p className="font-body text-sm text-sp-text leading-relaxed">{logic.cta}</p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
