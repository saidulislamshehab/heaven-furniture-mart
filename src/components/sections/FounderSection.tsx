import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, RevealImage } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Button } from '@/components/ui/button'
import { brandImages } from '@/data/assets'
import { site } from '@/data/site'

export function FounderSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="founder" className="section-pad bg-brand-teal text-brand-ivory">
      <div className="container-x mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-5">
          <RevealImage
            src={brandImages.founder}
            alt={`${site.founder.name}, ${site.founder.role} of Heaven Furniture Mart, speaking at the Chattogram Furniture Fair`}
            className="aspect-[4/5] w-full"
            imgClassName="h-full w-full object-cover object-[42%_18%] saturate-[0.8] contrast-[1.04]"
            sizes="(min-width:1024px) 40vw, 100vw"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%-2.5rem)] bg-gradient-to-t from-brand-teal/50 via-transparent to-brand-teal/20" />
          <Reveal delay={0.3} className="mt-4 flex items-center justify-between text-brand-ivory/55">
            <p className="eyebrow">Chattogram Furniture Fair · 2024</p>
            <p className="eyebrow">Est. {site.founded}</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Reveal>
            <SectionLabel number={compact ? undefined : '06'}>A word from our founder</SectionLabel>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-8">
              <span aria-hidden className="block font-serif text-7xl leading-[0.5] text-brand-gold">
                “
              </span>
              <p className="mt-2 font-serif text-[length:clamp(1.6rem,2.6vw,2.5rem)] leading-[1.25] text-brand-ivory/95">
                {site.founderQuote}
              </p>
              <footer className="mt-8 flex flex-col gap-1">
                <cite className="font-sans text-base not-italic text-brand-ivory">{site.founder.name}</cite>
                <span className="eyebrow text-brand-gold-soft">
                  {site.founder.role} · Founded {site.founded}
                </span>
              </footer>
            </blockquote>
          </Reveal>
          {!compact && (
            <Reveal delay={0.3} className="mt-10">
              <Button asChild variant="text-link" className="text-brand-ivory">
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
