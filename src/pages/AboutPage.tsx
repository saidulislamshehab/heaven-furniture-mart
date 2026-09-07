import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { Reveal, RevealImage, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import { FounderSection } from '@/components/sections/FounderSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { Button } from '@/components/ui/button'
import { brandImages, img, showroomVideos, workshopFilms } from '@/data/assets'
import { site } from '@/data/site'
import { usePageMeta } from '@/lib/usePageMeta'

const beliefs = [
  {
    title: 'Furniture is a reflection of a life',
    body: 'Taste, comfort and routine differ from home to home. So should the furniture that lives in it.',
  },
  {
    title: 'Craft is a promise, not a finish',
    body: 'Selected timber, honest joinery and careful upholstery — made in-house, made to last.',
  },
  {
    title: 'Bespoke should feel effortless',
    body: 'One team from measurement to installation. Free consultation, delivery and easy payment built in.',
  },
]

export function AboutPage() {
  usePageMeta(
    'Our Story — Heaven Furniture Mart',
    'Founded in 2020 by Abul Kalam Bhuiyan, Heaven Furniture Mart designs and crafts bespoke furniture from its showroom on Agrabad Access Road, Chattogram.'
  )

  return (
    <>
      <PageHero
        eyebrow={`Our story · Est. ${site.founded}`}
        title="Built around the way Chattogram lives."
        body="Heaven Furniture Mart began with a simple belief: furniture should be made for the room it lives in, and the people who live with it."
        image={img.creamClassicLounge}
        imageAlt="Cream classic lounge set on the Heaven Furniture Mart showroom floor"
      />

      {/* Story */}
      <section className="section-pad bg-brand-ivory text-brand-brown">
        <div className="container-x mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number="01">The beginning</SectionLabel>
            </Reveal>
            <h2 className="mt-6 display-2 text-balance">
              <SplitWords text="From a conversation to a showroom." />
            </h2>
          </div>
          <div className="space-y-6 text-[1.05rem] leading-relaxed text-brand-stone lg:col-span-6 lg:col-start-7 lg:pt-3">
            <Reveal>
              <p>
                In {site.founded}, {site.founder.name} founded Heaven Furniture Mart in Chattogram with a
                clear idea: to design and craft custom furniture around what a customer actually wants,
                rather than what happens to be in stock.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                A year later the showroom opened on {site.address.line1} — a place to sit, touch and
                imagine before anything is made. Today Heaven is one of the city's leading bespoke
                furniture brands, crafting sofas, beds, dining sets, office pieces and full interiors for
                homes across the region.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-2xl text-brand-brown">
                {site.tagline}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="container-x mx-auto mt-20 grid max-w-[1600px] grid-cols-2 gap-4 sm:gap-6 lg:mt-28 lg:grid-cols-12">
          <RevealImage
            src={img.greenVelvetSet}
            alt="Olive velvet sofa set with silver-leaf frames"
            className="col-span-2 aspect-[16/10] lg:col-span-7"
            sizes="(min-width:1024px) 58vw, 100vw"
          />
          <div className="aspect-[4/5] overflow-hidden lg:col-span-3">
            <SmartVideo asset={showroomVideos.oliveSofaDetail} />
          </div>
          <RevealImage
            src={img.blueModernSofa}
            alt="Blue modern sofa with channel stitching"
            className="aspect-[4/5] lg:col-span-2"
            delay={0.15}
            sizes="(min-width:1024px) 16vw, 50vw"
          />
        </div>
      </section>

      {/* Beliefs */}
      <section className="section-pad bg-brand-teal-deep text-brand-ivory">
        <div className="container-x mx-auto max-w-[1600px]">
          <Reveal>
            <SectionLabel number="02">What we believe</SectionLabel>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-8">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1} className="border-t border-brand-ivory/15 pt-8">
                <span className="font-serif text-2xl text-brand-gold">0{i + 1}</span>
                <h3 className="mt-6 max-w-[14ch] font-serif text-3xl leading-tight sm:text-4xl">{b.title}</h3>
                <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-brand-ivory/65">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craft strip */}
      <section className="bg-brand-ink text-brand-ivory">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {workshopFilms.map((f) => (
            <div key={f.id} className="relative aspect-[16/10] sm:aspect-[3/4] lg:aspect-[4/5]">
              <SmartVideo asset={f.video} />
              <span className="eyebrow absolute bottom-4 left-4 text-brand-ivory/80">
                {f.index} / {f.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <FounderSection compact />

      {/* Timeline */}
      <section className="section-pad bg-brand-ivory text-brand-brown">
        <div className="container-x mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <SectionLabel number="03">Milestones</SectionLabel>
              </Reveal>
              <h2 className="mt-6 display-2">
                <SplitWords text="Six years, five milestones." />
              </h2>
            </div>
          </div>
          <ol className="mt-14 grid gap-y-12 md:grid-cols-2 md:gap-x-12 lg:mt-20 lg:grid-cols-5 lg:gap-x-8">
            {site.milestones.map((m, i) => (
              <li key={m.year} className="relative">
                <Reveal delay={i * 0.08} className="border-t border-brand-brown/15 pt-6">
                  <span aria-hidden className="absolute -top-[3px] left-0 size-[5px] rounded-full bg-brand-gold" />
                  <p className="font-serif text-5xl leading-none sm:text-6xl">{m.year}</p>
                  <h3 className="mt-5 text-lg font-medium">{m.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-brand-stone">{m.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Showroom presence */}
      <section className="bg-brand-ivory-deep text-brand-brown">
        <div className="grid lg:grid-cols-2">
          <RevealImage
            src={brandImages.showroomExterior}
            alt="Heaven Furniture Mart showroom exterior, Agrabad Access Road"
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[36rem]"
            sizes="(min-width:1024px) 50vw, 100vw"
          />
          <div className="flex flex-col justify-center section-pad container-x">
            <Reveal>
              <SectionLabel number="04">Physical presence</SectionLabel>
            </Reveal>
            <h2 className="mt-6 display-3 text-balance">A large showroom in the heart of Agrabad.</h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
                Furniture is best understood in person. Our showroom on {site.address.line1} is where
                proportion, comfort and finish become real — and where most commissions begin.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <Button asChild variant="ink" size="pill">
                <Link to="/visit">
                  Plan a visit <ArrowUpRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCTASection
        eyebrow="Start your own chapter"
        title="Let's make something for your home."
        image={img.greenVelvetSet}
      />
    </>
  )
}
