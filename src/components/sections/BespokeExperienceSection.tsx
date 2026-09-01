import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EditorialHeading } from '@/components/common/EditorialHeading'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Compass, Ruler, Hammer, Sparkles, Home } from 'lucide-react'

interface BespokeExperienceSectionProps {
  onOpenConsultation: () => void
}

export function BespokeExperienceSection({
  onOpenConsultation,
}: BespokeExperienceSectionProps) {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      num: '01',
      title: 'Your Space',
      subtitle: 'Spatial Assessment & Architectural Mapping',
      icon: Ruler,
      description:
        'We begin by analyzing the unique geometry of your home—room dimensions, ceiling heights, natural illumination paths, and traffic circulation.',
      placeholderLabel: 'ARCHITECTURAL SITE SURVEY & FLOORPLAN',
    },
    {
      num: '02',
      title: 'Your Vision',
      subtitle: 'Aesthetic Alignment & Lifestyle Habits',
      icon: Compass,
      description:
        'Share your taste, functional priorities, and material preferences. Whether minimalist Scandinavian, classic colonial teak, or contemporary Italian elegance.',
      placeholderLabel: 'DESIGN MOODBOARD & CLIENT INSPIRATION',
    },
    {
      num: '03',
      title: 'Our Design',
      subtitle: '3D Proportions & Custom Joinery Blueprint',
      icon: Sparkles,
      description:
        'Our design directors develop bespoke blueprints with exact millimeter precision, selecting custom profiles, finishes, and ergonomic comfort angles.',
      placeholderLabel: 'BESPOKE 3D CAD BLUEPRINTS & SPECS',
    },
    {
      num: '04',
      title: 'Our Craft',
      subtitle: 'Artisanal Joinery in Chattogram Atelier',
      icon: Hammer,
      description:
        'Master craftsmen hand-carve and join each component using seasoned solid wood, mortise-and-tenon connections, and hand-rubbed organic finishes.',
      placeholderLabel: 'MASTER ATELIER JOINERY & WOOD CARVING',
    },
    {
      num: '05',
      title: 'Your Home',
      subtitle: 'White-Glove Delivery & Seamless Installation',
      icon: Home,
      description:
        'Our dedicated white-glove team delivers and installs your bespoke pieces in the exact space they were born for, ensuring flawless placement.',
      placeholderLabel: 'FINAL HOME INSTALLATION & LIVING REVEAL',
    },
  ]

  return (
    <section
      id="bespoke"
      className="relative w-full bg-[#141F1E] py-24 sm:py-32 lg:py-44 text-[#F5F1E8] border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-3xl">
          <SectionLabel number="03" darkTheme>
            The Signature Differentiator
          </SectionLabel>
          <EditorialHeading level={2} size="display" darkTheme italicAccent="Around You.">
            Made Specially
          </EditorialHeading>
          <p className="font-sans text-base text-stone-300">
            A bespoke journey transforming your vision into custom luxury
            furniture engineered exclusively for your residence.
          </p>
        </div>

        {/* Interactive Sticky / Progressive Storytelling Container */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Step Selector */}
          <div className="space-y-4 lg:col-span-5">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isActive = activeStep === idx
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 transition-all duration-500 rounded-sm border ${
                    isActive
                      ? 'border-[#B08A45] bg-[#1F2E2D] shadow-xl'
                      : 'border-white/5 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-sans text-xs font-semibold ${
                          isActive ? 'text-[#B08A45]' : 'text-stone-500'
                        }`}
                      >
                        [{step.num}]
                      </span>
                      <h4
                        className={`font-serif text-xl sm:text-2xl ${
                          isActive ? 'text-[#F5F1E8]' : 'text-stone-400'
                        }`}
                      >
                        {step.title}
                      </h4>
                    </div>
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? 'text-[#B08A45]' : 'text-stone-600'
                      }`}
                    />
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4 space-y-2 border-t border-white/10 pt-3"
                    >
                      <p className="font-sans text-xs font-medium tracking-wider text-[#B08A45] uppercase">
                        {step.subtitle}
                      </p>
                      <p className="font-sans text-sm leading-relaxed text-stone-300">
                        {step.description}
                      </p>
                    </motion.div>
                  )}
                </button>
              )
            })}

            <div className="pt-4">
              <Button
                onClick={onOpenConsultation}
                className="w-full bg-[#B08A45] py-6 text-xs font-semibold tracking-[0.2em] text-[#141F1E] uppercase hover:bg-[#c49a4e]"
              >
                <span className="flex items-center gap-2">
                  Start Your Bespoke Commission
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>

          {/* Right Column: Progressive Storytelling Media Preview */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <ImagePlaceholder
                  label={steps[activeStep].placeholderLabel}
                  sublabel={`Stage ${steps[activeStep].num} — ${steps[activeStep].title}`}
                  aspectRatio="landscape"
                  dimensions="Bespoke Process Record"
                  accentNumber={steps[activeStep].num}
                  darkTheme
                  className="w-full shadow-2xl"
                />

                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-sans text-xs text-stone-400">
                  <span className="uppercase tracking-widest text-[#B08A45]">
                    Process Step {activeStep + 1} of 5
                  </span>
                  <span>Agrabad Atelier, Chattogram</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
