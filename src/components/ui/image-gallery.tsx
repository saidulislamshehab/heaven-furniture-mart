import { useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent, type ReactNode, type RefObject } from 'react'
import { srcSetFor } from '@/lib/images'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { cn } from '@/lib/utils'

const DRAG_THRESHOLD = 6

export interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  meta?: string
}

interface ImageGalleryProps {
  items: GalleryItem[]
  onSelect?: (item: GalleryItem) => void
  /** Content shown inside the expanded frame, e.g. a CTA label. */
  action?: ReactNode
  /** Seconds for the strip to travel one full cycle. */
  duration?: number
  className?: string
}

/**
 * Pointer-drag for a doubled marquee track: the offset wraps on one item-set width so the loop
 * stays seamless, the CSS animation pauses mid-drag, and the click that ends a drag is swallowed.
 */
function useDragTrack(trackRef: RefObject<HTMLUListElement | null>) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ startX: number; startOffset: number; moved: boolean } | null>(null)

  const wrap = (x: number) => {
    const half = (trackRef.current?.scrollWidth ?? 0) / 2
    return half ? x - Math.ceil(x / half) * half : x
  }
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { startX: e.clientX, startOffset: offset, moved: false }
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return
    if (!d.moved) {
      d.moved = true
      setDragging(true)
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    setOffset(wrap(d.startOffset + dx))
  }
  const onPointerUp = () => {
    drag.current = null
    setDragging(false)
  }
  const onClickCapture = (e: MouseEvent) => {
    if (dragging) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return {
    offset,
    dragging,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onClickCapture },
  }
}

/**
 * Endless strip of frames drifting left → right. Hovering a frame expands that piece while the
 * strip keeps moving; the rest stay as slivers. Static for reduced-motion users.
 * Phones get two counter-drifting rows (top → right, bottom → left) with tap-to-select frames.
 */
export default function ImageGallery({ items, onSelect, action, duration = 55, className }: ImageGalleryProps) {
  const smUp = useMediaQuery('(min-width: 640px)')
  if (!smUp) return <PhoneRows items={items} onSelect={onSelect} action={action} className={className} />
  return <DriftStrip items={items} onSelect={onSelect} action={action} duration={duration} className={className} />
}

/** Phones: two marquee rows moving in opposite directions, each draggable. Rows are doubled so the loop is seamless. */
function PhoneRows({ items, onSelect, action, className }: Omit<ImageGalleryProps, 'duration'>) {
  const half = Math.ceil(items.length / 2)
  return (
    <div className={cn('flex flex-col gap-3', className)} role="list" aria-label="Signature pieces">
      <PhoneRow items={items.slice(0, half)} dir="ltr" indexOffset={0} onSelect={onSelect} action={action} />
      <PhoneRow items={items.slice(half)} dir="rtl" indexOffset={half} onSelect={onSelect} action={action} />
    </div>
  )
}

function PhoneRow({
  items,
  dir,
  indexOffset,
  onSelect,
  action,
}: Pick<ImageGalleryProps, 'items' | 'onSelect' | 'action'> & { dir: 'ltr' | 'rtl'; indexOffset: number }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const { offset, dragging, handlers } = useDragTrack(trackRef)
  const loop = [...items, ...items]
  return (
    <div
      role="listitem"
      className={cn('w-full overflow-hidden select-none', dragging ? 'cursor-grabbing' : 'cursor-grab')}
      style={{ touchAction: 'pan-y' }}
      {...handlers}
    >
      <div style={{ transform: `translateX(${offset}px)` }} className="w-max will-change-transform">
        <ul
          ref={trackRef}
          className={cn(
            'flex w-max gap-3 will-change-transform',
            dir === 'ltr' ? 'motion-safe:animate-[gallery-ltr_var(--dur)_linear_infinite]' : 'motion-safe:animate-[gallery-rtl_var(--dur)_linear_infinite]'
          )}
          style={{ '--dur': `${items.length * 6}s`, animationPlayState: dragging ? 'paused' : undefined } as CSSProperties}
        >
          {loop.map((it, i) => {
            const clone = i >= items.length
            const index = String(indexOffset + (i % items.length) + 1).padStart(2, '0')
            return (
              <li
                key={`${it.id}-${i}`}
                aria-hidden={clone || undefined}
                className="relative aspect-[4/5] w-[42vw] max-w-[13rem] shrink-0 overflow-hidden rounded-sm bg-brand-ivory-deep"
              >
                <button
                  type="button"
                  tabIndex={clone ? -1 : 0}
                  onClick={() => onSelect?.(it)}
                  aria-label={`Request details for ${it.title}`}
                  className="absolute inset-0 block h-full w-full text-left focus-visible:outline-offset-[-4px]"
                >
                  <img
                    src={it.src}
                    srcSet={srcSetFor(it.src)}
                    sizes="42vw"
                    alt={it.alt}
                    /* Marquee frames enter from off-screen; lazy loading would leave them blank. */
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 text-brand-ivory">
                    <span className="eyebrow text-[0.6rem] text-brand-gold">
                      {index}
                      {it.meta ? ` / ${it.meta}` : ''}
                    </span>
                    <span className="block truncate font-serif text-lg leading-tight">{it.title}</span>
                    {action && <span className="eyebrow mt-1 inline-flex items-center gap-1 text-[0.6rem] text-brand-ivory/80">{action}</span>}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function DriftStrip({ items, onSelect, action, duration = 55, className }: ImageGalleryProps) {
  const [active, setActive] = useState<string | null>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const { offset, dragging, handlers } = useDragTrack(trackRef)
  const loop = [...items, ...items]

  return (
    <div
      className={cn('relative w-full overflow-hidden select-none', dragging ? 'cursor-grabbing' : 'cursor-grab', className)}
      style={{ touchAction: 'pan-y' }}
      onMouseLeave={() => setActive(null)}
      {...handlers}
    >
      <div style={{ transform: `translateX(${offset}px)` }} className="w-max will-change-transform">
      <ul
        ref={trackRef}
        className="flex h-[58vh] min-h-[24rem] w-max gap-1.5 motion-safe:animate-[gallery-ltr_var(--dur)_linear_infinite] sm:gap-2 lg:h-[66vh] lg:max-h-[44rem]"
        style={{ '--dur': `${duration}s`, animationPlayState: dragging ? 'paused' : undefined } as CSSProperties}
      >
        {loop.map((it, i) => {
          const key = `${it.id}-${i}`
          const isActive = active === key
          const index = String((i % items.length) + 1).padStart(2, '0')
          return (
            <li
              key={key}
              aria-hidden={i >= items.length || undefined}
              className={cn(
                'relative h-full shrink-0 overflow-hidden bg-brand-ivory-deep transition-[width] duration-700 ease-[var(--ease-luxury)]',
                isActive ? 'w-[min(38rem,80vw)]' : 'w-28 sm:w-36 lg:w-44'
              )}
              onMouseEnter={() => !dragging && setActive(key)}
            >
              <button
                type="button"
                tabIndex={i >= items.length ? -1 : 0}
                onFocus={() => setActive(key)}
                onClick={() => (isActive ? onSelect?.(it) : setActive(key))}
                aria-label={isActive ? `Request details for ${it.title}` : `Show ${it.title}`}
                aria-expanded={isActive}
                className="absolute inset-0 block h-full w-full text-left focus-visible:outline-offset-[-4px]"
              >
                <img
                  src={it.src}
                  srcSet={srcSetFor(it.src)}
                  sizes="(min-width:1024px) 38rem, 80vw"
                  alt={it.alt}
                  /* The track is a CSS marquee — lazy frames entering from the edge often never fire. Clones hit cache. */
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className={cn(
                    'h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxury)]',
                    isActive ? 'scale-100' : 'scale-[1.08]'
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/10 to-transparent transition-opacity duration-700',
                    isActive ? 'opacity-100' : 'opacity-45'
                  )}
                />

                {/* Collapsed: index + vertical title */}
                <span
                  className={cn(
                    'eyebrow absolute top-4 left-1/2 -translate-x-1/2 text-brand-ivory/85 transition-opacity duration-500 sm:top-5',
                    isActive ? 'opacity-0' : 'opacity-100'
                  )}
                >
                  {index}
                </span>
                <span
                  className={cn(
                    'absolute bottom-5 left-1/2 hidden origin-bottom-left whitespace-nowrap font-serif text-lg text-brand-ivory opacity-0 transition-opacity duration-500 sm:block'
                  )}
                  style={{ transform: 'translateX(-50%) rotate(-90deg) translateX(50%)' }}
                >
                  {it.title}
                </span>

                {/* Expanded: title, meta, action */}
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-brand-ivory transition-all duration-700 ease-[var(--ease-luxury)] sm:p-7',
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  )}
                >
                  <span className="min-w-0">
                    <span className="eyebrow block text-brand-gold">
                      {index}
                      {it.meta ? ` / ${it.meta}` : ''}
                    </span>
                    <span className="mt-2 block truncate font-serif text-3xl leading-none sm:text-4xl">{it.title}</span>
                  </span>
                  {action && <span className="eyebrow hidden shrink-0 items-center gap-1 text-brand-ivory/85 sm:inline-flex">{action}</span>}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      </div>
    </div>
  )
}
