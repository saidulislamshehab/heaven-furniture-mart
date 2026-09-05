import { ArrowUpRight, Star } from 'lucide-react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { site } from '@/data/site'

/* Verified public review from the Heaven Furniture Mart Google listing. */
const review = {
  quote: 'Product quality was good. And the staffs were very polite. Very recommended.',
  author: 'Al Mamun',
  source: 'Google review · January 2026',
}

export function ProofSection() {
  return (
    <section id="reviews" className="section-pad bg-brand-teal-deep text-brand-ivory">
      <div className="container-x mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel number="08">Client voices</SectionLabel>
          </Reveal>
          <h2 className="mt-6 max-w-[12ch] display-2 text-balance">
            <SplitWords text="Made for living. Remembered in words." />
          </h2>

          <Reveal delay={0.2} className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-6">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label={`${site.googleRating.score} out of 5 on Google — read reviews`}
            >
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-7xl leading-none sm:text-8xl">{site.googleRating.score}</span>
                <Star className="size-6 fill-brand-gold text-brand-gold" aria-hidden />
              </span>
              <span className="eyebrow mt-3 inline-flex items-center gap-1 text-brand-ivory/60 transition-colors group-hover:text-brand-gold-soft">
                {site.googleRating.label} <ArrowUpRight className="size-3.5" />
              </span>
            </a>
            <p className="max-w-[16rem] text-[0.95rem] leading-relaxed text-brand-ivory/65">
              Trusted by hundreds of homeowners across Chattogram and beyond.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <figure className="border-l border-brand-gold/60 pl-8 sm:pl-12">
            <blockquote className="font-serif text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.2] text-brand-ivory/95">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <p className="text-base">{review.author}</p>
              <p className="eyebrow mt-1 text-brand-ivory/50">{review.source}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
