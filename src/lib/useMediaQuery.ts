import { useEffect, useState } from 'react'

/** Live `matchMedia` state; re-evaluates on resize/orientation and preference changes. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const MD_UP = '(min-width: 768px)'
export const LG_UP = '(min-width: 1024px)'
