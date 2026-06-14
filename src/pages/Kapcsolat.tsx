import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { site } from '@/config/site'

import type { Variants } from 'framer-motion'
const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: 'easeOut' } }),
}

interface FormState {
  nev: string
  email: string
  businessType: string
  currentUrl: string
  goal: string
  message: string
}

const EMPTY: FormState = { nev: '', email: '', businessType: '', currentUrl: '', goal: '', message: '' }

const inputClass =
  'w-full rounded-xl bg-sp-surface border border-white/10 px-4 py-3.5 font-body text-sm text-sp-text placeholder:text-sp-text-muted/40 transition-all duration-200 focus:outline-none focus:border-sp-gold/50 focus:ring-1 focus:ring-sp-gold/20'

export default function Kapcsolat() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.nev.trim()) next.nev = 'Kérlek add meg a neved.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Érvényes e-mail cím szükséges.'
    if (!form.goal.trim()) next.goal = 'A fő cél megadása szükséges.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  return (
    <>
      <section className="pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="block mb-6 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-sp-gold">
              Kapcsolat
            </span>
            <h1 className="font-display font-semibold text-6xl md:text-7xl lg:text-8xl text-sp-text leading-[0.93] max-w-3xl mb-8">
              Kérj egy rövid weboldal-áttekintést.
            </h1>
            <p className="font-body text-xl text-sp-text-muted max-w-lg leading-relaxed">
              Írd le röviden, mire van szükséged. Visszajelzek a javasolt iránnyal,
              nagyságrenddel és következő lépéssel.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 md:pb-48 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24 pt-16 md:pt-24 items-start">

            {/* Trust column */}
            <motion.div
              custom={0}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-12 lg:sticky lg:top-28"
            >
              <div className="space-y-6">
                {[
                  { n: '1', t: 'Elküldöd a kérelmet', d: 'Néhány perc, nincs kötelezettség.' },
                  { n: '2', t: '24 órán belül válaszolok', d: 'Megnézem a helyzetet, esetleg a meglévő weboldaladat is.' },
                  { n: '3', t: 'Jelzem a javasolt irányt', d: 'Konkrét visszajelzés — mi hiányzik, mit érdemes másképp.' },
                  { n: '4', t: 'Ha van értelme, ajánlat', d: 'Konkrét ár és menetrend — csak ha mindkét oldalnak van értelme.' },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex gap-4">
                    <span className="font-display text-2xl font-semibold text-sp-gold/25 w-6 flex-shrink-0 leading-none mt-1">
                      {n}
                    </span>
                    <div>
                      <p className="font-body text-base font-medium text-sp-text mb-1">{t}</p>
                      <p className="font-body text-sm text-sp-text-muted leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/6 pt-8 space-y-2">
                {['24 órán belül válaszolok', 'Nincs spam, nincs agresszív értékesítés', 'Csak akkor megyünk tovább, ha mindkét oldalnak van értelme'].map((t) => (
                  <p key={t} className="font-body text-sm text-sp-text-muted">{t}</p>
                ))}
                <p className="font-body text-sm text-sp-text-muted pt-2">
                  Inkább e-mailben?{' '}
                  <a href={`mailto:${site.contact.email}`} className="text-sp-gold hover:text-sp-gold-hi transition-colors">
                    {site.contact.email}
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              custom={1}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {submitted ? (
                <div className="rounded-2xl border border-white/8 bg-sp-surface p-10 flex flex-col items-center text-center gap-5">
                  <div className="w-14 h-14 rounded-full border border-sp-gold/30 bg-sp-gold/10 flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-sp-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-sp-text">Köszönöm, megkaptam!</h2>
                  <p className="font-body text-base text-sp-text-muted max-w-sm leading-relaxed">
                    24 órán belül visszajelzek a javasolt iránnyal és a lehetséges következő lépéssel.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Név *" error={errors.nev}>
                      <input id="nev" type="text" autoComplete="name" value={form.nev}
                        onChange={(e) => set('nev', e.target.value)}
                        className={`${inputClass} ${errors.nev ? 'border-red-500/50' : ''}`}
                        placeholder="Teljes neved" />
                    </Field>
                    <Field label="E-mail *" error={errors.email}>
                      <input id="email" type="email" autoComplete="email" value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        className={`${inputClass} ${errors.email ? 'border-red-500/50' : ''}`}
                        placeholder="nev@example.com" />
                    </Field>
                  </div>

                  <Field label="Vállalkozás típusa">
                    <input id="businessType" type="text" value={form.businessType}
                      onChange={(e) => set('businessType', e.target.value)}
                      className={inputClass}
                      placeholder="Pl. étterem, fogászat, hotel" />
                  </Field>

                  <Field label="Jelenlegi weboldal URL">
                    <input id="currentUrl" type="text" inputMode="url" value={form.currentUrl}
                      onChange={(e) => set('currentUrl', e.target.value)}
                      className={inputClass}
                      placeholder="https://... (ha nincs, hagyd üresen)" />
                  </Field>

                  <Field label="Mi a fő cél az új oldallal? *" error={errors.goal}>
                    <input id="goal" type="text" value={form.goal}
                      onChange={(e) => set('goal', e.target.value)}
                      className={`${inputClass} ${errors.goal ? 'border-red-500/50' : ''}`}
                      placeholder="Pl. több foglalás, jobb első benyomás, teljes újratervezés" />
                  </Field>

                  <Field label="Rövid leírás">
                    <textarea id="message" rows={4} value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      className={`${inputClass} resize-none`}
                      placeholder="Bármi, amit fontosnak tartasz elmondani..." />
                  </Field>

                  <button
                    type="submit"
                    className="w-full font-body text-sm font-medium bg-sp-gold text-[#0a0908] rounded-full px-7 py-4
                               hover:bg-sp-gold-hi transition-colors duration-200"
                  >
                    Elküldöm az áttekintési kérelmet
                  </button>

                  <p className="font-body text-xs text-sp-text-muted/50 text-center">
                    Nem küldök spamet. Csak akkor lépünk tovább, ha mindkét oldalnak van értelme.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block font-body text-xs tracking-[0.1em] uppercase text-sp-text-muted">
        {label}
      </label>
      {children}
      {error && <p className="font-body text-xs text-red-400/80">{error}</p>}
    </div>
  )
}
