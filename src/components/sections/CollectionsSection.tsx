import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Button } from '@/components/ui/button'
import StoryScroll, { FlowSection } from '@/components/ui/story-scroll'
import { categories, type Category } from '@/data/catalog'
import { cn } from '@/lib/utils'

/* Alternating surfaces so each panel reads as a new room. */
const surfaces = [
  { bg: 'bg-brand-ivory', fg: 'text-brand-brown', muted: 'text-brand-stone', rule: 'border-brand-brown/12', btn: 'ink' },
  { bg: 'bg-brand-teal-deep', fg: 'text-brand-ivory', muted: 'text-brand-ivory/65', rule: 'border-brand-ivory/12', btn: 'ivory' },
  { bg: 'bg-brand-ivory-deep', fg: 'text-brand-brown', muted: 'text-brand-stone', rule: 'border-brand-brown/12', btn: 'ink' },
  { bg: 'bg-brand-teal', fg: 'text-brand-ivory', muted: 'text-brand-ivory/65', rule: 'border-brand-ivory/12', btn: 'ivory' },
  { bg: 'bg-brand-ink', fg: 'text-brand-ivory', muted: 'text-brand-ivory/65', rule: 'border-brand-ivory/12', btn: 'gold' },
] as const

function CollectionPanel({ c, i }: { c: Category; i: number }) {
  const s = surfaces[i % surfaces.length]
  const flip = i % 2 === 1
  return (
    <FlowSection aria-label={`${c.name} collection`} className={cn(s.bg, s.fg)}>
      <div className="container-x mx-auto grid w-full max-w-[1600px] grid-cols-1 items-stretch gap-8 py-20 lg:h-screen lg:grid-cols-12 lg:gap-12 lg:py-24">
        {/* Copy */}
        <div className={cn('flex flex-col justify-between lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}>
          <div className={cn('flex items-center justify-between border-b pb-5', s.rule)}>
            <span className="eyebrow text-brand-gold">
              {c.index} / {String(categories.length).padStart(2, '0')}
            </span>
            <span className={cn('eyebrow', s.muted)}>Collection</span>
          </div>

          <div className="py-10 lg:py-0">
            <h3 className="font-serif text-[length:clamp(3.5rem,9vw,9.5rem)] leading-[0.9] tracking-[-0.03em] text-balance">
              {c.name}
            </h3>
            <p className={cn('mt-8 max-w-md text-[1.05rem] leading-relaxed', s.muted)}>{c.body}</p>
          </div>

          <div className={cn('border-t pt-6', s.rule)}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {c.items.split(' · ').map((item) => (
                <li key={item} className={cn('eyebrow', s.muted)}>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild variant={s.btn} size="pill">
                <Link to={`/shop?category=${c.id}`}>
                  Explore {c.short} <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Imagery — one large frame, one small offset frame */}
        <div className={cn('relative lg:col-span-7 lg:min-h-0', flip && 'lg:order-1')}>
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:h-full">
            <img
              src={c.image}
              alt={`${c.name} furniture by Heaven Furniture Mart`}
              loading="lazy"
              decoding="async"
              sizes="(min-width:1024px) 58vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
            <span className="eyebrow absolute top-5 left-5 text-brand-ivory/85">{c.index}</span>
          </div>
          <div
            className={cn(
              'absolute -bottom-8 hidden aspect-square w-[32%] overflow-hidden border-[6px] lg:block',
              flip ? '-right-6' : '-left-6',
              s.bg.replace('bg-', 'border-')
            )}
          >
            <img src={c.secondaryImage} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </FlowSection>
  )
}

export function CollectionsSection() {
  const barRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  return (
    <section id="collections" className="bg-brand-ivory text-brand-brown">
      <div className="container-x mx-auto flex max-w-[1600px] flex-col gap-6 pt-[clamp(4.5rem,10vw,10rem)] pb-14 md:flex-row md:items-end md:justify-between lg:pb-20">
        <div>
          <Reveal>
            <SectionLabel number="03">Collections</SectionLabel>
          </Reveal>
          <h2 className="mt-6 max-w-[14ch] display-2 text-balance">
            <SplitWords text="Furniture for every room you live in." />
          </h2>
        </div>
        <Reveal delay={0.2} className="flex flex-col items-start gap-4 md:items-end">
          <p className="max-w-xs text-[0.98rem] leading-relaxed text-brand-stone md:text-right">
            Five rooms, one studio. Scroll to walk through them, left to right.
          </p>
          <Button asChild variant="text-link">
            <Link to="/shop">
              View the full collection <ArrowUpRight />
            </Link>
          </Button>
        </Reveal>
      </div>

      <StoryScroll
        aria-label="Collections by room"
        onProgress={(p) => {
          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
          if (countRef.current) countRef.current.textContent = String(Math.min(categories.length, Math.floor(p * categories.length) + 1)).padStart(2, '0')
        }}
        overlay={
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden mix-blend-difference lg:block">
            <div className="container-x mx-auto flex max-w-[1600px] items-center gap-4 pb-6 text-white">
              <span className="eyebrow tabular-nums">
                <span ref={countRef}>01</span> / {String(categories.length).padStart(2, '0')}
              </span>
              <span className="relative h-px flex-1 bg-white/25">
                <span ref={barRef} className="absolute inset-0 origin-left bg-white" style={{ transform: 'scaleX(0)' }} />
              </span>
              <span className="eyebrow">Scroll</span>
            </div>
          </div>
        }
      >
        {categories.map((c, i) => (
          <CollectionPanel key={c.id} c={c} i={i} />
        ))}
      </StoryScroll>
    </section>
  )
}
