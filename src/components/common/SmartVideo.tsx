import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import type { VideoAsset } from '@/data/assets'

interface SmartVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster'> {
  asset: VideoAsset
  /** Attach the source only once the element nears the viewport (default true). */
  lazy?: boolean
  /** Pause when scrolled out of view (default true). */
  pauseOffscreen?: boolean
  /** Playback volume 0–1 when unmuted. */
  volume?: number
  /** Fires if the browser refuses unmuted autoplay; the video falls back to muted playback. */
  onAutoplayBlocked?: () => void
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
 * paused off-screen, and rendered as a still image for reduced-motion / data-saver users.
 */
export function SmartVideo({
  asset,
  lazy = true,
  pauseOffscreen = true,
  autoPlay = true,
  muted = true,
  volume,
  onAutoplayBlocked,
  className,
  onReady,
  ...rest
}: SmartVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [still] = useState(prefersStill)
  const [attached, setAttached] = useState(!lazy)

  useEffect(() => {
    const el = ref.current
    if (el && volume !== undefined) el.volume = volume
  }, [volume])

  useEffect(() => {
    const el = ref.current
    if (!el || still) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAttached(true)
          if (autoPlay) {
            el.play().catch(() => {
              if (el.muted) return
              el.muted = true
              el.play().catch(() => {})
              onAutoplayBlocked?.()
            })
          }
        } else if (pauseOffscreen && !el.paused) {
          el.pause()
        }
      },
      { rootMargin: '25% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [autoPlay, pauseOffscreen, still, onAutoplayBlocked])

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
      poster={asset.poster}
      src={attached ? asset.src : undefined}
      muted={muted}
      playsInline
      loop
      autoPlay={autoPlay}
      preload={attached ? 'auto' : 'none'}
      onCanPlay={onReady}
      aria-hidden
      tabIndex={-1}
      className={cn('h-full w-full object-cover', className)}
      {...rest}
    />
  )
}
