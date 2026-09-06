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
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.6354659037056!2d91.7930853!3d22.3296222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd999401bf62b%3A0xcd9639571c8d5c27!2sHeaven%20Furniture%20Mart!5e0!3m2!1sen!2sbd!4v1788714688708!5m2!1sen!2sbd',
  mapsCoords: { lat: 22.3296222, lng: 91.7930853 },
  googleRating: { score: 4.8, count: 30, label: 'Google rating' },
  /* Public reviews from the Heaven Furniture Mart Google listing (longer ones excerpted). */
  reviews: [
    {
      author: 'Jefranul Rakib',
      rating: 5,
      quote:
        'I bought a living room set from Heaven Furniture, and honestly, the whole experience was amazing. The staff was incredibly helpful without being pushy, and everything arrived right on time without a single scratch.',
    },
    {
      author: 'Rakibur Rahaman',
      rating: 5,
      quote:
        'Now when I sit at the desk, the whole setup looks very premium and productive. The finishing, build quality, and detailing are amazing.',
    },
    {
      author: 'Asraf Khan',
      rating: 5,
      quote:
        'The materials are durable, the design is beautiful and the price is reasonable. The staff is friendly, helpful and delivered quickly as ordered.',
    },
    {
      author: 'MRH',
      rating: 5,
      quote:
        'Very good service, all the furniture has an extraordinary aesthetic design. Everyone should try buying furniture from here at least once.',
    },
    {
      author: 'Sajibur Rahman',
      rating: 5,
      quote:
        'The staff members are knowledgeable, friendly, and genuinely invested in helping customers find the perfect furniture for their homes.',
    },
    {
      author: 'Al Mamun',
      rating: 5,
      quote: 'Product quality was good. And the staffs were very polite. Very recommended.',
    },
    {
      author: 'Jamshed Ul',
      rating: 5,
      quote: 'Product was at competitive price. Satisfied with the service.',
    },
  ],
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
