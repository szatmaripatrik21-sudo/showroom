export type Industry = 'hospitality' | 'hotel' | 'health' | 'beauty'

export interface Project {
  slug: string
  name: string
  industry: Industry
  industryLabel: string
  tagline: string
  summary: string
  tags: string[]
  gradient: string
  accentColor: string
  liveUrl?: string
  videoSrc?: string
  posterSrc?: string
  videoFit?: 'cover' | 'contain'
  /** Truth rule: all projects are concepts unless explicitly marked real */
  status: 'concept' | 'real'
  caseStudy: {
    context: string      // Mi volt a cél?
    direction: string    // Milyen irány készült?
    conversion: string   // Hogyan vezeti a látogatót?
    visual: string       // Hangulat, tipográfia, vizuális irány
  }
}

export const projects: Project[] = [
  {
    slug: 'ambrus-dental-klinika',
    name: 'Ambrus Dental Klinika',
    industry: 'health',
    industryLabel: 'Fogászat',
    tagline: 'Prémium fogászati weboldal bizalomépítésre és időpontfoglalásra tervezve.',
    summary: 'Letisztult, szakmai megjelenés, amely csökkenti a páciens bizonytalanságát és egyszerűvé teszi a kapcsolatfelvételt.',
    tags: ['Fogászat', 'Időpontfoglalás', 'Bizalomépítés'],
    gradient: 'linear-gradient(135deg, #0a140a 0%, #18301a 60%, #7a9a5008 100%)',
    accentColor: '#7a9a50',
    status: 'concept',
    liveUrl: 'https://preeminent-strudel-958a61.netlify.app',
    videoSrc: '/portfolio/dental-clinic-preview-opt.mp4',
    videoFit: 'contain',
    caseStudy: {
      context: 'A klinika szakmai színvonala és a régi online jelenlét között szakadék volt. A páciensek nem kaptak elég gyors, meggyőző választ az első találkozáson.',
      direction: 'Letisztult, térmentes szerkezet. Kezelések egyértelműen csoportosítva. A csapat bemutatva — arc, tapasztalat, bizalom. Egyetlen elsődleges cél: időpontfoglalás.',
      conversion: 'Minden oldal ugyanoda vezet: egyértelműen kitett foglalási gomb, minimális súrlódással. Nincs elveszett klikk, nincs felesleges oldal.',
      visual: 'Meleg fehér, mély zöld akcent, sober talpas betű a fejlécekhez, tiszta sans-serif a tartalomhoz. Szakmai, de nem steril.',
    },
  },
  {
    slug: 'beauty-embassy',
    name: 'Beauty Embassy',
    industry: 'beauty',
    industryLabel: 'Szépségipar',
    tagline: 'Elegáns szépségipari weboldal szolgáltatásokkal, portfólióval és foglalási útvonallal.',
    summary: 'A vizuális minőség és a stílus egyszerre épít bizalmat és vezeti a vendéget a foglalásig.',
    tags: ['Szépségipar', 'Prémium arculat', 'Online foglalás'],
    gradient: 'linear-gradient(135deg, #160810 0%, #3a1830 60%, #c080a008 100%)',
    accentColor: '#c080a0',
    status: 'concept',
    liveUrl: 'https://beauty-embassy.netlify.app',
    videoSrc: '/portfolio/beauty-salon-preview-opt.mp4',
    caseStudy: {
      context: 'A vendég Instagramon találja meg a szalont, majd a weboldalon dönt. Ha a két felület minősége között rés van, a bizalom megtörik — és a vendég máshova megy.',
      direction: 'Vizuálisan egységes világ az Instagrammal. Szolgáltatások kategóriánként, árakkal. Galéria, ami meggyőz. Foglalás, ami nem fáraszt.',
      conversion: 'Az első képernyőtől a foglalás gombig minden döntés egy célt szolgál: minél kevesebb lépésben üzleti időpont.',
      visual: 'Meleg krém, mélybordó és rózsaszín akcent, eleganciát sugárzó tipográfia. Nem divatos — időtlen.',
    },
  },
  {
    slug: 'hotel-aranyudvar',
    name: 'Hotel Aranyudvar',
    industry: 'hotel',
    industryLabel: 'Hotel',
    tagline: 'Prémium hotel weboldal közvetlen foglalási fókuszszal.',
    summary: 'Atmoszferikus megjelenés, amely az élményt adja el — és a közvetlen foglalást könnyíti.',
    tags: ['Hotel', 'Közvetlen foglalás', 'Élményalapú design'],
    gradient: 'linear-gradient(135deg, #05101a 0%, #163050 60%, #5a9aba08 100%)',
    accentColor: '#5a9aba',
    status: 'concept',
    videoSrc: '/portfolio/hotel-aranyudvar-preview2-opt.mp4',
    caseStudy: {
      context: 'A potenciális vendég egyszerre néz több szállást. A döntés ott születik, ahol hamarabb megérti az élményt és megtalálja a foglalási útvonalat.',
      direction: 'Nagy, lélegző szobafotók. Az élmény a szöveg előtt. Csomagok, amelyek konkrét választ adnak a "miért érdemes ide jönni" kérdésre.',
      conversion: 'Közvetlen foglalási link az első képernyőn. Nem az OTA — közvetlenül. Kevesebb közvetítő, több bevétel.',
      visual: 'Mélykék, arany és ekrü. Elegáns, nem giccses. Szállodák legjobb fotóinak energiája.',
    },
  },
  {
    slug: 'pesti6',
    name: 'Pesti6',
    industry: 'hospitality',
    industryLabel: 'Vendéglátás',
    tagline: 'Modern magyar étterem Budapest szívében.',
    summary: 'Hangulat, kínálat, nyitvatartás és foglalás — azonnal, mobilon is.',
    tags: ['Vendéglátás', 'Étlap', 'Asztalfoglalás'],
    gradient: 'linear-gradient(135deg, #2a0d08 0%, #6e2412 60%, #c9a04c08 100%)',
    accentColor: '#b5482e',
    status: 'concept',
    liveUrl: 'https://pesti6-demo.netlify.app',
    videoSrc: '/portfolio/pesti6-preview-opt.mp4',
    caseStudy: {
      context: 'Az új vendég útközben, telefonon keres rád. 20 másodperce van. Ha nem látja azonnal a menüt, nyitvatartást és hangulatot — továbblép.',
      direction: 'Teli képernyős étteremhangulat az első másodpercben. Étlap egyetlen görgetéssel. Foglalás gomb mindig kézközelben.',
      conversion: 'Minden oldalszakasz ugyanoda mutat: asztalfoglalás, helyszín, kapcsolatfelvétel. Nincs elveszett vendég.',
      visual: 'Tégla, antracit és melegfehér. Magyar karakterű, de nem folklorisztikus. Komoly, étvágyat keltő.',
    },
  },
]

// Industry pages data
export interface IndustryPage {
  slug: string
  label: string
  headline: string
  visitorQuestion: string
  websiteJob: string
  conversionPoint: string
  relatedSlugs: string[]
}

export const industries: IndustryPage[] = [
  {
    slug: 'vendeltatas',
    label: 'Vendéglátás',
    headline: 'Vendéglátóhelyeknek, ahol az első benyomás dönt.',
    visitorQuestion: 'Megtalálja a menüt, a nyitvatartást és a hangulatot pár másodperc alatt?',
    websiteJob: 'Azonnal megmutatni a kínálatot, a helyszínt és a következő lépést — mobilon is.',
    conversionPoint: 'Asztalfoglalás vagy kapcsolatfelvétel egy érintéssel.',
    relatedSlugs: ['pesti6'],
  },
  {
    slug: 'hotel',
    label: 'Hotel',
    headline: 'Hoteleknek, ahol a foglalás az egyetlen mérőszám.',
    visitorQuestion: 'Érti az élményt? Megtalálja a foglalás gombját? Miért jobb közvetlenül, mint OTA-n?',
    websiteJob: 'Az élményt eladni — a foglalás útját minimalista egyértelműséggel felmutatni.',
    conversionPoint: 'Közvetlen foglalás. Kevesebb közvetítő, több bevétel.',
    relatedSlugs: ['hotel-aranyudvar'],
  },
  {
    slug: 'egeszsegugy',
    label: 'Egészségügy',
    headline: 'Egészségügynek, ahol a bizalom az első lépés.',
    visitorQuestion: 'Megbízható ez a rendelő? Kompetens az orvos? Hogyan kérek időpontot?',
    websiteJob: 'Szakmaiságot és hitelt közvetíteni — és az időpontkérést egyetlen mozdulattal megoldani.',
    conversionPoint: 'Egyszerű időpontfoglalás, félelem nélkül.',
    relatedSlugs: ['ambrus-dental-klinika'],
  },
  {
    slug: 'szepsegugy',
    label: 'Szépségipar',
    headline: 'Szépségszalonoknak, ahol a stílus épít bizalmat.',
    visitorQuestion: 'A stílusa illik hozzám? Milyen a munka minősége? Hogyan foglalok?',
    websiteJob: 'A vizuális minőséget és stílust egyből megmutatni — és az online foglalást egy lépéssé tenni.',
    conversionPoint: 'Portfólió, árak és foglalás egy helyen.',
    relatedSlugs: ['beauty-embassy'],
  },
]
