import * as React from 'react';
import { cn } from '@/lib/utils';

const dot: Record<string, string> = {
  available: 'var(--c-available)',
  low: 'var(--c-low)',
  out: 'var(--c-out)',
  soon: 'var(--c-soon)',
};

/** Dostępność w cenniku: świecąca kropka + etykieta (shadcn Badge bez ramki). */
export function StatusBadge({ status, className, children }: { status: string; className?: string; children: React.ReactNode }) {
  const c = dot[status] ?? 'var(--muted)';
  return (
    <span
      data-slot="badge"
      data-status={status}
      className={cn('inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground', className)}
    >
      <span
        aria-hidden="true"
        className="size-2 rounded-full"
        style={{ background: c, boxShadow: `0 0 0 3px color-mix(in srgb, ${c} 25%, transparent), 0 0 14px ${c}` }}
      />
      {children}
    </span>
  );
}
