import { lazy, Suspense } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { IntroSection } from '@/components/sections/IntroSection'
import { usePageMeta } from '@/lib/usePageMeta'

/* Everything under the intro is below the fold on every viewport: split it out of the first JS payload. */
const BespokeSection = lazy(() => import('@/components/sections/BespokeSection').then((m) => ({ default: m.BespokeSection })))
const CollectionsSection = lazy(() => import('@/components/sections/CollectionsSection').then((m) => ({ default: m.CollectionsSection })))
const StorySection = lazy(() => import('@/components/sections/StorySection').then((m) => ({ default: m.StorySection })))
const CraftSection = lazy(() => import('@/components/sections/CraftSection').then((m) => ({ default: m.CraftSection })))
const WhyHeavenSection = lazy(() => import('@/components/sections/WhyHeavenSection').then((m) => ({ default: m.WhyHeavenSection })))
const FounderSection = lazy(() => import('@/components/sections/FounderSection').then((m) => ({ default: m.FounderSection })))
const SignatureSection = lazy(() => import('@/components/sections/SignatureSection').then((m) => ({ default: m.SignatureSection })))
const ProofSection = lazy(() => import('@/components/sections/ProofSection').then((m) => ({ default: m.ProofSection })))
const VisitTeaserSection = lazy(() => import('@/components/sections/VisitTeaserSection').then((m) => ({ default: m.VisitTeaserSection })))
const MilestonesSection = lazy(() => import('@/components/sections/MilestonesSection').then((m) => ({ default: m.MilestonesSection })))
const SvgFollowScroll = lazy(() => import('@/components/ui/svg-follow-scroll').then((m) => ({ default: m.SvgFollowScroll })))

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
          {/* Tall ivory fallback keeps the document long enough that the sticky hero doesn't jump while chunks land */}
          <Suspense fallback={<div aria-hidden className="min-h-[300svh] bg-brand-ivory" />}>
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
          </Suspense>
        </div>
      </div>
    </>
  )
}
