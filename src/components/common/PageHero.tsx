import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { luxuryEase } from '@/components/common/Reveal'
import { SmartVideo } from '@/components/common/SmartVideo'
import type { VideoAsset } from '@/data/assets'
import { cn } from '@/lib/utils'
import { srcSetFor } from '@/lib/images'

interface PageHeroProps {
  eyebrow: string
  title: string
  body?: string
  image?: string
  imageAlt?: string
  /** Ambient film instead of a still; takes precedence over `image`. */
  video?: VideoAsset
  /** Tailwind object-position class for the background image. */
  imagePosition?: string
  /** Fill the full viewport height instead of the default 72svh. */
  fullscreen?: boolean
  children?: ReactNode
  className?: string
}

/** Dark editorial header for inner pages. Full-bleed image or video variant when media is provided. */
export function PageHero({ eyebrow, title, body, image, imageAlt = '', video, imagePosition = 'object-center', fullscreen, children, className }: PageHeroProps) {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: luxuryEase },
  })
  const media = Boolean(video || image)
  const minH = media ? (fullscreen ? 'min-h-[100svh]' : 'min-h-[72svh]') : ''

  return (
    <section className={cn('relative isolate overflow-hidden bg-brand-teal-deep text-brand-ivory', minH, className)}>
      {video ? (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={reduce ? false : { scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: luxuryEase }}
        >
          <SmartVideo asset={video} lazy={false} className="h-full w-full object-cover" />
        </motion.div>
      ) : (
        image && (
          <motion.img
            src={image}
            srcSet={srcSetFor(image)}
            sizes="100vw"
            alt={imageAlt}
            fetchPriority="high"
            decoding="async"
            className={cn('absolute inset-0 -z-10 h-full w-full object-cover', imagePosition)}
            initial={reduce ? false : { scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: luxuryEase }}
          />
        )
      )}
      {media && (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink/95 via-brand-ink/65 to-brand-ink/25" />
          {/* Extra left-side scrim keeps type readable over signage / bright facades */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-ink/60 via-brand-ink/20 to-transparent" />
        </>
      )}
      <div className={cn('container-x mx-auto flex max-w-[1600px] flex-col justify-end pt-36 pb-14 sm:pt-44 sm:pb-20', minH, fullscreen && 'pb-[max(3.5rem,env(safe-area-inset-bottom))] sm:pb-24')}>
        <motion.p {...rise(0.1)} className="eyebrow text-brand-gold-soft">
          {eyebrow}
        </motion.p>
        <h1 className="mt-5 max-w-[14ch] display-1 text-balance">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduce ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: luxuryEase }}
            >
              {title}
            </motion.span>
          </span>
        </h1>
        {body && (
          <motion.p {...rise(0.45)} className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-brand-ivory/75 sm:text-lg">
            {body}
          </motion.p>
        )}
        {children && (
          <motion.div {...rise(0.6)} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
