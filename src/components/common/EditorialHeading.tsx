import type { ReactNode, HTMLAttributes, ElementType } from 'react'
import { cn } from '@/lib/utils'

interface EditorialHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4
  size?: 'hero' | 'display' | 'xl' | 'lg' | 'md'
  italicAccent?: string
  children: ReactNode
  darkTheme?: boolean
}

export function EditorialHeading({
  level = 2,
  size = 'xl',
  italicAccent,
  children,
  darkTheme = false,
  className,
  ...props
}: EditorialHeadingProps) {
  const sizeClasses = {
    hero: 'text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.95] tracking-[-0.03em]',
    display: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-[-0.025em]',
    xl: 'text-3xl sm:text-5xl md:text-6xl leading-[1.1] tracking-[-0.02em]',
    lg: 'text-2xl sm:text-3xl md:text-4xl leading-[1.2] tracking-[-0.015em]',
    md: 'text-xl sm:text-2xl md:text-3xl leading-[1.25]',
  }

  const Tag = `h${level}` as ElementType

  return (
    <Tag
      className={cn(
        'font-serif font-normal',
        sizeClasses[size],
        darkTheme ? 'text-[#F5F1E8]' : 'text-[#2B211C]',
        className
      )}
      {...props}
    >
      {children}
      {italicAccent && (
        <span className="ml-2 font-serif italic text-[#B08A45] font-light">
          {italicAccent}
        </span>
      )}
    </Tag>
  )
}
