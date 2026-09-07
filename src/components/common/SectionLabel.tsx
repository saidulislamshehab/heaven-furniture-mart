import type { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  number?: string
  children: ReactNode
}

/** Numbered eyebrow used above section headings. */
export function SectionLabel({ number, children, className, ...props }: SectionLabelProps) {
  return (
    <p className={cn('eyebrow inline-flex items-center gap-3 text-brand-gold', className)} {...props}>
      {number && <span className="font-mono text-[0.7rem] font-normal tracking-[0.1em] opacity-70">{number}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  )
}
