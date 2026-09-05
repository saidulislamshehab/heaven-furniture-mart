export interface VideoAsset {
  src: string
  poster: string
  /** intrinsic orientation, used for layout */
  orientation: 'landscape' | 'portrait'
  durationSec: number
}

export const heroVideos: VideoAsset[] = [
  { src: '/videos/hero/hero-dining-cabinet.mp4', poster: '/images/posters/hero-dining-cabinet.jpg', orientation: 'landscape', durationSec: 10 },
  { src: '/videos/hero/hero-penthouse.mp4', poster: '/images/posters/hero-penthouse.jpg', orientation: 'landscape', durationSec: 10 },
  { src: '/videos/hero/hero-egg-chair.mp4', poster: '/images/posters/hero-egg-chair.jpg', orientation: 'landscape', durationSec: 10 },
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
}

export const brandImages = {
  logo: '/logo.png',
  founder: '/images/brand/founder-abul-kalam-bhuiyan.jpg',
  showroomExterior: '/images/brand/showroom-exterior.avif',
}

const f = (name: string) => `/images/furniture/${name}.jpg`

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
