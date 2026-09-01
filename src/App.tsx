import { useState } from 'react'
import { SmoothScrollProvider } from '@/components/common/SmoothScrollProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { BrandManifestoSection } from '@/components/sections/BrandManifestoSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { BespokeExperienceSection } from '@/components/sections/BespokeExperienceSection'
import { MaterialsCraftsmanshipSection } from '@/components/sections/MaterialsCraftsmanshipSection'
import { CraftedDetailsSection } from '@/components/sections/CraftedDetailsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection'
import { BrandLegacySection } from '@/components/sections/BrandLegacySection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { ConsultationDialog } from '@/components/common/ConsultationDialog'
import './App.css'

function App() {
  const [consultationOpen, setConsultationOpen] = useState(false)

  const handleOpenConsultation = () => {
    setConsultationOpen(true)
  }

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen w-full bg-[#141F1E] font-sans antialiased text-stone-100 selection:bg-[#B08A45] selection:text-[#141F1E]">
        {/* Navigation */}
        <Navbar onOpenConsultation={handleOpenConsultation} />

        {/* Main Content Sections */}
        <main className="w-full">
          {/* Section 1: Cinematic Hero */}
          <HeroSection onOpenConsultation={handleOpenConsultation} />

          {/* Section 2: Brand Manifesto */}
          <BrandManifestoSection />

          {/* Section 3: Environments & Collections */}
          <CollectionsSection onOpenConsultation={handleOpenConsultation} />

          {/* Section 4: Bespoke Experience (Signature Differentiator) */}
          <BespokeExperienceSection onOpenConsultation={handleOpenConsultation} />

          {/* Section 5: Materials & Noble Craftsmanship */}
          <MaterialsCraftsmanshipSection />

          {/* Section 6: Crafted Details / Visual Story */}
          <CraftedDetailsSection />

          {/* Section 7: The 4-Step Methodology & Process */}
          <ProcessSection />

          {/* Section 8: Selected Work / Architectural Spaces */}
          <SelectedWorkSection onOpenConsultation={handleOpenConsultation} />

          {/* Section 9: Brand Legacy & Trust Signals */}
          <BrandLegacySection />

          {/* Section 10: Final Cinematic Closing CTA */}
          <FinalCTASection onOpenConsultation={handleOpenConsultation} />
        </main>

        {/* Section 11: Luxury Minimal Footer */}
        <Footer />

        {/* Interactive Consultation Modal Dialog */}
        <ConsultationDialog
          open={consultationOpen}
          onOpenChange={setConsultationOpen}
        />
      </div>
    </SmoothScrollProvider>
  )
}

export default App
