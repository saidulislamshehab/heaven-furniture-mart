import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

/**
 * Minimal brand title card on warm ivory: HEAVEN reveals letter by letter, FURNITURE MART
 * settles beneath, the lockup holds, then the ivory panel lifts like a curtain to reveal the
 * ready hero. Plays on a fresh landing-page load; skipped on inner routes and for reduced motion.
 */

/* Timeline (seconds) */
const T = {
  heaven: 0.18,
  stagger: 0.065,
  letterDur: 0.7,
  mart: 1.05,
  hold: 1.85, // typography starts leaving
  curtain: 2.15, // panel lifts + hero choreography begins
  curtainDur: 0.85,
  end: 3.0, // overlay removed
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const
const letters = 'HEAVEN'.split('')

export function useIntroDone() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    const onLanding = window.location.pathname === '/'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !onLanding || reduce
  })
  const markDone = useCallback(() => setDone(true), [])
  return [done, markDone] as const
}

interface IntroLoaderProps {
  show: boolean
  /** Fires as the curtain begins lifting, so the hero animates in as it's revealed. */
  onDone: () => void
}

export function IntroLoader({ show, onDone }: IntroLoaderProps) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'play' | 'gone'>('play')

  useEffect(() => {
    if (!show) return
    if (reduce) {
      onDone()
      return
    }
    document.documentElement.style.overflow = 'hidden'
    const timers = [
      window.setTimeout(onDone, T.curtain * 1000),
      window.setTimeout(() => {
        document.documentElement.style.overflow = ''
        setPhase('gone')
      }, T.end * 1000),
    ]
    return () => {
      timers.forEach(window.clearTimeout)
      document.documentElement.style.overflow = ''
    }
  }, [show, reduce, onDone])

  return (
    <AnimatePresence>
      {show && phase === 'play' && (
        <motion.div
          key="intro"
          role="status"
          aria-label="Heaven Furniture Mart"
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          {/* Ivory curtain (holds the lockup, then lifts to reveal the hero) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-brand-ivory text-brand-teal-deep"
            initial={{ y: '0%' }}
            animate={{ y: ['0%', '0%', '-100%'] }}
            transition={{
              duration: T.curtain + T.curtainDur,
              times: [0, T.curtain / (T.curtain + T.curtainDur), 1],
              ease: CURTAIN_EASE,
            }}
          >
            {/* Lockup fades + lifts slightly just before the curtain rises */}
            <motion.div
              className="flex flex-col items-center px-6"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: [1, 1, 0], y: [0, 0, -18] }}
              transition={{ duration: T.curtain, times: [0, T.hold / T.curtain, 1], ease: REVEAL_EASE }}
            >
              <span className="sr-only">Heaven Furniture Mart</span>

              {/* HEAVEN — masked, staggered letter rise with a subtle spacing settle */}
              <motion.span
                aria-hidden
                className="flex overflow-hidden pb-[0.1em] font-serif leading-[0.85]"
                style={{ fontSize: 'clamp(3.5rem, 15vw, 12rem)' }}
                initial={{ letterSpacing: '0.2em' }}
                animate={{ letterSpacing: '0.1em' }}
                transition={{ duration: 1.1, delay: T.heaven + 0.2, ease: REVEAL_EASE }}
              >
                {letters.map((l, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: T.letterDur, delay: T.heaven + i * T.stagger, ease: REVEAL_EASE }}
                    >
                      {l}
                    </motion.span>
                  </span>
                ))}
              </motion.span>

              {/* FURNITURE MART — quiet descriptor */}
              <motion.span
                aria-hidden
                className="mt-4 font-sans text-[0.7rem] font-semibold uppercase text-brand-teal-deep/70 sm:mt-6 sm:text-sm"
                style={{ letterSpacing: '0.42em' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: T.mart, ease: REVEAL_EASE }}
              >
                Furniture&nbsp;Mart
              </motion.span>
            </motion.div>

            {/* Hairline curtain edge, revealed only as the panel lifts */}
            <motion.span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: T.curtain + 0.1, times: [0, T.curtain / (T.curtain + 0.1), 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
