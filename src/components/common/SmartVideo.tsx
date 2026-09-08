import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { videoSrcFor } from '@/lib/images'
import type { VideoAsset } from '@/data/assets'

interface SmartVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster'> {
  asset: VideoAsset
  /** Attach the source only once the element nears the viewport (default true). */
  lazy?: boolean
  /** Pause when scrolled out of view (default true). */
  pauseOffscreen?: boolean
  /** Optional callback when the media is ready to play. */
  onReady?: () => void
}

function prefersStill() {
  if (typeof window === 'undefined') return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
  return reduce || Boolean(nav.connection?.saveData)
}

/**
 * Ambient video that behaves: poster first, source attached near viewport,
 * paused off-screen, strictly muted, and rendered as a still image for reduced-motion / data-saver users.
 */
export function SmartVideo({
  asset,
  lazy = true,
  pauseOffscreen = true,
  autoPlay = true,
  muted = true,
  className,
  onReady,
  ...rest
}: SmartVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [still] = useState(prefersStill)
  const [attached, setAttached] = useState(!lazy)

  useEffect(() => {
    const el = ref.current
    if (!el || still) return
    // Buffer half a viewport ahead so the film is ready before it appears without competing with the hero…
    const prefetch = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAttached(true)
          prefetch.disconnect()
        }
      },
      { rootMargin: '50% 0px' }
    )
    // …but only play/pause on actual visibility.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAttached(true)
          if (autoPlay) {
            el.play().catch(() => {})
          } else if (!el.paused) {
            // autoPlay flipped off while on screen (e.g. card sent to the back of a stack)
            el.pause()
          }
        } else if (pauseOffscreen && !el.paused) {
          el.pause()
        }
      },
      { rootMargin: '10% 0px' }
    )
    prefetch.observe(el)
    io.observe(el)
    return () => {
      prefetch.disconnect()
      io.disconnect()
    }
  }, [autoPlay, pauseOffscreen, still])

  if (still) {
    return (
      <img
        src={asset.poster}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }

  return (
    <video
      ref={ref}
      // Posters download eagerly regardless of `preload`, so gate them on proximity like the source.
      poster={attached ? asset.poster : undefined}
      src={attached ? videoSrcFor(asset.src) : undefined}
      muted={muted}
      playsInline
      loop
      autoPlay={autoPlay}
      preload={attached ? 'auto' : 'none'}
      onCanPlay={onReady}
      aria-hidden
      tabIndex={-1}
      className={cn('h-full w-full bg-brand-ink/10 object-cover', className)}
      {...rest}
    />
  )
}
