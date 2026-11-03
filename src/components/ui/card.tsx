import * as React from 'react';
import { cn } from '@/lib/utils';

/** Klasy karty – do użycia też w plikach .astro (`cardClass`). */
export const cardClass =
  'relative flex flex-col gap-4 rounded-md border border-[var(--line)] bg-[linear-gradient(160deg,var(--bg3),var(--bg2))] text-card-foreground';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cn(cardClass, 'p-6', className)} {...props} />;
}
export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cn('grid gap-1.5', className)} {...props} />;
}
export function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('font-serif text-2xl font-light italic leading-tight', className)} {...props} />;
}
export function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('', className)} {...props} />;
}
export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex items-center gap-3', className)} {...props} />;
}
