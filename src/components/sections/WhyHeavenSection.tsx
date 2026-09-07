import { Reveal } from '@/components/common/Reveal'
import ScrollExpandMedia from '@/components/ui/scroll-expand-media'
import { showroomVideos } from '@/data/assets'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const film = showroomVideos.sofaFabricDetail

export function WhyHeavenSection() {
  const points = site.trustPoints.slice(0, 5)

  return (
    <section id="why" aria-labelledby="why-heading">
      <h2 id="why-heading" className="sr-only">
        Why homeowners choose Heaven
      </h2>
      <ScrollExpandMedia
        media={film}
        eyebrow="05 — Why Heaven"
        title={['Why homeowners', 'choose Heaven.']}
        scrollHint="Scroll to open the showroom"
        lengthVh={340}
        tone="light"
      >
        {({ pinned }) => {
          // Pinned: GSAP scrubs `data-reveal` items. In flow: each item fades up on its own as it enters.
          const Item = pinned ? 'div' : Reveal
          return (
            <div className="container-x mx-auto flex max-w-[1600px] flex-col justify-between py-12 md:h-full md:py-10 lg:py-12">
              <div data-reveal className="hidden items-center justify-between md:flex">
                <p className="eyebrow text-brand-gold">05 — Why Heaven</p>
                <p className="eyebrow text-brand-ivory/60">Five reasons</p>
              </div>

              {/* Items alternate left / right of a central gold spine, revealed top to bottom */}
              <div className="relative flex flex-1 flex-col justify-center gap-9 md:gap-2">
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-brand-gold/40 md:block" />
                {points.map((t, i) => {
                  const right = i % 2 === 1
                  return (
                    <Item
                      key={t.title}
                      data-reveal
                      className={cn(
                        'relative w-full max-w-[26rem] border-l border-brand-gold/30 pl-5 md:w-[calc(50%-2.5rem)] md:border-0 md:pl-0',
                        right ? 'md:ml-[calc(50%+2.5rem)] md:pl-2' : 'md:mr-[calc(50%+2.5rem)] md:ml-auto md:pr-2 md:text-right'
                      )}
                    >
                      <span
                        aria-hidden
                        data-line
                        className={cn(
                          'absolute top-3 hidden h-px w-6 bg-brand-gold md:block',
                          right ? 'left-0 origin-left -translate-x-[calc(100%+0.75rem)]' : 'right-0 origin-right translate-x-[calc(100%+0.75rem)]'
                        )}
                      />
                      <p className="eyebrow text-brand-gold">0{i + 1}</p>
                      <h3 className="mt-2 font-serif text-2xl leading-tight text-brand-ivory sm:text-3xl lg:text-4xl">{t.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-brand-ivory/70">{t.body}</p>
                    </Item>
                  )
                })}
              </div>
            </div>
          )
        }}
      </ScrollExpandMedia>
    </section>
  )
}
