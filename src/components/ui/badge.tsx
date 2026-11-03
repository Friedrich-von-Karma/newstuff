import * as React from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-primary/50 bg-primary/10 text-amber-light',
        secondary: 'border-border bg-transparent text-muted-foreground',
        success: 'border-fern/45 bg-transparent text-fern',
        destructive: 'border-destructive/50 bg-destructive/10 text-[#e08a72]',
        outline: 'border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
