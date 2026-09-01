import { motion } from 'motion/react'
import { VideoPlaceholder } from '@/components/common/VideoPlaceholder'
import { ArrowDown } from 'lucide-react'

interface HeroSectionProps {
  onOpenConsultation: () => void
}

export function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between items-center overflow-hidden bg-[#151D1C] text-stone-100">
      {/* Background Cinematic Video / Ambient Showroom Container */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <VideoPlaceholder
          videoSrc="/Luxury_furniture_advertisement_v…_202609012258.mp4"
          title="Heaven Furniture Mart — Luxury Bespoke Furniture"
          subtitle="Cinematic living space and master woodwork craftsmanship"
        />
      </motion.div>

      {/* Top Spacer for Transparent Navigation */}
      <div className="h-28 sm:h-36 w-full pointer-events-none" />

      {/* CENTER: Massive Bold Sans-Serif + Editorial Italic Serif Typography Layered Directly Over Scene */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-6 text-center sm:px-8">
        <div className="flex flex-col items-center select-none">
          {/* Top Line: CRAFTED + for */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap"
          >
            <span className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[120px] leading-[0.92] tracking-[-0.03em] uppercase text-white drop-shadow-md">
              CRAFTED
            </span>
            <span className="font-serif italic font-light text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[100px] leading-[0.9] text-[#F3EAD8] drop-shadow-sm lowercase translate-y-1 sm:translate-y-2">
              for
            </span>
          </motion.div>

          {/* Bottom Line: LUXURY LIVING */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 sm:mt-2"
          >
            <span className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[108px] xl:text-[124px] leading-[0.92] tracking-[-0.03em] uppercase text-white drop-shadow-md">
              LUXURY LIVING
            </span>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM CENTER: Primary Outlined Pill CTA Button & Subtle Scroll Indicator */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center pb-8 sm:pb-12 px-6">
        {/* Outlined Pill CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            onClick={onOpenConsultation}
            className="group relative inline-flex items-center justify-center rounded-full border border-white/70 bg-black/15 px-8 sm:px-11 py-3.5 sm:py-4 font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase backdrop-blur-xs transition-all duration-400 hover:border-white hover:bg-white hover:text-[#121B1A] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 transition-colors">
              Explore Collection
            </span>
          </button>
        </motion.div>

        {/* Subtle Decorative Star Accent & Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 sm:mt-8 flex flex-col items-center gap-2"
        >
          {/* Subtle 4-point diamond star accent inspired by luxury reference */}
          <div className="h-2 w-2 rotate-45 border border-[#C49A4E]/60 bg-[#C49A4E]/20" />

          <a
            href="#manifesto"
            className="group inline-flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.25em] text-stone-400 uppercase transition-colors hover:text-[#C49A4E]"
          >
            <span>Scroll</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-3 w-3 text-[#C49A4E]" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
