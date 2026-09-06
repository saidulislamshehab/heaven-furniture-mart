import { useCallback, useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SmartVideo } from '@/components/common/SmartVideo'
import { workshopFilms } from '@/data/assets'
import { cn } from '@/lib/utils'

type Film = (typeof workshopFilms)[number]

/** The centre film plays with sound by default, kept quiet so it reads as ambience. */
const DEFAULT_SOUND_FILM = workshopFilms[1].id
const AMBIENT_VOLUME = 0.3

function FilmPanel({
  film,
  unmuted,
  onToggleSound,
  onAutoplayBlocked,
}: {
  film: Film
  unmuted: boolean
  onToggleSound: () => void
  onAutoplayBlocked?: () => void
}) {
  return (
    <article className="group relative aspect-[9/16] w-full overflow-hidden bg-brand-teal sm:aspect-auto sm:h-[100svh] lg:h-[100vh]">
      <div className="absolute inset-0 [&_video]:transition-transform [&_video]:duration-[1600ms] [&_video]:ease-[var(--ease-luxury)] group-hover:[&_video]:scale-[1.03]">
        <SmartVideo asset={film.video} lazy={false} muted={!unmuted} volume={AMBIENT_VOLUME} onAutoplayBlocked={onAutoplayBlocked} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/10 to-brand-ink/55" />

      {/* Top meta */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-end p-5 text-brand-ivory/85 sm:p-6">
        <span className="eyebrow tabular-nums">
          {film.index} — 00:{String(film.video.durationSec).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom copy + sound toggle */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6 lg:p-8">
        <div className="max-w-xs">
          <p className="eyebrow text-brand-gold">
            {film.index} / {film.label}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-brand-ivory sm:text-4xl">{film.title}</h3>
          <p className="mt-3 hidden text-[0.95rem] leading-relaxed text-brand-ivory/70 md:block">{film.body}</p>
        </div>
        <button
          type="button"
          data-sound-toggle
          onClick={onToggleSound}
          aria-pressed={unmuted}
          aria-label={unmuted ? `Mute ${film.label} film` : `Unmute ${film.label} film`}
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-colors',
            unmuted
              ? 'border-brand-gold bg-brand-gold text-brand-teal-deep'
              : 'border-brand-ivory/50 bg-brand-ink/30 text-brand-ivory hover:border-brand-ivory hover:bg-brand-ivory hover:text-brand-teal-deep'
          )}
        >
          {unmuted ? <Volume2 className="size-5" strokeWidth={1.5} /> : <VolumeX className="size-5" strokeWidth={1.5} />}
        </button>
      </div>
    </article>
  )
}

export function CraftSection() {
  const [unmuted, setUnmuted] = useState<string | null>(DEFAULT_SOUND_FILM)
  const [blocked, setBlocked] = useState(false)

  // Browsers refuse unmuted autoplay without a gesture: fall back to muted, then restore sound on the first tap/click/key.
  const handleAutoplayBlocked = useCallback(() => {
    setUnmuted(null)
    setBlocked(true)
  }, [])

  useEffect(() => {
    if (!blocked) return
    const restore = (e: Event) => {
      // A tap on a sound toggle is handled by the toggle itself
      if (e.target instanceof Element && e.target.closest('[data-sound-toggle]')) return
      setUnmuted((u) => u ?? DEFAULT_SOUND_FILM)
      setBlocked(false)
    }
    const opts = { passive: true } as const
    window.addEventListener('pointerdown', restore, opts)
    window.addEventListener('keydown', restore, opts)
    return () => {
      window.removeEventListener('pointerdown', restore)
      window.removeEventListener('keydown', restore)
    }
  }, [blocked])

  return (
    <section id="craft" className="relative bg-brand-ink text-brand-ivory">
      {/* Section title floats over the films so the strip begins immediately after Collections */}
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

      {/* Full-bleed, gapless triptych */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-3">
        {workshopFilms.map((film) => (
          <FilmPanel
            key={film.id}
            film={film}
            unmuted={unmuted === film.id}
            onToggleSound={() => {
              setBlocked(false)
              setUnmuted((u) => (u === film.id ? null : film.id))
            }}
            onAutoplayBlocked={film.id === DEFAULT_SOUND_FILM ? handleAutoplayBlocked : undefined}
          />
        ))}
      </div>
    </section>
  )
}
