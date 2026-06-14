// Industry categories — single source of truth for the gallery filter,
// the IndustryTabs section, project tags, and badge colors.
// Add a new industry here and it flows through the whole site.
export type ProjectCategory = 'hospitality' | 'hotel' | 'beauty' | 'health'

export type FilterId = 'all' | ProjectCategory

export interface Category {
  id: FilterId
  label: string
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Összes' },
  { id: 'hospitality', label: 'Vendéglátás' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'health', label: 'Egészségügy' },
  { id: 'beauty', label: 'Szépségipar' },
]

// Convenience lookup used by ProjectCard etc.
export const categoryLabels: Record<FilterId, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label }),
  {} as Record<FilterId, string>
)

// Singular label for a single project card's badge.
export const categorySingular: Record<ProjectCategory, string> = {
  hospitality: 'Vendéglátás',
  hotel: 'Hotel',
  beauty: 'Szépségipar',
  health: 'Egészségügy',
}

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  /** Overrides categorySingular on the featured card badge only */
  badgeLabel?: string
  /**
   * TRUTH RULE: every project must carry an explicit status label on screen.
   * 'concept' = Weboldal-koncepció / iparági bemutató (self-initiated demo)
   * 'real'    = Valós projekt (confirmed paying client — only set when confirmed)
   * Defaults to 'concept' if omitted so no project is ever unlabeled.
   */
  projectStatus?: 'concept' | 'real'
  tagline: string
  description: string
  cel: string
  mitJavit: string
  tags: string[]
  gradient: string
  accentColor: string
  liveUrl?: string
  /** Autoplay looping video preview shown inside the browser mockup (browser src, e.g. /portfolio/x.webm) */
  videoSrc?: string
  /** Optional poster image for the video (browser src, e.g. /portfolio/x.webp) */
  posterSrc?: string
  /** object-position of the preview video inside the mockup, e.g. '80% center' to focus right */
  videoPosition?: string
  /** object-fit of the preview video — 'cover' (default) or 'contain' (shows full frame) */
  videoFit?: 'cover' | 'contain'
  featured?: boolean
  comingSoon?: boolean
  // Optional case-study narrative — rendered only on the large featured card.
  caseStudy?: {
    challenge: string // Kihívás
    solution: string  // Megoldás
    result: string    // Eredmény
  }
}

export const projects: Project[] = [
  {
    id: 'ambrus-klinika',
    name: 'Ambrus Dental Klinika',
    category: 'health',
    badgeLabel: 'Fogászat',
    tagline: 'Prémium fogászati weboldal, amely bizalmat épít és több időpontfoglalást támogat.',
    description: 'Letisztult, nyugodt hangulatú fogászati weboldal, amely érthetően mutatja be a kezeléseket, csökkenti a páciens bizonytalanságát, és egyszerűbbé teszi az időpontkérést.',
    cel: 'Több minőségi páciensmegkeresés és átláthatóbb kezelésbemutatás.',
    mitJavit: 'Időpontfoglalás, bizalomépítés, kezelésbemutatás',
    tags: ['Fogászat', 'Időpontfoglalás', 'Bizalomépítés', 'Prémium design'],
    gradient: 'linear-gradient(135deg, #0a140a 0%, #18301a 40%, #7a9a501a 100%)',
    accentColor: '#7a9a50',
    featured: true,
    liveUrl: 'https://preeminent-strudel-958a61.netlify.app',
    videoSrc: '/portfolio/dental-clinic-preview-opt.mp4',
    videoFit: 'contain',
    caseStudy: {
      challenge: 'A régi online jelenlét nem tükrözte a klinika szakmai színvonalát, és nem vezette elég egyértelműen a pácienseket az időpontfoglalásig.',
      solution: 'Letisztult, bizalomépítő weboldal készült átlátható kezelésekkel, erős vizuális hierarchiával és egyértelmű foglalási útvonallal.',
      result: 'Professzionálisabb első benyomás, könnyebb tájékozódás és gyorsabb kapcsolatfelvétel.',
    },
  },
  {
    id: 'beauty-embassy',
    name: 'Beauty Embassy',
    category: 'beauty',
    badgeLabel: 'Szépségipar',
    tagline: 'Prémium med-spa és szépségszalon, foglalás-központú megjelenéssel.',
    description: 'Világos, elegáns szépségipari weboldal, amely a szolgáltatásokat, hangulatot és foglalási útvonalat egy prémium élménnyé rendezi.',
    cel: 'Több időpontfoglalás és erősebb bizalomépítés.',
    mitJavit: 'Időpontfoglalás, kezelésbemutatás, bizalomépítés',
    tags: ['Szépségipar', 'Foglalás', 'Prémium arculat', 'Mobilnézet'],
    gradient: 'linear-gradient(135deg, #160810 0%, #3a1830 40%, #c080a01a 100%)',
    accentColor: '#c080a0',
    liveUrl: 'https://beauty-embassy.netlify.app',
    videoSrc: '/portfolio/beauty-salon-preview-opt.mp4',
    caseStudy: {
      challenge: 'A szépségiparban a vendég a hangulat és a fotók alapján dönt — a korábbi megjelenés viszont nem közvetítette a stúdió színvonalát, és nehézkes volt eljutni a foglalásig.',
      solution: 'Letisztult, világos, többoldalas oldal készült: kategóriánként rendezett kezelések, árak, galéria és minden oldalról egyértelmű foglalási útvonal.',
      result: 'Igényesebb első benyomás, könnyebb tájékozódás a kezelések között és gyorsabb út az időpontfoglalásig.',
    },
  },
  {
    id: 'hotel-aranyudvar',
    name: 'Hotel Aranyudvar',
    category: 'hotel',
    tagline: 'Prémium hotel weboldal közvetlen foglalási fókuszszal',
    description: 'Elegáns, atmoszférikus hotel weboldal, amely a szállás hangulatát, a szobákat és a közvetlen érdeklődést helyezi előtérbe.',
    cel: 'Több direkt foglalás és kevesebb bizonytalanság.',
    mitJavit: 'Közvetlen foglalás, szobabemutató, prémium pozicionálás',
    tags: ['Hotel', 'Foglalás', 'Szobák', 'Élményalapú design'],
    gradient: 'linear-gradient(135deg, #05101a 0%, #163050 40%, #5a9aba1a 100%)',
    accentColor: '#5a9aba',
    videoSrc: '/portfolio/hotel-aranyudvar-preview2-opt.mp4',
  },
  {
    id: 'pesti6',
    name: 'Pesti6',
    category: 'hospitality',
    tagline: 'Modern magyar étterem Budapest szívében.',
    description: 'Karakteres vendéglátóhely-weboldal, ahol a hangulat, kínálat, nyitvatartás és helyszín gyorsan megtalálható.',
    cel: 'Gyorsabb döntés, több látogatás, erősebb márkaélmény.',
    mitJavit: 'Asztalfoglalás, étlapbemutatás, hangulat',
    tags: ['Vendéglátás', 'Étlap', 'Helyszín', 'Mobil'],
    gradient: 'linear-gradient(135deg, #2a0d08 0%, #6e2412 40%, #c9a04c1a 100%)',
    accentColor: '#b5482e',
    liveUrl: 'https://pesti6-demo.netlify.app',
    videoSrc: '/portfolio/pesti6-preview-opt.mp4',
  },
  {
    id: 'kelet-kavenzo',
    name: 'Kelet Kávézó és Galéria',
    category: 'hospitality',
    tagline: 'Kávézó és galéria, reggeltől estig',
    description: 'Barátságos, étvágykeltő weboldal koncepció, amely gyorsan megmutatja, miért érdemes betérni vagy asztalt foglalni.',
    cel: 'Könnyebb tájékozódás és több vendég.',
    mitJavit: 'Hangulatbemutatás, bizalomépítés, vendégélmény kommunikáció',
    tags: ['Kávézó', 'Étterem', 'Asztalfoglalás', 'Étlap'],
    gradient: 'linear-gradient(135deg, #05101a 0%, #163050 40%, #c9a84c1a 100%)',
    accentColor: '#5a9aba',
    videoSrc: '/portfolio/hotel-kelet-preview-opt.mp4',
    posterSrc: '/portfolio/hotel-kelet-poster.webp',
  },
]
