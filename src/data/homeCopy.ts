/**
 * Bilingual homepage copy — Hungarian (default) + English.
 * Usage: import { homeCopy } from '@/data/homeCopy'
 *        const c = homeCopy.hu   // swap to .en when a language toggle is added
 */
export const homeCopy = {
  hu: {
    hero: {
      label: 'SP. / Ügyfélszerző weboldalak',
      h1Line1: 'A weboldalad ne csak jól nézzen ki.',
      h1Line2: 'Dolgozzon a bevételedért.',
      sub: 'Konverzióra épített weboldalakat készítek vállalkozásoknak, hogy a látogatók gyorsabban megértsék az ajánlatod, jobban bízzanak benned, és könnyebben kérjenek ajánlatot, foglaljanak időpontot vagy vegyék fel veled a kapcsolatot.',
      cta: 'Ingyenes weboldal-auditot kérek',
      ctaSecondary: 'Megnézem a demókat',
      microcopy: 'Megnézem, hol veszíthet érdeklődőket a jelenlegi weboldalad — kötelezettség nélkül.',
    },
    demos: {
      h2: 'Iparágra szabott weboldalak —',
      h2Cont: 'mert minden ügyfélszerzés máshogy működik.',
      sub: 'Egy fogászatnál a bizalom és az időpontfoglalás számít. Egy hotelnél a közvetlen foglalás. Egy étteremnél az első benyomás és az asztalfoglalás. A weboldal felépítése mindig az üzleti célhoz igazodik.',
      allLink: 'Összes demó',
      cardBadge: 'Weboldal-koncepció',
    },
    why: {
      label: 'Miért hoz több ügyfelet',
      h2: 'Nem csak weboldalt kapsz. Egy útvonalat, ami érdeklődőből ügyfelet csinál.',
      sub: 'A jó weboldal nem attól működik, hogy szép. Attól működik, hogy a látogató azonnal érti, mivel foglalkozol, miért bízhat benned, és mit kell tennie a következő lépéshez.',
      quote: 'Ha a látogató bizonytalan, továbbáll. Ha érti, miért téged válasszon, lépni fog.',
      sectionCta: 'Szeretnéd tudni, hol veszítesz érdeklődőket?',
      cta: 'Ingyenes auditot kérek',
      demosLink: 'Demók megtekintése',
      cards: [
        {
          title: 'Több megkeresés és foglalás',
          text: 'Az oldal célja, hogy az érdeklődő ne csak nézelődjön — hanem ajánlatot kérjen, időpontot foglaljon, telefonáljon vagy üzenetet küldjön.',
          label: 'Cél: több megkeresés',
        },
        {
          title: 'Bizalom az első másodpercektől',
          text: 'A látogató gyorsan eldönti, komolyan vehető-e a vállalkozás. A megjelenés, az üzenet és a struktúra ezt a döntést támogatja.',
          label: 'Cél: erősebb első benyomás',
        },
        {
          title: 'Iparágra szabott felépítés',
          text: 'Más működik egy fogászatnál, hotelnél, étteremnél, szépségszalonnál vagy tanácsadónál. A weboldal felépítése az adott üzleti célhoz igazodik.',
          label: 'Cél: iparágra szabott oldal',
        },
        {
          title: 'Kevesebb elveszett érdeklődő',
          text: 'Ha a látogató nem találja gyorsan, amit keres, továbbáll. A cél, hogy minden fontos információ és következő lépés egyértelmű legyen.',
          label: 'Cél: kisebb elvándorlás',
        },
      ],
    },
    offer: {
      label: 'Az ajánlat',
      h2: 'A weboldal, ami nem dísznek készül —',
      h2Cont: 'hanem dolgozik a vállalkozásodért.',
      sub: 'Nem csak dizájnt és kódot kapsz. Olyan felépítést, szöveget és felhasználói útvonalat, amely segít a látogatónak megérteni az ajánlatod, megbízni benned, és kapcsolatba lépni veled.',
      detailsLink: 'Részletek az ajánlatról',
      points: [
        'Világos üzenet, amit azonnal megért a látogató',
        'Bizalomépítő felépítés a döntéshez',
        'Mobilra optimalizált, gyors megjelenés',
        'Erős CTA-k ajánlatkéréshez, foglaláshoz vagy kapcsolatfelvételhez',
        'Iparágadhoz igazított struktúra, nem sablonos oldalfelépítés',
      ],
    },
    pricing: {
      label: 'Befektetés',
      h2: 'Ügyfélszerző weboldal akár 119 000 Ft-tól',
      sub: 'Az ár a projekt méretétől, az oldalak számától, a funkcióktól és a szükséges szövegírástól függ. Az ingyenes audit után megmutatom, milyen megoldás lenne reális a vállalkozásodnak — kötelezettség nélkül.',
      link: 'Részletes árazás',
    },
    finalCta: {
      eyebrow: 'KÖVETKEZŐ LÉPÉS',
      h2: 'Mi a helyzeted?',
      intro: 'Válassz egyet. Mindkét út egy ingyenes első lépéssel indul.',
      cards: [
        {
          path: 'existing-site' as const,
          mainTitle: 'Van már weboldalam',
          subtitle: 'Tudnék még több ügyfelet fogadni.',
          body: 'Megnézem, hol veszít érdeklődőket a jelenlegi oldalad, és mit javítanék először.',
          cta: 'Ingyenes auditot kérek',
        },
        {
          path: 'no-site' as const,
          mainTitle: 'Nincs még weboldalam',
          subtitle: 'De szeretnék egyet, ami ügyfeleket hoz.',
          body: 'Megmutatom, milyen weboldal-felépítés segítene bizalmat építeni és több érdeklődőt szerezni.',
          cta: 'Weboldal-tervet kérek',
        },
      ],
    },
  },

  en: {
    hero: {
      label: 'SP. / Customer-acquisition websites',
      h1Line1: 'Your website should not just look good.',
      h1Line2: 'It should bring you customers.',
      sub: 'I build conversion-focused websites for businesses that want visitors to understand their offer faster, trust them sooner, and take action — request a quote, book an appointment, call, or message.',
      cta: 'Request a free website audit',
      ctaSecondary: 'View demo projects',
      microcopy: "I'll show you where your current website may be losing potential customers — no commitment.",
    },
    demos: {
      h2: 'Industry-specific websites —',
      h2Cont: 'because every business wins customers differently.',
      sub: 'A dental clinic needs trust and easy booking. A hotel needs direct reservations. A restaurant needs a strong first impression and a clear table-booking path. The website structure always follows the business goal.',
      allLink: 'All demos',
      cardBadge: 'Website concept',
    },
    why: {
      label: 'Why it brings more customers',
      h2: "You don't just get a website. You get a path that turns visitors into customers.",
      sub: 'A good website works not because it looks nice — but because the visitor instantly understands what you do, why they can trust you, and what to do next.',
      quote: 'If the visitor is unsure, they leave. If they understand why to choose you, they act.',
      sectionCta: 'Want to know where you are losing potential customers?',
      cta: 'Request a free audit',
      demosLink: 'View demo projects',
      cards: [
        {
          title: 'More inquiries and bookings',
          text: "The site's goal is to move visitors from browsing to action — requesting a quote, booking an appointment, calling, or sending a message.",
          label: 'Goal: more inquiries',
        },
        {
          title: 'Trust from the first seconds',
          text: 'Visitors quickly decide whether a business is credible. The design, message, and structure support that decision.',
          label: 'Goal: stronger first impression',
        },
        {
          title: 'Industry-specific structure',
          text: 'What works for a dental clinic differs from a hotel, restaurant, beauty salon, or consultant. The website structure is tailored to your business goal.',
          label: 'Goal: industry-relevant site',
        },
        {
          title: 'Fewer lost leads',
          text: "If visitors can't quickly find what they need, they leave. The goal is to make every key piece of information and next step clear.",
          label: 'Goal: lower drop-off',
        },
      ],
    },
    offer: {
      label: 'The offer',
      h2: "The website that doesn't just sit there —",
      h2Cont: 'it works for your business.',
      sub: "You don't just get design and code. You get a structure, copy, and user journey that helps visitors understand your offer, trust you, and get in touch.",
      detailsLink: 'See full offer details',
      points: [
        'Clear message that visitors instantly understand',
        'Trust-building structure that supports decisions',
        'Mobile-optimized, fast experience',
        'Strong CTAs for quote requests, bookings, or contact',
        'Structure tailored to your industry — not a generic template',
      ],
    },
    pricing: {
      label: 'Investment',
      h2: 'Customer-acquisition website from 119,000 HUF',
      sub: 'The price depends on project size, number of pages, features, and copywriting needs. After the free audit I will show you what solution is realistic for your business — no commitment.',
      link: 'Detailed pricing',
    },
    finalCta: {
      eyebrow: 'NEXT STEP',
      h2: "What's your situation?",
      intro: 'Pick one. Both start with a free first step.',
      cards: [
        {
          path: 'existing-site' as const,
          mainTitle: 'I already have a website',
          subtitle: "But it's not bringing enough inquiries.",
          body: "I'll review where your current site loses leads and what I'd fix first.",
          cta: 'Request a free audit',
        },
        {
          path: 'no-site' as const,
          mainTitle: "I don't have a website yet",
          subtitle: 'But I want one that brings customers.',
          body: "I'll show you what site structure would help build trust and get more inquiries.",
          cta: 'Request a website plan',
        },
      ],
    },
  },
} as const

export type HomeCopyLang = keyof typeof homeCopy
