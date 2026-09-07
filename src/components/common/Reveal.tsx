import { useState, type ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

export const luxuryEase = [0.16, 1, 0.3, 1] as const

/** Reveal travel scales down on phones so motion feels lighter, not like a shrunk desktop. */
function useMotionScale() {
  const [scale] = useState(() => {
    if (typeof window === 'undefined') return 1
    return window.matchMedia('(max-width: 767px)').matches ? 0.5 : 1
  })
  return scale
}

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  /** vertical offset in px (desktop); halved on mobile */
  y?: number
  once?: boolean
}

/** Fade-up on scroll. Transform/opacity only; disabled for reduced motion. */
export function Reveal({ children, delay = 0, y = 28, once = true, ...props }: RevealProps) {
  const reduce = useReducedMotion()
  const scale = useMotionScale()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: y * scale }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, delay, ease: luxuryEase }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface RevealImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  delay?: number
  priority?: boolean
  sizes?: string
}

/** Image with a slow clip-path curtain reveal and settle-scale. */
export function RevealImage({ src, alt, className, imgClassName, delay = 0, priority, sizes }: RevealImageProps) {
  const reduce = useReducedMotion()
  return (
    <motion.figure
      className={className}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.4, delay, ease: luxuryEase }}
      style={{ overflow: 'hidden' }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        className={imgClassName ?? 'h-full w-full object-cover'}
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.8, delay, ease: luxuryEase }}
      />
    </motion.figure>
  )
}

interface SplitWordsProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/** Word-by-word stagger for headlines. Keeps the text a single accessible string. */
export function SplitWords({ text, className, delay = 0, as = 'span' }: SplitWordsProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block">
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom" aria-hidden>
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '110%', opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 1, ease: luxuryEase }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
