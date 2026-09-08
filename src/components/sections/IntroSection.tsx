import { Reveal, RevealImage, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import { img, showroomVideos } from '@/data/assets'
import { site } from '@/data/site'

const pillars = [
  { word: 'Designed', body: 'Around your room, your measurements and the way you live in it.' },
  { word: 'Crafted', body: 'In-house, from selected timber, upholstery and finishes.' },
  { word: 'Customized', body: 'Nothing off the shelf — every piece is made for one home.' },
]

export function IntroSection() {
  return (
    <section id="intro" className="section-pad bg-brand-ivory text-brand-brown">
      <div className="container-x mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel number="01">Heaven Furniture Mart</SectionLabel>
            </Reveal>
            <h2 className="mt-6 max-w-[16ch] display-2 text-balance">
              <SplitWords text="Among Chattogram's most trusted names in bespoke furniture." />
            </h2>
            <Reveal delay={0.25} className="mt-8 max-w-lg space-y-5 text-[1.05rem] leading-relaxed text-brand-stone">
              <p>
                Since {site.founded} we have designed and crafted custom furniture — sofas, beds,
                dining sets, office pieces — built around what you actually want, not pulled off a
                shelf.
              </p>
              <p>
                From our showroom on {site.address.line1}, one team carries each idea from first
                sketch to installation in your home.
              </p>
            </Reveal>
          </div>

          <div className="relative mb-12 lg:col-span-5 lg:mb-0">
            <Reveal y={0} className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-ivory-deep sm:aspect-[3/4] lg:w-[78%] lg:ml-auto lg:rounded-none">
              <SmartVideo asset={showroomVideos.luxuriousModernReel} muted />
            </Reveal>
            <RevealImage
              src={img.oliveVelvetArmchair}
              alt="Olive velvet armchair with a silver-leaf carved frame"
              className="absolute -bottom-10 left-0 aspect-square w-[46%] border-[6px] border-brand-ivory lg:-bottom-14 lg:left-0"
              delay={0.2}
              sizes="(min-width:1024px) 20vw, 46vw"
            />
          </div>
        </div>

        <ul className="mt-28 grid gap-10 border-t border-brand-brown/10 pt-10 sm:grid-cols-3 lg:mt-36">
          {pillars.map((p, i) => (
            <li key={p.word}>
              <Reveal delay={i * 0.1}>
                <p className="font-serif text-4xl leading-none sm:text-5xl">
                  {p.word}
                  <span className="text-brand-gold">.</span>
                </p>
                <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-brand-stone">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
