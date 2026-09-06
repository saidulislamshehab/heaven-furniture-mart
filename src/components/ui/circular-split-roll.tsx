import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export interface CircularSplitRollItem {
  id?: string | number
  /** Small serif index shown beside the focused title, e.g. "01". */
  index?: string
  title: string
  /** One or two sentences shown under the focused title. */
  body?: string
  image: string
  alt?: string
}

export interface CircularSplitRollProps {
  items: CircularSplitRollItem[]
  className?: string
  /** Arc radius in px at 1200px+ (scales down on tablet). */
  radius?: number
  /** Card width in px; height follows `cardAspect`. */
  cardSize?: number
  cardAspect?: number
  /** Scroll distance per item as % of viewport height. */
  sectionHeight?: number
  scrub?: number
  textSideScale?: number
  textSideOpacity?: number
  imageSideScale?: number
  imageSideOpacity?: number
  /** Called whenever the focused item changes (desktop only). */
  onFocusChange?: (index: number) => void
}

const DESKTOP_WIDTH = 1200
const TABLET_MIN_WIDTH = 1024

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduce
}

/** Distance from `value` to 0 on a unit circle, in [0, 0.5]. */
function arcDistance(value: number) {
  const v = ((value % 1) + 1) % 1
  return Math.min(v, 1 - v)
}

function focusStrength(distance: number, start = 0.42, power = 2.6) {
  const raw = 1 - distance * 2
  const normalized = gsap.utils.clamp(0, 1, (raw - start) / (1 - start))
  return Math.pow(normalized, power)
}

/**
 * Two counter-arcing columns — step titles on the left, photography on the right — pinned
 * while the user scrolls. Items travel along a circle and settle into focus at the
 * horizontal centre line. Below `lg` and for reduced-motion users it renders as a
 * stacked editorial list.
 */
export default function CircularSplitRoll({
  items,
  className,
  radius = 460,
  cardSize = 300,
  cardAspect = 4 / 5,
  sectionHeight = 110,
  scrub = 1.1,
  textSideScale = 0.72,
  textSideOpacity = 0.14,
  imageSideScale = 0.62,
  imageSideOpacity = 0.2,
  onFocusChange,
}: CircularSplitRollProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef(0)
  const focusedRef = useRef(0)
  const reduce = usePrefersReducedMotion()

  const safeItems = useMemo(
    () =>
      items.map((it, i) => ({
        id: it.id ?? i,
        index: it.index ?? String(i + 1).padStart(2, '0'),
        title: it.title,
        body: it.body ?? '',
        image: it.image,
        alt: it.alt ?? it.title,
      })),
    [items]
  )
  const total = safeItems.length

  useEffect(() => {
    if (!rootRef.current || !stickyRef.current || reduce || total === 0) return

    const mm = gsap.matchMedia()

    mm.add(`(min-width: ${TABLET_MIN_WIDTH}px)`, () => {
      const ctx = gsap.context(() => {
        const root = rootRef.current!
        const leftNodes = gsap.utils.toArray<HTMLElement>('.csr-title', root)
        const rightNodes = gsap.utils.toArray<HTMLElement>('.csr-card', root)
        const captions = gsap.utils.toArray<HTMLElement>('.csr-caption', root)

        gsap.set([...leftNodes, ...rightNodes], { opacity: 1 })

        const render = (p: number) => {
          progressRef.current = p
          const width = window.innerWidth
          const factor = width < DESKTOP_WIDTH ? width / DESKTOP_WIDTH : 1
          const R = radius * factor
          root.style.setProperty('--csr-card-w', `${cardSize * factor}px`)
          root.style.setProperty('--csr-card-h', `${(cardSize / cardAspect) * factor}px`)

          // Scroll moves the ring through (total - 1) steps so first and last items both hit focus.
          const travel = p * ((total - 1) / total)

          leftNodes.forEach((node, i) => {
            const lp = i / total - travel
            const angle = lp * Math.PI * 2
            const d = arcDistance(lp)
            const s = focusStrength(d, 0.42, 2.6)
            gsap.set(node, {
              x: -(1 - Math.cos(angle)) * R,
              y: Math.sin(angle) * R,
              scale: gsap.utils.interpolate(textSideScale, 1, s),
              opacity: gsap.utils.interpolate(textSideOpacity, 1, s),
              zIndex: Math.round(gsap.utils.interpolate(1, 30, s)),
              xPercent: 0,
              yPercent: -50,
              transformOrigin: '0% 50%',
            })
          })

          rightNodes.forEach((node, i) => {
            const lp = i / total - travel
            const angle = lp * Math.PI * 2
            const d = arcDistance(lp)
            const s = focusStrength(d, 0.45, 3.2)
            gsap.set(node, {
              x: (1 - Math.cos(angle)) * R,
              y: Math.sin(angle) * R,
              scale: gsap.utils.interpolate(imageSideScale, 1, s),
              opacity: gsap.utils.interpolate(imageSideOpacity, 1, s),
              zIndex: Math.round(gsap.utils.interpolate(1, 40, s)),
              xPercent: -50,
              yPercent: -50,
            })
            const frame = node.querySelector<HTMLElement>('.csr-frame')
            if (frame) gsap.set(frame, { opacity: s })
            const img = node.querySelector<HTMLElement>('img')
            if (img) gsap.set(img, { scale: gsap.utils.interpolate(1.12, 1, s) })
          })

          const idx = Math.round(p * (total - 1))
          if (idx !== focusedRef.current) {
            focusedRef.current = idx
            onFocusChange?.(idx)
          }
          // Body copy fades faster than its title so only the focused step reads.
          captions.forEach((c, i) => {
            const lp = i / total - travel
            gsap.set(c, { opacity: focusStrength(arcDistance(lp), 0.6, 2) })
          })
        }

        render(0)

        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: `+=${sectionHeight * total}%`,
          pin: stickyRef.current,
          scrub,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => render(self.progress),
        })

        const onResize = () => render(progressRef.current)
        window.addEventListener('resize', onResize)
        return () => {
          window.removeEventListener('resize', onResize)
          st.kill()
        }
      }, rootRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [safeItems, total, reduce, radius, cardSize, cardAspect, sectionHeight, scrub, textSideScale, textSideOpacity, imageSideScale, imageSideOpacity, onFocusChange])

  const showRoll = !reduce

  return (
    <div
      ref={rootRef}
      className={cn('relative w-full', className)}
      style={{ '--csr-card-w': `${cardSize}px`, '--csr-card-h': `${cardSize / cardAspect}px` } as CSSProperties}
    >
      {/* Desktop: pinned counter-arcing columns */}
      {showRoll && (
        <div ref={stickyRef} className="relative hidden h-screen w-full overflow-hidden lg:block">
          <div className="container-x mx-auto grid h-full max-w-[1600px] grid-cols-12 items-center">
            {/* Left — titles on the arc */}
            <div className="relative col-span-6 h-[78vh]">
              <div className="absolute top-[44%] left-0 h-0 w-0">
                {safeItems.map((it) => (
                  <div
                    key={it.id}
                    className="csr-title pointer-events-none absolute top-0 left-0 grid grid-cols-[2.5ch_1fr] items-baseline gap-x-5 whitespace-nowrap opacity-0 will-change-[transform,opacity]"
                  >
                    <span className="font-serif text-2xl text-brand-gold">{it.index}</span>
                    <span className="font-serif text-[length:clamp(3.25rem,5.6vw,6.5rem)] leading-none tracking-[-0.02em]">
                      {it.title}
                    </span>
                    {it.body && (
                      <p className="csr-caption col-start-2 mt-5 w-[min(28rem,30vw)] whitespace-normal text-[0.98rem] leading-relaxed text-brand-ivory/70">
                        {it.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — photography on the mirrored arc */}
            <div className="relative col-span-6 h-[78vh]">
              <div className="absolute top-1/2 left-[38%] h-0 w-0">
                {safeItems.map((it) => (
                  <div
                    key={it.id}
                    className="csr-card absolute top-0 left-0 h-(--csr-card-h) w-(--csr-card-w) opacity-0 will-change-[transform,opacity]"
                  >
                    <div className="relative h-full w-full overflow-hidden bg-brand-teal shadow-[0_40px_80px_-30px_rgba(13,20,19,0.8)]">
                      <img
                        src={it.image}
                        alt={it.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-transparent" />
                      <span className="eyebrow pointer-events-none absolute bottom-4 left-4 text-brand-ivory/85">
                        {it.index} — {it.title}
                      </span>
                    </div>
                    {/* Hairline frame that only shows at focus */}
                    <span aria-hidden className="csr-frame pointer-events-none absolute -inset-3 border border-brand-gold/40 opacity-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile / tablet / reduced-motion: stacked editorial list */}
      <ol className={cn('container-x mx-auto max-w-[1600px]', showRoll ? 'lg:hidden' : '')}>
        {safeItems.map((it, i) => (
          <li
            key={it.id}
            className="grid gap-6 border-t border-brand-ivory/10 py-10 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-8"
          >
            <div className="sm:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-teal">
                <img src={it.image} alt={it.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <span className="eyebrow absolute bottom-4 left-4 text-brand-ivory/85">{it.index}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center sm:col-span-7">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-2xl text-brand-gold">{it.index}</span>
                <h3 className="font-serif text-4xl leading-none sm:text-5xl">{it.title}</h3>
              </div>
              {it.body && <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-brand-ivory/70">{it.body}</p>}
              {i === total - 1 ? null : <span aria-hidden className="mt-8 hidden h-px w-12 bg-brand-gold/50 sm:block" />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
