import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Image as ImageIcon, Mail, Map, MapPin, Maximize2, Phone } from 'lucide-react'
import { Reveal, RevealImage } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import { Button } from '@/components/ui/button'
import { brandImages, showroomVideos } from '@/data/assets'
import { site } from '@/data/site'

export function VisitTeaserSection() {
  const [showMap, setShowMap] = useState(false)

  return (
    <section id="visit" className="bg-brand-ivory text-brand-brown">
      <div className="grid gap-6 px-4 pt-4 sm:px-6 sm:pt-6 lg:grid-cols-12 lg:gap-0 lg:px-0 lg:pt-0 lg:pl-6">
        <div className="relative overflow-hidden rounded-2xl lg:col-span-7 lg:my-6">
          {showMap ? (
            <div className="relative aspect-[4/3] h-full w-full bg-brand-teal lg:aspect-auto lg:min-h-[44rem]">
              <iframe
                title="Map showing Heaven Furniture Mart on Agrabad Access Road, Chattogram"
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] contrast-[1.05]"
              />
              <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 sm:top-6 sm:right-6">
                <Button asChild variant="ivory" size="pill-sm">
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Maximize2 /> Full view
                  </a>
                </Button>
                <Button variant="ivory" size="pill-sm" onClick={() => setShowMap(false)}>
                  <ImageIcon /> Show photo
                </Button>
              </div>
            </div>
          ) : (
            <>
              <RevealImage
                src={brandImages.showroomExterior}
                alt="Heaven Furniture Mart showroom on Agrabad Access Road, Chattogram"
                className="aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[44rem]"
                sizes="(min-width:1024px) 58vw, 100vw"
              />
              <Reveal delay={0.3} className="absolute bottom-6 left-6 hidden w-40 overflow-hidden rounded-lg border-[5px] border-brand-ivory sm:block lg:bottom-10 lg:left-10 lg:w-48">
                <div className="aspect-[9/16]">
                  <SmartVideo asset={showroomVideos.blueChairs} />
                </div>
              </Reveal>
            </>
          )}
        </div>

        <div className="flex flex-col justify-center section-pad container-x lg:col-span-5">
          <Reveal>
            <SectionLabel number="10">Visit the showroom</SectionLabel>
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
              <p className="mt-4 flex flex-col gap-1.5 text-[0.95rem]">
                <a href={`tel:${site.phoneE164}`} className="inline-flex items-center gap-2 text-brand-brown transition-colors hover:text-brand-gold">
                  <Phone className="size-4 text-brand-gold" strokeWidth={1.5} aria-hidden /> {site.phoneDisplay}
                </a>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-brand-brown transition-colors hover:text-brand-gold [overflow-wrap:anywhere]">
                  <Mail className="size-4 shrink-0 text-brand-gold" strokeWidth={1.5} aria-hidden /> {site.email}
                </a>
              </p>
            </address>
          </Reveal>
          <Reveal delay={0.35} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="ink" size="pill">
              <Link to="/visit">
                Plan your visit <ArrowUpRight />
              </Link>
            </Button>
            <Button
              variant="text-link"
              aria-pressed={showMap}
              onClick={() => setShowMap((v) => !v)}
            >
              {showMap ? (
                <>
                  Show photo <ImageIcon />
                </>
              ) : (
                <>
                  Load map <Map />
                </>
              )}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
