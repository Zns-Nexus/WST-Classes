"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Toggle as TogglePrimitive } from "radix-ui"

const toggleVariants = cva('ui-toggle', {
  variants: {
    variant: { default: '', outline: 'ui-toggle-outline' },
    size: { default: '', sm: 'ui-toggle-sm', lg: 'ui-toggle-lg' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
