import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GoldDividerProps extends HTMLAttributes<HTMLDivElement> {
  subtle?: boolean
  withDiamond?: boolean
}

export function GoldDivider({
  subtle = false,
  withDiamond = false,
  className,
  ...props
}: GoldDividerProps) {
  return (
    <div
      className={cn('relative flex items-center justify-center my-8 w-full', className)}
      {...props}
    >
      <div
        className={cn(
          'h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08A45]/40 to-transparent',
          subtle && 'via-[#B08A45]/20'
        )}
      />
      {withDiamond && (
        <div className="absolute h-2 w-2 rotate-45 border border-[#B08A45] bg-[#1F2E2D]" />
      )}
    </div>
  )
}
