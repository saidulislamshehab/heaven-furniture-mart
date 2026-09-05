import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { Reveal, SplitWords } from '@/components/common/Reveal'
import { SectionLabel } from '@/components/common/SectionLabel'
import { workshopFilms } from '@/data/assets'
import { cn } from '@/lib/utils'

type Film = (typeof workshopFilms)[number]

function FilmCard({ film, playing, onToggle, delay }: { film: Film; playing: boolean; onToggle: () => void; delay: number }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (playing) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [playing])

  return (
    <Reveal delay={delay} className="w-[78vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none">
      <article className="group relative flex flex-col">
      <div className="relative aspect-[9/16] overflow-hidden bg-brand-teal">
        <video
          ref={ref}
          src={film.video.src}
          poster={film.video.poster}
          muted
          playsInline
          loop
          preload="none"
          aria-label={`${film.label}: ${film.title}`}
          onTimeUpdate={(e) => {
            const v = e.currentTarget
            if (v.duration) setProgress(v.currentTime / v.duration)
          }}
          className={cn(
            'h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxury)]',
            playing ? 'scale-100' : 'scale-[1.03] group-hover:scale-100'
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-brand-ink/30 transition-opacity duration-700',
            playing ? 'opacity-0' : 'opacity-100'
          )}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={playing}
          aria-label={playing ? `Pause ${film.label} film` : `Play ${film.label} film`}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-offset-[-4px]"
        >
          <span
            className={cn(
              'flex size-16 items-center justify-center rounded-full border border-brand-ivory/60 bg-brand-ink/30 text-brand-ivory backdrop-blur-sm transition-all duration-500',
              playing ? 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100' : 'group-hover:scale-105'
            )}
          >
            {playing ? <Pause className="size-5" strokeWidth={1.5} /> : <Play className="ml-0.5 size-5 fill-current" strokeWidth={1.5} />}
          </span>
        </button>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 text-brand-ivory">
          <span className="eyebrow">Heaven / Workshop</span>
          <span className="eyebrow tabular-nums">
            {film.index} — 00:{String(film.video.durationSec).padStart(2, '0')}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand-ivory/20">
          <div className="h-full origin-left bg-brand-gold" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
      <div className="mt-5">
        <p className="eyebrow text-brand-gold">
          {film.index} / {film.label}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight sm:text-3xl">{film.title}</h3>
        <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-brand-ivory/65">{film.body}</p>
      </div>
      </article>
    </Reveal>
  )
}

export function CraftSection() {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <section id="craft" className="section-pad bg-brand-ink text-brand-ivory">
      <div className="container-x mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel number="04">Inside the workshop</SectionLabel>
            </Reveal>
            <h2 className="mt-6 display-2 text-balance">
              <SplitWords text="Made in three movements." />
            </h2>
          </div>
          <Reveal delay={0.3} className="self-end lg:col-span-5">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-brand-ivory/65">
              From a measured line to the final gilded edge — three short films of furniture becoming
              personal. Choose one to begin.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 lg:mt-20">
        <div className="container-x mx-auto flex max-w-[1600px] snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0">
          {workshopFilms.map((film, i) => (
            <FilmCard
              key={film.id}
              film={film}
              delay={i * 0.12}
              playing={playing === film.id}
              onToggle={() => setPlaying((p) => (p === film.id ? null : film.id))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
