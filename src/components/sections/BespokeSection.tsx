import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { Reveal, SplitWords, luxuryEase } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { img, showroomVideos, workshopFilms } from '@/data/assets'
import { cn } from '@/lib/utils'

const steps = [
  {
    n: '01',
    title: 'Discover',
    body: 'We begin with your room — measurements, light, routines and the pieces you already love. Not a catalogue size.',
    image: showroomVideos.walkthrough.poster,
    alt: 'Inside the Heaven Furniture Mart showroom',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Together we settle proportion, timber, upholstery and finish, until the drawing feels like it already belongs to your home.',
    image: img.royalBlueChaise,
    alt: 'Royal blue chaise sofa with a gilt frame on the showroom floor',
  },
  {
    n: '03',
    title: 'Craft',
    body: 'Skilled makers cut, carve, join and upholster in-house. Premium materials, close attention, no shortcuts.',
    image: workshopFilms[1].video.poster,
    alt: 'Hand-carving detail on a timber frame',
  },
  {
    n: '04',
    title: 'Deliver',
    body: 'Your piece travels from our workshop to your door with the same care it was made with.',
    image: img.creamClassicLounge,
    alt: 'Cream classic lounge set with carved armchairs',
  },
  {
    n: '05',
    title: 'Install',
    body: 'We place, level and finish everything in your room — and leave only when it looks the way you imagined.',
    image: img.ivoryCarvedDining,
    alt: 'Ivory carved dining set, installed and styled',
  },
]

export function BespokeSection() {
  const { open } = useConsultation()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index)
            setActive(i)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    itemRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="bespoke" className="section-pad bg-brand-teal-deep text-brand-ivory">
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

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:order-2">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden bg-brand-teal sm:aspect-[5/4] lg:aspect-[4/5]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={steps[active].image}
                  src={steps[active].image}
                  alt={steps[active].alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 1, ease: luxuryEase }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-brand-ink/70 to-transparent p-5 sm:p-7">
                <span className="font-serif text-6xl leading-none text-brand-ivory/90 sm:text-7xl">
                  {steps[active].n}
                </span>
                <span className="eyebrow text-brand-gold-soft">{steps[active].title}</span>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:order-1">
            {steps.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                data-index={i}
                className={cn(
                  'group border-t border-brand-ivory/10 py-9 transition-opacity duration-700 first:border-t-0 lg:py-14',
                  active === i ? 'opacity-100' : 'opacity-40 lg:hover:opacity-70'
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActive(i)
                    itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className="grid w-full grid-cols-[3rem_1fr] gap-4 text-left sm:grid-cols-[4.5rem_1fr]"
                >
                  <span className="font-serif text-2xl text-brand-gold sm:text-3xl">{s.n}</span>
                  <span>
                    <span className="block font-serif text-3xl leading-none sm:text-4xl lg:text-5xl">{s.title}</span>
                    <span className="mt-4 block max-w-md text-[0.98rem] leading-relaxed text-brand-ivory/70">{s.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

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
