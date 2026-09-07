import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { ScrollRevealGallery, type ScrollRevealImage } from '@/components/ui/scroll-reveal-gallery'
import { storyImages } from '@/data/assets'

const images: ScrollRevealImage[] = [
  {
    src: storyImages.arrive,
    alt: 'Sunlit living room with a caramel leather sofa, cream armchairs and a gallery wall of framed prints',
    eyebrow: '01 — Arrive',
    title: 'A room that breathes.',
    description: 'Warm light, honest timber and one sofa made to the exact width of the wall it rests against.',
  },
  {
    src: storyImages.gather,
    alt: 'Warm lounge with a grey sofa, leather and timber accents and floor-to-ceiling windows onto greenery',
    eyebrow: '02 — Gather',
    title: 'Made for long evenings.',
    description: 'Seating proportioned to the people who use it — deep enough to stay, refined enough to admire.',
  },
  {
    src: storyImages.rest,
    alt: 'Moody bedroom with a channel-tufted velvet bed, brass chandelier and a patterned rug',
    eyebrow: '03 — Rest',
    title: 'Quiet by design.',
    description: 'A bedroom suite built as one thought: headboard, cabinets and wardrobe in a single matched grain.',
  },
  {
    src: storyImages.share,
    alt: 'Bright dining room with a long table, emerald velvet chairs and a round mirror above a console',
    eyebrow: '04 — Share',
    title: 'The table that hosts.',
    description: 'Solid timber, hand-finished edges and a length decided by how many you like to feed.',
  },
  {
    src: storyImages.belong,
    alt: 'Study with a deep green feature wall, tan leather sofa, framed artwork and a brass floor lamp',
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
