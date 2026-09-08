export interface VideoAsset {
  src: string
  poster: string
  /** intrinsic orientation, used for layout */
  orientation: 'landscape' | 'portrait'
  durationSec: number
}

export const heroVideos: VideoAsset[] = [
  { src: '/videos/hero/hero-egg-chair.mp4', poster: '/images/posters/hero-egg-chair.jpg', orientation: 'landscape', durationSec: 10 },
  { src: '/videos/hero/hero-sofa.mp4', poster: '/images/posters/hero-sofa.jpg', orientation: 'landscape', durationSec: 10 },
  { src: '/videos/hero/hero-penthouse.mp4', poster: '/images/posters/hero-penthouse.jpg', orientation: 'landscape', durationSec: 10 },
  { src: '/videos/hero/hero-dining-cabinet.mp4', poster: '/images/posters/hero-dining-cabinet.jpg', orientation: 'landscape', durationSec: 10 },
  { src: '/videos/hero/hero-penthouse2.mp4', poster: '/images/posters/hero-penthouse2.jpg', orientation: 'landscape', durationSec: 10 },
]

export const workshopFilms = [
  {
    id: 'form',
    index: '01',
    label: 'Form',
    title: 'The first line takes shape.',
    body: 'Proportion and structure are cut from selected timber — the early decisions that give a piece its presence.',
    video: { src: '/videos/workshop/form-cnc-cut.mp4', poster: '/images/posters/form-cnc-cut.jpg', orientation: 'portrait', durationSec: 8 } satisfies VideoAsset,
  },
  {
    id: 'craft',
    index: '02',
    label: 'Craft',
    title: 'Material meets the maker.',
    body: 'Carving, joinery and patient hand-work — the rhythm behind furniture made for one room.',
    video: { src: '/videos/workshop/craft-carving.mp4', poster: '/images/posters/craft-carving.jpg', orientation: 'portrait', durationSec: 14 } satisfies VideoAsset,
  },
  {
    id: 'finish',
    index: '03',
    label: 'Finish',
    title: 'Detail becomes character.',
    body: 'Gilding, surface and edge — the last touches where craftsmanship becomes distinctly yours.',
    video: { src: '/videos/workshop/finish-gilded-detail.mp4', poster: '/images/posters/finish-gilded-detail.jpg', orientation: 'portrait', durationSec: 15 } satisfies VideoAsset,
  },
] as const

export const showroomVideos = {
  walkthrough: { src: '/videos/showroom/showroom-walkthrough.mp4', poster: '/images/posters/showroom-walkthrough.jpg', orientation: 'portrait', durationSec: 51 } satisfies VideoAsset,
  blueChairs: { src: '/videos/showroom/showroom-blue-chairs.mp4', poster: '/images/posters/showroom-blue-chairs.jpg', orientation: 'portrait', durationSec: 22 } satisfies VideoAsset,
  oliveSofaDetail: { src: '/videos/showroom/detail-olive-sofa.mp4', poster: '/images/posters/detail-olive-sofa.jpg', orientation: 'portrait', durationSec: 40 } satisfies VideoAsset,
  sofaFabricDetail: { src: '/videos/showroom/detail-sofa-fabric.mp4', poster: '/images/posters/detail-sofa-fabric.jpg', orientation: 'landscape', durationSec: 10 } satisfies VideoAsset,
  emeraldBedDetail: { src: '/videos/showroom/detail-emerald-bed.mp4', poster: '/images/posters/detail-emerald-bed.jpg', orientation: 'landscape', durationSec: 10 } satisfies VideoAsset,
  luxuriousModernReel: { src: '/videos/showroom/reel-luxurious-modern.mp4', poster: '/images/posters/reel-luxurious-modern.jpg', orientation: 'portrait', durationSec: 12 } satisfies VideoAsset,
  commercial: { src: '/videos/showroom/commercial-1.mp4', poster: '/images/posters/commercial-1.jpg', orientation: 'landscape', durationSec: 10 } satisfies VideoAsset,
}

export const brandImages = {
  logo: '/logo.png',
  wordmark: '/images/brand/heaven-wordmark.png',
  founder: '/images/brand/founder-abul-kalam-bhuiyan.jpg',
  showroomExterior: '/images/brand/showroom-exterior.avif',
}

/** Editorial interior photography for the "room by room" story (Unsplash licence). */
export const storyImages = {
  arrive: '/images/story/01-arrive.jpg',
  gather: '/images/story/02-gather.jpg',
  rest: '/images/story/03-rest.jpg',
  share: '/images/story/04-share.jpg',
  belong: '/images/story/05-belong.jpg',
}

/** Unsplash CDN image, resized server-side. Editorial interiors used where we have no own photography. */
export const unsplash = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/** Full-bleed page-hero imagery for inner pages. */
export const pageHeroImages = {
  shop: { src: unsplash('photo-1555041469-a586c61ea9bc', 2000), alt: 'Sunlit living room with a tailored grey sofa, timber coffee table and layered neutral textiles' },
  shopByCategory: {
    'living-room': { src: unsplash('photo-1555041469-a586c61ea9bc', 2000), alt: 'Tailored grey sofa in a bright, minimal living room' },
    bedroom: { src: unsplash('photo-1616594039964-ae9021a400a0', 2000), alt: 'Calm bedroom with an upholstered headboard and linen bedding' },
    dining: { src: unsplash('photo-1617806118233-18e1de247200', 2000), alt: 'Dining room with a solid timber table and cane chairs under a pendant lamp' },
    'office-study': { src: unsplash('photo-1497366811353-6870744d04b2', 2000), alt: 'Glass-walled office with a long timber meeting table and upholstered chairs' },
    bespoke: { src: unsplash('photo-1583847268964-b28dc8f51f92', 2000), alt: 'Soft grey sofa with turned-timber tables and layered textiles in a made-to-measure living room' },
  },
  about: { src: unsplash('photo-1615873968403-89e068629265', 2000), alt: 'Tan leather sofa against a deep teal wall with framed prints and a brass floor lamp' },
} as const

const f = (name: string) => `/images/furniture/${name}.jpg`

/** Editorial photography for the bespoke process steps (licensed stock, Pexels). */
export const processImages = {
  discover: '/images/process/discover.jpg',
  design: '/images/process/design.jpg',
  craft: '/images/process/craft.jpg',
  deliver: '/images/process/deliver.jpg',
  install: '/images/process/install.jpg',
} as const

export const img = {
  royalBlueSalon: f('living-royal-blue-salon-set'),
  creamModernSofa: f('living-cream-modern-sofa'),
  silverBrocadeSofa: f('living-silver-brocade-sofa'),
  blueModernSofa: f('living-blue-modern-sofa'),
  ivoryCarvedDining: f('dining-ivory-carved-set'),
  greyDamaskArmchair: f('living-grey-damask-armchair'),
  silverTuftedSofa: f('living-silver-tufted-sofa'),
  oliveVelvetArmchair: f('living-olive-velvet-armchair'),
  greenVelvetSet: f('living-green-velvet-set'),
  wovenEggChair: f('living-woven-egg-chair'),
  goldStripedSofa: f('living-gold-striped-sofa'),
  bronzeStripedSofa: f('living-bronze-striped-sofa'),
  royalBlueChaise: f('living-royal-blue-chaise'),
  creamClassicLounge: f('living-cream-classic-lounge'),
  posterModernSofa: f('poster-modern-sofa-set'),
  posterBedroom: f('poster-luxury-bedroom'),
  posterVanity: f('poster-vanity-dressing'),
  execChairBrown: f('office-executive-chair-brown'),
  execChairBlack: f('office-executive-chair-black'),
  meshChair: f('office-ergonomic-mesh-chair'),
  loungeTable: f('office-lounge-table'),
  directorDesk: f('office-director-desk'),
  studioRoyalBlueSofa: f('studio-royal-blue-sofa'),
  studioCreamTufted: f('studio-cream-tufted-set'),
  studioBlueBrocade: f('studio-blue-brocade-loveseat'),
  studioIvoryDining: f('studio-ivory-dining-set'),
  studioDisplayCabinet: f('studio-display-cabinet'),
  studioGreyFloral: f('studio-grey-floral-sofa'),
  studioBlackSideboard: f('studio-black-sideboard'),
  studioCarvedArmchairs: f('studio-carved-armchairs'),
  studioMarblePeach: f('studio-marble-dining-peach'),
  studioEmeraldBed: f('studio-emerald-bed'),
  studioMarbleLeather: f('studio-marble-dining-leather'),
  studioClassicLounge: f('studio-classic-lounge-suite'),
  studioTealBed: f('studio-teal-carved-bed'),
  studioNavyVelvet: f('studio-navy-velvet-sofa'),
} as const
