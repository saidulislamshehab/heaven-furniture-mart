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

export interface ScrollRevealImage {
  src: string
  alt: string
  eyebrow?: string
  title?: string
  description?: string
}

export interface ScrollRevealGalleryProps {
  /** Exactly 5 images. Extras are dropped; fewer than 5 are padded by repeating. */
  images: ScrollRevealImage[]
  className?: string
}

const COUNT = 5
/* Scroll rhythm: each image holds, then the next uncovers it. Units are relative. */
const HOLD = 0.55
const REVEAL = 1
const TOTAL = COUNT * HOLD + (COUNT - 1) * REVEAL

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Start/end of the transition that brings image `i` (1-based) in. */
function window_(i: number): [number, number] {
  const start = (i * HOLD + (i - 1) * REVEAL) / TOTAL
  return [start, start + REVEAL / TOTAL]
}

function normalize(images: ScrollRevealImage[]): ScrollRevealImage[] {
  if (images.length === 0) return []
  const out = images.slice(0, COUNT)
  while (out.length < COUNT) out.push(images[out.length % images.length])
  return out
}

function Layer({
  image,
  index,
  progress,
  reduce,
}: {
  image: ScrollRevealImage
  index: number
  progress: MotionValue<number>
  reduce: boolean
}) {
  const [start, end] = window_(index)
  const local = useTransform(progress, [start, end], [0, 1], { clamp: true })
  const eased = useTransform(local, easeInOut)

  const clipPath = useTransform(eased, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`)
  const opacity = useTransform(eased, [0, 1], [0, 1])
  const scale = useTransform(eased, [0, 1], [1.03, 1])

  return (
    <motion.div
      className="absolute inset-0 will-change-[clip-path]"
      style={reduce ? { opacity } : { clipPath }}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        sizes="(min-width:1024px) 92vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover"
        style={reduce ? undefined : { scale }}
      />
    </motion.div>
  )
}

export function ScrollRevealGallery({ images, className }: ScrollRevealGalleryProps) {
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
  const current = list[active]

  return (
    <div ref={ref} className={cn('relative h-[460vh] md:h-[500vh]', className)}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center px-4 py-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="relative h-[72dvh] w-full overflow-hidden bg-brand-ink/95 shadow-[0_60px_120px_-60px_rgba(13,20,19,0.65)] md:aspect-[16/9] md:h-auto md:max-h-[78dvh]">
            {/* Base image: always present, never clipped */}
            <img
              src={list[0].src}
              alt={list[0].alt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width:1024px) 92vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {list.slice(1).map((image, i) => (
              <Layer key={image.src + i} image={image} index={i + 1} progress={progress} reduce={reduce} />
            ))}

            {/* Soft vignette so text sits comfortably at the bottom edge */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent" />

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-8 lg:p-12">
              <div className="min-w-0 max-w-xl" aria-live="polite">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {current.eyebrow && <p className="eyebrow text-brand-gold-soft">{current.eyebrow}</p>}
                  {current.title && (
                    <h3 className="mt-2 font-serif text-[length:clamp(1.75rem,4vw,3.5rem)] leading-[0.95] tracking-tight text-brand-ivory text-balance">
                      {current.title}
                    </h3>
                  )}
                  {current.description && (
                    <p className="mt-3 hidden max-w-md text-[0.95rem] leading-relaxed text-brand-ivory/70 sm:block">
                      {current.description}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Progress index */}
              <ol className="flex shrink-0 flex-col items-end gap-1.5 font-mono text-[0.65rem] tracking-[0.14em] sm:gap-2 sm:text-[0.7rem]" aria-label="Gallery progress">
                {list.map((_, i) => (
                  <li
                    key={i}
                    aria-current={i === active ? 'step' : undefined}
                    className={cn(
                      'flex items-center gap-2 transition-[color,opacity] duration-700 ease-[var(--ease-luxury)]',
                      i === active ? 'text-brand-gold-soft' : 'text-brand-ivory/35'
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
    </div>
  )
}

export default ScrollRevealGallery
