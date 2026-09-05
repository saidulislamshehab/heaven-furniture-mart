import { img } from './assets'

export type CategoryId = 'living-room' | 'bedroom' | 'dining' | 'office-study' | 'bespoke'

export interface Category {
  id: CategoryId
  index: string
  name: string
  short: string
  body: string
  items: string
  image: string
  secondaryImage: string
}

export const categories: Category[] = [
  {
    id: 'living-room',
    index: '01',
    name: 'Living Room',
    short: 'Living',
    body: 'Sofas, coffee tables, TV units and consoles crafted for comfort, elegance and everyday living.',
    items: 'Sofas · Coffee tables · TV units · Consoles',
    image: img.studioRoyalBlueSofa,
    secondaryImage: img.studioCreamTufted,
  },
  {
    id: 'bedroom',
    index: '02',
    name: 'Bedroom',
    short: 'Bedroom',
    body: 'Beds, wardrobes, dressing tables and bedside tables made to bring calm and lasting comfort.',
    items: 'Beds · Wardrobes · Dressing tables · Bedside tables',
    image: img.studioEmeraldBed,
    secondaryImage: img.studioTealBed,
  },
  {
    id: 'dining',
    index: '03',
    name: 'Dining',
    short: 'Dining',
    body: 'Dining tables, chairs and cabinets designed for the moments that gather everyone together.',
    items: 'Dining tables · Dining chairs · Cabinets',
    image: img.studioMarbleLeather,
    secondaryImage: img.studioIvoryDining,
  },
  {
    id: 'office-study',
    index: '04',
    name: 'Office & Study',
    short: 'Office',
    body: 'Executive tables, bookshelves and workstations with clarity, storage and presence built in.',
    items: 'Executive tables · Bookshelves · Workstations',
    image: img.directorDesk,
    secondaryImage: img.execChairBrown,
  },
  {
    id: 'bespoke',
    index: '05',
    name: 'Bespoke',
    short: 'Bespoke',
    body: 'Anything built to your own space, size and taste — from a single console to a full residence.',
    items: 'Made to measure · Any room · Your design',
    image: img.studioDisplayCabinet,
    secondaryImage: img.studioCarvedArmchairs,
  },
]

export interface Product {
  slug: string
  name: string
  category: CategoryId
  image: string
  /** short material / style note — no prices or specs are invented */
  note: string
  featured?: boolean
}

export const products: Product[] = [
  { slug: 'royal-blue-salon-set', name: 'Royal Blue Salon Set', category: 'living-room', image: img.studioRoyalBlueSofa, note: 'Carved frame · velvet upholstery', featured: true },
  { slug: 'cream-tufted-lounge-set', name: 'Cream Tufted Lounge Set', category: 'living-room', image: img.studioCreamTufted, note: 'Button-tufted · gilt detailing', featured: true },
  { slug: 'blue-brocade-loveseat', name: 'Blue Brocade Loveseat', category: 'living-room', image: img.studioBlueBrocade, note: 'Patterned brocade · carved arms' },
  { slug: 'grey-floral-sofa', name: 'Grey Floral Sofa', category: 'living-room', image: img.studioGreyFloral, note: 'Embroidered velvet · classic form' },
  { slug: 'carved-armchair-pair', name: 'Carved Armchair Pair', category: 'living-room', image: img.studioCarvedArmchairs, note: 'Dark timber · striped upholstery', featured: true },
  { slug: 'navy-velvet-sofa', name: 'Navy Velvet Sofa', category: 'living-room', image: img.studioNavyVelvet, note: 'Deep navy · gold trim' },
  { slug: 'classic-lounge-suite', name: 'Classic Lounge Suite', category: 'living-room', image: img.studioClassicLounge, note: 'Timber frame · neutral linen' },
  { slug: 'cream-modern-sofa', name: 'Cream Modern Sofa', category: 'living-room', image: img.creamModernSofa, note: 'Clean lines · soft neutral fabric' },
  { slug: 'blue-modern-sofa', name: 'Blue Modern Sofa', category: 'living-room', image: img.blueModernSofa, note: 'Contemporary · channel stitching' },
  { slug: 'green-velvet-set', name: 'Green Velvet Set', category: 'living-room', image: img.greenVelvetSet, note: 'Olive velvet · silver-leaf frame' },
  { slug: 'woven-egg-chair', name: 'Woven Hanging Egg Chair', category: 'living-room', image: img.wovenEggChair, note: 'Woven rattan · steel stand' },
  { slug: 'royal-blue-chaise', name: 'Royal Blue Chaise', category: 'living-room', image: img.royalBlueChaise, note: 'Sculpted back · gilt frame' },
  { slug: 'silver-tufted-sofa', name: 'Silver Tufted Sofa', category: 'living-room', image: img.silverTuftedSofa, note: 'Tufted back · carved crest' },
  { slug: 'grey-damask-armchair', name: 'Grey Damask Armchair', category: 'living-room', image: img.greyDamaskArmchair, note: 'Damask fabric · classic silhouette' },

  { slug: 'emerald-bed', name: 'Emerald Channel Bed', category: 'bedroom', image: img.studioEmeraldBed, note: 'Channel-stitched velvet headboard', featured: true },
  { slug: 'teal-carved-bed', name: 'Teal Carved Bed', category: 'bedroom', image: img.studioTealBed, note: 'Carved timber · teal upholstery', featured: true },
  { slug: 'luxury-bedroom-set', name: 'Modern Bedroom Set', category: 'bedroom', image: img.posterBedroom, note: 'Upholstered bed · matching side tables' },
  { slug: 'vanity-dressing-table', name: 'Vanity Dressing Table', category: 'bedroom', image: img.posterVanity, note: 'Lit mirror · lacquered drawers' },

  { slug: 'marble-dining-leather', name: 'Marble Dining Suite', category: 'dining', image: img.studioMarbleLeather, note: 'Marble top · leather chairs', featured: true },
  { slug: 'ivory-grand-dining', name: 'Ivory Grand Dining', category: 'dining', image: img.studioIvoryDining, note: 'Carved ivory finish · floral seats', featured: true },
  { slug: 'marble-dining-peach', name: 'Marble Dining with Quilted Chairs', category: 'dining', image: img.studioMarblePeach, note: 'Marble top · quilted chairs' },
  { slug: 'ivory-carved-dining-set', name: 'Ivory Carved Dining Set', category: 'dining', image: img.ivoryCarvedDining, note: 'Classic carving · light upholstery' },
  { slug: 'display-cabinet', name: 'Display Cabinet', category: 'dining', image: img.studioDisplayCabinet, note: 'Glass front · carved crown', featured: true },
  { slug: 'black-sideboard', name: 'Black Sideboard', category: 'dining', image: img.studioBlackSideboard, note: 'Matte black · brass hardware' },

  { slug: 'director-desk', name: 'Director Desk', category: 'office-study', image: img.directorDesk, note: 'Executive desk · integrated storage', featured: true },
  { slug: 'executive-chair-brown', name: 'Executive Chair, Brown', category: 'office-study', image: img.execChairBrown, note: 'High back · leather finish' },
  { slug: 'executive-chair-black', name: 'Executive Chair, Black', category: 'office-study', image: img.execChairBlack, note: 'High back · timber arms' },
  { slug: 'ergonomic-mesh-chair', name: 'Ergonomic Mesh Chair', category: 'office-study', image: img.meshChair, note: 'Breathable mesh · adjustable' },
  { slug: 'lounge-meeting-table', name: 'Lounge Meeting Table', category: 'office-study', image: img.loungeTable, note: 'Round top · four seats' },

  { slug: 'bespoke-console', name: 'Made-to-Measure Console', category: 'bespoke', image: img.studioBlackSideboard, note: 'Your dimensions · your finish' },
  { slug: 'bespoke-seating', name: 'Bespoke Seating', category: 'bespoke', image: img.goldStripedSofa, note: 'Any fabric · any frame' },
  { slug: 'bespoke-dining', name: 'Bespoke Dining', category: 'bespoke', image: img.studioMarblePeach, note: 'Sized for your family' },
]

export const featuredProducts = products.filter((p) => p.featured)

export function categoryById(id: string | null | undefined) {
  return categories.find((c) => c.id === id)
}
