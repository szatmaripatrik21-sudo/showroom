import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send, ShieldCheck, Clock, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

interface FormState {
  nev: string
  email: string
  phone: string
  businessType: string
  hasWebsite: 'igen' | 'nem' | ''
  currentUrl: string
  goal: string
  message: string
}

const EMPTY: FormState = {
  nev: '',
  email: '',
  phone: '',
  businessType: '',
  hasWebsite: '',
  currentUrl: '',
  goal: '',
  message: '',
}

const reassurances = [
  { icon: Clock, text: 'Átlagban 24 órán belül válaszolok' },
  { icon: MessageSquare, text: 'Röviden átnézem a helyzeted, és jelzem a következő lépést' },
  { icon: ShieldCheck, text: 'Nem küldök spamet — csak egy konkrét, érdemi választ' },
]

const inputBase =
  'w-full rounded-lg bg-lux-black/50 border px-4 py-3 font-body text-sm text-lux-cream placeholder:text-lux-muted-soft transition-colors duration-200 focus:outline-none focus:border-lux-gold/70 focus:ring-1 focus:ring-lux-gold/40'

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

    // TODO: connect real submission here (API route, form service, or email
    // provider). Send `form` to the backend and handle errors. Until then we
    // confirm success only after client-side validation passes.
    // Fallback contact address for wiring lives in site.contact.email.
    setSubmitted(true)
  }

  return (
    <section id="kapcsolat" className="border-t border-white/6 py-20 md:py-36 bg-lux-dark scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-lux-gold block mb-5">
              Kapcsolat
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-lux-cream font-semibold leading-tight mb-5">
              Kérj ajánlatot egy jobb weboldalra.
            </h2>
            <p className="font-body text-sm md:text-base text-lux-cream-dim/85 leading-relaxed mb-8 max-w-md">
              Írd le röviden, milyen vállalkozásról van szó, van-e már weboldalad, és mi lenne a fő cél: több
              megkeresés, több foglalás, jobb megjelenés vagy teljes újratervezés.
            </p>

            <ul className="space-y-3.5">
              {reassurances.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={16} className="flex-shrink-0 mt-0.5 text-lux-gold" aria-hidden="true" />
                  <span className="font-body text-sm text-lux-cream-dim/85 leading-snug">{text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-body text-xs text-lux-cream-dim/60">
              Inkább e-mailben?{' '}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-lux-gold hover:text-lux-gold-light underline underline-offset-4 transition-colors"
              >
                {site.contact.email}
              </a>
            </p>
          </motion.div>

          {/* Right: form / success */}
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
                <div className="w-14 h-14 rounded-full bg-lux-gold/12 border border-lux-gold/30 flex items-center justify-center mb-5">
                  <CheckCircle2 size={26} className="text-lux-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-lux-cream mb-3">
                  Köszönöm, megkaptam!
                </h3>
                <p className="font-body text-sm text-lux-cream-dim/85 leading-relaxed max-w-sm">
                  Hamarosan — általában 24 órán belül — visszajelzek a következő lépéssel. Ha sürgős, a fenti
                  e-mail címen közvetlenül is elérsz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Név + E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Név" htmlFor="nev" required error={errors.nev}>
                    <input
                      id="nev"
                      type="text"
                      autoComplete="name"
                      value={form.nev}
                      onChange={(e) => set('nev', e.target.value)}
                      aria-invalid={!!errors.nev}
                      aria-describedby={errors.nev ? 'nev-error' : undefined}
                      className={`${inputBase} ${errors.nev ? 'border-red-500/60' : 'border-white/12'}`}
                      placeholder="Teljes neved"
                    />
                  </Field>
                  <Field label="E-mail" htmlFor="email" required error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`${inputBase} ${errors.email ? 'border-red-500/60' : 'border-white/12'}`}
                      placeholder="nev@example.com"
                    />
                  </Field>
                </div>

                {/* Telefon + Vállalkozás típusa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Telefonszám / elérhetőség" htmlFor="phone">
                    <input
                      id="phone"
                      type="text"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      className={`${inputBase} border-white/12`}
                      placeholder="Pl. +36 20 123 4567"
                    />
                  </Field>
                  <Field label="Vállalkozás típusa" htmlFor="businessType">
                    <input
                      id="businessType"
                      type="text"
                      value={form.businessType}
                      onChange={(e) => set('businessType', e.target.value)}
                      className={`${inputBase} border-white/12`}
                      placeholder="Pl. étterem, fogászat, hotel"
                    />
                  </Field>
                </div>

                {/* Van már weboldalad? */}
                <fieldset>
                  <legend className="block font-body text-[11px] tracking-[0.12em] uppercase text-lux-cream-dim/70 mb-2">
                    Van már weboldalad?
                  </legend>
                  <div className="flex gap-2">
                    {(['igen', 'nem'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set('hasWebsite', opt)}
                        aria-pressed={form.hasWebsite === opt}
                        className={`flex-1 rounded-lg border px-4 py-2.5 font-body text-sm capitalize transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/50 ${
                          form.hasWebsite === opt
                            ? 'border-lux-gold/60 bg-lux-gold/10 text-lux-gold'
                            : 'border-white/12 text-lux-cream-dim hover:border-white/30 hover:text-lux-cream'
                        }`}
                      >
                        {opt === 'igen' ? 'Igen' : 'Nem'}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Jelenlegi weboldal linkje — only relevant if "igen" */}
                {form.hasWebsite === 'igen' && (
                  <Field label="Jelenlegi weboldal linkje" htmlFor="currentUrl">
                    <input
                      id="currentUrl"
                      type="text"
                      inputMode="url"
                      value={form.currentUrl}
                      onChange={(e) => set('currentUrl', e.target.value)}
                      className={`${inputBase} border-white/12`}
                      placeholder="https://..."
                    />
                  </Field>
                )}

                {/* Fő cél */}
                <Field label="Mi a fő cél?" htmlFor="goal" required error={errors.goal}>
                  <input
                    id="goal"
                    type="text"
                    value={form.goal}
                    onChange={(e) => set('goal', e.target.value)}
                    aria-invalid={!!errors.goal}
                    aria-describedby={errors.goal ? 'goal-error' : undefined}
                    className={`${inputBase} ${errors.goal ? 'border-red-500/60' : 'border-white/12'}`}
                    placeholder="Pl. több foglalás, jobb megjelenés, teljes újratervezés"
                  />
                </Field>

                {/* Üzenet */}
                <Field label="Üzenet" htmlFor="message">
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    className={`${inputBase} border-white/12 resize-none`}
                    placeholder="Bármi, amit fontosnak tartasz elmondani a projektről."
                  />
                </Field>

                <Button type="submit" size="lg" className="w-full gap-2.5">
                  <Send size={17} />
                  Elküldöm az ajánlatkérést
                </Button>

                <p className="font-body text-xs text-lux-cream-dim/60 text-center leading-snug">
                  Nem küldök spamet. Röviden átnézem a helyzetet, és visszajelzek a következő lépéssel.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-body text-[11px] tracking-[0.12em] uppercase text-lux-cream-dim/70 mb-2"
      >
        {label}
        {required && <span className="text-lux-gold ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 font-body text-xs text-red-400/90">
          {error}
        </p>
      )}
    </div>
  )
}
