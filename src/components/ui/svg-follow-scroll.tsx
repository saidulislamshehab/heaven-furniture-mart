import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Reveal } from '@/components/common/Reveal'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * Editorial closing statement. Two thin taupe lines sit in the band between headline and copy;
 * they draw in on entrance, then drift in opposite directions with scroll progress.
 */
export function SvgFollowScroll({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section
      ref={ref}
      aria-labelledby="stroke-heading"
      className={cn(
        'relative flex w-full flex-col items-center justify-center overflow-hidden py-[clamp(5rem,14vw,11rem)] bg-brand-ivory text-brand-brown md:min-h-[110vh]',
        className
      )}
    >
      <div className="container-x relative flex w-full max-w-[1600px] flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="eyebrow text-brand-gold">{site.tagline}</p>
        </Reveal>
        <h2
          id="stroke-heading"
          className="relative z-10 max-w-[16ch] font-serif text-[length:clamp(2.1rem,8vw,9rem)] leading-[0.98] tracking-[-0.03em] text-balance"
        >
          From the first line <br />
          <span className="italic text-brand-brown/80">to the last touch.</span>
        </h2>

        <TwoLines progress={scrollYProgress} reduce={Boolean(reduce)} />

        <Reveal delay={0.2}>
          <p className="relative z-10 max-w-md text-[1.05rem] leading-relaxed text-brand-stone">
            One team carries every idea from measurement to installation. Keep scrolling — the lines
            move with you.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* Two related, non-identical curves in a 1200×320 box: both step down to the right, 02 bends earlier and softer. */
const LINE_01 = 'M-40 88C300 88 440 66 600 112S900 198 1240 156'
const LINE_02 = 'M-40 196C160 196 300 186 420 214S760 262 1240 236'

function TwoLines({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  // Opposite, modest drifts (percent of band width so mobile moves proportionally less).
  const x1 = useTransform(progress, [0, 1], ['-4%', '5%'])
  const x2 = useTransform(progress, [0, 1], ['3.5%', '-4%'])
  const y1 = useTransform(progress, [0, 1], [-6, 8])
  const y2 = useTransform(progress, [0, 1], [6, -8])
  // Settle in, hold, ease off as the section leaves.
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 0.55, 0.55, 0.3])

  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, amount: 0.4 },
      }

  return (
    <div
      aria-hidden
      className="relative -my-2 h-[clamp(5rem,16vw,17rem)] w-[min(1100px,92vw)] overflow-hidden md:w-[min(1100px,78vw)]"
    >
      <motion.svg
        viewBox="0 0 1200 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full text-brand-stone"
        style={reduce ? { opacity: 0.5 } : { opacity }}
      >
        <motion.path
          d={LINE_01}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="[stroke-width:1px] md:[stroke-width:1.5px]"
          style={reduce ? undefined : { x: x1, y: y1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          {...draw}
        />
        <motion.path
          d={LINE_02}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="[stroke-width:1px] md:[stroke-width:1.5px]"
          style={reduce ? undefined : { x: x2, y: y2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          {...draw}
        />
      </motion.svg>
    </div>
  )
}
