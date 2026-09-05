export const site = {
  name: 'Heaven Furniture Mart',
  shortName: 'Heaven',
  tagline: 'Designed. Crafted. Customized.',
  founded: 2020,
  founder: { name: 'Abul Kalam Bhuiyan', role: 'Managing Director' },
  address: {
    line1: 'Agrabad Access Road',
    city: 'Chattogram',
    country: 'Bangladesh',
  },
  phoneDisplay: '+880 1960-481983',
  phoneE164: '+8801960481983',
  email: 'heavenfurnituremart@gmail.com',
  mapsUrl: 'https://maps.app.goo.gl/XnZzpdkLTNB9jhGP9f',
  mapsCoords: { lat: 22.3296222, lng: 91.7930853 },
  googleRating: { score: 4.8, label: 'Google rating' },
  social: {
    facebook: 'https://www.facebook.com/HeavenFurnitureMart',
    instagram: 'https://www.instagram.com/heaven_furniture_ltd',
    youtube: 'https://www.youtube.com/@HeavenFurnitureMart',
  },
  founderQuote:
    'At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients.',
  trustPoints: [
    { title: 'Free design consultation', body: 'Begin with a conversation about your room, not a catalogue.' },
    { title: 'Fully bespoke', body: 'Built to your space and taste — never mass-produced.' },
    { title: 'Premium wood & materials', body: 'Selected timber, upholstery and finishes, crafted in-house.' },
    { title: 'Showroom in Agrabad', body: 'A large physical showroom in Chattogram to touch, sit and imagine.' },
    { title: 'Delivery & installation', body: 'Placed and finished in your home by the same team that built it.' },
    { title: 'Easy payment options', body: 'Flexible plans so the right piece is never out of reach.' },
  ],
  milestones: [
    { year: '2020', title: 'Founded', body: 'Established in Chattogram by Managing Director Abul Kalam Bhuiyan.' },
    { year: '2021', title: 'Agrabad showroom', body: 'Opened the showroom on Agrabad Access Road.' },
    { year: '2024–25', title: 'International Furniture Fair', body: 'Exhibited at the International Furniture Fair, Chattogram.' },
    { year: '2025', title: 'Chamber of Commerce', body: 'Became a member of the Chamber of Commerce.' },
    { year: '2026', title: 'BFIOA recognition', body: 'Received nationwide BFIOA recognition.' },
  ],
  showroomFeatures: [
    'Custom Furniture Design',
    'Architectural Wood & Fabric Selection',
    'In-House Interior Consultation',
    'Premium Modern & Classic Living',
  ],
} as const

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.phoneE164.replace('+', '')}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_DEFAULT = whatsappUrl(
  "Hello Heaven Furniture Mart, I'd like a free design consultation."
)
