import { useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
 * Endless strip of frames drifting left → right. Hovering a frame expands that piece while the
 * strip keeps moving; the rest stay as slivers. Static for reduced-motion users.
 */
export default function ImageGallery({ items, onSelect, action, duration = 55, className }: ImageGalleryProps) {
  const [active, setActive] = useState<string | null>(null)
  const loop = [...items, ...items]

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      onMouseLeave={() => setActive(null)}
    >
      <ul
        className="flex h-[58vh] min-h-[24rem] w-max gap-1.5 motion-safe:animate-[gallery-ltr_var(--dur)_linear_infinite] sm:gap-2 lg:h-[66vh] lg:max-h-[44rem]"
        style={{ '--dur': `${duration}s` } as CSSProperties}
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
              onMouseEnter={() => setActive(key)}
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
                  alt={it.alt}
                  loading="lazy"
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
                    'absolute bottom-5 left-1/2 hidden origin-bottom-left whitespace-nowrap font-serif text-lg text-brand-ivory transition-opacity duration-500 sm:block',
                    isActive ? 'opacity-0' : 'opacity-90'
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
  )
}
