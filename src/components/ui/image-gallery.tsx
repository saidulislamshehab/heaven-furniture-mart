import { useEffect, useState, type ReactNode } from 'react'
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
  /** Index expanded by default (hover/focus overrides). */
  defaultActive?: number
  onSelect?: (item: GalleryItem) => void
  /** Content shown inside the expanded panel, e.g. a CTA label. */
  action?: ReactNode
  /** Auto-advance the open piece left → right every N ms (0 disables). Pauses on hover/focus. */
  autoAdvanceMs?: number
  className?: string
}

/**
 * Accordion gallery: one piece expands while the others compress to slivers.
 * Hover, keyboard focus and tap all drive the active item; otherwise it walks left to right.
 */
export default function ImageGallery({ items, defaultActive = 0, onSelect, action, autoAdvanceMs = 3200, className }: ImageGalleryProps) {
  const [active, setActive] = useState(defaultActive)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!autoAdvanceMs || paused || items.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % items.length), autoAdvanceMs)
    return () => window.clearInterval(id)
  }, [autoAdvanceMs, paused, items.length])

  return (
    <ul
      className={cn('flex h-[62vh] min-h-[26rem] w-full gap-1.5 sm:gap-2 lg:h-[70vh] lg:max-h-[46rem]', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      {items.map((it, i) => {
        const isActive = i === active
        return (
          <li
            key={it.id}
            className={cn(
              'relative min-w-0 overflow-hidden bg-brand-ivory-deep transition-[flex-grow] duration-700 ease-[var(--ease-luxury)]',
              isActive ? 'flex-[6]' : 'flex-[1]'
            )}
            onMouseEnter={() => setActive(i)}
          >
            <button
              type="button"
              onFocus={() => setActive(i)}
              onClick={() => (isActive ? onSelect?.(it) : setActive(i))}
              aria-label={isActive ? `Request details for ${it.title}` : `Show ${it.title}`}
              aria-expanded={isActive}
              className="group absolute inset-0 block h-full w-full text-left focus-visible:outline-offset-[-4px]"
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
                  isActive ? 'opacity-100' : 'opacity-40'
                )}
              />

              {/* Collapsed: vertical index */}
              <span
                className={cn(
                  'eyebrow absolute top-4 left-1/2 -translate-x-1/2 text-brand-ivory/85 transition-opacity duration-500 sm:top-5',
                  isActive ? 'opacity-0' : 'opacity-100'
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'absolute bottom-5 left-1/2 hidden origin-bottom-left -translate-x-1/2 -rotate-90 whitespace-nowrap font-serif text-lg text-brand-ivory transition-opacity duration-500 sm:block',
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
                    {String(i + 1).padStart(2, '0')}
                    {it.meta ? ` / ${it.meta}` : ''}
                  </span>
                  <span className="mt-2 block truncate font-serif text-3xl leading-none sm:text-4xl lg:text-5xl">{it.title}</span>
                </span>
                {action && <span className="eyebrow hidden shrink-0 items-center gap-1 text-brand-ivory/85 sm:inline-flex">{action}</span>}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
