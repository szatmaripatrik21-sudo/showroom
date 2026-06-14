import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send, ShieldCheck, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

interface FormState {
  nev: string
  email: string
  businessType: string
  currentUrl: string
  mainProblem: string
  goal: string
  message: string
}

const EMPTY: FormState = {
  nev: '',
  email: '',
  businessType: '',
  currentUrl: '',
  mainProblem: '',
  goal: '',
  message: '',
}

// Post-submit sequence — visible BEFORE submitting so the next step is clear
const nextSteps = [
  { n: '1', label: 'Elküldöd a kérdőívet', desc: 'Néhány perc, nincs kötelezettség' },
  { n: '2', label: '24 órán belül válaszolok', desc: 'Megnézem a helyzetet, esetleg a meglévő weboldaladat is' },
  { n: '3', label: 'Jelzem a javasolt irányt', desc: 'Konkrét visszajelzés — mi hiányzik, mit érdemes másképp' },
  { n: '4', label: 'Ha van értelme, ajánlat', desc: 'Konkrét ár és menetrend — csak ha mindkét oldalnak van értelme' },
]

const inputBase =
  'w-full rounded-lg bg-sp-bg/50 border border-white/10 px-4 py-3 font-body text-sm text-sp-text placeholder:text-sp-text-muted/50 transition-colors duration-200 focus:outline-none focus:border-sp-gold/60 focus:ring-1 focus:ring-sp-gold/30'

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.nev.trim()) next.nev = 'Kérlek add meg a neved.'
    if (!form.email.trim()) next.email = 'Kérlek add meg az e-mail címed.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Ez nem tűnik érvényes e-mail címnek.'
    if (!form.goal.trim()) next.goal = 'Írd le röviden, mi lenne a fő cél.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  return (
    <section id="kapcsolat" className="sp-section bg-sp-surface scroll-mt-24">
      <div className="sp-container">

        {/* Section header — relocated from former FinalCTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-8 md:mb-14"
        >
          <span className="sp-eyebrow">Dolgozzunk együtt</span>
          <h2 className="sp-h2 mb-5">
            Kérj egy rövid weboldal-áttekintést.
          </h2>
          <p className="sp-body max-w-2xl">
            Röviden leírod, mire van szükséged — én megnézem a helyzetet
            és visszajelzek: mit érdemes másképp, mi hiányzik, és mi lenne a javasolt irány.
            Ajánlat csak akkor, ha mindkét oldalnak van értelme.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: what happens next + reassurances */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 lg:sticky lg:top-28"
          >
            {/* Post-submit sequence — visible before submitting */}
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase font-medium text-sp-text-muted mb-4">
                Mi történik ezután?
              </p>
              <div className="space-y-3">
                {nextSteps.map(({ n, label, desc }) => (
                  <div key={n} className="flex gap-3.5 items-start">
                    <span className="w-7 h-7 rounded-full border border-sp-gold/30 bg-sp-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-body text-[11px] font-semibold text-sp-gold">{n}</span>
                    </span>
                    <div>
                      <p className="font-body text-sm font-medium text-sp-text">{label}</p>
                      <p className="font-body text-xs text-sp-text-muted mt-0.5">{desc}</p>
                    </div>
                    {+n < nextSteps.length && (
                      <ArrowRight size={12} className="text-sp-gold/25 mt-1.5 flex-shrink-0 self-center ml-auto hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reassurances */}
            <div className="space-y-2.5">
              {[
                { icon: Clock, text: 'Átlagban 24 órán belül válaszolok' },
                { icon: CheckCircle2, text: 'Konkrét visszajelzés — nem általánosság' },
                { icon: ShieldCheck, text: 'Nincs spam, nincs agresszív értékesítés' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={14} className="text-sp-gold flex-shrink-0" aria-hidden="true" />
                  <span className="font-body text-sm text-sp-text-muted">{text}</span>
                </div>
              ))}
            </div>

            <p className="font-body text-xs text-sp-text-muted/60">
              Inkább e-mailben?{' '}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-sp-gold hover:text-sp-gold-hi underline underline-offset-4 transition-colors"
              >
                {site.contact.email}
              </a>
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            id="ajanlatkeres"
            className="card-luxury rounded-2xl p-6 md:p-8 scroll-mt-24"
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 px-4">
                <div className="w-14 h-14 rounded-full bg-sp-gold/12 border border-sp-gold/30 flex items-center justify-center mb-5">
                  <CheckCircle2 size={26} className="text-sp-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-sp-text mb-3">
                  Köszönöm, megkaptam!
                </h3>
                <p className="font-body text-sm text-sp-text-muted leading-relaxed max-w-sm">
                  24 órán belül visszajelzek — megnézem a helyzetet és jelzem, mi lenne a javasolt irány.
                  Ha sürgős, a fenti e-mail címen közvetlenül is elérsz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Név + E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Név" htmlFor="nev" required error={errors.nev}>
                    <input
                      id="nev" type="text" autoComplete="name"
                      value={form.nev} onChange={(e) => set('nev', e.target.value)}
                      aria-invalid={!!errors.nev}
                      className={`${inputBase} ${errors.nev ? 'border-red-500/60' : ''}`}
                      placeholder="Teljes neved"
                    />
                  </Field>
                  <Field label="E-mail" htmlFor="email" required error={errors.email}>
                    <input
                      id="email" type="email" autoComplete="email"
                      value={form.email} onChange={(e) => set('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      className={`${inputBase} ${errors.email ? 'border-red-500/60' : ''}`}
                      placeholder="nev@example.com"
                    />
                  </Field>
                </div>

                {/* Vállalkozás típusa */}
                <Field label="Vállalkozás típusa" htmlFor="businessType">
                  <input
                    id="businessType" type="text"
                    value={form.businessType} onChange={(e) => set('businessType', e.target.value)}
                    className={inputBase}
                    placeholder="Pl. étterem, fogászat, hotel, szépségszalon"
                  />
                </Field>

                {/* Meglévő weboldal linkje */}
                <Field label="Jelenlegi weboldal URL" htmlFor="currentUrl">
                  <input
                    id="currentUrl" type="text" inputMode="url"
                    value={form.currentUrl} onChange={(e) => set('currentUrl', e.target.value)}
                    className={inputBase}
                    placeholder="https://... (ha nincs, hagyd üresen)"
                  />
                </Field>

                {/* Fő probléma */}
                <Field label="Mi a fő probléma a jelenlegi online jelenléteddel?" htmlFor="mainProblem">
                  <input
                    id="mainProblem" type="text"
                    value={form.mainProblem} onChange={(e) => set('mainProblem', e.target.value)}
                    className={inputBase}
                    placeholder="Pl. kevés megkeresés, elavult kinézet, nem mobil-barát"
                  />
                </Field>

                {/* Fő cél */}
                <Field label="Mi a fő cél az új oldallal?" htmlFor="goal" required error={errors.goal}>
                  <input
                    id="goal" type="text"
                    value={form.goal} onChange={(e) => set('goal', e.target.value)}
                    aria-invalid={!!errors.goal}
                    className={`${inputBase} ${errors.goal ? 'border-red-500/60' : ''}`}
                    placeholder="Pl. több foglalás, jobb első benyomás, teljes újratervezés"
                  />
                </Field>

                {/* Üzenet */}
                <Field label="Bármi más, amit fontosnak tartasz" htmlFor="message">
                  <textarea
                    id="message" rows={3}
                    value={form.message} onChange={(e) => set('message', e.target.value)}
                    className={`${inputBase} resize-none`}
                    placeholder="Pl. határidő, különleges elvárás, kérdés..."
                  />
                </Field>

                <Button type="submit" size="lg" className="w-full gap-2.5">
                  <Send size={16} />
                  Elküldöm az áttekintési kérelmet
                </Button>

                <p className="font-body text-xs text-sp-text-muted/55 text-center leading-snug">
                  Nem küldök spamet. 24 órán belül visszajelzek a javasolt iránnyal.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, required, error, children }: {
  label: string; htmlFor: string; required?: boolean; error?: string; children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block font-body text-[11px] tracking-[0.12em] uppercase text-sp-text-muted mb-2">
        {label}{required && <span className="text-sp-gold ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p id={`${htmlFor}-error`} className="mt-1.5 font-body text-xs text-red-400/90">{error}</p>}
    </div>
  )
}
