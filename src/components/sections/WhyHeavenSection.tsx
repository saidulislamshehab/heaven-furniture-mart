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
        eyebrow="06 — Why Heaven"
        title={['Why homeowners', 'choose Heaven.']}
        scrollHint="Scroll to open the showroom"
        lengthVh={340}
        tone="light"
      >
        {({ pinned }) => {
          // Pinned: GSAP scrubs `data-reveal` items. In flow: each item fades up on its own as it enters.
          const Item = pinned ? 'div' : Reveal
          return (
            <div
              className={cn(
                'container-x mx-auto flex max-w-[1600px] flex-col justify-between md:py-10 lg:py-12',
                pinned ? 'h-full pt-[calc(var(--nav-offset,60px)+1.25rem)] pb-[calc(env(safe-area-inset-bottom)+1.25rem)]' : 'py-12'
              )}
            >
              <div data-reveal className="hidden items-center justify-between md:flex [@media(max-height:600px)]:hidden">
                <p className="eyebrow text-brand-gold">06 — Why Heaven</p>
                <p className="eyebrow text-brand-ivory/60">Five reasons</p>
              </div>

              {/* Items alternate left / right of a central gold spine, revealed top to bottom */}
              <div className={cn('relative flex flex-1 flex-col justify-center md:gap-2 [@media(max-height:600px)]:gap-0', pinned ? 'gap-4 sm:gap-6' : 'gap-9')}>
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
                      <h3 className="mt-1.5 font-serif text-[1.35rem] leading-tight text-brand-ivory sm:mt-2 sm:text-3xl lg:text-4xl [@media(max-height:600px)]:mt-0.5 [@media(max-height:600px)]:text-xl">{t.title}</h3>
                      <p
                        className={cn(
                          'mt-1.5 text-[0.9rem] leading-relaxed text-brand-ivory/70 sm:mt-2 sm:text-[0.95rem]',
                          // Landscape phones can't hold five bodies inside the pinned frame
                          pinned && '[@media(max-height:600px)]:hidden'
                        )}
                      >
                        {t.body}
                      </p>
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
