import { Link } from 'react-router'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Reveal, RevealImage } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import { Button } from '@/components/ui/button'
import { brandImages, showroomVideos } from '@/data/assets'
import { site } from '@/data/site'

export function VisitTeaserSection() {
  return (
    <section id="visit" className="bg-brand-ivory text-brand-brown">
      <div className="grid lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <RevealImage
            src={brandImages.showroomExterior}
            alt="Heaven Furniture Mart showroom on Agrabad Access Road, Chattogram"
            className="aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[44rem]"
            sizes="(min-width:1024px) 58vw, 100vw"
          />
          <Reveal delay={0.3} className="absolute bottom-6 left-6 hidden w-40 overflow-hidden border-[5px] border-brand-ivory sm:block lg:bottom-10 lg:left-10 lg:w-48">
            <div className="aspect-[9/16]">
              <SmartVideo asset={showroomVideos.blueChairs} />
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center section-pad container-x lg:col-span-5">
          <Reveal>
            <SectionLabel number="09">Visit the showroom</SectionLabel>
          </Reveal>
          <h2 className="mt-6 display-2 text-balance">Come see how it feels.</h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
              Photographs begin the idea. Sit with the details, feel the grain and finish, and talk
              through the room you want to make yours.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex items-start gap-4">
            <MapPin className="mt-1 size-5 shrink-0 text-brand-gold" strokeWidth={1.5} />
            <address className="not-italic">
              <p className="font-serif text-2xl leading-tight">{site.address.line1}</p>
              <p className="mt-1 text-brand-stone">
                {site.address.city}, {site.address.country}
              </p>
            </address>
          </Reveal>
          <Reveal delay={0.35} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="ink" size="pill">
              <Link to="/visit">
                Plan your visit <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="text-link">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions <ArrowUpRight />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
