import { motion } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EditorialHeading } from '@/components/common/EditorialHeading'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'
import { ArrowUpRight } from 'lucide-react'

interface SelectedWorkSectionProps {
  onOpenConsultation: () => void
}

export function SelectedWorkSection({ onOpenConsultation }: SelectedWorkSectionProps) {
  const projects = [
    {
      id: '01',
      title: 'Nasirabad Residence',
      category: 'Complete Living Suite & Architectural Wall Console',
      location: 'Chattogram, Bangladesh',
      year: '2025',
      aspectRatio: 'landscape' as const,
      colSpan: 'lg:col-span-8',
      placeholder: 'NASIRABAD RESIDENTIAL LIVING ARCHIVE',
    },
    {
      id: '02',
      title: 'Penthouse Khulshi',
      category: 'Master Bedroom Platform Bed & Fluted Dressing Unit',
      location: 'Khulshi Hills, Chattogram',
      year: '2025',
      aspectRatio: 'portrait' as const,
      colSpan: 'lg:col-span-4',
      placeholder: 'KHULSHI PENTHOUSE MASTER SANCTUARY',
    },
    {
      id: '03',
      title: 'Agrabad Private Estate',
      category: '12-Seater Monolithic Teak Dining Table & Credenza',
      location: 'Agrabad, Chattogram',
      year: '2024',
      aspectRatio: 'portrait' as const,
      colSpan: 'lg:col-span-5',
      placeholder: 'AGRABAD ESTATE DINING SALON',
    },
    {
      id: '04',
      title: 'Executive Suite GEC',
      category: 'Curved Walnut Workstation & Executive Library',
      location: 'GEC Circle, Chattogram',
      year: '2024',
      aspectRatio: 'landscape' as const,
      colSpan: 'lg:col-span-7',
      placeholder: 'GEC EXECUTIVE BOARDROOM & STUDY',
    },
  ]

  return (
    <section
      id="work"
      className="relative w-full bg-[#141F1E] py-24 sm:py-32 lg:py-44 text-[#F5F1E8]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
          <div className="space-y-4 max-w-2xl">
            <SectionLabel number="07" darkTheme>
              Selected Commissions
            </SectionLabel>
            <EditorialHeading level={2} size="display" darkTheme italicAccent="for Us.">
              Work that Speaks
            </EditorialHeading>
          </div>
          <p className="max-w-md font-sans text-sm text-stone-300">
            A curated selection of bespoke residential and executive environments
            commissioned throughout Chattogram.
          </p>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group flex flex-col justify-between space-y-4 ${project.colSpan}`}
            >
              <ImagePlaceholder
                label={project.placeholder}
                sublabel={project.category}
                aspectRatio={project.aspectRatio}
                dimensions={`${project.location} • ${project.year}`}
                accentNumber={project.id}
                darkTheme
                className="w-full shadow-2xl"
              />

              <div className="flex flex-col justify-between gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-baseline">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs font-semibold text-[#B08A45]">
                      [{project.id}]
                    </span>
                    <h3 className="font-serif text-2xl text-stone-100 sm:text-3xl">
                      {project.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-stone-400">
                    {project.category} • {project.location}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1 font-sans text-xs font-semibold tracking-wider text-[#B08A45] uppercase transition-colors hover:text-white"
                >
                  <span>Commission Similar</span>
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
