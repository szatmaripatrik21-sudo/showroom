import type { ProjectCategory } from './projects'

// ─── Industries ───────────────────────────────────────────────────────────────

export interface IndustryFocus {
  title: string
  desc: string
}

export interface Industry {
  id: ProjectCategory
  label: string
  shortLabel: string
  tagline: string
  description: string
  focus: IndustryFocus[]
  accentColor: string
}

// Drives the "Minden iparágnak megvan a maga logikája" tab section.
export const industries: Industry[] = [
  {
    id: 'hospitality',
    label: 'Vendéglátás',
    shortLabel: 'VENDÉGLÁTÁS',
    tagline: 'A vendéglátóhely weboldala a legjobb tárlatvezetőd.',
    description:
      'Étterem, kávézó vagy bár esetén a látogatónak másodpercek alatt éreznie kell a hangulatot, látnia kell a kínálatot, és könnyen meg kell találnia a nyitvatartást, helyszínt vagy foglalási lehetőséget.',
    focus: [
      { title: 'Hangulatközvetítő design', desc: 'Képek, ritmus és tipográfia, ami átadja a hely karakterét.' },
      { title: 'Étlap és kínálat', desc: 'A legfontosabb választék gyorsan, mobilon is könnyen böngészhetően.' },
      { title: 'Foglalás / asztalfoglalás', desc: 'Egyértelmű CTA, hogy a látogató ne csak nézelődjön, hanem lépjen.' },
      { title: 'Nyitvatartás és helyszín', desc: 'A gyakorlati információk mindig gyorsan elérhetőek.' },
      { title: 'Mobilra optimalizált élmény', desc: 'A vendégek nagy része útközben, telefonon keres.' },
    ],
    accentColor: '#d06a32',
  },
  {
    id: 'hotel',
    label: 'Hotel',
    shortLabel: 'HOTEL',
    tagline: 'A hotel weboldala nem prospektus — foglalási döntést segítő élmény.',
    description:
      'Szállásnál a látogató biztonságot, hangulatot és egyértelmű információt keres. A weboldalnak meg kell mutatnia az élményt, de közben gyorsan el kell vezetnie a foglalásig vagy ajánlatkérésig.',
    focus: [
      { title: 'Szobák és élmény bemutatása', desc: 'A vendégnek látnia kell, milyen érzés ott megszállni.' },
      { title: 'Közvetlen foglalási útvonal', desc: 'Kevesebb bizonytalanság, kevesebb elveszett érdeklődő.' },
      { title: 'Ajánlatcsomagok', desc: 'Romantikus hétvége, wellness, családi pihenés vagy üzleti tartózkodás tisztán bemutatva.' },
      { title: 'Lokáció és környék', desc: 'A helyszín előnyeit is el kell adni, nem csak a szobát.' },
      { title: 'Bizalomépítés', desc: 'Vélemények, garanciák, fotók és válaszok a tipikus kérdésekre.' },
    ],
    accentColor: '#5a9aba',
  },
  {
    id: 'health',
    label: 'Egészségügy',
    shortLabel: 'EGÉSZSÉGÜGY',
    tagline: 'Az egészségügyi weboldalnak bizalmat kell építenie, mielőtt időpontot kérnek.',
    description:
      'Fogászat, magánrendelő vagy egészségügyi szolgáltatás esetén a látogató óvatosabban dönt. Fontos a szakmaiság, az átlátható szolgáltatásstruktúra, az orvosok bemutatása és a könnyű időpontkérés.',
    focus: [
      { title: 'Szakértelem és hitelesség', desc: 'A látogatónak éreznie kell, hogy jó kezekben lesz.' },
      { title: 'Szolgáltatási oldalak', desc: 'Minden kezelés vagy szolgáltatás érthetően, félelemkeltés nélkül.' },
      { title: 'Időpontfoglalás', desc: 'A kapcsolatfelvétel legyen egyszerű, látható és biztonságérzetet adó.' },
      { title: 'Orvosok és csapat', desc: 'Az arcok, tapasztalatok és bemutatkozások erősítik a bizalmat.' },
      { title: 'GYIK és félelemcsökkentés', desc: 'A tipikus kérdések megválaszolása csökkenti a halogatást.' },
    ],
    accentColor: '#7a9a50',
  },
  {
    id: 'beauty',
    label: 'Szépségipar',
    shortLabel: 'SZÉPSÉGIPAR',
    tagline: 'A szépségipari weboldal akkor működik, ha a vendég már az első képernyőn látja: jó helyen jár.',
    description:
      'Szépségszalon, fodrászat, kozmetika vagy sminkszolgáltatás esetén a látvány, a stílus és a bizalom dönt. Az oldalnak egyszerre kell prémium hatást keltenie és gyorsan időpontfoglalásra vezetnie.',
    focus: [
      { title: 'Látványos portfólió', desc: 'A munka minőségét képek, videók és hangulat adják el.' },
      { title: 'Szolgáltatások tiszta bemutatása', desc: 'A vendég gyorsan értse, mit kap és mi illik hozzá.' },
      { title: 'Online foglalási útvonal', desc: 'Minél kevesebb lépés, annál több befejezett foglalás.' },
      { title: 'Bizalomépítő részletek', desc: 'Vélemények, előtte-utána képek, szakmai bemutatkozás.' },
      { title: 'Instagram-kompatibilis vizuális világ', desc: 'A weboldal illeszkedjen ahhoz, amit a vendég közösségi médiában is lát.' },
    ],
    accentColor: '#c080a0',
  },
]

// ─── "A megoldás" feature grid ────────────────────────────────────────────────

export interface SolutionPoint {
  title: string
  description: string
}

export const solutionPoints: SolutionPoint[] = [
  {
    title: 'Egyértelmű ajánlat',
    description: 'A látogató azonnal érti, kinek szólsz, mit kínálsz és miért érdemes téged választania.',
  },
  {
    title: 'Gyors mobilélmény',
    description: 'A legtöbb érdeklődő telefonról érkezik. Az oldalnak mobilon is gyorsnak és kényelmesnek kell lennie.',
  },
  {
    title: 'Bizalomépítő szerkezet',
    description: 'Szolgáltatások, referenciák, képek, válaszok és CTA-k olyan sorrendben, ami csökkenti a bizonytalanságot.',
  },
  {
    title: 'Prémium márkaérzet',
    description: 'Az első benyomás alapján döntik el, mennyire vesznek komolyan. A designnak ezt kell támogatnia.',
  },
  {
    title: 'Konverziós útvonalak',
    description: 'Ajánlatkérés, foglalás, telefonhívás vagy üzenetküldés — a következő lépés mindig legyen egyértelmű.',
  },
  {
    title: 'Könnyen kezelhető alap',
    description: 'Az oldal ne csak elinduljon, hanem később is használható, bővíthető és karbantartható maradjon.',
  },
]

// ─── Eredmény / "Számokban" ───────────────────────────────────────────────────

export interface Stat {
  value: string
  countTo?: number
  suffix?: string
  title: string
  text: string
  badge: string
}

export const stats: Stat[] = [
  {
    value: '99%',
    countTo: 99,
    suffix: '%',
    title: 'mobilra optimalizált',
    text: 'A felület minden fontos része telefonon is ellenőrizve: menü, CTA-k, űrlapok, videók és szövegek.',
    badge: 'MÉRHETŐ',
  },
  {
    value: '2,1s → 0,9s',
    title: 'betöltési idő cél',
    text: 'A képek, videók és animációk optimalizálása azért, hogy a prémium látvány ne menjen a sebesség rovására.',
    badge: 'MÉRHETŐ',
  },
  {
    value: '3–5',
    title: 'fő konverziós pont',
    text: 'Ajánlatkérés, foglalás, kapcsolatfelvétel, telefonhívás vagy weboldal-megtekintés — minden oldalnak legyen egyértelmű útvonala.',
    badge: 'STRATÉGIA',
  },
  {
    value: '7–14 nap',
    title: 'átlagos indulási ütem',
    text: 'A legtöbb egyszerűbb bemutatkozó vagy szolgáltatói oldal ennyi idő alatt elindítható, ha a szükséges tartalmak rendelkezésre állnak.',
    badge: 'FOLYAMAT',
  },
]

// ─── Az ajánlat / pricing ─────────────────────────────────────────────────────

export const offer = {
  // What's included — the full package list.
  includes: [
    'Mobilra optimalizált, egyedi weboldal — nem sablon, az üzletedre szabva',
    'Értékesítésre épített oldalstruktúra és magyar szövegezés',
    'Ajánlatkérési, foglalási vagy kapcsolatfelvételi CTA-k',
    'SEO-alapstruktúra: címek, meta-adatok, tiszta hierarchia',
    'Gyors, reszponzív, modern felület prémium megjelenéssel',
    'Alap technikai optimalizálás képekre, videókra és betöltési sebességre',
    'Átadás utáni rövid kezelési útmutató és admin-hozzáférés, ha a rendszer támogatja',
    'Finomhangolási kör az első éles visszajelzések alapján',
  ],
  card: {
    title: 'Egyedi weboldal-koncepció',
    priceLabel: 'Ár',
    // Intentionally blank — no number/placeholder until real pricing is set.
    // When filled (e.g. '350.000 Ft-tól') the UI shows it automatically;
    // while empty it renders the intentional "egyedi árazás" treatment.
    priceValue: '',
    timeline: '7–14 napos indulási ütemezés a tartalmak beérkezése után',
    note: 'Fix, előre egyeztetett határidők — meglepetések nélkül.',
    guarantee:
      'Ha az első irány nem találja el pontosan az elképzelést, egy stratégiai finomhangolási kört külön díj nélkül kapsz.',
    ctaLabel: 'Kérek egy ajánlatot',
    ctaHref: '#kapcsolat',
    smallText: 'Röviden leírod, mire van szükséged, én pedig visszajelzek a következő lépésekkel.',
  },
}

// ─── Folyamat ─────────────────────────────────────────────────────────────────

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Felmérés és cél',
    description:
      'Megnézem, milyen vállalkozásról van szó, kiket szeretnél elérni, és mi számít sikernek: több foglalás, több ajánlatkérés, jobb első benyomás vagy erősebb márka.',
  },
  {
    number: '02',
    title: 'Struktúra és szöveg',
    description:
      'Felépül az oldal logikája: milyen szekciók kellenek, milyen üzenetek győzik meg a látogatót, és hol legyenek a konverziós pontok.',
  },
  {
    number: '03',
    title: 'Design és animáció',
    description:
      'A vizuális irány prémium, de nem öncélú. Minden kép, videó, animáció és tipográfiai döntés az első benyomást és az érthetőséget támogatja.',
  },
  {
    number: '04',
    title: 'Élesítés és finomhangolás',
    description:
      'Mobilnézet, sebesség, CTA-k, űrlapok és alap SEO ellenőrzése után az oldal élesíthető. Utána jöhetnek a kisebb finomhangolások.',
  },
]

// ─── GYIK ─────────────────────────────────────────────────────────────────────

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Kell kész szöveget adnom?',
    a: 'Nem feltétlenül. Ha van meglévő anyagod, abból dolgozom. Ha nincs, segítek kialakítani az oldal szövegét úgy, hogy érthető, bizalomépítő és értékesítésorientált legyen.',
  },
  {
    q: 'Meglévő weboldalt is lehet javítani?',
    a: 'Igen. Ha az alap jó, lehet csak struktúrát, szöveget, vizuális irányt vagy konverziós útvonalakat javítani. Ha az oldal túl gyenge alapokon áll, akkor őszintén jelzem, ha az újraépítés éri meg jobban.',
  },
  {
    q: 'Mobilon is ugyanolyan fontos lesz az oldal?',
    a: 'Igen, sőt sok iparágban fontosabb. A legtöbb érdeklődő telefonon nézi meg először a vállalkozást, ezért a mobilélmény nem mellékes verzió, hanem elsődleges döntési pont.',
  },
  {
    q: 'Mennyi idő alatt készül el?',
    a: 'Egyszerűbb szolgáltatói vagy bemutatkozó weboldal általában 7–14 napos indulási ütemezéssel tervezhető, ha a szükséges tartalmak és döntések időben megvannak.',
  },
  {
    q: 'Mi alapján készül az ár?',
    a: 'Az ár az oldal méretétől, funkcióitól, animációitól, tartalomigényétől és a szükséges integrációktól függ. A pontos összeget egy rövid egyeztetés után tudom megadni.',
  },
  {
    q: 'Mi történik az oldal átadása után?',
    a: 'Átadás után rövid kezelési útmutatót és alap admin-hozzáférést kapsz, plusz egy finomhangolási lehetőséget, hogy az első visszajelzések alapján javítható legyen a felület.',
  },
]
