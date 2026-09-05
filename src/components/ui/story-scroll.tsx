import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export interface FlowSectionProps {
  className?: string
  children: ReactNode
  'aria-label'?: string
}

/** One viewport-wide panel in a horizontal StoryScroll track. Stacks vertically below `lg`. */
export function FlowSection({ className, children, 'aria-label': ariaLabel }: FlowSectionProps) {
  return (
    <section
      data-flow-section
      aria-label={ariaLabel}
      className={cn('relative w-full shrink-0 lg:h-screen lg:w-screen', className)}
    >
      {children}
    </section>
  )
}

export interface StoryScrollProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
  /** Called with 0–1 progress as the track moves (desktop only). */
  onProgress?: (p: number) => void
  /** Rendered above the track and pinned with it (e.g. a progress readout). */
  overlay?: ReactNode
}

/**
 * Pins the viewport and translates a row of panels from left to right as the user scrolls.
 * Below `lg` and for reduced-motion users the panels simply stack vertically.
 */
export default function StoryScroll({ children, className, 'aria-label': ariaLabel = 'Story', onProgress, overlay }: StoryScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [reduce, setReduce] = useState(false)
  const onProgressRef = useRef(onProgress)
  useEffect(() => {
    onProgressRef.current = onProgress
  }, [onProgress])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Plain effect (not layout effect) so pins in earlier sections exist before this one measures.
  useEffect(() => {
    if (!ref.current || !trackRef.current || reduce) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current!
        const distance = () => track.scrollWidth - window.innerWidth
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            onUpdate: (self) => onProgressRef.current?.(self.progress),
          },
        })
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })
      return () => mm.revert()
    }, ref)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [reduce])

  return (
    <div ref={ref} role="region" aria-label={ariaLabel} className={cn('relative w-full overflow-hidden', className)}>
      <div ref={trackRef} className="flex w-full flex-col will-change-transform lg:h-screen lg:w-max lg:flex-row">
        {children}
      </div>
      {overlay}
    </div>
  )
}
