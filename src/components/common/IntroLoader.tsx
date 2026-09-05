import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { luxuryEase } from '@/components/common/Reveal'
import { site } from '@/data/site'

/**
 * Timeline (seconds). Three acts:
 *   I   Text in   — wordmark rises letter by letter, brand words cycle, counter runs.
 *   II  Text out  — letters lift away and blur, chrome fades.
 *   III Curtain   — the ink screen wipes upward (bottom → top) revealing the live hero,
 *                  with a thin gold edge trailing the wipe.
 */
const T = {
  textIn: 0.2,
  wordsCycle: [0.9, 1.4], // when brand word 2 and 3 appear
  textOut: 1.9,
  curtain: 2.45,
  curtainDur: 1.15,
  handoff: 2.85, // hero choreography starts while the curtain is still rising
  end: 3.7,
}

export function useIntroDone() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const markDone = useCallback(() => setDone(true), [])
  return [done, markDone] as const
}

interface IntroLoaderProps {
  show: boolean
  onDone: () => void
}

const brandWords = site.tagline.split('. ').map((w) => w.replace(/\.$/, ''))
const letters = 'HEAVEN'.split('')

function Counter({ duration, delay }: { duration: number; delay: number }) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => String(Math.round(v)).padStart(3, '0'))
  useEffect(() => {
    const ctrl = animate(mv, 100, { duration, delay, ease: [0.4, 0, 0.2, 1] })
    return () => ctrl.stop()
  }, [mv, duration, delay])
  return (
    <span className="flex items-start gap-1 font-serif text-4xl leading-none tabular-nums sm:text-5xl">
      <motion.span>{text}</motion.span>
      <span className="mt-1 text-sm text-brand-gold">%</span>
    </span>
  )
}

export function IntroLoader({ show, onDone }: IntroLoaderProps) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'play' | 'exit'>('play')
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (!show) return
    if (reduce) {
      onDone()
      return
    }
    document.documentElement.style.overflow = 'hidden'
    const timers = [
      window.setTimeout(() => setWordIndex(1), T.wordsCycle[0] * 1000),
      window.setTimeout(() => setWordIndex(2), T.wordsCycle[1] * 1000),
      window.setTimeout(() => onDone(), T.handoff * 1000),
      window.setTimeout(() => setPhase('exit'), T.end * 1000),
    ]
    return () => {
      timers.forEach(window.clearTimeout)
      document.documentElement.style.overflow = ''
    }
  }, [show, reduce, onDone])

  useEffect(() => {
    if (phase === 'exit') document.documentElement.style.overflow = ''
  }, [phase])

  const curtainEase = [0.76, 0, 0.24, 1] as const

  return (
    <AnimatePresence>
      {show && phase === 'play' && (
        <motion.div
          key="intro"
          role="status"
          aria-label="Loading Heaven Furniture Mart"
          className="fixed inset-0 z-[100] overflow-hidden text-brand-ivory"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ACT III — ink curtain rises bottom → top */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-brand-ink"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: T.curtainDur, delay: T.curtain, ease: curtainEase }}
          >
            {/* Subtle warm vignette so the ink screen isn't flat */}
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,138,69,0.14),transparent_60%)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1.1, 1.2] }}
              transition={{ duration: T.curtain, times: [0, 0.3, 0.8, 1], ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Gold edge trailing the curtain */}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-brand-gold shadow-[0_0_24px_2px_rgba(176,138,69,0.45)]"
            initial={{ y: '0%', opacity: 0 }}
            animate={{ y: ['0%', '0%', '-100vh'], opacity: [0, 1, 1] }}
            transition={{ duration: T.curtainDur + 0.05, delay: T.curtain - 0.05, times: [0, 0.04, 1], ease: curtainEase }}
          />

          {/* Chrome: brand eyebrow + counter, fades during Act II */}
          <motion.div
            className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: T.curtain, times: [0, 0.15, 0.85, 1] }}
          >
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-brand-ivory/80">{site.name}</span>
              <span className="eyebrow text-brand-ivory/40">
                {site.address.city} · Est. {site.founded}
              </span>
            </div>
            <Counter duration={T.textOut - T.textIn} delay={T.textIn} />
          </motion.div>

          {/* ACT I / II — wordmark in, then out */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="flex overflow-hidden px-[0.05em] pb-[0.08em] font-serif leading-[0.9] tracking-[0.1em]"
              style={{ fontSize: 'clamp(3.75rem, 15vw, 12rem)' }}
              initial={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              animate={{ opacity: 0, filter: 'blur(10px)', scale: 1.04 }}
              transition={{ duration: 0.7, delay: T.textOut + 0.1, ease: [0.7, 0, 0.84, 0] }}
            >
              {letters.map((l, i) => {
                const inStart = T.textIn + i * 0.06
                const outStart = T.textOut + i * 0.04
                const total = outStart + 0.8 - inStart
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: '115%' }}
                    animate={{ y: ['115%', '0%', '0%', '-120%'] }}
                    transition={{
                      duration: total,
                      delay: inStart,
                      times: [0, 1.05 / total, (outStart - inStart) / total, 1],
                      ease: luxuryEase,
                    }}
                  >
                    {l}
                  </motion.span>
                )
              })}
            </motion.div>

            {/* Rule + rotating brand word */}
            <motion.div
              className="absolute flex flex-col items-center gap-4"
              style={{ top: 'calc(50% + clamp(2.75rem, 9vw, 7.5rem))' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -14] }}
              transition={{ duration: T.textOut + 0.5, times: [0, 0.35, 0.84, 1], ease: 'easeInOut' }}
            >
              <motion.span
                aria-hidden
                className="block h-px w-24 bg-brand-gold sm:w-32"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: T.textIn + 0.5, ease: luxuryEase }}
              />
              <div className="h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="eyebrow block text-brand-gold-soft"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.45, ease: luxuryEase }}
                  >
                    {brandWords[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Progress hairline along the bottom */}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, opacity: [1, 1, 0] }}
            transition={{
              scaleX: { duration: T.curtain - T.textIn, delay: T.textIn, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: T.curtain + 0.1, times: [0, 0.94, 1] },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
