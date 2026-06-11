import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium font-body transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-lux-gold text-lux-black hover:bg-lux-gold-light hover:scale-105 shadow-lg shadow-lux-gold/20',
        outline: 'border border-lux-cream/30 text-lux-cream hover:border-lux-gold/60 hover:text-lux-gold hover:scale-105 bg-transparent',
        ghost: 'text-lux-cream hover:text-lux-gold hover:bg-lux-brown bg-transparent',
        gold: 'border border-lux-gold/40 text-lux-gold hover:bg-lux-gold hover:text-lux-black hover:scale-105',
        link: 'text-lux-gold underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-7 py-2.5',
        sm: 'h-9 px-5 text-xs',
        lg: 'h-12 px-8 py-3 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
