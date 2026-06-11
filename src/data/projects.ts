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
    mitJavit: 'Időpontkérés, bizalomépítés, kezelésbemutatás',
    tags: ['Fogászat', 'Időpontkérés', 'Bizalomépítés', 'Egészségügy'],
    gradient: 'linear-gradient(135deg, #0a140a 0%, #18301a 40%, #7a9a501a 100%)',
    accentColor: '#7a9a50',
    featured: true,
    videoSrc: '/portfolio/dental-clinic-preview.mp4',
    caseStudy: {
      challenge: 'A régi online jelenlét nem tükrözte a klinika szakmai színvonalát, és nem vezette elég egyértelműen a pácienseket az időpontfoglalásig.',
      solution: 'Letisztult, bizalomépítő weboldal készült átlátható kezelésekkel, erős vizuális hierarchiával és egyértelmű foglalási útvonallal.',
      result: 'Professzionálisabb első benyomás, könnyebb tájékozódás és gyorsabb út a kapcsolatfelvételig.',
    },
  },
  {
    id: 'hotel-aranyudvar',
    name: 'Hotel Aranyudvar',
    category: 'hotel',
    tagline: 'Prémium hotel weboldal közvetlen foglalási fókuszszal',
    description: 'Elegáns, atmoszférikus hotel weboldal, amely a szállás hangulatát, a szobákat és a közvetlen foglalást helyezi előtérbe. A cél, hogy a látogató gyorsan bizalmat kapjon, és ne közvetítő oldalon keresztül foglaljon.',
    cel: 'Több saját foglalás és erősebb online bizalomépítés.',
    mitJavit: 'Közvetlen foglalás, szobabemutató, prémium pozicionálás',
    tags: ['Hotel weboldal', 'Foglalás', 'Szobák', 'Prémium arculat'],
    gradient: 'linear-gradient(135deg, #05101a 0%, #163050 40%, #5a9aba1a 100%)',
    accentColor: '#5a9aba',
    videoSrc: '/portfolio/hotel-aranyudvar-preview.mp4',
  },
  {
    id: 'kelet-kavenzo',
    name: 'Kelet Kávézó és Galéria',
    category: 'hospitality',
    tagline: 'Kávézó és galéria, reggeltől estig',
    description: 'Hangulatos kávézó és kulturális tér weboldala, amely egyszerre mutatja be a vendéglátást, a hely atmoszféráját és a galéria jellegű élményt. A cél, hogy a látogató gyorsan kedvet kapjon a személyes látogatáshoz.',
    cel: 'Több helyszíni vendég, erősebb online jelenlét és könnyebb tájékozódás.',
    mitJavit: 'Hangulatbemutatás, bizalomépítés, vendégélmény kommunikáció',
    tags: ['Kávézó', 'Galéria', 'Vendéglátás', 'Helyi élmény'],
    gradient: 'linear-gradient(135deg, #05101a 0%, #163050 40%, #c9a84c1a 100%)',
    accentColor: '#5a9aba',
    videoSrc: '/portfolio/hotel-kelet-preview-opt.mp4',
    posterSrc: '/portfolio/hotel-kelet-poster.webp',
  },
  {
    id: 'placeholder-beauty',
    name: '[Projekt címe]',
    category: 'beauty',
    tagline: '[Rövid alcím — pl. szépségszalon / fodrászat]',
    description: '[Rövid leírás: milyen szépségipari vállalkozás, mi volt a fókusz — pl. időpontfoglalás, galéria, árlista.]',
    cel: '[Mi volt az üzleti cél?]',
    mitJavit: '[Mit javított — pl. időpontfoglalás, bizalom]',
    tags: ['[Címke]', '[Címke]', '[Címke]'],
    gradient: 'linear-gradient(135deg, #160810 0%, #3a1830 40%, #c080a01a 100%)',
    accentColor: '#c080a0',
    comingSoon: true,
  },
  {
    id: 'aurum-bistro',
    name: 'Aurum Bistro',
    category: 'hospitality',
    tagline: 'Elegáns éttermi weboldal',
    description: 'Elegáns éttermi weboldal, amely a hangulatot, az étlapot és az asztalfoglalást helyezi előtérbe. Az első benyomástól a foglalásig minden egyszerű és magával ragadó.',
    cel: 'Erősebb első benyomás és egyszerűbb foglalási útvonal.',
    mitJavit: 'Asztalfoglalás, bizalom, első benyomás',
    tags: ['Étlap', 'Asztalfoglalás', 'Mobilnézet', 'Prémium dizájn'],
    gradient: 'linear-gradient(135deg, #2a0f05 0%, #6a2510 40%, #c9a84c22 100%)',
    accentColor: '#c85d28',
    comingSoon: true,
    videoSrc: '/portfolio/restaurant-aranypinty-preview.mp4',
  },
]
