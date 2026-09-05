import ScrollExpandMedia from '@/components/ui/scroll-expand-media'
import { img } from '@/data/assets'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const film = {
  src: '/videos/showroom/detail-sofa-fabric.mp4',
  poster: img.creamModernSofa,
  orientation: 'landscape',
  durationSec: 10,
} as const

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
        <div className="container-x mx-auto flex h-full max-w-[1600px] flex-col justify-between py-8 sm:py-10 lg:py-12">
          <div data-reveal className="flex items-center justify-between">
            <p className="eyebrow text-brand-gold">05 — Why Heaven</p>
            <p className="eyebrow text-brand-ivory/60">Five reasons</p>
          </div>

          {/* Items alternate left / right of a central gold spine, revealed top to bottom */}
          <div className="relative flex flex-1 flex-col justify-center gap-5 sm:gap-2">
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-brand-gold/40 sm:block" />
            {points.map((t, i) => {
              const right = i % 2 === 1
              return (
                <div
                  key={t.title}
                  data-reveal
                  className={cn(
                    'relative w-full max-w-[26rem]',
                    right ? 'sm:ml-[calc(50%+2.5rem)] sm:pl-2' : 'sm:mr-[calc(50%+2.5rem)] sm:ml-auto sm:pr-2 sm:text-right'
                  )}
                >
                  <span
                    aria-hidden
                    data-line
                    className={cn(
                      'absolute top-3 hidden h-px w-6 bg-brand-gold sm:block',
                      right ? 'left-0 origin-left -translate-x-[calc(100%+0.75rem)]' : 'right-0 origin-right translate-x-[calc(100%+0.75rem)]'
                    )}
                  />
                  <p className="eyebrow text-brand-gold">0{i + 1}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-brand-ivory sm:text-3xl lg:text-4xl">{t.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-brand-ivory/70">{t.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  )
}
