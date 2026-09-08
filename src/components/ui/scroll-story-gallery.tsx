import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { srcSetFor } from '@/lib/images'
import { isLowPower } from '@/lib/device'

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
const HOLD = 0.6
const REVEAL = 1.6
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
  /* Scaling a full-bleed photo every frame is the costliest part of this scene on phones. */
  const animateImage = !reduce && !isLowPower()

  return (
    <motion.div
      className={cn('absolute inset-0 will-change-[clip-path]', surface.bg)}
      style={reduce ? { opacity } : { clipPath }}
    >
      {scene.src && (
        <motion.img
          src={scene.src}
          srcSet={srcSetFor(scene.src)}
          alt={scene.alt ?? ''}
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : undefined}
          decoding="async"
          sizes="(min-width:1024px) 92vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
          style={animateImage ? { scale, y: drift } : undefined}
        />
      )}

      {scene.display && (
        <div
          className={cn(
            'absolute inset-x-0 top-0 flex px-5 pt-6 sm:px-8 sm:pt-8 lg:inset-y-0 lg:right-auto lg:w-[52%] lg:items-center lg:px-12 lg:pt-0',
            '[@media(max-height:500px)_and_(orientation:landscape)]:inset-y-0 [@media(max-height:500px)_and_(orientation:landscape)]:right-auto [@media(max-height:500px)_and_(orientation:landscape)]:w-[46%] [@media(max-height:500px)_and_(orientation:landscape)]:items-center [@media(max-height:500px)_and_(orientation:landscape)]:pt-0'
          )}
        >
          <motion.p
            aria-hidden
            className={cn(
              // Size scales with character count (--n) so long labels like "2024–25" never wrap or spill
              'font-serif font-bold leading-[0.85] tracking-[-0.04em] whitespace-nowrap',
              'text-[length:clamp(3rem,min(18vw,calc(105vw/var(--n))),15rem)]',
              '[@media(max-height:640px)_and_(orientation:portrait)]:text-[length:clamp(2.5rem,min(13vw,calc(80vw/var(--n))),5rem)]',
              '[@media(max-height:500px)_and_(orientation:landscape)]:text-[length:clamp(1.75rem,min(9vw,calc(36vw/var(--n))),5rem)]',
              'lg:text-[length:clamp(4.5rem,min(11vw,calc(46vw/var(--n))),11.5rem)]',
              surface.fg
            )}
            style={{
              ['--n' as string]: Math.max(scene.display.length, 4),
              ...(reduce
                ? { opacity: displayOpacity }
                : { y: displayY, opacity: displayOpacity, scale: displayScale, transformOrigin: 'left center' }),
            }}
          >
            {scene.display}
          </motion.p>
        </div>
      )}

      {scene.src && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,20,19,0.88)_0%,rgba(13,20,19,0.55)_35%,rgba(13,20,19,0.12)_65%,transparent_100%)]"
        />
      )}

      {(scene.eyebrow || scene.title || scene.description) && (
        <motion.div
          className={cn(
            'absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 pr-20 pb-8 sm:p-8 sm:pr-28 sm:pb-10',
            scene.src
              ? 'lg:max-w-2xl lg:p-12 lg:pr-32'
              : cn(
                  'lg:inset-y-0 lg:left-auto lg:w-[48%] lg:justify-center lg:p-12 lg:pr-28',
                  '[@media(max-height:500px)_and_(orientation:landscape)]:inset-y-0 [@media(max-height:500px)_and_(orientation:landscape)]:left-auto [@media(max-height:500px)_and_(orientation:landscape)]:w-[54%] [@media(max-height:500px)_and_(orientation:landscape)]:justify-center [@media(max-height:500px)_and_(orientation:landscape)]:pb-5'
                ),
            surface.fg
          )}
          style={reduce ? undefined : { y: captionY }}
        >
          {scene.eyebrow && <p className="eyebrow text-brand-gold">{scene.eyebrow}</p>}
          {scene.display && <span className="sr-only">{scene.display}</span>}
          {scene.title && (
            <h3 className="mt-2 font-serif text-[length:clamp(2rem,4.5vw,4rem)] leading-[0.95] tracking-tight text-balance [@media(max-height:640px)]:text-2xl">
              {scene.title}
            </h3>
          )}
          {scene.description && (
            <p className={cn('mt-4 max-w-xl font-serif text-[length:clamp(1.15rem,1.9vw,1.75rem)] leading-snug text-pretty [@media(max-height:640px)]:mt-2 [@media(max-height:640px)]:line-clamp-4 [@media(max-height:640px)]:text-base', surface.muted)}>
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
  /* Spring lags the raw scroll slightly so fast wheel ticks don't snap between scenes. Touch scroll has its own inertia. */
  const smoothed = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.6, restDelta: 0.0005 })
  const progress = useTransform(reduce || isLowPower() ? scrollYProgress : smoothed, [0, 1], [0, 1], { clamp: true })

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
    <div ref={ref} className={cn('relative h-[620vh] md:h-[700vh]', className)}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center px-4 py-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="relative h-[74dvh] w-full overflow-hidden rounded-[1.5rem] bg-brand-ivory-deep shadow-[0_60px_120px_-60px_rgba(13,20,19,0.45)] sm:rounded-[2rem] md:h-[86dvh] lg:rounded-[2.5rem]">
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
              className="absolute right-5 bottom-5 flex flex-col items-end gap-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-brand-gold sm:right-8 sm:bottom-8 sm:gap-2 lg:right-12 lg:bottom-12"
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
                  {/* Only the current index is printed; dimmed numbers can't meet contrast, ticks carry the rest */}
                  <span aria-hidden className={cn('transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-0')}>
                    0{i + 1}
                  </span>
                  <span className="sr-only">{`Scene ${i + 1} of ${list.length}`}</span>
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
