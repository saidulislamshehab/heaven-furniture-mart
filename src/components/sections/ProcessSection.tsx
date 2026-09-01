import { useState } from 'react'
import { motion } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EditorialHeading } from '@/components/common/EditorialHeading'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      num: '01',
      title: 'Consultation & Spatial Audit',
      tagline: 'Share Your Space & Vision',
      desc: 'We meet at our Agrabad showroom or your residence to assess architectural dimensions, lifestyle habits, and interior aesthetic goals.',
      placeholder: 'CONSULTATION & SPATIAL SKETCHES',
    },
    {
      num: '02',
      title: 'Design & Engineering',
      tagline: 'Millimeter-Accurate Proportions',
      desc: 'Our design team generates 3D visualizations, material sample pairings, and joint blueprints for your approval.',
      placeholder: '3D STRUCTURAL BLUEPRINTS & CAD SPECS',
    },
    {
      num: '03',
      title: 'Artisanal Craftsmanship',
      tagline: 'Master Joinery in Chattogram',
      desc: 'Veteran woodworkers carve, turn, and finish each component by hand using mortise-and-tenon woodworking and multi-coat organic sealants.',
      placeholder: 'SOLID WOOD JOINERY & CARVING',
    },
    {
      num: '04',
      title: 'Delivery & Placement',
      tagline: 'White-Glove Installation',
      desc: 'Our white-glove logistics team installs and positions your furniture in its intended architectural space with complete precision.',
      placeholder: 'WHITE-GLOVE RESIDENTIAL REVEAL',
    },
  ]

  return (
    <section
      id="process"
      className="relative w-full bg-[#F5F1E8] py-24 sm:py-32 lg:py-44 text-[#2B211C]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 space-y-4 max-w-2xl">
          <SectionLabel number="06">The Methodology</SectionLabel>
          <EditorialHeading level={2} size="display" italicAccent="to Finished Form.">
            From Vision
          </EditorialHeading>
          <p className="font-sans text-base text-[#564942]">
            A seamless, transparent journey from your initial sketch to a finished
            interior statement piece that will endure for generations.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Interactive Process Milestones */}
          <div className="space-y-6 lg:col-span-6">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer border-l-2 p-6 transition-all duration-500 rounded-r-sm ${
                    isActive
                      ? 'border-[#B08A45] bg-[#EFE8DA] shadow-sm'
                      : 'border-stone-300 hover:border-[#B08A45]/50'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-serif text-3xl font-light ${
                        isActive ? 'text-[#B08A45]' : 'text-stone-400'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#2B211C]">
                        {step.title}
                      </h4>
                      <p className="font-sans text-xs font-semibold tracking-wider text-[#B08A45] uppercase">
                        {step.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 font-sans text-sm leading-relaxed text-[#6B5E56]">
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right Column: Visual Process Snapshot */}
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImagePlaceholder
                label={steps[activeStep].placeholder}
                sublabel={`Methodology Stage ${steps[activeStep].num}`}
                aspectRatio="landscape"
                dimensions="Step Documentation"
                accentNumber={steps[activeStep].num}
                className="w-full shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
