import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

export const toggleItemClass =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-3 py-2 text-[13px] text-muted-foreground transition-colors outline-none hover:border-primary/60 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 data-[state=on]:border-primary data-[state=on]:bg-primary/15 data-[state=on]:text-amber-light';

export function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('flex flex-wrap gap-1.5', className)} {...props} />;
}
export function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn(toggleItemClass, className)} {...props} />;
}
