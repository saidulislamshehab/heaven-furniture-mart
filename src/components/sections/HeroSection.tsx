import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { luxuryEase } from '@/components/common/Reveal'
import { heroVideos } from '@/data/assets'
import { site } from '@/data/site'
import { isLowPower } from '@/lib/device'
import { videoSrcFor } from '@/lib/images'
import { scrollToHash } from '@/lib/scroll'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  introDone: boolean
}

function useStillMedia() {
  const [still] = useState(() => {
    if (typeof window === 'undefined') return true
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || Boolean(nav.connection?.saveData)
  })
  return still
}

/** Slow links get a single looping film instead of the five-part rotation (~28 MB). */
function useLiteFilm() {
  const [lite] = useState(() => {
    if (typeof window === 'undefined') return false
    const nav = navigator as Navigator & { connection?: { effectiveType?: string } }
    return /(^|-)2g$|^3g$/.test(nav.connection?.effectiveType ?? '')
  })
  return lite
}

/** Plays the hero films in sequence with a slow cross-fade across all devices including mobile. */
function HeroFilm({ active, onAdvance }: { active: number; onAdvance: () => void }) {
  const still = useStillMedia()
  const lite = useLiteFilm()
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  const list = lite ? heroVideos.slice(0, 1) : heroVideos
  const current = active % list.length
  // The successor's src is attached a few seconds into the current film so it never competes with first paint.
  const [warmedFor, setWarmedFor] = useState(-1)
  const warmNext = warmedFor === current

  useEffect(() => {
    if (still || list.length < 2) return
    const t = window.setTimeout(() => setWarmedFor(current), 3500)
    return () => window.clearTimeout(t)
  }, [current, still, list.length])

  useEffect(() => {
    if (still) return
    refs.current.forEach((v, i) => {
      if (!v) return
      if (i === current) {
        if (list.length > 1) v.currentTime = 0
        v.play().catch(() => {})
      } else if (!v.paused) {
        v.pause()
      }
    })
  }, [current, still, list.length])

  if (still) {
    return <img src={heroVideos[0].poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
  }

  return (
    <>
      {list.map((v, i) => (
        <video
          key={v.src}
          ref={(el) => {
            refs.current[i] = el
          }}
          // Only the playing film and (after a beat) its successor ever get a src; the rest stay empty until reached
          src={i === current || (warmNext && i === (current + 1) % list.length) ? videoSrcFor(v.src) : undefined}
          poster={i === 0 ? v.poster : undefined}
          muted
          playsInline
          loop={list.length === 1}
          autoPlay={i === 0}
          preload={i === current ? 'auto' : 'metadata'}
          onEnded={list.length > 1 ? onAdvance : undefined}
          aria-hidden
          tabIndex={-1}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-[var(--ease-luxury)]',
            i === current ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}
    </>
  )
}

/** Per-letter rise with a soft blur settle. `ready` gates the start so it lands after the intro hand-off. */
function Letters({ text, ready, delay, className }: { text: string; ready: boolean; delay: number; className?: string }) {
  const reduce = useReducedMotion()
  /* Animated blur re-rasterises every glyph per frame — skipped on phones. */
  const blur = !isLowPower()
  return (
    <span className={cn('inline-flex overflow-hidden px-[0.08em] -mx-[0.08em] pt-[0.1em] -mt-[0.1em] pb-[0.12em] -mb-[0.12em]', className)} aria-hidden>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-visible will-change-transform"
          initial={reduce ? false : { y: '110%', opacity: 0, ...(blur && { filter: 'blur(6px)' }) }}
          animate={ready ? { y: '0%', opacity: 1, ...(blur && { filter: 'blur(0px)' }) } : {}}
          transition={{ duration: 1.1, delay: delay + i * 0.035, ease: luxuryEase }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export function HeroSection({ introDone }: HeroSectionProps) {
  const { open } = useConsultation()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    // Keep cycling all 5 films smoothly across mobile and desktop
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % heroVideos.length)
    }, 10_000)
    return () => clearInterval(timer)
  }, [active])

  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : typeof window !== 'undefined' && window.innerWidth < 640 ? 45 : 100])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const ready = introDone

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.1, delay, ease: luxuryEase },
  })

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand-teal-deep text-brand-ivory">
      <motion.div className="absolute inset-0 -z-10" style={{ scale: mediaScale }}>
        <HeroFilm active={active} onAdvance={() => setActive((a) => (a + 1) % heroVideos.length)} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/30 to-brand-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/40 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-x mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end pt-24 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pt-32 sm:pb-14 [@media(max-height:500px)]:pt-20 [@media(max-height:500px)]:pb-6"
      >
        <motion.p {...fade(0.1)} className="eyebrow flex items-center gap-3 text-brand-gold-soft sm:whitespace-nowrap">
          <motion.span
            aria-hidden
            className="h-px w-6 shrink-0 origin-left bg-current sm:w-8"
            initial={reduce ? false : { scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: luxuryEase }}
          />
          <span className="sm:hidden">Bespoke furniture &amp; interiors</span>
          <span className="hidden sm:inline">
            Bespoke furniture &amp; interior styling · {site.address.city}
          </span>
        </motion.p>

        {/* Layered headline: massive sans line + italic serif line, like a film title card */}
        <h1 className="mt-5 text-balance sm:mt-6" aria-label="Built around the way you live.">
          <span className="block font-serif text-[length:clamp(2.75rem,11.5vw,3.5rem)] font-normal leading-[0.95] tracking-[-0.025em] text-brand-ivory sm:text-[length:clamp(2.1rem,6.2vw,5.5rem)]">
            <Letters text="Built around" ready={ready} delay={0.2} />
          </span>
          <span className="mt-1.5 flex flex-wrap items-baseline gap-x-[0.28em] text-[length:clamp(2.75rem,11.5vw,3.5rem)] sm:mt-2 sm:text-[length:clamp(2.1rem,6.2vw,5.5rem)]">
            <span className="font-serif italic leading-[0.95] tracking-[-0.02em] text-brand-ivory/90">
              <Letters text="the way" ready={ready} delay={0.5} />
            </span>
            <span
              className="font-serif italic font-light leading-[0.95] tracking-[-0.01em] text-brand-wood"
              // Fraunces' expressive axes: max wonk (swash-like forms) and softness
              style={{ fontVariationSettings: '"WONK" 1, "SOFT" 100, "opsz" 144' }}
            >
              <Letters text="you" ready={ready} delay={0.7} />
            </span>
            <span className="font-serif italic leading-[0.95] tracking-[-0.02em] text-brand-ivory/90">
              <Letters text="live." ready={ready} delay={0.88} />
            </span>
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p {...fade(1.15)} className="max-w-md text-[0.95rem] leading-relaxed text-brand-ivory/80 sm:text-lg">
            Premium bespoke furniture and interior styling from Chattogram — designed around your
            space, your taste and the way you live.
          </motion.p>

          <motion.div {...fade(1.3)} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button variant="ivory" size="pill" className="w-full sm:w-auto" onClick={() => open()}>
              Start Your Design <ArrowUpRight />
            </Button>
            <button
              type="button"
              onClick={() => scrollToHash('#collections')}
              className="group eyebrow inline-flex min-h-11 items-center justify-center gap-2 self-center whitespace-nowrap py-2 text-brand-ivory/80 transition-colors hover:text-brand-ivory sm:min-h-0 sm:self-auto"
            >
              Browse the collections
              <ArrowDown className="size-3.5 transition-transform duration-500 group-hover:translate-y-1" />
            </button>
          </motion.div>
        </div>

        <motion.div
          {...fade(1.5)}
          className="mt-8 flex items-center justify-between border-t border-brand-ivory/15 pt-4 text-brand-ivory/55 sm:mt-16 sm:pt-5"
        >
          <p className="eyebrow whitespace-nowrap">
            Est. {site.founded}
            <span className="hidden sm:inline"> · {site.address.line1}</span>
          </p>
          <ol className="flex items-center gap-1.5 sm:gap-3" aria-label="Hero films">
            {heroVideos.map((_, i) => (
              <li key={i} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group -my-2 flex min-h-11 items-center px-1.5 focus:outline-none"
                  aria-label={`Switch to film ${i + 1}`}
                >
                  <span
                    className={cn(
                      'block h-px transition-all duration-700',
                      i === active ? 'w-6 sm:w-10 bg-brand-gold' : 'w-3 sm:w-5 bg-brand-ivory/30 group-hover:bg-brand-ivory/70'
                    )}
                  />
                </button>
              </li>
            ))}
            <li className="eyebrow ml-1 whitespace-nowrap tabular-nums text-xs sm:text-sm">
              0{active + 1} / 0{heroVideos.length}
            </li>
          </ol>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        {...fade(1.9)}
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-brand-ivory/50 lg:flex"
      >
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-brand-gold to-transparent"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  )
}
