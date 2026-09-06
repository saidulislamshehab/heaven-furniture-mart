import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, stagger, useAnimate, useReducedMotion } from 'motion/react'

/**
 * Minimal brand title card on warm ivory: HEAVEN reveals letter by letter, FURNITURE MART
 * settles beneath, the lockup holds, then the ivory panel lifts like a curtain to reveal the
 * ready hero. Plays on a fresh landing-page load; skipped on inner routes.
 *
 * One master sequence drives every step; `onDone` fires only when the curtain has fully left,
 * so the hero entrance never overlaps the intro.
 */

/* Master timeline (seconds from start) */
const T = {
  heaven: 0.25, // first letter rises (ivory alone before this)
  stagger: 0.07,
  letterDur: 0.75, // last letter lands ≈ 1.35
  mart: 1.3, // FURNITURE MART enters
  martDur: 0.6, // …and is fully settled ≈ 1.9
  exit: 2.45, // hold 1.9 → 2.45, then the lockup lifts and the curtain rises
  lockupDur: 0.45,
  curtainDur: 0.8, // curtain fully gone ≈ 3.25 → hero begins
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const
const letters = 'HEAVEN'.split('')

export function useIntroDone() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.location.pathname !== '/'
  })
  const markDone = useCallback(() => setDone(true), [])
  return [done, markDone] as const
}

interface IntroLoaderProps {
  show: boolean
  /** Fires once the curtain has completely cleared the viewport. */
  onDone: () => void
}

export function IntroLoader({ show, onDone }: IntroLoaderProps) {
  const reduce = useReducedMotion()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!show) return
    document.documentElement.style.overflow = 'hidden'

    const controls = reduce
      ? // Reduced motion: completed lockup, brief hold, quiet fade — no long trap.
        animate([['[data-curtain]', { opacity: 0 }, { duration: 0.35, at: 1.1 }]])
      : animate([
          ['[data-letter]', { y: '0%' }, { duration: T.letterDur, ease: REVEAL_EASE, delay: stagger(T.stagger), at: T.heaven }],
          ['[data-heaven]', { letterSpacing: '0.1em' }, { duration: 1.1, ease: REVEAL_EASE, at: T.heaven + 0.2 }],
          ['[data-mart]', { opacity: 1, y: 0 }, { duration: T.martDur, ease: REVEAL_EASE, at: T.mart }],
          // — hold: nothing animates until T.exit —
          ['[data-lockup]', { opacity: 0, y: -18 }, { duration: T.lockupDur, ease: REVEAL_EASE, at: T.exit }],
          ['[data-edge]', { opacity: 1 }, { duration: 0.2, at: T.exit }],
          ['[data-curtain]', { y: '-100%' }, { duration: T.curtainDur, ease: CURTAIN_EASE, at: T.exit }],
        ])

    let finished = false
    controls.then(() => {
      finished = true
      document.documentElement.style.overflow = ''
      document.getElementById('intro-prepaint')?.remove()
      onDone()
    })
    return () => {
      if (!finished) controls.stop()
      document.documentElement.style.overflow = ''
      document.getElementById('intro-prepaint')?.remove()
    }
  }, [show, reduce, animate, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={scope}
          key="intro"
          role="status"
          aria-label="Heaven Furniture Mart"
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          {/* Ivory curtain (holds the lockup, then lifts to reveal the hero) */}
          <div
            data-curtain
            className="absolute inset-0 flex flex-col items-center justify-center bg-brand-ivory text-brand-teal-deep will-change-transform"
          >
            <div data-lockup className="flex flex-col items-center px-6">
              <span className="sr-only">Heaven Furniture Mart</span>

              {/* HEAVEN — masked, staggered letter rise with a subtle spacing settle */}
              <span
                data-heaven
                aria-hidden
                className="flex overflow-hidden pb-[0.1em] font-serif leading-[0.85]"
                style={{ fontSize: 'clamp(3.5rem, 15vw, 12rem)', letterSpacing: reduce ? '0.1em' : '0.2em' }}
              >
                {letters.map((l, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <span data-letter className="inline-block" style={{ transform: reduce ? undefined : 'translateY(115%)' }}>
                      {l}
                    </span>
                  </span>
                ))}
              </span>

              {/* FURNITURE MART — quiet descriptor */}
              <span
                data-mart
                aria-hidden
                className="mt-4 font-sans text-[0.7rem] font-semibold uppercase text-brand-teal-deep/70 sm:mt-6 sm:text-sm"
                style={{ letterSpacing: '0.42em', opacity: reduce ? 1 : 0, transform: reduce ? undefined : 'translateY(12px)' }}
              >
                Furniture&nbsp;Mart
              </span>
            </div>

            {/* Hairline curtain edge, revealed only as the panel lifts */}
            <span data-edge aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/60" style={{ opacity: 0 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
