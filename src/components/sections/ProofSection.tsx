import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Reveal, SplitWords, luxuryEase } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 7000
const SWIPE_PX = 60

const reviews = site.reviews

function ReviewCarousel() {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [[index, direction], setSlide] = useState<[number, 1 | -1]>([0, 1])
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const count = reviews.length
  const review = reviews[index]

  const go = useCallback((dir: 1 | -1) => setSlide(([i]) => [(i + dir + count) % count, dir]), [count])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Auto-rotate only while on screen; pauses on hover/focus and is off entirely for reduced motion.
  useEffect(() => {
    if (!inView || paused || reduce || count < 2) return
    const id = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [inView, paused, reduce, count, go])

  const variants = {
    enter: (d: 1 | -1) => ({ opacity: 0, x: reduce ? 0 : d * 48 }),
    center: { opacity: 1, x: 0 },
    exit: (d: 1 | -1) => ({ opacity: 0, x: reduce ? 0 : d * -48 }),
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      className="flex flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      <div className="relative overflow-hidden border-l border-brand-gold/60 pl-5 sm:pl-12">
        {/* Fixed min-height so slides of different length don't shift the layout */}
        <div className="grid min-h-[16rem] sm:min-h-[18rem] lg:min-h-[22rem]" aria-live={paused || reduce ? 'polite' : 'off'}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.figure
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0.2 : 0.7, ease: luxuryEase }}
              drag={reduce ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_PX) go(1)
                else if (info.offset.x > SWIPE_PX) go(-1)
              }}
              className="col-start-1 row-start-1 flex cursor-grab flex-col justify-between active:cursor-grabbing"
            >
              <blockquote className="font-serif text-[length:clamp(1.35rem,3.2vw,3rem)] leading-[1.2] text-brand-brown">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-lg">{review.author}</p>
                <span className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      aria-hidden
                      className={cn('size-3.5', i < review.rating ? 'fill-brand-gold text-brand-gold' : 'text-brand-brown/25')}
                    />
                  ))}
                </span>
                <p className="eyebrow basis-full text-brand-stone">Google review</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 sm:gap-6 sm:pl-12">
        <div className="flex items-center" role="tablist" aria-label="Choose review">
          {reviews.map((r, i) => (
            <button
              key={r.author}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Review ${i + 1} of ${count}, ${r.author}`}
              onClick={() => setSlide([i, i > index ? 1 : -1])}
              className="flex h-11 items-center px-1 sm:px-1.5"
            >
              <span
                className={cn(
                  'block h-px transition-[width,background-color] duration-500 ease-[var(--ease-luxury)] motion-reduce:transition-none',
                  i === index ? 'w-6 bg-brand-gold sm:w-8' : 'w-3 bg-brand-brown/30 sm:w-4'
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="flex size-11 items-center justify-center rounded-full border border-brand-teal-deep/40 text-brand-teal-deep transition-colors hover:border-brand-teal-deep hover:bg-brand-teal-deep hover:text-brand-ivory"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="flex size-11 items-center justify-center rounded-full border border-brand-teal-deep/40 text-brand-teal-deep transition-colors hover:border-brand-teal-deep hover:bg-brand-teal-deep hover:text-brand-ivory"
          >
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProofSection() {
  return (
    <section id="reviews" className="section-pad bg-brand-ivory text-brand-brown">
      <div className="container-x mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel number="09">Client voices</SectionLabel>
          </Reveal>
          <h2 className="mt-6 max-w-[12ch] display-2 text-balance">
            <SplitWords text="Made for living. Remembered in words." />
          </h2>

          <Reveal delay={0.2} className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-6">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label={`${site.googleRating.score} out of 5 from ${site.googleRating.count} Google reviews — read them on Google Maps`}
            >
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-7xl leading-none sm:text-8xl">{site.googleRating.score}</span>
                <Star className="size-6 fill-brand-gold text-brand-gold" aria-hidden />
              </span>
              <span className="eyebrow mt-3 inline-flex items-center gap-1 text-brand-stone transition-colors group-hover:text-brand-gold">
                {site.googleRating.count} Google reviews <ArrowUpRight className="size-3.5" />
              </span>
            </a>
            <p className="max-w-[16rem] text-[0.95rem] leading-relaxed text-brand-stone">
              Trusted by homeowners across Chattogram and beyond.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <ReviewCarousel />
        </Reveal>
      </div>
    </section>
  )
}
