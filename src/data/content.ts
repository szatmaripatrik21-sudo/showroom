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
// Hospitality is fully written (it's the proven example set); the other
// industries ship as bracketed placeholders to fill in as work comes.
export const industries: Industry[] = [
  {
    id: 'hospitality',
    label: 'Vendéglátás',
    shortLabel: 'VENDÉGLÁTÁS',
    tagline: 'A vendéglátóhely weboldala a legjobb tárlatvezetőd.',
    description:
      'Étterem, hotel vagy kávézó: a látogatónak az első másodpercben meg kell éreznie a hely hangulatát — ezután jön a kínálat, a nyitvatartás, a helyszín, és legfőképpen: a foglalás.',
    focus: [
      { title: 'Hangulatközvetítő dizájn', desc: 'Fotók, színek és tipográfia, ami átadja a hely karakterét.' },
      { title: 'Étlap és kínálat', desc: 'Könnyen frissíthető, szépen tipografált kínálat-oldal.' },
      { title: 'Foglalás / asztalfoglalás', desc: 'Mindig elérhető foglalási CTA — egy lépésnyire a látogatótól.' },
      { title: 'Nyitvatartás és helyszín', desc: 'Az egyik legtöbbet keresett információ — soha ne rejtsd el.' },
      { title: 'Mobilra optimalizált', desc: 'A látogató a telefonján keres. Az oldal ott is működjön.' },
    ],
    accentColor: '#c85d28',
  },
  {
    id: 'hotel',
    label: 'Hotel',
    shortLabel: 'HOTEL',
    tagline: '[Egymondatos állítás a hotelekről / szálláshelyekről.]',
    description:
      '[Rövid bekezdés: mi a legfontosabb egy hotel / panzió / apartman weboldalán — pl. közvetlen foglalás, szobabemutató, bizalom, OTA-díjak elkerülése.]',
    focus: [
      { title: '[Fókuszpont 1]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 2]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 3]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 4]', desc: '[Rövid leírás]' },
    ],
    accentColor: '#5a9aba',
  },
  {
    id: 'health',
    label: 'Egészségügy',
    shortLabel: 'EGÉSZSÉGÜGY',
    tagline: '[Egymondatos állítás az egészségügyi szolgáltatókról.]',
    description:
      '[Rövid bekezdés: mi a legfontosabb egy magánrendelő / egészségügyi szolgáltató oldalán — pl. bizalom, bejelentkezés, szolgáltatások, diszkréció.]',
    focus: [
      { title: '[Fókuszpont 1]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 2]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 3]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 4]', desc: '[Rövid leírás]' },
    ],
    accentColor: '#7a9a50',
  },
  {
    id: 'beauty',
    label: 'Szépségipar',
    shortLabel: 'SZÉPSÉGIPAR',
    tagline: '[Egymondatos állítás a szépségipari vállalkozásokról.]',
    description:
      '[Rövid bekezdés: mi a legfontosabb egy szalon / fodrászat / kozmetika oldalán — pl. időpontfoglalás, galéria, árlista, bizalom.]',
    focus: [
      { title: '[Fókuszpont 1]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 2]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 3]', desc: '[Rövid leírás]' },
      { title: '[Fókuszpont 4]', desc: '[Rövid leírás]' },
    ],
    accentColor: '#c080a0',
  },
]

// ─── Process ──────────────────────────────────────────────────────────────────

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Üzleti cél tisztázása',
    description: 'Mielőtt egy pixel kerülne a képernyőre, megértem, hogyan fog profitálni a weboldalad: több megkeresés, több vásárlás, erősebb bizalom — vagy mindhárom.',
  },
  {
    number: '02',
    title: 'Vizuális irány megtervezése',
    description: 'Paletta, tipográfia, layoutok — egy vizuális koncepció, amit jóváhagysz, mielőtt az éles fejlesztés elkezdődik. Nincs meglepetés.',
  },
  {
    number: '03',
    title: 'Weboldal felépítése',
    description: 'Gyors, mobilra optimalizált, és az összes elfogadott visual direction szerint. Élő staging linken mutatom, folyamatosan.',
  },
  {
    number: '04',
    title: 'Finomhangolás és átadás',
    description: 'Közös review, apró javítások, élesítés. Átadom az adminfelületet és a kezelési útmutatót — az oldal a tiéd.',
  },
]
