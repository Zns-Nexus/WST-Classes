import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: 'button-primary',
      outline: 'button-outline',
      secondary: 'button-secondary',
      ghost: 'button-ghost',
      light: 'button-light',
      'on-dark': 'button-on-dark',
      link: 'button-link',
    },
    size: {
      default: '',
      sm: 'button-sm',
      lg: 'button-lg',
      icon: 'button-icon',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

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
