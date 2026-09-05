import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
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

/** Plays the three hero films in sequence with a slow cross-fade; a single loop on small screens to save data. */
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

export function HeroSection({ introDone }: HeroSectionProps) {
  const { open } = useConsultation()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const ready = introDone

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.1, delay, ease: luxuryEase },
  })

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand-teal-deep text-brand-ivory">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.2, ease: luxuryEase }}
      >
        <HeroFilm active={active} onAdvance={() => setActive((a) => (a + 1) % heroVideos.length)} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/35 to-brand-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/50 via-transparent to-transparent" />
      </motion.div>

      <div className="container-x mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end pt-32 pb-10 sm:pb-14">
        <motion.p {...fade(0.15)} className="eyebrow text-brand-gold-soft">
          <span className="hidden sm:inline">Bespoke furniture &amp; interior styling · </span>
          <span className="sm:hidden">Bespoke furniture · </span>
          {site.address.city}
        </motion.p>

        <h1 className="mt-5 max-w-[14ch] display-1 text-balance">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduce ? false : { y: '105%' }}
              animate={ready ? { y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: luxuryEase }}
            >
              Furniture,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block italic text-brand-ivory/90"
              initial={reduce ? false : { y: '105%' }}
              animate={ready ? { y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.42, ease: luxuryEase }}
            >
              crafted around you.
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p {...fade(0.65)} className="max-w-md text-[1.05rem] leading-relaxed text-brand-ivory/80 sm:text-lg">
            Premium bespoke furniture and interior styling from Chattogram — designed around your
            space, your taste and the way you live.
          </motion.p>

          <motion.div {...fade(0.8)} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
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
          {...fade(1)}
          className="mt-12 flex items-center justify-between border-t border-brand-ivory/15 pt-5 text-brand-ivory/55 sm:mt-16"
        >
          <p className="eyebrow">
            Est. {site.founded}
            <span className="hidden sm:inline"> · {site.address.line1}</span>
          </p>
          <ol className="hidden items-center gap-3 md:flex" aria-label="Hero films">
            {heroVideos.map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className={cn(
                    'block h-px transition-all duration-700',
                    i === active ? 'w-10 bg-brand-gold' : 'w-5 bg-brand-ivory/30'
                  )}
                />
              </li>
            ))}
            <li className="eyebrow ml-1 tabular-nums">
              0{active + 1} / 0{heroVideos.length}
            </li>
          </ol>
          <p className="eyebrow md:hidden">{site.tagline}</p>
        </motion.div>
      </div>
    </section>
  )
}
