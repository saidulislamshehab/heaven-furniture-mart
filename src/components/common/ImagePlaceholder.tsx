import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  label: string
  sublabel?: string
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'tall' | 'custom'
  aspectRatioClass?: string
  dimensions?: string
  accentNumber?: string
  darkTheme?: boolean
  className?: string
  id?: string
  onClick?: () => void
}

export function ImagePlaceholder({
  label,
  sublabel = 'Heaven Furniture Mart Archive',
  aspectRatio = 'landscape',
  aspectRatioClass,
  dimensions = 'Editorial Format',
  accentNumber,
  darkTheme = false,
  className,
  id,
  onClick,
}: ImagePlaceholderProps) {
  const getAspectClass = () => {
    if (aspectRatioClass) return aspectRatioClass
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[4/5]'
      case 'tall':
        return 'aspect-[3/5]'
      case 'square':
        return 'aspect-square'
      case 'wide':
        return 'aspect-[21/9]'
      case 'landscape':
      default:
        return 'aspect-[16/10]'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-sm border transition-all duration-700',
        getAspectClass(),
        darkTheme
          ? 'border-white/10 bg-[#172221] text-stone-200'
          : 'border-[#B08A45]/20 bg-[#EFE9DC] text-[#2B211C]',
        className
      )}
      id={id}
      onClick={onClick}
    >
      {/* Blueprint grid background */}
      <div className="blueprint-grid absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

      {/* Subtle vignette gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t transition-opacity duration-700',
          darkTheme
            ? 'from-[#121B1A]/80 via-transparent to-[#121B1A]/30'
            : 'from-[#DFD7C5]/70 via-transparent to-[#F5F1E8]/40'
        )}
      />

      {/* Luxury Brass Corner Markers */}
      <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[#B08A45]/60" />
      <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[#B08A45]/60" />
      <div className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#B08A45]/60" />
      <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#B08A45]/60" />

      {/* Top Metadata Header */}
      <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[11px] font-medium tracking-[0.2em] uppercase opacity-70">
        <span className="flex items-center gap-1.5 font-sans">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B08A45]" />
          {dimensions}
        </span>
        {accentNumber && (
          <span className="font-serif italic tracking-normal text-[#B08A45]">
            № {accentNumber}
          </span>
        )}
      </div>

      {/* Center Label Badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div
          className={cn(
            'flex flex-col items-center rounded-sm border px-6 py-4 backdrop-blur-md transition-transform duration-700 group-hover:scale-105',
            darkTheme
              ? 'border-white/15 bg-[#1F2E2D]/80 shadow-2xl'
              : 'border-[#B08A45]/25 bg-[#F5F1E8]/85 shadow-lg'
          )}
        >
          <span className="mb-1.5 font-sans text-[10px] font-semibold tracking-[0.25em] text-[#B08A45] uppercase">
            {sublabel}
          </span>
          <span className="font-serif text-lg tracking-tight md:text-2xl">
            {label}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-[#B08A45]/50 transition-all duration-500 group-hover:w-20" />
        </div>
      </div>

      {/* Subtle Bottom Architectural Dimension Indicator */}
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[10px] font-medium tracking-widest uppercase opacity-40">
        <span>Bespoke Collection</span>
        <span>Chattogram Atelier</span>
      </div>
    </motion.div>
  )
}
