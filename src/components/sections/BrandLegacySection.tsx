import { motion } from 'motion/react'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EditorialHeading } from '@/components/common/EditorialHeading'
import { ImagePlaceholder } from '@/components/common/ImagePlaceholder'
import { ShieldCheck, Award, Users, Hammer } from 'lucide-react'

export function BrandLegacySection() {
  const trustSignals = [
    {
      icon: Hammer,
      title: 'In-House Master Artisans',
      desc: 'Crafted entirely by veteran woodworking masters in our dedicated Chattogram workshop.',
    },
    {
      icon: Award,
      title: 'BFIOA & Chamber Recognized',
      desc: 'Accredited furniture manufacturing standards and international expo participant.',
    },
    {
      icon: Users,
      title: 'Hundreds of Happy Residences',
      desc: 'Trusted by Chattogram’s most discerning homeowners and interior designers.',
    },
    {
      icon: ShieldCheck,
      title: 'Lifetime Structural Integrity',
      desc: 'Kiln-dried seasoned hardwoods and traditional mortise joinery engineered to last generations.',
    },
  ]

  return (
    <section
      id="legacy"
      className="relative w-full bg-[#F5F1E8] py-24 sm:py-32 lg:py-44 text-[#2B211C]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Top Header */}
        <div className="mb-16 space-y-4 max-w-3xl">
          <SectionLabel number="08">Heritage & Credibility</SectionLabel>
          <EditorialHeading level={2} size="display" italicAccent="with Purpose.">
            Crafted Since 2020
          </EditorialHeading>
        </div>

        {/* Asymmetrical Quote & Atelier Portrait Spread */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Managing Director Quote */}
          <div className="space-y-8 lg:col-span-7">
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Heaven Furniture Mart"
                className="h-9 w-auto object-contain brightness-0 opacity-80"
              />
            </div>
            <div className="relative border-l-2 border-[#B08A45] pl-8 py-4">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#1F2E2D] italic">
                “At Heaven Furniture Mart, we believe furniture is more than just
                function; it is a reflection of lifestyle, taste, and comfort.”
              </span>
              <div className="mt-6 space-y-1">
                <h4 className="font-serif text-xl font-semibold text-[#2B211C]">
                  Abul Kalam Bhuiyan
                </h4>
                <p className="font-sans text-xs font-medium tracking-widest text-[#B08A45] uppercase">
                  Founder & Managing Director • Heaven Furniture Mart
                </p>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#564942]">
              Established in Chattogram in 2020, Heaven Furniture Mart has grown
              from an artisanal studio into one of the region's premier bespoke
              furniture destinations, headquartered at Agrabad Access Road.
            </p>
          </div>

          {/* Right Column: Founder / Showroom Image Placeholder */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImagePlaceholder
                label="AGRABAD ATELIER & SHOWROOM ARCHIVE"
                sublabel="Chattogram Headquarters"
                aspectRatio="portrait"
                dimensions="Est. 2020"
                accentNumber="2020"
                className="w-full shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* 4 Trust Highlights */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#B08A45]/30 pt-12">
          {trustSignals.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#B08A45] bg-[#EFE8DA]">
                  <Icon className="h-5 w-5 text-[#B08A45]" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#2B211C]">
                  {item.title}
                </h4>
                <p className="font-sans text-xs leading-relaxed text-[#6B5E56]">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
