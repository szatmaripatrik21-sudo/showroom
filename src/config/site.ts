/**
 * Single source of truth for brand + contact details.
 *
 * Keep real/private contact values here only — never hard-code them across
 * components, and never display invented data. The quote form is the primary
 * contact path; `contact.email` is used as the mailto fallback target and the
 * one place an address is surfaced.
 */
export const site = {
  brand: 'SP',
  brandDot: '.',
  positioning: 'Ügyfélszerző weboldalak éttermeknek, szállodáknak, rendelőknek és szalonoknak.',

  contact: {
    // Real address used for the form's mailto fallback + footer link.
    email: 'szatmaripatrik21@gmail.com',
    // Phone intentionally omitted — no number is invented or displayed.
    phone: '',
    location: 'Budapest',
    responseTime: '24 órán belül válaszolok',
  },

  // Optional social links — left empty so no placeholder/fake profiles render.
  social: {
    instagram: '',
    behance: '',
  },
} as const

export type Site = typeof site
