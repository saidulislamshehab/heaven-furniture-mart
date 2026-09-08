import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { Reveal, luxuryEase } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { img, pageHeroImages } from '@/data/assets'
import { categories, categoryById, products, type CategoryId, type Product } from '@/data/catalog'
import { site } from '@/data/site'
import { usePageMeta } from '@/lib/usePageMeta'
import { cn } from '@/lib/utils'
import { srcSetFor } from '@/lib/images'

function ProductCard({ p, onOpen, index }: { p: Product; onOpen: () => void; index: number }) {
  const cat = categoryById(p.category)
  return (
    <Reveal delay={Math.min(index % 3, 2) * 0.08} once>
      <button type="button" onClick={onOpen} className="group block w-full text-left" aria-label={`Quick view: ${p.name}`}>
        <div className="relative aspect-[5/4] overflow-hidden bg-brand-ivory-deep">
          <img
            src={p.image}
            srcSet={srcSetFor(p.image)}
            alt={p.name}
            loading="lazy"
            decoding="async"
            sizes="(min-width:1280px) 30vw, (min-width:640px) 45vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-luxury)] group-hover:scale-[1.04]"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-brand-ink/70 px-4 py-3 text-brand-ivory backdrop-blur-sm transition-transform duration-500 ease-[var(--ease-luxury)] group-hover:translate-y-0">
            <span className="eyebrow inline-flex items-center gap-1">
              Quick view <ArrowUpRight className="size-3.5" />
            </span>
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl leading-tight sm:text-2xl">{p.name}</h3>
            <p className="mt-1 text-sm text-brand-stone">{p.note}</p>
          </div>
          <span className="eyebrow mt-1 shrink-0 text-brand-stone/80">{cat?.short}</span>
        </div>
      </button>
    </Reveal>
  )
}

function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { open } = useConsultation()
  const cat = product ? categoryById(product.category) : undefined
  return (
    <Dialog open={Boolean(product)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-4xl gap-0 overflow-hidden rounded-sm border-0 bg-brand-ivory p-0 text-brand-brown sm:max-w-4xl [&>button]:top-3 [&>button]:right-3 [&>button]:bg-brand-ivory/80 [&>button]:text-brand-brown">
        {product && (
          <div className="grid max-h-[90dvh] overflow-y-auto sm:grid-cols-2 sm:overflow-hidden">
            <div className="aspect-[5/4] bg-brand-ivory-deep sm:aspect-auto sm:max-h-[90dvh]">
              <img src={product.image} srcSet={srcSetFor(product.image)} sizes="(min-width:640px) 50vw, 100vw" alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col p-5 sm:p-10">
              <p className="eyebrow text-brand-gold">{cat?.name}</p>
              <DialogTitle className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{product.name}</DialogTitle>
              <DialogDescription className="mt-3 text-base text-brand-stone">{product.note}</DialogDescription>
              <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-brand-stone">
                <p>
                  Every piece at Heaven is made to order — sizes, timber, upholstery and finish are
                  chosen with you. Ask for details and we'll share options, timelines and a quote.
                </p>
                <ul className="grid gap-2 text-sm">
                  <li className="flex gap-3"><span className="text-brand-gold">—</span> Free design consultation</li>
                  <li className="flex gap-3"><span className="text-brand-gold">—</span> Made to your measurements</li>
                  <li className="flex gap-3"><span className="text-brand-gold">—</span> Delivery &amp; installation included</li>
                </ul>
              </div>
              <div className="mt-auto flex flex-col gap-3 pt-10">
                <Button
                  variant="ink"
                  size="pill"
                  onClick={() => {
                    onClose()
                    open({ room: cat?.name, piece: product.name })
                  }}
                >
                  Request details <ArrowUpRight />
                </Button>
                <Button asChild variant="outline-dark" size="pill">
                  <Link to="/visit">See it in the showroom</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function ShopPage() {
  usePageMeta(
    'Shop — Heaven Furniture Mart, Chattogram',
    'Browse bespoke living, bedroom, dining and office furniture from Heaven Furniture Mart. Every piece made to order in Chattogram.'
  )
  const [params, setParams] = useSearchParams()
  const category = (params.get('category') as CategoryId | null) ?? null
  const [query, setQuery] = useState(params.get('q') ?? '')
  const deferredQuery = useDeferredValue(query)
  const [selected, setSelected] = useState<Product | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const next = new URLSearchParams(params)
    if (deferredQuery) next.set('q', deferredQuery)
    else next.delete('q')
    if (next.toString() !== params.toString()) setParams(next, { replace: true })
  }, [deferredQuery, params, setParams])

  const list = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return products.filter((p) => {
      if (category && p.category !== category) return false
      if (!q) return true
      return p.name.toLowerCase().includes(q) || p.note.toLowerCase().includes(q) || categoryById(p.category)?.name.toLowerCase().includes(q)
    })
  }, [category, deferredQuery])

  const setCategory = (id: CategoryId | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set('category', id)
    else next.delete('category')
    setParams(next)
  }

  const activeCat = categoryById(category)
  const heroImage = (activeCat && pageHeroImages.shopByCategory[activeCat.id]) || pageHeroImages.shop

  return (
    <>
      <PageHero
        eyebrow="The collection"
        title={activeCat ? activeCat.name : 'A showroom, not a shop floor.'}
        body={
          activeCat?.body ??
          'Living, bedroom, dining and office pieces from the Heaven studio — each one a starting point for something made to your measure.'
        }
        image={heroImage.src}
        imageAlt={heroImage.alt}
      />

      <section className="bg-brand-ivory text-brand-brown">
        <div className="sticky top-[var(--nav-offset,60px)] z-30 border-b border-brand-brown/10 bg-brand-ivory/90 backdrop-blur-md transition-[top] duration-500 ease-[var(--ease-luxury)] motion-reduce:transition-none">
          <div className="container-x mx-auto flex max-w-[1600px] flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <ul className="-mx-1 flex gap-1 overflow-x-auto scrollbar-none" role="list" aria-label="Filter by category">
              {[{ id: null, name: 'All' }, ...categories].map((c) => {
                const active = c.id === category
                return (
                  <li key={c.id ?? 'all'} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setCategory(c.id as CategoryId | null)}
                      aria-pressed={active}
                      className={cn(
                        'eyebrow rounded-full px-4 py-2.5 transition-colors',
                        active ? 'bg-brand-teal-deep text-brand-ivory' : 'text-brand-stone hover:bg-brand-brown/5 hover:text-brand-brown'
                      )}
                    >
                      {c.name}
                    </button>
                  </li>
                )
              })}
            </ul>
            <label className="relative flex w-full items-center lg:w-72">
              <Search className="pointer-events-none absolute left-0 size-4 text-brand-stone" aria-hidden />
              <span className="sr-only">Search the collection</span>
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sofas, beds, marble…"
                className="h-10 rounded-none border-0 border-b border-brand-brown/20 bg-transparent pl-7 pr-8 text-base focus-visible:border-brand-gold focus-visible:ring-0 md:text-[0.95rem]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-0 flex size-8 items-center justify-center text-brand-stone hover:text-brand-brown"
                >
                  <X className="size-4" />
                </button>
              )}
            </label>
          </div>
        </div>

        <div className="container-x mx-auto max-w-[1600px] py-14 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <SectionLabel>{list.length} {list.length === 1 ? 'piece' : 'pieces'}</SectionLabel>
            {(category || query) && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory(null)
                }}
                className="eyebrow text-brand-stone underline decoration-brand-gold/60 underline-offset-[6px] hover:text-brand-brown"
              >
                Clear filters
              </button>
            )}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {list.length > 0 ? (
              <motion.ul
                key={`${category}-${deferredQuery}`}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: luxuryEase }}
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
              >
                {list.map((p, i) => (
                  <li key={p.slug}>
                    <ProductCard p={p} index={i} onOpen={() => setSelected(p)} />
                  </li>
                ))}
              </motion.ul>
            ) : (
              <motion.div
                key="empty"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="mt-16 max-w-xl"
              >
                <h2 className="font-serif text-4xl leading-tight">Nothing matches “{deferredQuery}” yet.</h2>
                <p className="mt-4 text-brand-stone">
                  Our collection changes with every commission. Tell us what you have in mind and we'll
                  design it around your room.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button variant="ink" size="pill" onClick={() => setQuery('')}>
                    Show all pieces
                  </Button>
                  <Button asChild variant="text-link">
                    <a href={`tel:${site.phoneE164}`}>Call {site.phoneDisplay}</a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <FinalCTASection
        eyebrow="Don't see it here?"
        title="If you can picture it, we can build it."
        body="Every piece in this collection began as a conversation. Bring your dimensions, references or a sketch — we'll design around them."
        image={img.creamClassicLounge}
      />

      <QuickView product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
