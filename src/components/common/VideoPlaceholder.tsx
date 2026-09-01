import type { HTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'

interface VideoPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  videoSrc?: string
  showBadge?: boolean
}

export function VideoPlaceholder({
  title = 'CINEMATIC FURNITURE SHOWROOM FILM',
  subtitle = '4K Master Reel — Warm Ambient Lighting, Solid Wood Joinery & Luxury Velvet Living Suites',
  videoSrc,
  showBadge = false,
  className,
  children,
  ...props
}: VideoPlaceholderProps) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-[#151D1C]',
        className
      )}
      {...props}
    >
      {/* If a real video source is provided */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
        />
      ) : (
        /* Cinematic Warm Luxury Interior Showroom Atmosphere */
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Base Warm Golden Interior Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C2524] via-[#2A231A]/90 to-[#121918]" />

          {/* Warm Sunlit Ambient Glow simulating high-end chandelier and floor lighting */}
          <motion.div
            animate={{
              opacity: [0.35, 0.5, 0.35],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-[750px] w-[1100px] rounded-full bg-gradient-to-b from-[#C49A4E]/25 via-[#9E7332]/15 to-transparent blur-[140px]"
          />

          {/* Warm Floor Rug Golden Light Reflection */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[1200px] rounded-full bg-[#B08A45]/12 blur-[100px]" />

          {/* Subtle Classical Architectural Wall Molding Lines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(#C49A4E_1px,transparent_1px)] [background-size:28px_28px]" />

          {/* Architectural Framing Outline */}
          <div className="pointer-events-none absolute inset-12 border border-[#C49A4E]/10 rounded-sm hidden md:block" />

          {/* Optional Center Video Reel Badge */}
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative z-10 flex flex-col items-center gap-3 text-center px-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B08A45]/50 bg-[#1F2E2D]/80 backdrop-blur-md shadow-2xl">
                <Play className="h-5 w-5 fill-[#B08A45] text-[#B08A45] translate-x-0.5" />
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-semibold tracking-[0.3em] text-[#B08A45] uppercase">
                  [ 4K Video Background Channel ]
                </span>
                <p className="font-serif text-sm tracking-wide text-stone-200">
                  {title}
                </p>
                <p className="max-w-md font-sans text-xs tracking-wider text-stone-400">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Refined Cinematic Vignette Overlay — preserves center clarity while gently framing edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(18,25,24,0.45)_75%,rgba(14,20,19,0.85)_100%)]" />

      {/* Subtle Top Gradient for Navigation Legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

      {/* Subtle Bottom Gradient for Hero-to-Manifesto Smooth Transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#141F1E] via-[#141F1E]/40 to-transparent" />

      {children}
    </div>
  )
}
