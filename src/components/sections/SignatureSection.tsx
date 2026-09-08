import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Button } from '@/components/ui/button'
import ImageGallery, { type GalleryItem } from '@/components/ui/image-gallery'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { categoryById, featuredProducts, products } from '@/data/catalog'

/* Featured first, then the rest of the studio pieces — twelve frames in the strip. */
const picks = [...featuredProducts, ...products.filter((p) => !p.featured && p.category !== 'bespoke')].slice(0, 12)

const galleryItems: GalleryItem[] = picks.map((p) => ({
  id: p.slug,
  src: p.image,
  alt: p.name,
  title: p.name,
  meta: categoryById(p.category)?.short,
}))

export function SignatureSection() {
  const { open } = useConsultation()

  return (
    <section id="signature" className="section-pad overflow-hidden bg-brand-ivory text-brand-brown">
      <div className="container-x mx-auto flex max-w-[1600px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel number="08">Signature pieces</SectionLabel>
          </Reveal>
          <h2 className="mt-6 max-w-[14ch] display-2 text-balance">
            <SplitWords text="A few pieces from the studio floor." />
          </h2>
        </div>
        <Reveal delay={0.2} className="flex flex-col items-start gap-4 md:items-end">
          <p className="max-w-xs text-[0.98rem] leading-relaxed text-brand-stone md:text-right">
            <span className="sm:hidden">Tap a piece to request details. </span>
            <span className="hidden sm:inline">The strip drifts on its own — drag to explore, hover a frame to open it. </span>
            Every piece can be re-sized, re-covered and re-finished for your room.
          </p>
          <Button asChild variant="text-link">
            <Link to="/shop">
              Browse the full collection <ArrowUpRight />
            </Link>
          </Button>
        </Reveal>
      </div>

      <Reveal className="mt-12 lg:mt-16">
        <ImageGallery
          items={galleryItems}
          onSelect={(it) => {
            const p = picks.find((f) => f.slug === it.id)
            open({ room: p ? categoryById(p.category)?.name : undefined, piece: it.title })
          }}
          action={
            <>
              Request details <ArrowUpRight className="size-3.5" />
            </>
          }
        />
      </Reveal>
    </section>
  )
}
