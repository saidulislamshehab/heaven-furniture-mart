import { useState } from 'react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import SwipeStack from '@/components/ui/swipe-stack'
import { workshopFilms } from '@/data/assets'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Film = (typeof workshopFilms)[number]

/** Phone layout: one film at a time in a swipeable stack, shown uncropped at its native 9:16. */
function FilmStack() {
  const [front, setFront] = useState<Film['id']>(workshopFilms[0].id)
  const current = workshopFilms.find((f) => f.id === front) ?? workshopFilms[0]

  return (
    <div className="container-x mx-auto pb-24">
      <SwipeStack
        aspect="9 / 16"
        tone="light"
        className="max-w-[min(78vw,22rem)]"
        onFrontChange={(id) => setFront(id as Film['id'])}
        items={workshopFilms.map((film) => ({
          id: film.id,
          label: `${film.index} ${film.title}`,
          content: (
            <>
              {/* Only the front card plays; the rest hold their poster so a single film runs at a time */}
              <SmartVideo asset={film.video} autoPlay={film.id === front} className="object-contain" />
              <span className="eyebrow pointer-events-none absolute top-4 right-4 tabular-nums text-brand-ivory/85">
                {film.index} — 00:{String(film.video.durationSec).padStart(2, '0')}
              </span>
            </>
          ),
        }))}
      />
      <div className="mx-auto mt-16 max-w-[min(78vw,22rem)]" aria-live="polite">
        <p className="eyebrow text-brand-gold">
          {current.index} / {current.label}
        </p>
        <h3 className="mt-2 font-serif text-3xl leading-tight text-brand-brown">{current.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-brand-stone">{current.body}</p>
      </div>
    </div>
  )
}

function FilmPanel({ film }: { film: Film }) {
  return (
    <article className="group relative aspect-[9/16] w-full overflow-hidden bg-brand-teal sm:aspect-auto sm:h-[100svh] lg:h-[100vh]">
      <div className="absolute inset-0 [&_video]:transition-transform [&_video]:duration-[1600ms] [&_video]:ease-[var(--ease-luxury)] group-hover:[&_video]:scale-[1.03]">
        <SmartVideo asset={film.video} lazy={false} muted />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/10 to-brand-ink/55" />

      {/* Top meta */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-end p-5 text-brand-ivory/85 sm:p-6">
        <span className="eyebrow tabular-nums">
          {film.index} — 00:{String(film.video.durationSec).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom copy */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
        <div className="max-w-xs">
          <p className="eyebrow text-brand-gold">
            {film.index} / {film.label}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-brand-ivory sm:text-4xl">{film.title}</h3>
          <p className="mt-3 hidden text-[0.95rem] leading-relaxed text-brand-ivory/70 md:block">{film.body}</p>
        </div>
      </div>
    </article>
  )
}

export function CraftSection() {
  // Matches Tailwind `sm`; rendering one variant keeps phones from fetching the eager triptych films.
  const smUp = useMediaQuery('(min-width: 640px)')
  return (
    <section id="craft" className="relative bg-brand-ivory text-brand-brown sm:bg-brand-ink sm:text-brand-ivory">
      {/* Section title on mobile */}
      <div className="container-x mx-auto max-w-[1600px] pt-12 pb-8 sm:hidden">
        <Reveal>
          <SectionLabel number="04">Inside the workshop</SectionLabel>
        </Reveal>
        <h2 className="mt-4 display-3 text-balance">
          <SplitWords text="Made in three movements." />
        </h2>
      </div>

      {/* Section title floats over the films on tablet and desktop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden sm:block">
        <div className="container-x mx-auto flex max-w-[1600px] items-start justify-between pt-16 lg:pt-20">
          <div>
            <Reveal>
              <SectionLabel number="04">Inside the workshop</SectionLabel>
            </Reveal>
            <h2 className="mt-5 max-w-[10ch] display-3 text-balance text-brand-ivory drop-shadow-[0_2px_24px_rgba(13,20,19,0.6)]">
              <SplitWords text="Made in three movements." />
            </h2>
          </div>
        </div>
      </div>

      {/* Phones: swipeable stack. Tablet and up: full-bleed, gapless triptych */}
      {smUp ? (
        <div className="grid w-full grid-cols-3">
          {workshopFilms.map((film) => (
            <FilmPanel key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <FilmStack />
      )}
    </section>
  )
}

