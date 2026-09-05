import { useRef, type PointerEvent } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Button } from '@/components/ui/button'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { categoryById, featuredProducts } from '@/data/catalog'

export function SignatureSection() {
  const { open } = useConsultation()
  const scroller = useRef<HTMLUListElement>(null)
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)

  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = scroller.current
    if (!el) return
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false }
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const el = scroller.current
    if (!el || !drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    el.scrollLeft = drag.current.left - dx
  }
  const onPointerUp = (e: PointerEvent<HTMLUListElement>) => {
    const el = scroller.current
    if (!el) return
    if (drag.current?.moved) {
      // Swallow the click that follows a drag so cards don't open accidentally.
      const stop = (ev: Event) => {
        ev.stopPropagation()
        ev.preventDefault()
      }
      el.addEventListener('click', stop, { capture: true, once: true })
    }
    drag.current = null
    el.releasePointerCapture(e.pointerId)
  }

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' })
  }

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
        <Reveal delay={0.2} className="flex items-center gap-3">
          <p className="eyebrow mr-3 hidden text-brand-stone lg:block">Drag to explore</p>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous pieces"
            className="flex size-11 items-center justify-center rounded-full border border-brand-brown/20 transition-colors hover:border-brand-brown hover:bg-brand-brown hover:text-brand-ivory"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next pieces"
            className="flex size-11 items-center justify-center rounded-full border border-brand-brown/20 transition-colors hover:border-brand-brown hover:bg-brand-brown hover:text-brand-ivory"
          >
            <ArrowRight className="size-4" />
          </button>
        </Reveal>
      </div>

      <ul
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="container-x mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scrollbar-none select-none scroll-pl-[clamp(1.25rem,5vw,4.5rem)] lg:mt-16 lg:cursor-grab lg:active:cursor-grabbing [&>li:last-child]:mr-[clamp(1.25rem,5vw,4.5rem)]"
      >
        {featuredProducts.map((p, i) => (
          <li key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-[26vw] xl:w-[22vw]">
            <Reveal delay={Math.min(i, 3) * 0.08}>
              <button
                type="button"
                onClick={() => open({ room: categoryById(p.category)?.name, piece: p.name })}
                className="group block w-full text-left"
                aria-label={`Request details for ${p.name}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-ivory-deep">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    sizes="(min-width:1280px) 22vw, (min-width:1024px) 26vw, (min-width:640px) 44vw, 72vw"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-luxury)] group-hover:scale-[1.04]"
                  />
                  <span className="eyebrow absolute top-4 left-4 text-brand-ivory drop-shadow">0{i + 1}</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl leading-tight sm:text-2xl">{p.name}</h3>
                    <p className="mt-1 text-sm text-brand-stone">{categoryById(p.category)?.name}</p>
                  </div>
                  <span className="eyebrow mt-1 inline-flex shrink-0 items-center gap-1 text-brand-gold">
                    Details <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="container-x mx-auto mt-6 max-w-[1600px]">
        <Button asChild variant="text-link">
          <Link to="/shop">
            Browse the full collection <ArrowUpRight />
          </Link>
        </Button>
      </Reveal>
    </section>
  )
}
