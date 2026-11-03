import * as React from 'react';
import { cn } from '@/lib/utils';

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={cn('w-full caption-bottom border-collapse text-sm', className)} {...props} />
    </div>
  );
}
export function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b [&_tr]:border-border', className)} {...props} />;
}
export function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}
export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr data-slot="table-row" className={cn('border-b border-[var(--line)] transition-colors hover:bg-primary/5', className)} {...props} />;
}
export function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th data-slot="table-head" className={cn('h-11 whitespace-nowrap px-3.5 text-left align-middle text-[11px] font-normal uppercase tracking-[0.18em] text-muted-foreground', className)} {...props} />;
}
export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return <td data-slot="table-cell" className={cn('px-3.5 py-3 align-top text-[#d3cfbf]', className)} {...props} />;
}

/** Te same klasy co w komponentach powyżej – do tabel pisanych bezpośrednio w plikach .astro. */
export const tableClasses = {
  wrap: 'relative w-full overflow-x-auto rounded-md border border-[var(--line)]',
  table: 'w-full caption-bottom border-collapse text-sm',
  header: '[&_tr]:border-b [&_tr]:border-border bg-bg3',
  body: '[&_tr:last-child]:border-0',
  row: 'border-b border-[var(--line)] transition-colors hover:bg-primary/5',
  head: 'h-11 whitespace-nowrap px-3.5 text-left align-middle text-[11px] font-normal uppercase tracking-[0.18em] text-muted-foreground',
  cell: 'px-3.5 py-3 align-top text-[#d3cfbf]',
};
