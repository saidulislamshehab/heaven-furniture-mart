import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CircularSplitRoll, { type CircularSplitRollItem } from '@/components/ui/circular-split-roll'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { img, processImages } from '@/data/assets'

const steps: CircularSplitRollItem[] = [
  {
    index: '01',
    title: 'Discover',
    body: 'We begin with your room — measurements, light, routines and the pieces you already love. Not a catalogue size.',
    image: processImages.discover,
    alt: 'Hands resting on a hand-drawn room plan with furniture sketched in place',
  },
  {
    index: '02',
    title: 'Design',
    body: 'Together we settle proportion, timber, upholstery and finish, until the drawing feels like it already belongs to your home.',
    image: processImages.design,
    alt: 'Layered leather and timber material samples in warm browns',
  },
  {
    index: '03',
    title: 'Craft',
    body: 'Skilled makers cut, carve, join and upholster in-house. Premium materials, close attention, no shortcuts.',
    image: processImages.craft,
    alt: 'Craftsman hand-planing timber, shavings curling across the bench',
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
    <section id="bespoke" className="bg-brand-ivory pt-[clamp(4.5rem,10vw,10rem)] text-brand-brown">
      <div className="container-x mx-auto max-w-[1600px]">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel number="02">The bespoke difference</SectionLabel>
          </Reveal>
          <h2 className="mt-6 display-1">
            <SplitWords text="Not off the shelf." />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
              Every Heaven piece begins with a room, a need and a conversation. Five steps, one team —
              from the first measurement to the last adjustment in your home.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 lg:mt-6">
        <CircularSplitRoll items={steps} radius={440} cardSize={440} sectionHeight={95} tone="light" />
      </div>

      <div className="container-x mx-auto max-w-[1600px] pb-[clamp(4.5rem,10vw,10rem)]">
        <Reveal className="mt-16 flex flex-col items-start gap-6 border-t border-brand-brown/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p className="max-w-md font-serif text-2xl leading-snug text-brand-brown/85 sm:text-3xl">
            Free design consultation, delivery and installation are built in.
          </p>
          <Button variant="ink" size="pill" onClick={() => open()}>
            Start a Free Consultation <ArrowUpRight />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
