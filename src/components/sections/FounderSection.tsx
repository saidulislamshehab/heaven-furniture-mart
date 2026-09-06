import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, RevealImage } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Button } from '@/components/ui/button'
import { brandImages } from '@/data/assets'
import { site } from '@/data/site'

gsap.registerPlugin(ScrollTrigger)

export function FounderSection({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // Text drifts upward while the section crosses the viewport and rests once it has left.
  useEffect(() => {
    const section = ref.current
    const text = textRef.current
    if (!section || !text || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { y: 90 },
        {
          y: -90,
          ease: 'none',
          // Measure after the pinned sections above (priority -2) have reserved their space.
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true, refreshPriority: -3 },
        }
      )
    }, section)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="founder" className="section-pad overflow-hidden bg-brand-ivory text-brand-brown">
      <div className="container-x mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-5">
          <RevealImage
            src={brandImages.founder}
            alt={`${site.founder.name}, ${site.founder.role} of Heaven Furniture Mart, speaking at the Chattogram Furniture Fair`}
            className="aspect-[4/5] w-full"
            imgClassName="h-full w-full object-cover object-[48%_30%]"
            sizes="(min-width:1024px) 40vw, 100vw"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%-2.5rem)] bg-gradient-to-t from-brand-ivory/40 via-transparent to-transparent" />
          <Reveal delay={0.3} className="mt-4 flex items-center justify-between text-brand-stone">
            <p className="eyebrow">Chattogram Furniture Fair · 2024</p>
            <p className="eyebrow">Est. {site.founded}</p>
          </Reveal>
        </div>

        <div ref={textRef} className="flex flex-col justify-center will-change-transform lg:col-span-6 lg:col-start-7">
          <Reveal>
            <SectionLabel number={compact ? undefined : '06'}>A word from our founder</SectionLabel>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-8">
              <span aria-hidden className="block font-serif text-7xl leading-[0.5] text-brand-gold">
                “
              </span>
              <p className="mt-2 font-serif text-[length:clamp(1.6rem,2.6vw,2.5rem)] leading-[1.25] text-brand-brown">
                {site.founderQuote}
              </p>
              <footer className="mt-8 flex flex-col gap-1">
                <cite className="font-sans text-base not-italic text-brand-brown">{site.founder.name}</cite>
                <span className="eyebrow text-brand-gold">
                  {site.founder.role} · Founded {site.founded}
                </span>
              </footer>
            </blockquote>
          </Reveal>
          {!compact && (
            <Reveal delay={0.3} className="mt-10">
              <Button asChild variant="text-link">
                <Link to="/about">
                  Read our story <ArrowUpRight />
                </Link>
              </Button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
