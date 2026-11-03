import * as React from 'react';
import { cn } from '@/lib/utils';

export const inputClass =
  'w-full min-w-0 rounded-sm border border-input bg-[rgba(11,18,13,0.6)] px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-dim focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive';

export function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(inputClass, className)} {...props} />;
}
