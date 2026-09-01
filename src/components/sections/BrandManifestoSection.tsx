import { motion } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'
import { EditorialHeading } from '@/components/common/EditorialHeading'

export function BrandManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#F5F1E8] py-24 sm:py-32 lg:py-44 text-[#2B211C] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Top Eyebrow */}
        <div className="mb-12">
          <SectionLabel number="01">Brand Manifesto</SectionLabel>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Statement */}
          <div className="space-y-8 lg:col-span-7">
            <EditorialHeading
              level={2}
              size="display"
              italicAccent="a conversation."
              className="text-[#2B211C]"
            >
              At Heaven Furniture Mart, every piece begins with
            </EditorialHeading>

            <div className="space-y-6 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-[#564942]">
              <p>
                We do not believe in furniture taken from a shelf and forced
                into your life. True luxury is intentional—crafted specifically
                around the geometry of your residence, the flow of light, and the
                rituals of your daily routine.
              </p>
              <p>
                From hand-selected hardwood joinery in our Chattogram atelier to
                the final installation in your home, every silhouette is shaped
                with uncompromising architectural discipline.
              </p>
            </div>

            {/* Asymmetrical Quote Block */}
            <div className="border-l-2 border-[#B08A45] pl-6 py-2">
              <span className="font-serif text-2xl sm:text-3xl italic text-[#1F2E2D]">
                "Furniture should be designed around you—not the other way around."
              </span>
              <p className="mt-2 font-sans text-xs tracking-widest text-[#B08A45] uppercase">
                Heaven Atelier Principle
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Visual & Secondary Metadata */}
          <div className="space-y-6 lg:col-span-5 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImagePlaceholder
                label="RESIDENTIAL LIVING ARCHIVE"
                sublabel="Curated Architectural Space"
                aspectRatio="portrait"
                dimensions="3200 × 4000 px"
                accentNumber="01"
                className="w-full shadow-2xl"
              />
            </motion.div>

            <div className="flex items-center justify-between border-t border-[#B08A45]/30 pt-4 font-sans text-xs tracking-wider text-[#82746C] uppercase">
              <span>Chattogram • Agrabad Access Rd</span>
              <span>100% Bespoke Craft</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
