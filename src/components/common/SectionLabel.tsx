import type { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionLabelProps extends HTMLAttributes<HTMLDivElement> {
  number?: string
  children: ReactNode
  darkTheme?: boolean
}

export function SectionLabel({
  number,
  children,
  darkTheme = false,
  className,
  ...props
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 font-sans text-[11px] font-semibold tracking-[0.25em] uppercase',
        darkTheme ? 'text-[#B08A45]' : 'text-[#B08A45]',
        className
      )}
      {...props}
    >
      {number && (
        <span className="font-serif italic font-normal tracking-normal text-xs text-[#B08A45]/80">
          [{number}]
        </span>
      )}
      <span className="h-[1px] w-6 bg-[#B08A45]/60" />
      <span>{children}</span>
    </div>
  )
}
