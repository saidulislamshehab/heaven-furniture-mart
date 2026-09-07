import { HeroSection } from '@/components/sections/HeroSection'
import { IntroSection } from '@/components/sections/IntroSection'
import { BespokeSection } from '@/components/sections/BespokeSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { StorySection } from '@/components/sections/StorySection'
import { CraftSection } from '@/components/sections/CraftSection'
import { WhyHeavenSection } from '@/components/sections/WhyHeavenSection'
import { FounderSection } from '@/components/sections/FounderSection'
import { SignatureSection } from '@/components/sections/SignatureSection'
import { ProofSection } from '@/components/sections/ProofSection'
import { VisitTeaserSection } from '@/components/sections/VisitTeaserSection'
import { MilestonesSection } from '@/components/sections/MilestonesSection'
import { SvgFollowScroll } from '@/components/ui/svg-follow-scroll'
import { usePageMeta } from '@/lib/usePageMeta'

export function HomePage({ introDone }: { introDone: boolean }) {
  usePageMeta(
    'Heaven Furniture Mart — Bespoke Furniture & Interior Styling, Chattogram',
    'Premium bespoke furniture and interior styling from Chattogram. Designed around your space, crafted in-house, installed in your home. Free design consultation.'
  )

  return (
    <>
      <div className="relative isolate">
        {/* Hero pins to the top; the sections below scroll up and over it */}
        <div className="sticky top-0 z-0 h-[100svh] overflow-hidden">
          <HeroSection introDone={introDone} />
        </div>
        <div className="relative z-10">
          <IntroSection />
          <BespokeSection />
          <CollectionsSection />
          <StorySection />
          <CraftSection />
          <WhyHeavenSection />
          <FounderSection />
          <SignatureSection />
          <ProofSection />
          <VisitTeaserSection />
          <MilestonesSection number="11" className="bg-brand-ivory pb-[clamp(4.5rem,10vw,10rem)] text-brand-brown" />
          <SvgFollowScroll />
        </div>
      </div>
    </>
  )
}
