import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium font-body transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-lux-gold/10 text-lux-gold border border-lux-gold/30',
        secondary: 'bg-lux-brown text-lux-cream-dim border border-white/10',
        outline: 'border border-lux-gold/30 text-lux-cream-dim',
        hospitality: 'bg-[#3d1a0a]/60 text-[#e8956a] border border-[#c85d28]/30',
        hotel: 'bg-[#0a0f1e]/60 text-[#8ab4d4] border border-[#3a6080]/30',
        shop: 'bg-[#1e1208]/60 text-[#d4a86a] border border-[#8a5a28]/30',
        beauty: 'bg-[#1e0f18]/60 text-[#d4a0c0] border border-[#8a4060]/30',
        health: 'bg-[#0d1a0d]/60 text-[#a8c898] border border-[#4a6a30]/30',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
