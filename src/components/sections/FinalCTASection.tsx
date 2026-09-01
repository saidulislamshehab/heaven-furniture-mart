import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, MessageCircle } from 'lucide-react'

interface FinalCTASectionProps {
  onOpenConsultation: () => void
}

export function FinalCTASection({ onOpenConsultation }: FinalCTASectionProps) {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#141F1E] py-24 sm:py-32 lg:py-44 text-[#F5F1E8]">
      {/* Ambient Radial Gradient Glow & Blueprint Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2E2D]/80 via-[#141F1E] to-[#0D1413]" />
      <div className="blueprint-grid absolute inset-0 opacity-15" />
      
      {/* Subtle Warm Amber Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute h-[600px] w-[600px] rounded-full bg-[#B08A45]/15 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.3em] text-[#B08A45] uppercase"
        >
          <span className="h-[1px] w-8 bg-[#B08A45]" />
          <span>Begin Your Transformation</span>
          <span className="h-[1px] w-8 bg-[#B08A45]" />
        </motion.div>

        {/* Massive Closing Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 mb-8"
        >
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[0.95] tracking-[-0.03em] text-[#F5F1E8]">
            Your Next Piece <br />
            <span className="italic font-light text-[#B08A45]">
              Starts With a Vision.
            </span>
          </h2>
        </motion.div>

        {/* Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-xl font-sans text-sm sm:text-base leading-relaxed text-stone-300"
        >
          Bring us your architectural blueprints, room measurements, or custom
          furniture dreams. Together, we will craft an interior statement that
          feels exclusively yours.
        </motion.p>

        {/* Dual Actions: Primary CTA + WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            onClick={onOpenConsultation}
            className="group h-14 rounded-none bg-[#B08A45] px-10 text-xs font-semibold tracking-[0.2em] text-[#141F1E] uppercase transition-all duration-300 hover:bg-[#c99f52] hover:shadow-2xl"
          >
            <span className="flex items-center gap-2">
              Request a Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Button>

          <a
            href="https://wa.me/8801960481983"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-14 items-center gap-2.5 border border-white/20 bg-white/5 px-8 font-sans text-xs font-semibold tracking-[0.2em] text-stone-200 uppercase backdrop-blur-sm transition-all duration-300 hover:border-[#25D366] hover:text-[#25D366]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp Us</span>
          </a>
        </motion.div>

        {/* Bottom Coordinates */}
        <div className="mt-16 font-sans text-[10px] tracking-widest text-stone-500 uppercase">
          Agrabad Access Road • Chattogram, Bangladesh • +880 1960-481983
        </div>
      </div>
    </section>
  )
}
