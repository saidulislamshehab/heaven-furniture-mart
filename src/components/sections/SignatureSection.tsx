import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Button } from '@/components/ui/button'
import ImageGallery, { type GalleryItem } from '@/components/ui/image-gallery'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { categoryById, featuredProducts } from '@/data/catalog'

const galleryItems: GalleryItem[] = featuredProducts.slice(0, 6).map((p) => ({
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
            <SectionLabel number="07">Signature pieces</SectionLabel>
          </Reveal>
          <h2 className="mt-6 max-w-[14ch] display-2 text-balance">
            <SplitWords text="A few pieces from the studio floor." />
          </h2>
        </div>
        <Reveal delay={0.2} className="flex flex-col items-start gap-4 md:items-end">
          <p className="max-w-xs text-[0.98rem] leading-relaxed text-brand-stone md:text-right">
            The open piece moves along on its own — hover to hold it. Every one can be re-sized, re-covered and re-finished for your room.
          </p>
          <Button asChild variant="text-link">
            <Link to="/shop">
              Browse the full collection <ArrowUpRight />
            </Link>
          </Button>
        </Reveal>
      </div>

      <Reveal className="container-x mx-auto mt-12 max-w-[1600px] lg:mt-16">
        <ImageGallery
          items={galleryItems}
          onSelect={(it) => {
            const p = featuredProducts.find((f) => f.slug === it.id)
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
