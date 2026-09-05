import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { luxuryEase } from '@/components/common/Reveal'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow: string
  title: string
  body?: string
  image?: string
  imageAlt?: string
  children?: ReactNode
  className?: string
}

/** Dark editorial header for inner pages. Full-bleed image variant when `image` is provided. */
export function PageHero({ eyebrow, title, body, image, imageAlt = '', children, className }: PageHeroProps) {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: luxuryEase },
  })

  return (
    <section className={cn('relative isolate overflow-hidden bg-brand-teal-deep text-brand-ivory', image ? 'min-h-[72svh]' : '', className)}>
      {image && (
        <>
          <motion.img
            src={image}
            alt={imageAlt}
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            initial={reduce ? false : { scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: luxuryEase }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 to-brand-ink/30" />
        </>
      )}
      <div className={cn('container-x mx-auto flex max-w-[1600px] flex-col justify-end pt-36 pb-14 sm:pt-44 sm:pb-20', image && 'min-h-[72svh]')}>
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
