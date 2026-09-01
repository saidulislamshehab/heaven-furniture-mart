import { motion } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EditorialHeading } from '@/components/common/EditorialHeading'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'
import { ArrowUpRight } from 'lucide-react'

interface CollectionsSectionProps {
  onOpenConsultation: () => void
}

export function CollectionsSection({ onOpenConsultation }: CollectionsSectionProps) {
  const environments = [
    {
      id: '01',
      title: 'Living Environments',
      subtitle: 'Sofas • Sculptural Coffee Tables • Media Consoles • Accent Seating',
      aspectRatio: 'wide' as const,
      dimensions: 'Custom Spatial Planning',
      description:
        'Sculpted for deep relaxation and elevated hosting. Engineered frame geometries with tailored Italian fabrics and natural wood grains.',
      colSpan: 'lg:col-span-8',
      placeholderLabel: 'LIVING ROOM & ARCHITECTURAL LOUNGE',
    },
    {
      id: '02',
      title: 'Sanctuary Suites',
      subtitle: 'Platform Beds • Integrated Nightstands • Dressing Suites • Wardrobes',
      aspectRatio: 'portrait' as const,
      dimensions: 'Bespoke Headboard Millwork',
      description:
        'Peaceful proportions crafted for restorative sleep and timeless bedroom serenity.',
      colSpan: 'lg:col-span-4',
      placeholderLabel: 'MASTER BEDROOM SUITE',
    },
    {
      id: '03',
      title: 'Dining & Gathering',
      subtitle: 'Monolithic Dining Tables • Ergonomic Chairs • Buffet Credenzas',
      aspectRatio: 'square' as const,
      dimensions: 'Solid Teak & Natural Stone',
      description:
        'The centerpiece of hospitality. Handcrafted tables built to host generations of conversation.',
      colSpan: 'lg:col-span-5',
      placeholderLabel: 'DINING & HOSTING SPACE',
    },
    {
      id: '04',
      title: 'Executive & Library',
      subtitle: 'Executive Desks • Modular Bookcases • Integrated Power Workstations',
      aspectRatio: 'landscape' as const,
      dimensions: 'Ergonomic Precision',
      description:
        'Commanding study furniture balancing intellectual focus with tactile craftsmanship.',
      colSpan: 'lg:col-span-7',
      placeholderLabel: 'EXECUTIVE STUDY & BOOKSHELF ATELIER',
    },
  ]

  return (
    <section
      id="collections"
      className="relative w-full bg-[#1F2E2D] py-24 sm:py-32 lg:py-44 text-[#F5F1E8]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-12 sm:flex-row sm:items-end">
          <div className="space-y-4 max-w-2xl">
            <SectionLabel number="02" darkTheme>
              Spatial Environments
            </SectionLabel>
            <EditorialHeading level={2} size="display" darkTheme italicAccent="Spaces.">
              Curated for Living
            </EditorialHeading>
          </div>

          <p className="max-w-md font-sans text-sm text-stone-300">
            Explore our signature architectural collections—each crafted to be
            customized in dimension, wood species, and textile finishes.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {environments.map((env, index) => (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group flex flex-col justify-between space-y-6 ${env.colSpan}`}
            >
              {/* Image Container with Custom Aspect Ratio */}
              <div className="relative overflow-hidden">
                <ImagePlaceholder
                  label={env.placeholderLabel}
                  sublabel={env.subtitle}
                  aspectRatio={env.aspectRatio}
                  dimensions={env.dimensions}
                  accentNumber={env.id}
                  darkTheme
                  className="w-full"
                />
              </div>

              {/* Minimal Editorial Details */}
              <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-baseline">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs font-semibold text-[#B08A45]">
                      [{env.id}]
                    </span>
                    <h3 className="font-serif text-2xl text-stone-100 sm:text-3xl">
                      {env.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-stone-400">
                    {env.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider text-[#B08A45] uppercase transition-all hover:text-white"
                >
                  <span>Inquire Space</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
