import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'

/** Solid-colour scene surface. Classes must come from the brand palette. */
export interface StorySurface {
  /** e.g. `bg-brand-teal-deep` */
  bg: string
  /** e.g. `text-brand-ivory` */
  fg: string
  /** e.g. `text-brand-ivory/60` */
  muted: string
}

export interface StoryImage {
  /** Photo scene. Omit and pass `surface` for a solid-colour scene. */
  src?: string
  alt?: string
  surface?: StorySurface
  /** Large display text (e.g. a year). Animated with scroll. */
  display?: string
  eyebrow?: string
  title?: string
  description?: string
}

export type StoryDirection = 'up' | 'left'

export interface ScrollStoryGalleryProps {
  /** Exactly 5 scenes. Extras are dropped; fewer than 5 are padded by repeating. */
  images: StoryImage[]
  /** `up`: next scene rises from the bottom. `left`: next scene wipes in from the right. */
  direction?: StoryDirection
  className?: string
}

const COUNT = 5
/* Scroll rhythm: each scene holds, then the next uncovers it. Units are relative. */
const HOLD = 0.55
const REVEAL = 1
const TOTAL = COUNT * HOLD + (COUNT - 1) * REVEAL

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Start/end of the transition that brings scene `i` in. Scene 0 just settles at the start. */
function window_(i: number): [number, number] {
  if (i === 0) return [0, (HOLD * 0.6) / TOTAL]
  const start = (i * HOLD + (i - 1) * REVEAL) / TOTAL
  return [start, start + REVEAL / TOTAL]
}

function normalize(images: StoryImage[]): StoryImage[] {
  if (images.length === 0) return []
  const out = images.slice(0, COUNT)
  while (out.length < COUNT) out.push(images[out.length % images.length])
  return out
}

const photoSurface: StorySurface = {
  bg: 'bg-brand-ink',
  fg: 'text-brand-ivory',
  muted: 'text-brand-ivory/70',
}

function Layer({
  scene,
  index,
  progress,
  reduce,
  direction,
}: {
  scene: StoryImage
  index: number
  progress: MotionValue<number>
  reduce: boolean
  direction: StoryDirection
}) {
  const [start, end] = window_(index)
  const local = useTransform(progress, [start, end], [0, 1], { clamp: true })
  const eased = useTransform(local, easeInOut)

  const clipPath = useTransform(eased, (v) => {
    if (index === 0) return 'inset(0 0 0 0)'
    return direction === 'up' ? `inset(${(1 - v) * 100}% 0 0 0)` : `inset(0 ${(1 - v) * 100}% 0 0)`
  })
  const opacity = useTransform(eased, [0, 1], index === 0 ? [1, 1] : [0, 1])
  const scale = useTransform(eased, [0, 1], [1.04, 1])
  /* Content drifts against the mask so the reveal reads as rising, not just uncovering. */
  const drift = useTransform(eased, [0, 1], direction === 'up' ? ['6%', '0%'] : ['0%', '0%'])

  /* Display text: rises and settles slightly after the panel, then keeps a slow parallax while held. */
  const [, holdEnd] = index + 1 < COUNT ? window_(index + 1) : [0, 1]
  const displayY = useTransform(progress, [start, end, holdEnd], ['38%', '0%', '-6%'], { clamp: true })
  const displayOpacity = useTransform(local, [0, 0.35, 1], [0, 0.4, 1])
  const displayScale = useTransform(eased, [0, 1], [0.92, 1])
  const captionY = useTransform(eased, [0, 1], ['24px', '0px'])

  const surface = scene.surface ?? photoSurface

  return (
    <motion.div
      className={cn('absolute inset-0 will-change-[clip-path]', surface.bg)}
      style={reduce ? { opacity } : { clipPath }}
    >
      {scene.src && (
        <motion.img
          src={scene.src}
          alt={scene.alt ?? ''}
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : undefined}
          decoding="async"
          sizes="(min-width:1024px) 92vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
          style={reduce ? undefined : { scale, y: drift }}
        />
      )}

      {scene.display && (
        <div className="absolute inset-0 flex items-center px-5 sm:px-8 lg:px-12">
          <motion.p
            aria-hidden
            className={cn(
              'font-serif font-bold leading-[0.85] tracking-[-0.04em] text-[length:clamp(5.5rem,20vw,17rem)]',
              surface.fg
            )}
            style={
              reduce
                ? { opacity: displayOpacity }
                : { y: displayY, opacity: displayOpacity, scale: displayScale, transformOrigin: 'left center' }
            }
          >
            {scene.display}
          </motion.p>
        </div>
      )}

      {scene.src && (
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent" />
      )}

      {(scene.eyebrow || scene.title || scene.description) && (
        <motion.div
          className={cn('absolute inset-x-0 bottom-0 max-w-xl p-5 pr-20 sm:p-8 sm:pr-28 lg:p-12 lg:pr-32', surface.fg)}
          style={reduce ? undefined : { y: captionY }}
        >
          {scene.eyebrow && <p className="eyebrow text-brand-gold">{scene.eyebrow}</p>}
          {scene.display && <span className="sr-only">{scene.display}</span>}
          {scene.title && (
            <h3 className="mt-2 font-serif text-[length:clamp(1.75rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-balance">
              {scene.title}
            </h3>
          )}
          {scene.description && (
            <p className={cn('mt-3 hidden max-w-md text-[0.95rem] leading-relaxed sm:block', surface.muted)}>
              {scene.description}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export function ScrollStoryGallery({ images, direction = 'up', className }: ScrollStoryGalleryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const list = normalize(images)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true })

  /* Active index only changes 5 times per pass — cheap to keep in state. */
  const [active, setActive] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => {
    let next = 0
    for (let i = 1; i < COUNT; i++) {
      const [s, e] = window_(i)
      if (p >= (s + e) / 2) next = i
    }
    if (next !== active) setActive(next)
  })

  if (list.length === 0) return null

  return (
    <div ref={ref} className={cn('relative h-[460vh] md:h-[500vh]', className)}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center px-4 py-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="relative h-[72dvh] w-full overflow-hidden bg-brand-ink shadow-[0_60px_120px_-60px_rgba(13,20,19,0.65)] md:aspect-[16/9] md:h-auto md:max-h-[78dvh]">
            {list.map((scene, i) => (
              <Layer
                key={(scene.src ?? scene.surface?.bg ?? '') + i}
                scene={scene}
                index={i}
                progress={progress}
                reduce={reduce}
                direction={direction}
              />
            ))}

            {/* Progress index — gold reads on every brand surface */}
            <ol
              className="absolute right-5 bottom-5 flex flex-col items-end gap-1.5 font-mono text-[0.65rem] tracking-[0.14em] text-brand-gold sm:right-8 sm:bottom-8 sm:gap-2 sm:text-[0.7rem] lg:right-12 lg:bottom-12"
              aria-label="Gallery progress"
            >
              {list.map((_, i) => (
                <li
                  key={i}
                  aria-current={i === active ? 'step' : undefined}
                  className={cn(
                    'flex items-center gap-2 transition-opacity duration-700 ease-[var(--ease-luxury)]',
                    i === active ? 'opacity-100' : 'opacity-40'
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'block h-px bg-current transition-[width] duration-700 ease-[var(--ease-luxury)]',
                      i === active ? 'w-6 sm:w-8' : 'w-2'
                    )}
                  />
                  0{i + 1}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollStoryGallery
