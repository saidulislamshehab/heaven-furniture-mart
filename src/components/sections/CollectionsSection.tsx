import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, RevealImage, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Button } from '@/components/ui/button'
import { categories, type Category } from '@/data/catalog'
import { cn } from '@/lib/utils'

function CollectionTile({ c, className, aspect, sizes, delay = 0 }: { c: Category; className?: string; aspect: string; sizes: string; delay?: number }) {
  return (
    <Link
      to={`/shop?category=${c.id}`}
      className={cn('group relative block focus-visible:outline-offset-4', className)}
      aria-label={`Explore the ${c.name} collection`}
    >
      <div className={cn('relative overflow-hidden bg-brand-ivory-deep', aspect)}>
        <RevealImage
          src={c.image}
          alt=""
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-luxury)] group-hover:scale-[1.04]"
          sizes={sizes}
          delay={delay}
        />
        <span className="eyebrow absolute top-4 left-4 text-brand-ivory drop-shadow sm:top-5 sm:left-5">{c.index}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl leading-none sm:text-3xl">{c.name}</h3>
          <p className="mt-2 text-sm text-brand-stone">{c.items}</p>
        </div>
        <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-brand-brown/15 text-brand-brown transition-all duration-500 group-hover:border-brand-brown group-hover:bg-brand-brown group-hover:text-brand-ivory">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}

export function CollectionsSection() {
  const [living, bedroom, dining, office, bespoke] = categories

  return (
    <section id="collections" className="section-pad bg-brand-ivory text-brand-brown">
      <div className="container-x mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel number="03">Collections</SectionLabel>
            </Reveal>
            <h2 className="mt-6 max-w-[14ch] display-2 text-balance">
              <SplitWords text="Furniture for every room you live in." />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Button asChild variant="text-link">
              <Link to="/shop">
                View the full collection <ArrowUpRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-y-20">
          <CollectionTile c={living} className="sm:col-span-2 lg:col-span-7" aspect="aspect-[16/10]" sizes="(min-width:1024px) 55vw, 100vw" />
          <CollectionTile c={bedroom} className="lg:col-span-5 lg:mt-24" aspect="aspect-[4/3]" sizes="(min-width:1024px) 38vw, 50vw" delay={0.1} />
          <CollectionTile c={dining} className="lg:col-span-5" aspect="aspect-[4/3]" sizes="(min-width:1024px) 38vw, 50vw" />
          <CollectionTile c={office} className="lg:col-span-4 lg:mt-20" aspect="aspect-[4/5]" sizes="(min-width:1024px) 30vw, 50vw" delay={0.1} />

          <Link
            to={`/shop?category=${bespoke.id}`}
            className="group relative flex flex-col justify-between bg-brand-teal-deep p-8 text-brand-ivory sm:col-span-2 lg:col-span-3 lg:mt-20 lg:min-h-[28rem]"
          >
            <div>
              <span className="eyebrow text-brand-gold">{bespoke.index}</span>
              <h3 className="mt-6 font-serif text-4xl leading-none">Bespoke</h3>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-brand-ivory/70">{bespoke.body}</p>
            </div>
            <span className="eyebrow mt-10 inline-flex items-center gap-2 text-brand-gold-soft">
              Made to your measure
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
