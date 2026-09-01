import { motion } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EditorialHeading } from '@/components/common/EditorialHeading'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'

export function MaterialsCraftsmanshipSection() {
  const materials = [
    {
      id: '01',
      name: 'Seasoned Hardwoods',
      origin: 'Burma Teak • White Oak • Walnut',
      desc: 'Sustainably sourced and kiln-dried to perfection to prevent warping in tropical climates. Hand-finished with organic natural oils.',
      aspectRatio: 'portrait' as const,
      placeholder: 'SEASONED BURMA TEAK & SOLID OAK GRAIN',
    },
    {
      id: '02',
      name: 'Curated Textiles',
      origin: 'Italian Velvet • Belgian Linen • Bouclé',
      desc: 'High-durability upholstery fabrics chosen for sensorial softness, rich color depth, and stain resistance.',
      aspectRatio: 'square' as const,
      placeholder: 'TEXTURED BOUCLÉ & WOVEN VELVET SWATCH',
    },
    {
      id: '03',
      name: 'Architectural Hardware',
      origin: 'Solid Brushed Brass • Gunmetal Accents',
      desc: 'Custom-milled metal legs, inlays, and pulls that develop an exquisite natural patina over decades of touch.',
      aspectRatio: 'landscape' as const,
      placeholder: 'HAND-BRUSHED BRASS INLAYS & METALWORK',
    },
    {
      id: '04',
      name: 'Natural Stone & Glass',
      origin: 'Italian Travertine • Fluted Glass',
      desc: 'Seamlessly integrated stone surfaces with honed satin finishes, paired with fluted glass for luminous shadow play.',
      aspectRatio: 'portrait' as const,
      placeholder: 'HONED TRAVERTINE SLAB & FLUTED GLASS',
    },
  ]

  return (
    <section
      id="materials"
      className="relative w-full bg-[#F5F1E8] py-24 sm:py-32 lg:py-44 text-[#2B211C]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-3xl">
          <SectionLabel number="04">Material Integrity</SectionLabel>
          <EditorialHeading level={2} size="display" italicAccent="Noble Materials.">
            Crafted from
          </EditorialHeading>
          <p className="font-sans text-base text-[#564942]">
            Every raw element is hand-inspected for grain structure, structural
            density, and tactile emotion before entering our workshop.
          </p>
        </div>

        {/* 4-Column Asymmetrical Material Storytelling */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((mat, index) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col justify-between space-y-4"
            >
              <ImagePlaceholder
                label={mat.placeholder}
                sublabel={mat.origin}
                aspectRatio={mat.aspectRatio}
                dimensions="Material Study"
                accentNumber={mat.id}
                className="w-full shadow-md"
              />

              <div className="space-y-1.5 border-t border-[#B08A45]/30 pt-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-medium text-[#2B211C]">
                    {mat.name}
                  </h4>
                  <span className="font-sans text-xs font-semibold text-[#B08A45]">
                    {mat.id}
                  </span>
                </div>
                <p className="font-sans text-[11px] font-semibold tracking-wider text-[#B08A45] uppercase">
                  {mat.origin}
                </p>
                <p className="font-sans text-xs leading-relaxed text-[#6B5E56]">
                  {mat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
