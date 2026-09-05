import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        // Brand CTAs — used on both ivory and teal surfaces
        gold:
          "rounded-full bg-brand-gold text-brand-teal-deep font-sans text-[0.75rem] font-semibold tracking-[0.18em] uppercase hover:bg-brand-gold-soft [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
        ink:
          "rounded-full bg-brand-teal-deep text-brand-ivory font-sans text-[0.75rem] font-semibold tracking-[0.18em] uppercase hover:bg-brand-teal [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
        ivory:
          "rounded-full bg-brand-ivory text-brand-teal-deep font-sans text-[0.75rem] font-semibold tracking-[0.18em] uppercase hover:bg-white [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
        "outline-light":
          "rounded-full border-brand-ivory/50 bg-transparent text-brand-ivory font-sans text-[0.75rem] font-semibold tracking-[0.18em] uppercase hover:border-brand-ivory hover:bg-brand-ivory hover:text-brand-teal-deep [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
        "outline-dark":
          "rounded-full border-brand-teal-deep/40 bg-transparent text-brand-teal-deep font-sans text-[0.75rem] font-semibold tracking-[0.18em] uppercase hover:border-brand-teal-deep hover:bg-brand-teal-deep hover:text-brand-ivory [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
        "text-link":
          "rounded-none border-0 bg-transparent p-0 h-auto font-sans text-[0.75rem] font-semibold tracking-[0.18em] uppercase underline decoration-brand-gold/60 underline-offset-[6px] hover:decoration-brand-gold [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:translate-x-1",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        pill: "h-12 gap-3 px-7 sm:h-13 sm:px-8",
        "pill-sm": "h-10 gap-2 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
