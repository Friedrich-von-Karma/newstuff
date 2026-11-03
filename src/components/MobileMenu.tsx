import * as React from 'react';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Link = { href: string; label: string; active?: boolean };

/** Menu na telefonie – panel boczny shadcn (Sheet). */
export default function MobileMenu({
  main,
  extra,
  langs,
  labels,
}: {
  main: Link[];
  extra: Link[];
  langs: { href: string; code: string; name: string }[];
  labels: { menu: string; close: string; more: string };
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={labels.menu}
        className="grid size-10 cursor-pointer place-items-center rounded-full border border-border text-amber-light transition-colors hover:border-primary min-[1081px]:hidden"
      >
        <MenuIcon className="size-5" strokeWidth={1.6} />
      </SheetTrigger>
      <SheetContent side="right" closeLabel={labels.close} className="w-[min(420px,100vw)] overflow-y-auto">
        <SheetTitle className="sr-only">{labels.menu}</SheetTitle>
        <SheetDescription className="sr-only">Blattodea.pl</SheetDescription>
        <nav aria-label={labels.menu} className="flex flex-col gap-1 px-7 pt-16">
          {main.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.active ? 'page' : undefined}
              onClick={() => setOpen(false)}
              className={cn(
                'font-serif text-[clamp(26px,7vw,34px)] italic leading-tight text-foreground no-underline transition-colors hover:text-amber-light',
                l.active && 'text-amber-light',
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Separator className="mx-7 my-2 w-auto bg-[var(--line)]" />
        <div className="px-7">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-dim">{labels.more}</p>
          <ul className="grid gap-2">
            {extra.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={l.active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn('text-[13px] uppercase tracking-[0.14em] text-muted-foreground no-underline hover:text-amber-light', l.active && 'text-amber-light')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto flex gap-2 px-7 pb-8 pt-4">
          {langs.map((l) => (
            <a
              key={l.code}
              href={l.href}
              hrefLang={l.code}
              lang={l.code}
              className="rounded-full border border-border px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground no-underline hover:border-primary hover:text-amber-light"
            >
              {l.name}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
