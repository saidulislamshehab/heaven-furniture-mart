import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import { img } from '@/data/assets'
import { site } from '@/data/site'

const detailFilm = {
  src: '/videos/showroom/detail-sofa-fabric.mp4',
  poster: img.creamModernSofa,
  orientation: 'landscape',
  durationSec: 10,
} as const

export function WhyHeavenSection() {
  return (
    <section id="why" className="section-pad bg-brand-ivory-deep text-brand-brown">
      <div className="container-x mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel number="05">Why Heaven</SectionLabel>
            </Reveal>
            <h2 className="mt-6 max-w-[12ch] display-2 text-balance">
              <SplitWords text="Why homeowners choose Heaven." />
            </h2>
            <Reveal delay={0.2} className="mt-10 aspect-[16/10] w-full max-w-md overflow-hidden bg-brand-ivory">
              <SmartVideo asset={detailFilm} />
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-stone">
                Fabric, stitch and frame — the details you notice every day, chosen with you in the
                showroom.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {site.trustPoints.map((t, i) => (
            <li key={t.title} className="border-t border-brand-brown/12 py-8 first:border-t-0 first:pt-0 lg:py-10">
              <Reveal delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr]">
                <span className="font-serif text-2xl text-brand-gold">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-3xl leading-none sm:text-4xl">{t.title}</h3>
                  <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-brand-stone">{t.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
