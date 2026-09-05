import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CircularSplitRoll, { type CircularSplitRollItem } from '@/components/ui/circular-split-roll'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { img, workshopFilms } from '@/data/assets'

const steps: CircularSplitRollItem[] = [
  {
    index: '01',
    title: 'Discover',
    body: 'We begin with your room — measurements, light, routines and the pieces you already love. Not a catalogue size.',
    image: img.silverTuftedSofa,
    alt: 'Silver tufted sofa with a carved crest on the showroom floor',
  },
  {
    index: '02',
    title: 'Design',
    body: 'Together we settle proportion, timber, upholstery and finish, until the drawing feels like it already belongs to your home.',
    image: img.royalBlueChaise,
    alt: 'Royal blue chaise sofa with a gilt frame on the showroom floor',
  },
  {
    index: '03',
    title: 'Craft',
    body: 'Skilled makers cut, carve, join and upholster in-house. Premium materials, close attention, no shortcuts.',
    image: workshopFilms[1].video.poster,
    alt: 'Hand-carving detail on a timber frame',
  },
  {
    index: '04',
    title: 'Deliver',
    body: 'Your piece travels from our workshop to your door with the same care it was made with.',
    image: img.creamClassicLounge,
    alt: 'Cream classic lounge set with carved armchairs',
  },
  {
    index: '05',
    title: 'Install',
    body: 'We place, level and finish everything in your room — and leave only when it looks the way you imagined.',
    image: img.ivoryCarvedDining,
    alt: 'Ivory carved dining set, installed and styled',
  },
]

export function BespokeSection() {
  const { open } = useConsultation()

  return (
    <section id="bespoke" className="bg-brand-teal-deep pt-[clamp(4.5rem,10vw,10rem)] text-brand-ivory">
      <div className="container-x mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel number="02">The bespoke difference</SectionLabel>
            </Reveal>
            <h2 className="mt-6 display-1">
              <SplitWords text="Not off the shelf." />
            </h2>
          </div>
          <Reveal delay={0.3} className="self-end lg:col-span-5">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-brand-ivory/70">
              Every Heaven piece begins with a room, a need and a conversation. Five steps, one team —
              from the first measurement to the last adjustment in your home.
            </p>
          </Reveal>
        </div>

      </div>

      <div className="mt-12 lg:mt-6">
        <CircularSplitRoll items={steps} radius={420} cardSize={380} sectionHeight={95} />
      </div>

      <div className="container-x mx-auto max-w-[1600px] pb-[clamp(4.5rem,10vw,10rem)]">
        <Reveal className="mt-16 flex flex-col items-start gap-6 border-t border-brand-ivory/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p className="max-w-md font-serif text-2xl leading-snug text-brand-ivory/85 sm:text-3xl">
            Free design consultation, delivery and installation are built in.
          </p>
          <Button variant="ivory" size="pill" onClick={() => open()}>
            Start a Free Consultation <ArrowUpRight />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
