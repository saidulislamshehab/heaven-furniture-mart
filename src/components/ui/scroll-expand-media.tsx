import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SmartVideo } from '@/components/common/SmartVideo'
import type { VideoAsset } from '@/data/assets'
import { MD_UP, REDUCED_MOTION, useMediaQuery } from '@/lib/useMediaQuery'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollExpandMediaProps {
  media: VideoAsset
  /** Two-part title; halves slide apart as the media grows. */
  title: [string, string]
  eyebrow?: string
  scrollHint?: string
  /**
   * Revealed once the media is full-bleed; children may use `data-reveal` for staggered entry.
   * A render function receives `pinned` so consumers can swap in scroll-reveals for the in-flow layout.
   */
  children?: ReactNode | ((ctx: { pinned: boolean }) => ReactNode)
  /** Scroll distance of the whole sequence, in viewport heights. */
  lengthVh?: number
  /** Light (ivory) or dark (ink) surface around the small frame. */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Pinned sequence (tablet and up): a small framed film grows to fill the viewport while the title
 * splits outward; once full, the overlay content reveals item by item. Scroll-scrubbed, reversible.
 * On phones and for reduced-motion users it becomes a vertical composition: a full-bleed media
 * header carrying the title, followed by the content in normal flow — no pinning, no scroll hijack.
 */
export default function ScrollExpandMedia({
  media,
  title,
  eyebrow,
  scrollHint = 'Scroll to expand',
  children,
  lengthVh = 260,
  tone = 'dark',
  className,
}: ScrollExpandMediaProps) {
  const root = useRef<HTMLDivElement>(null)
  const reduce = useMediaQuery(REDUCED_MOTION)
  const mdUp = useMediaQuery(MD_UP)
  const pinned = mdUp && !reduce

  useEffect(() => {
    if (!root.current || !pinned) return
    const ctx = gsap.context(() => {
      const el = root.current!
      const frame = el.querySelector<HTMLElement>('[data-frame]')
      const shade = el.querySelector<HTMLElement>('[data-shade]')
      const left = el.querySelector<HTMLElement>('[data-title-left]')
      const right = el.querySelector<HTMLElement>('[data-title-right]')
      const hint = el.querySelector<HTMLElement>('[data-hint]')
      const eyebrowEl = el.querySelector<HTMLElement>('[data-eyebrow]')
      const content = el.querySelector<HTMLElement>('[data-content]')
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]', el)
      if (!frame || !left || !right || !content) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${(lengthVh / 100) * window.innerHeight}`,
          pin: true,
          scrub: 1.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -2,
        },
        defaults: { ease: 'none' },
      })

      // Act I — expand (0 → 1)
      const startW = () => Math.min(window.innerWidth * 0.34, 420)
      const startH = () => Math.min(window.innerHeight * 0.5, 520)
      tl.fromTo(
        frame,
        { width: startW, height: startH },
        { width: () => window.innerWidth, height: () => window.innerHeight, duration: 1, ease: 'power1.inOut' },
        0
      )
        .fromTo(shade, { opacity: 0.35 }, { opacity: 0.6, duration: 1 }, 0)
        .to(left, { xPercent: -60, opacity: 0, duration: 0.9, ease: 'power1.in' }, 0.05)
        .to(right, { xPercent: 60, opacity: 0, duration: 0.9, ease: 'power1.in' }, 0.05)
        .to(hint, { opacity: 0, duration: 0.3 }, 0)
        .to(eyebrowEl, { opacity: 0, duration: 0.3 }, 0.2)

      // Act II — reveal content (1 → 2)
      tl.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1)
      reveals.forEach((node, i) => {
        tl.fromTo(node, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.05 + i * 0.14)
        const line = node.querySelector<HTMLElement>('[data-line]')
        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, 1.1 + i * 0.14)
      })
      // Hold at the end so the finished composition sits for a beat
      tl.to({}, { duration: 0.4 })
    }, root)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [pinned, lengthVh])

  const light = tone === 'light'
  const surface = light ? 'bg-brand-ivory text-brand-brown' : 'bg-brand-ink text-brand-ivory'
  const content = typeof children === 'function' ? children({ pinned }) : children

  if (!pinned) {
    return (
      <div ref={root} className={cn('relative w-full bg-brand-ink text-brand-ivory', className)}>
        {/* Media header with the title resting on it */}
        <div className="relative flex min-h-[62svh] w-full items-end overflow-hidden bg-brand-teal">
          <div className="absolute inset-0">
            <SmartVideo asset={media} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/45 to-brand-ink/20" />
          <div className="container-x relative z-10 mx-auto w-full max-w-[1600px] pt-28 pb-10 text-center">
            {eyebrow && <p className="eyebrow text-brand-gold">{eyebrow}</p>}
            <h2 className="mt-4 font-serif text-[length:clamp(2.5rem,10vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
              {title[0]} <span className="italic text-brand-ivory/85">{title[1]}</span>
            </h2>
          </div>
        </div>
        {/* Content in normal flow — scrolls naturally */}
        <div data-content className="relative">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div ref={root} className={cn('relative w-full', surface, className)}>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Media frame */}
        <div
          data-frame
          className="relative z-0 overflow-hidden bg-brand-teal shadow-[0_40px_120px_-30px_rgba(13,20,19,0.9)]"
          style={{ width: 'min(34vw, 420px)', height: 'min(50vh, 520px)' }}
        >
          <SmartVideo asset={media} lazy={false} />
          <div data-shade className="absolute inset-0 bg-brand-ink" style={{ opacity: 0.35 }} />
        </div>

        {/* Split title */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
          {eyebrow && (
            <p data-eyebrow className="eyebrow text-brand-gold">
              {eyebrow}
            </p>
          )}
          <h2 className="flex flex-wrap items-baseline justify-center gap-x-[0.3em] font-serif text-[length:clamp(2.75rem,7.5vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
            <span data-title-left className="block">
              {title[0]}
            </span>
            <span data-title-right className={cn('block italic', light ? 'text-brand-brown/75' : 'text-brand-ivory/85')}>
              {title[1]}
            </span>
          </h2>
          <p data-hint className={cn('eyebrow mt-4', light ? 'text-brand-stone' : 'text-brand-ivory/60')}>
            {scrollHint}
          </p>
        </div>

        {/* Overlay content */}
        <div data-content className="absolute inset-0 z-20 opacity-0">
          {content}
        </div>
      </div>
    </div>
  )
}
