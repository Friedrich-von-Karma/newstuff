import * as React from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Przycisk shadcn/ui w stylu „Nocnego terrarium”: wersaliki, rozstrzelone litery, bursztyn.
 * W plikach .astro dla linków używaj `buttonVariants()` na zwykłym <a>.
 */
export const buttonVariants = cva(
  "group/btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-sm border font-semibold uppercase tracking-[0.16em] no-underline transition-[background,color,border-color,box-shadow] duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-amber-light hover:shadow-[0_0_30px_rgba(232,165,71,0.35)]',
        outline: 'border-primary bg-transparent text-amber-light hover:bg-accent',
        secondary: 'border-border bg-transparent text-foreground hover:border-primary hover:text-amber-light',
        ghost: 'border-transparent bg-transparent text-muted-foreground hover:bg-accent hover:text-amber-light',
        link: 'border-transparent bg-transparent px-0 text-amber-light underline-offset-4 hover:underline',
        destructive: 'border-destructive bg-destructive text-white hover:bg-transparent hover:text-destructive',
      },
      size: {
        default: 'px-[18px] py-3 text-[13px]',
        sm: 'px-3.5 py-[9px] text-xs',
        lg: 'px-6 py-3.5 text-sm',
        icon: 'size-10 rounded-full p-0',
        'icon-sm': 'size-8 rounded-full p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

/** Strzałka, która przesuwa się po najechaniu na przycisk. */
export const arrowClass = 'inline-block transition-transform duration-300 group-hover/btn:translate-x-1';
