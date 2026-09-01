import { motion } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EditorialHeading } from '@/components/common/EditorialHeading'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'

export function CraftedDetailsSection() {
  return (
    <section className="relative w-full bg-[#1F2E2D] py-24 sm:py-32 lg:py-44 text-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div className="space-y-4 max-w-2xl">
            <SectionLabel number="05" darkTheme>
              Visual Story
            </SectionLabel>
            <EditorialHeading level={2} size="display" darkTheme italicAccent="in the Details.">
              Poetry Found
            </EditorialHeading>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-stone-300">
            A visual documentation of artisanal joinery, curved ergonomics, and
            architectural finishes from our Chattogram workshop.
          </p>
        </div>

        {/* Asymmetrical Magazine Layout Spread */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Item 1: Large Panoramic Horizon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <ImagePlaceholder
              label="CURVED WOOD JOINERY & SEAT PAN ARCHITECTURE"
              sublabel="Macro Craft Detail"
              aspectRatio="landscape"
              dimensions="Hand-Planed Surface"
              accentNumber="01"
              darkTheme
              className="w-full shadow-2xl"
            />
          </motion.div>

          {/* Item 2: Vertical Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <ImagePlaceholder
              label="SOLID BRASS CORNER REBATE"
              sublabel="Inlay Precision"
              aspectRatio="portrait"
              dimensions="0.5mm Tolerance"
              accentNumber="02"
              darkTheme
              className="w-full shadow-2xl"
            />
          </motion.div>

          {/* Item 3: Square Detail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <ImagePlaceholder
              label="HAND-STITCHED LEATHER SEAM"
              sublabel="Saddlery Technique"
              aspectRatio="square"
              dimensions="Waxed Linen Thread"
              accentNumber="03"
              darkTheme
              className="w-full shadow-2xl"
            />
          </motion.div>

          {/* Item 4: Wide Workshop Composition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <ImagePlaceholder
              label="FINAL FINISHING & ORGANIC OIL HAND BUFFING"
              sublabel="Atelier Workshop"
              aspectRatio="landscape"
              dimensions="Chattogram Showroom"
              accentNumber="04"
              darkTheme
              className="w-full shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
