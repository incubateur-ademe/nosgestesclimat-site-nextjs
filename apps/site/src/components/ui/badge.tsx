import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border-2 px-2 leading-none font-black whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        primary: "border-primary-300 text-primary-700 bg-primary-50",
        secondary:
          "border-secondary-700 text-secondary-700 bg-secondary-50",
        green: "border-green-300 text-green-700 bg-green-50",
        red: "border-red-300 text-red-700 bg-red-50",
        purple: "border-purple-300 text-purple-800 bg-purple-50",
        yellow: "border-yellow-300 text-yellow-800 bg-yellow-50",
        blue: "border-blue-300 text-blue-800 bg-blue-50",
        orange: "border-orange-300 text-orange-800 bg-orange-50",
        light: "border-0 bg-primary-100 text-primary-800",
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
      },
      size: {
        xs: "text-xs py-0.5",
        sm: "text-sm py-0.5",
        md: "text-base py-1",
      },
      borderless: {
        true: "border-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Badge({
  className,
  variant = "primary",
  size = "md",
  borderless = false,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size, borderless }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
