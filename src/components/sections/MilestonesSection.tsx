import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { ScrollStoryGallery, type StoryImage, type StorySurface } from '@/components/ui/scroll-story-gallery'
import { site } from '@/data/site'

/* Alternating brand surfaces so each chapter reads as a new room. */
const surfaces: StorySurface[] = [
  { bg: 'bg-brand-teal-deep', fg: 'text-brand-ivory', muted: 'text-brand-ivory/65' },
  { bg: 'bg-brand-ivory', fg: 'text-brand-brown', muted: 'text-brand-stone' },
  { bg: 'bg-brand-brown', fg: 'text-brand-ivory', muted: 'text-brand-ivory/65' },
  { bg: 'bg-brand-ivory-deep', fg: 'text-brand-brown', muted: 'text-brand-stone' },
  { bg: 'bg-brand-ink', fg: 'text-brand-ivory', muted: 'text-brand-ivory/65' },
]

const images: StoryImage[] = site.milestones.map((m, i) => ({
  surface: surfaces[i % surfaces.length],
  display: m.year,
  title: m.title,
  description: m.body,
}))

interface MilestonesSectionProps {
  /** Section index shown in the eyebrow. */
  number?: string
  className?: string
}

export function MilestonesSection({ number = '03', className }: MilestonesSectionProps) {
  return (
    <section
      id="milestones"
      aria-labelledby="milestones-heading"
      className={className ?? 'bg-brand-ivory pb-[clamp(4.5rem,10vw,10rem)] text-brand-brown'}
    >
      <div className="container-x mx-auto max-w-[1600px] pt-[clamp(4.5rem,10vw,10rem)] pb-10 md:pb-14">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel number={number}>Milestones</SectionLabel>
          </Reveal>
          <h2 id="milestones-heading" className="mt-6 display-2">
            <SplitWords text="Six years, five milestones." />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
              From a first conversation in {site.founded} to nationwide recognition. Keep scrolling — each
              chapter rises into the last.
            </p>
          </Reveal>
        </div>
      </div>

      <ScrollStoryGallery images={images} direction="up" />
    </section>
  )
}
