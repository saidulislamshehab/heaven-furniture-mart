import { useState } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { Reveal, RevealImage, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { Button } from '@/components/ui/button'
import { brandImages, img, showroomVideos } from '@/data/assets'
import { site, whatsappUrl } from '@/data/site'
import { usePageMeta } from '@/lib/usePageMeta'

const visitWhatsApp = whatsappUrl(
  "Hello Heaven Furniture Mart, I'd like to plan a showroom visit and free design consultation."
)

const prep = [
  { title: 'Your dimensions', body: 'A quick room measurement lets us talk proportion and possibility with real clarity.' },
  { title: 'Your references', body: 'Saved rooms, colours, materials or simply a feeling — we will translate them into your space.' },
  { title: 'Your everyday', body: 'Tell us who uses the room and how. Good bespoke furniture starts with the life around it.' },
]

function MapFrame() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-brand-teal sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[32rem]">
      {loaded ? (
        <iframe
          title="Map showing Heaven Furniture Mart on Agrabad Access Road, Chattogram"
          src={site.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] contrast-[1.05]"
        />
      ) : (
        <>
          <img
            src={brandImages.showroomExterior}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 to-brand-ink/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center text-brand-ivory">
            <MapPin className="size-8 text-brand-gold" strokeWidth={1.25} />
            <p className="font-serif text-2xl leading-tight sm:text-3xl">
              {site.address.line1}
              <br />
              <span className="text-brand-ivory/70">{site.address.city}</span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="ivory" size="pill-sm" onClick={() => setLoaded(true)}>
                Load interactive map
              </Button>
              <Button asChild variant="outline-light" size="pill-sm">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function VisitPage() {
  usePageMeta(
    'Visit the Showroom — Heaven Furniture Mart, Agrabad',
    'Visit the Heaven Furniture Mart showroom on Agrabad Access Road, Chattogram. Directions, contact details and what to bring for your free design consultation.'
  )

  return (
    <>
      <PageHero
        eyebrow={`Showroom · ${site.address.city}`}
        title="Come see how it feels."
        body="Sit with the details. Feel the materials. Begin with a conversation about the room you want to make yours."
        image={brandImages.showroomExterior}
        imageAlt="Heaven Furniture Mart showroom on Agrabad Access Road"
        imagePosition="object-[50%_85%] sm:object-center"
        fullscreen
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold" size="pill">
            <a href={visitWhatsApp} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Arrange a visit
            </a>
          </Button>
          <Button asChild variant="outline-light" size="pill">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight />
            </a>
          </Button>
        </div>
      </PageHero>

      {/* Details */}
      <section className="section-pad bg-brand-ivory text-brand-brown">
        <div className="container-x mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number="01">Find us</SectionLabel>
            </Reveal>
            <h2 className="mt-6 display-2 text-balance">
              <SplitWords text="Furniture is best understood in person." />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
                Appointments are welcome; walk-ins are welcome too. Our team is on the floor to talk
                through proportion, materials and what your room needs.
              </p>
            </Reveal>
          </div>

          <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {[
              {
                icon: MapPin,
                label: 'Address',
                value: (
                  <address className="not-italic">
                    {site.address.line1}
                    <br />
                    {site.address.city}, {site.address.country}
                  </address>
                ),
                action: { label: 'Directions', href: site.mapsUrl, external: true },
              },
              {
                icon: Clock,
                label: 'Hours',
                value: (
                  <>
                    Open until 9:30 PM
                    <br />
                    <span className="text-brand-stone">Hours can vary — check live hours before a late visit.</span>
                  </>
                ),
                action: { label: 'Live hours on Google', href: site.mapsUrl, external: true },
              },
              {
                icon: Phone,
                label: 'Phone & WhatsApp',
                value: site.phoneDisplay,
                action: { label: 'Call now', href: `tel:${site.phoneE164}`, external: false },
              },
              {
                icon: Mail,
                label: 'Email',
                value: <span className="break-all">{site.email}</span>,
                action: { label: 'Write to us', href: `mailto:${site.email}`, external: false },
              },
            ].map((d, i) => (
              <Reveal key={d.label} delay={i * 0.08} className="border-t border-brand-brown/12 pt-6">
                <dt className="eyebrow flex items-center gap-2 text-brand-gold">
                  <d.icon className="size-4" strokeWidth={1.5} /> {d.label}
                </dt>
                <dd className="mt-4 font-serif text-2xl leading-snug">{d.value}</dd>
                <dd className="mt-4">
                  <a
                    href={d.action.href}
                    target={d.action.external ? '_blank' : undefined}
                    rel={d.action.external ? 'noopener noreferrer' : undefined}
                    className="eyebrow inline-flex items-center gap-1 text-brand-brown underline decoration-brand-gold/60 underline-offset-[6px] hover:decoration-brand-gold"
                  >
                    {d.action.label} <ArrowUpRight className="size-3.5" />
                  </a>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Experience */}
      <section className="section-pad bg-brand-teal-deep text-brand-ivory">
        <div className="container-x mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 lg:col-span-6">
            <div className="aspect-[9/16] overflow-hidden bg-brand-teal">
              <SmartVideo asset={showroomVideos.walkthrough} />
            </div>
            <RevealImage
              src={img.ivoryCarvedDining}
              alt="Ivory carved dining set on the showroom floor"
              className="aspect-[9/16] sm:mt-12"
              sizes="(min-width:1024px) 25vw, 50vw"
              delay={0.15}
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <SectionLabel number="02">The showroom experience</SectionLabel>
            </Reveal>
            <h2 className="mt-6 display-2 text-balance">
              <SplitWords text="Touch. Sit. Imagine." />
            </h2>
            <ul className="mt-10 divide-y divide-brand-ivory/10 border-y border-brand-ivory/10">
              {site.showroomFeatures.map((f, i) => (
                <li key={f}>
                  <Reveal delay={i * 0.06} className="flex items-baseline gap-5 py-5">
                    <span className="font-serif text-xl text-brand-gold">0{i + 1}</span>
                    <span className="font-serif text-2xl leading-tight sm:text-3xl">{f}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-brand-ivory text-brand-brown">
        <div className="grid lg:grid-cols-12">
          <div className="flex flex-col justify-center section-pad container-x lg:col-span-5">
            <Reveal>
              <SectionLabel number="03">On the map</SectionLabel>
            </Reveal>
            <h2 className="mt-6 display-2 text-balance">Find your way to Heaven.</h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
                We're on {site.address.line1}, {site.address.city}. Open the map for live directions,
                parking and public-transport options.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-8">
              <Button asChild variant="ink" size="pill">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Open directions <ArrowUpRight />
                </a>
              </Button>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <MapFrame />
          </div>
        </div>
      </section>

      {/* Before you arrive */}
      <section className="section-pad bg-brand-ivory-deep text-brand-brown">
        <div className="container-x mx-auto max-w-[1600px]">
          <Reveal>
            <SectionLabel number="04">Before you arrive</SectionLabel>
          </Reveal>
          <h2 className="mt-6 max-w-[14ch] display-2 text-balance">
            <SplitWords text="Bring a room. Leave with a direction." />
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {prep.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.1} className="border-t border-brand-brown/15 pt-6">
                  <span className="font-serif text-2xl text-brand-gold">0{i + 1}</span>
                  <h3 className="mt-5 font-serif text-3xl leading-tight">{p.title}</h3>
                  <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-brand-stone">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTASection
        eyebrow="Your visit can be the first sketch"
        title="Let's meet in the showroom."
        body="Message us to arrange a time, or simply walk in. Either way, your free design consultation begins the moment you arrive."
        image={img.silverBrocadeSofa}
      />
    </>
  )
}
