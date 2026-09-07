import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, stagger, useAnimate, useReducedMotion } from 'motion/react'

/**
 * Minimal brand title card on warm ivory: HEA slides in from the left and VEN from the right,
 * meeting at centre; FURNITURE MART rises from beneath, the lockup holds, then the ivory panel
 * lifts like a curtain to reveal the ready hero. Plays on a fresh landing-page load; skipped on
 * inner routes.
 *
 * One master sequence drives every step; `onDone` fires only when the curtain has fully left,
 * so the hero entrance never overlaps the intro.
 */

/* Master timeline (seconds from start) */
const T = {
  heaven: 0.25, // halves start converging (ivory alone before this)
  stagger: 0.04, // outer letters lead, inner letters trail
  letterDur: 1.1, // last letter lands ≈ 1.5
  mart: 1.35, // FURNITURE MART rises
  martDur: 0.7, // …and is fully settled ≈ 2.05
  exit: 2.6, // hold 2.05 → 2.6, then the lockup lifts and the curtain rises
  lockupDur: 0.45,
  curtainDur: 0.8, // curtain fully gone ≈ 3.4 → hero begins
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const
const SLIDE_EASE = [0.4, 0, 0.15, 1] as const // soft start, long glide into place
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const
const letters = 'HEAVEN'.split('')
const LEFT_COUNT = 3 // H E A from the left, V E N from the right

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
  // Each half travels 60% of the viewport width; px because motion can't interpolate vw on transforms
  const [travel] = useState(() => (typeof window === 'undefined' ? 800 : Math.round(window.innerWidth * 0.6)))

  useEffect(() => {
    if (!show) return
    document.documentElement.style.overflow = 'hidden'

    const controls = reduce
      ? // Reduced motion: completed lockup, brief hold, quiet fade — no long trap.
        animate([['[data-curtain]', { opacity: 0 }, { duration: 0.35, at: 1.1 }]])
      : animate([
          [
            '[data-letter="left"]',
            { transform: [`translateX(${-travel}px)`, 'translateX(0px)'], opacity: [0, 1] },
            { duration: T.letterDur, ease: SLIDE_EASE, delay: stagger(T.stagger), at: T.heaven },
          ],
          [
            '[data-letter="right"]',
            { transform: [`translateX(${travel}px)`, 'translateX(0px)'], opacity: [0, 1] },
            { duration: T.letterDur, ease: SLIDE_EASE, delay: stagger(T.stagger, { from: 'last' }), at: T.heaven },
          ],
          [
            '[data-heaven]',
            { letterSpacing: ['0.14em', typeof window !== 'undefined' && window.innerWidth < 640 ? '0.04em' : '0.1em'] },
            { duration: 1.1, ease: REVEAL_EASE, at: T.heaven + 0.3 },
          ],
          ['[data-mart]', { transform: ['translateY(120%)', 'translateY(0%)'], opacity: [0, 1] }, { duration: T.martDur, ease: REVEAL_EASE, at: T.mart }],
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
  }, [show, reduce, animate, onDone, travel])

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
            <div data-lockup className="flex flex-col items-center px-4 sm:px-6">
              <span className="sr-only">Heaven Furniture Mart</span>

              {/* HEAVEN — two halves converge from the viewport edges, then the spacing settles */}
              <span
                data-heaven
                aria-hidden
                className="flex pb-[0.1em] font-serif leading-[0.85]"
                style={{ fontSize: 'clamp(2.25rem, 12vw, 12rem)', letterSpacing: reduce ? '0.04em' : '0.14em' }}
              >
                {letters.map((l, i) => {
                  const side = i < LEFT_COUNT ? 'left' : 'right'
                  return (
                    <span
                      key={i}
                      data-letter={side}
                      className="inline-block will-change-transform"
                      style={reduce ? undefined : { transform: `translateX(${side === 'left' ? -travel : travel}px)`, opacity: 0 }}
                    >
                      {l}
                    </span>
                  )
                })}
              </span>

              {/* FURNITURE MART — rises from beneath through a mask */}
              <span className="mt-4 overflow-hidden pb-px sm:mt-6">
                <span
                  data-mart
                  aria-hidden
                  className="block font-sans text-[0.68rem] font-semibold uppercase text-brand-teal-deep/70 sm:text-sm"
                  style={{
                    letterSpacing: 'clamp(0.2em, 2.8vw, 0.42em)',
                    opacity: reduce ? 1 : 0,
                    transform: reduce ? undefined : 'translateY(120%)',
                  }}
                >
                  Furniture&nbsp;Mart
                </span>
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
