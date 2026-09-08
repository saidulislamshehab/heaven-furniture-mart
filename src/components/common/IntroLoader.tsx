import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion, stagger, useAnimate, useReducedMotion } from 'motion/react'

/**
 * Minimal brand title card on warm ivory: HEA slides in from the left and VEN from the right,
 * meeting at centre; FURNITURE MART rises from beneath, the lockup holds, then the ivory panel
 * lifts like a curtain to reveal the page. Plays once, only when the visit starts on the landing
 * page; inner pages (Shop / About / Visit) opened directly render immediately.
 *
 * One master sequence drives every step; `onDone` fires only when the curtain has fully left,
 * so the hero entrance never overlaps the intro.
 */

/* Master timeline (seconds from start) */
const T = {
  heaven: 0.25, // halves start converging (ivory alone before this)
  stagger: 0.14, // each letter follows the previous one; inner letters lead so none overtake
  letterDur: 1.1, // last letter (H / N) lands ≈ 1.65
  mart: 1.7, // FURNITURE MART converges the same way once HEAVEN has settled
  martStagger: 0.05,
  martDur: 0.9, // last letter lands ≈ 2.9
  exit: 3.4, // hold 2.9 → 3.4, then the lockup lifts and the curtain rises
  lockupDur: 0.45,
  curtainDur: 0.8, // curtain fully gone ≈ 4.2 → hero begins
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const
const SLIDE_EASE = [0.4, 0, 0.15, 1] as const // soft start, long glide into place
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const
const letters = 'HEAVEN'.split('')
const LEFT_COUNT = 3 // H E A from the left, V E N from the right
const martLetters = 'FURNITURE MART'.split('')
const MART_LEFT_COUNT = 7 // "FURNITU" from the left, "RE MART" from the right

/** Landing page only, once per full page load; inner pages and client-side route changes never arm it. */
export function useIntroDone() {
  const { pathname } = useLocation()
  const [done, setDone] = useState(() => pathname !== '/')
  const markDone = useCallback(() => setDone(true), [])
  useEffect(() => {
    if (done) document.getElementById('intro-premark')?.remove()
  }, [done])
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
    // The static caption painted by index.html has done its job once the curtain is on screen.
    document.getElementById('intro-premark')?.remove()

    const controls = reduce
      ? // Reduced motion: completed lockup, brief hold, quiet fade — no long trap.
        animate([['[data-curtain]', { opacity: 0 }, { duration: 0.35, at: 1.1 }]])
      : animate([
          [
            '[data-letter="left"]',
            { transform: [`translateX(${-travel}px)`, 'translateX(0px)'], opacity: [0, 1] },
            { duration: T.letterDur, ease: SLIDE_EASE, delay: stagger(T.stagger, { from: 'last' }), at: T.heaven },
          ],
          [
            '[data-letter="right"]',
            { transform: [`translateX(${travel}px)`, 'translateX(0px)'], opacity: [0, 1] },
            { duration: T.letterDur, ease: SLIDE_EASE, delay: stagger(T.stagger), at: T.heaven },
          ],
          [
            '[data-heaven]',
            { letterSpacing: ['0.02em', typeof window !== 'undefined' && window.innerWidth < 640 ? '-0.03em' : '-0.02em'] },
            { duration: 1.1, ease: REVEAL_EASE, at: T.heaven + 0.3 },
          ],
          [
            '[data-mart-letter="left"]',
            { transform: [`translateX(${-travel}px)`, 'translateX(0px)'], opacity: [0, 1] },
            { duration: T.martDur, ease: SLIDE_EASE, delay: stagger(T.martStagger, { from: 'last' }), at: T.mart },
          ],
          [
            '[data-mart-letter="right"]',
            { transform: [`translateX(${travel}px)`, 'translateX(0px)'], opacity: [0, 1] },
            { duration: T.martDur, ease: SLIDE_EASE, delay: stagger(T.martStagger), at: T.mart },
          ],
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

              {/* HEAVEN — heavy grotesque wordmark; two halves converge from the viewport edges, then the spacing settles */}
              <span
                data-heaven
                aria-hidden
                className="flex pb-[0.08em] font-wordmark leading-[0.9]"
                style={{
                  fontSize: 'clamp(3rem, 17vw, 14rem)',
                  letterSpacing: reduce ? '-0.01em' : '0.03em',
                  // letter-spacing trails the last glyph; pad the left by the same amount so the word is centred
                  paddingLeft: reduce ? undefined : '0.03em',
                }}
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

              {/* FURNITURE MART — same converge as HEAVEN, cued once HEAVEN has landed */}
              <span
                aria-hidden
                className="mt-4 flex font-mono text-[1rem] font-medium uppercase text-brand-teal-deep/75 sm:mt-6 sm:text-[1.35rem] lg:text-[1.6rem]"
                style={{ letterSpacing: 'clamp(0.2em, 1.6vw, 0.45em)', paddingLeft: 'clamp(0.2em, 1.6vw, 0.45em)' }}
              >
                {martLetters.map((l, i) => {
                  const side = i < MART_LEFT_COUNT ? 'left' : 'right'
                  return (
                    <span
                      key={i}
                      data-mart-letter={side}
                      className="inline-block will-change-transform"
                      style={reduce ? undefined : { transform: `translateX(${side === 'left' ? -travel : travel}px)`, opacity: 0 }}
                    >
                      {l === ' ' ? '\u00A0' : l}
                    </span>
                  )
                })}
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
