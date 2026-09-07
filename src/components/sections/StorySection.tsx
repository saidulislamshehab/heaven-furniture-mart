import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { ScrollRevealGallery, type ScrollRevealImage } from '@/components/ui/scroll-reveal-gallery'

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`

const images: ScrollRevealImage[] = [
  {
    src: unsplash('photo-1586023492125-27b2c045efd7'),
    alt: 'Sunlit living room with a low linen sofa, timber side table and layered neutral textiles',
    eyebrow: '01 — Arrive',
    title: 'A room that breathes.',
    description: 'Warm light, honest timber and one sofa made to the exact width of the wall it rests against.',
  },
  {
    src: unsplash('photo-1616486338812-3dadae4b4ace'),
    alt: 'Minimal lounge with a curved sofa, sculptural lamp and soft ivory walls',
    eyebrow: '02 — Gather',
    title: 'Made for long evenings.',
    description: 'Seating proportioned to the people who use it — deep enough to stay, refined enough to admire.',
  },
  {
    src: unsplash('photo-1616594039964-ae9021a400a0'),
    alt: 'Calm bedroom with an upholstered headboard, bedside cabinets and muted linen bedding',
    eyebrow: '03 — Rest',
    title: 'Quiet by design.',
    description: 'A bedroom suite built as one thought: headboard, cabinets and wardrobe in a single matched grain.',
  },
  {
    src: unsplash('photo-1617806118233-18e1de247200'),
    alt: 'Dining room with a solid timber table, cane chairs and a low pendant lamp',
    eyebrow: '04 — Share',
    title: 'The table that hosts.',
    description: 'Solid timber, hand-finished edges and a length decided by how many you like to feed.',
  },
  {
    src: unsplash('photo-1600210492486-724fe5c67fb0'),
    alt: 'Study corner with a walnut desk, leather chair and built-in shelving in warm light',
    eyebrow: '05 — Belong',
    title: 'Every piece, in its place.',
    description: 'From the first drawing to installation day — furniture that fits the room, and the life inside it.',
  },
]

export function StorySection() {
  return (
    <section id="story" aria-labelledby="story-heading" className="bg-brand-ivory-deep pb-[clamp(4.5rem,10vw,10rem)] text-brand-brown">
      <div className="container-x mx-auto max-w-[1600px] pt-[clamp(4.5rem,10vw,10rem)] pb-10 md:pb-14">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel number="04">A home, room by room</SectionLabel>
          </Reveal>
          <h2 id="story-heading" className="mt-6 display-1">
            <SplitWords text="Move through the house." />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
              Five rooms, one hand. Keep scrolling and watch each space uncover the next.
            </p>
          </Reveal>
        </div>
      </div>

      <ScrollRevealGallery images={images} />
    </section>
  )
}
