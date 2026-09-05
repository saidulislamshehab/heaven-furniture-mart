import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { luxuryEase } from '@/components/common/Reveal'

const KEY = 'hfm-intro-seen'

export function useIntroDone() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem(KEY) === '1' || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const markDone = useCallback(() => setDone(true), [])
  return [done, markDone] as const
}

interface IntroLoaderProps {
  show: boolean
  onDone: () => void
}

/** Short cinematic entrance: wordmark rises, a hairline draws, then the curtain lifts. Plays once per session. */
export function IntroLoader({ show, onDone }: IntroLoaderProps) {
  const reduce = useReducedMotion()
  const [exit, setExit] = useState(false)

  useEffect(() => {
    if (!show) return
    if (reduce) {
      onDone()
      return
    }
    document.documentElement.style.overflow = 'hidden'
    const t1 = window.setTimeout(() => setExit(true), 1650)
    const t2 = window.setTimeout(() => {
      sessionStorage.setItem(KEY, '1')
      document.documentElement.style.overflow = ''
      onDone()
    }, 2450)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      document.documentElement.style.overflow = ''
    }
  }, [show, reduce, onDone])

  const letters = 'HEAVEN'.split('')

  return (
    <AnimatePresence>
      {show && !exit && (
        <motion.div
          key="intro"
          role="status"
          aria-label="Heaven Furniture Mart"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-ink text-brand-ivory"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          <div className="flex items-baseline gap-[0.08em] overflow-hidden font-serif text-[clamp(3rem,12vw,9rem)] leading-none tracking-[0.12em]">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: luxuryEase }}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <motion.span
            aria-hidden
            className="mt-5 h-px w-40 origin-left bg-brand-gold sm:w-56"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: luxuryEase }}
          />
          <motion.p
            className="eyebrow mt-4 text-brand-gold-soft"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: luxuryEase }}
          >
            Furniture Mart · Chattogram
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
