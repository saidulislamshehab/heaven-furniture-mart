import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConsultation } from '@/components/common/ConsultationProvider'
import { luxuryEase } from '@/components/common/Reveal'
import { heroVideos } from '@/data/assets'
import { site } from '@/data/site'
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

/** Plays the hero films in sequence with a slow cross-fade; a single loop on small screens to save data. */
function HeroFilm({ active, onAdvance }: { active: number; onAdvance: () => void }) {
  const still = useStillMedia()
  const [single] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches)
  const refs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    if (still) return
    refs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else if (!v.paused) {
        v.pause()
      }
    })
  }, [active, still])

  if (still) {
    return <img src={heroVideos[0].poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
  }

  const list = single ? heroVideos.slice(0, 1) : heroVideos

  return (
    <>
      {list.map((v, i) => (
        <video
          key={v.src}
          ref={(el) => {
            refs.current[i] = el
          }}
          src={v.src}
          poster={i === 0 ? v.poster : undefined}
          muted
          playsInline
          autoPlay={i === 0}
          loop={single}
          preload={i === 0 ? 'auto' : i === (active + 1) % list.length ? 'auto' : 'none'}
          onEnded={single ? undefined : onAdvance}
          aria-hidden
          tabIndex={-1}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[var(--ease-luxury)]',
            i === active ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}
    </>
  )
}

/** Per-letter rise with a soft blur settle. `ready` gates the start so it lands after the intro hand-off. */
function Letters({ text, ready, delay, className }: { text: string; ready: boolean; delay: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <span className={cn('inline-flex overflow-hidden pb-[0.06em] -mb-[0.06em]', className)} aria-hidden>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={reduce ? false : { y: '110%', opacity: 0, filter: 'blur(6px)' }}
          animate={ready ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
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
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
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
        className="container-x mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end pt-32 pb-10 sm:pb-14"
      >
        <motion.p {...fade(0.1)} className="eyebrow flex items-center gap-3 text-brand-gold-soft">
          <motion.span
            aria-hidden
            className="h-px w-8 origin-left bg-current"
            initial={reduce ? false : { scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: luxuryEase }}
          />
          Bespoke furniture &amp; interior styling · {site.address.city}
        </motion.p>

        {/* Layered headline: massive sans line + italic serif line, like a film title card */}
        <h1 className="mt-6 text-balance" aria-label="Furniture, crafted around you.">
          <span className="block font-sans text-[length:clamp(2.9rem,9.6vw,9.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-brand-ivory">
            <Letters text="Furniture," ready={ready} delay={0.2} />
          </span>
          <span className="mt-1 flex flex-wrap items-baseline gap-x-[0.25em] sm:mt-2">
            <span className="font-serif text-[length:clamp(2.4rem,7.4vw,7.25rem)] font-light italic leading-[0.95] tracking-[-0.015em] text-brand-ivory/90">
              <Letters text="crafted around" ready={ready} delay={0.5} />
            </span>
            <span className="font-serif text-[length:clamp(2.4rem,7.4vw,7.25rem)] font-light italic leading-[0.95] tracking-[-0.015em] text-brand-gold-soft">
              <Letters text="you." ready={ready} delay={0.95} />
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p {...fade(1.15)} className="max-w-md text-[1.05rem] leading-relaxed text-brand-ivory/80 sm:text-lg">
            Premium bespoke furniture and interior styling from Chattogram — designed around your
            space, your taste and the way you live.
          </motion.p>

          <motion.div {...fade(1.3)} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button variant="gold" size="pill" onClick={() => open()}>
              Request a Consultation <ArrowUpRight />
            </Button>
            <button
              type="button"
              onClick={() => scrollToHash('#craft')}
              className="group eyebrow inline-flex items-center gap-2 self-start py-2 text-brand-ivory/80 transition-colors hover:text-brand-ivory sm:self-auto"
            >
              Explore our craft
              <ArrowDown className="size-3.5 transition-transform duration-500 group-hover:translate-y-1" />
            </button>
          </motion.div>
        </div>

        <motion.div
          {...fade(1.5)}
          className="mt-12 flex items-center justify-between border-t border-brand-ivory/15 pt-5 text-brand-ivory/55 sm:mt-16"
        >
          <p className="eyebrow whitespace-nowrap">
            Est. {site.founded}
            <span className="hidden sm:inline"> · {site.address.line1}</span>
          </p>
          <ol className="hidden items-center gap-3 md:flex" aria-label="Hero films">
            {heroVideos.map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex items-center py-2 focus:outline-none"
                  aria-label={`Switch to film ${i + 1}`}
                >
                  <span
                    className={cn(
                      'block h-px transition-all duration-700',
                      i === active ? 'w-10 bg-brand-gold' : 'w-5 bg-brand-ivory/30 group-hover:bg-brand-ivory/70'
                    )}
                  />
                </button>
              </li>
            ))}
            <li className="eyebrow ml-1 tabular-nums">
              0{active + 1} / 0{heroVideos.length}
            </li>
          </ol>
          <p className="eyebrow md:hidden">{site.tagline}</p>
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
