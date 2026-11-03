import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type LightboxItem = {
  kind: 'photo' | 'video';
  title: string;
  caption?: string;
  speciesName?: string;
  speciesUrl?: string;
  date?: string;
  iso?: string;
  src?: string;
  youtube?: string;
  poster?: string;
  sample?: boolean;
  placeholder?: boolean;
};

/**
 * Powiększanie zdjęć i filmów (shadcn Dialog).
 * Otwiera się po kliknięciu elementu z `data-open="<indeks>"` wewnątrz `[data-lightbox-root="<root>"]`;
 * przewijanie strzałkami / palcem po elementach widocznych (nieukrytych przez filtr).
 */
export default function Lightbox({
  root,
  items,
  labels,
}: {
  root: string;
  items: LightboxItem[];
  labels: { close: string; prev: string; next: string; of: string; sample: string; profile: string; placeholderPhoto: string; placeholderVideo: string };
}) {
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState<number[]>([]);
  const [pos, setPos] = React.useState(0);
  const touchX = React.useRef<number | null>(null);

  React.useEffect(() => {
    const box = document.querySelector<HTMLElement>(`[data-lightbox-root="${root}"]`);
    if (!box) return;
    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>('[data-open]');
      if (!b || !box.contains(b)) return;
      e.preventDefault();
      const visible = [...box.querySelectorAll<HTMLElement>('[data-open]')]
        .filter((el) => !el.closest('[hidden]'))
        .map((el) => Number(el.dataset.open));
      const i = Number(b.dataset.open);
      setOrder(visible);
      setPos(Math.max(0, visible.indexOf(i)));
      setOpen(true);
    };
    box.addEventListener('click', onClick);
    return () => box.removeEventListener('click', onClick);
  }, [root]);

  const step = (d: number) => setPos((p) => (order.length ? (p + d + order.length) % order.length : 0));
  const it = items[order[pos]];
  const many = order.length > 1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeLabel={labels.close}
        className="max-w-[min(1100px,calc(100vw-2rem))] gap-0 overflow-hidden p-0"
        onKeyDown={(e) => {
          const tag = (e.target as HTMLElement).tagName;
          if (tag === 'VIDEO' || tag === 'IFRAME') return;
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {it && (
          <>
            <div className="relative grid min-h-[200px] place-items-center bg-black/60">
              {it.placeholder ? (
                <div className="grid place-items-center gap-2 p-16 text-center text-muted-foreground">
                  <span className="text-3xl text-amber">{it.kind === 'video' ? '▶' : '◎'}</span>
                  <b className="text-xs uppercase tracking-[0.2em]">{it.kind === 'video' ? labels.placeholderVideo : labels.placeholderPhoto}</b>
                </div>
              ) : it.kind === 'photo' ? (
                <img key={it.src} src={it.src} alt={it.title} referrerPolicy="no-referrer" className="max-h-[72vh] w-auto max-w-full object-contain animate-in fade-in-0" />
              ) : it.youtube ? (
                <div className="aspect-video w-full">
                  <iframe
                    className="size-full"
                    src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(it.youtube)}?rel=0`}
                    title={it.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video key={it.src} src={it.src} poster={it.poster} controls playsInline preload="metadata" className="max-h-[72vh] w-full" />
              )}
              {many && (
                <>
                  <Button variant="secondary" size="icon" aria-label={labels.prev} onClick={() => step(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-popover/80">
                    <ChevronLeftIcon />
                  </Button>
                  <Button variant="secondary" size="icon" aria-label={labels.next} onClick={() => step(1)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-popover/80">
                    <ChevronRightIcon />
                  </Button>
                </>
              )}
            </div>
            <div className="grid gap-1.5 border-t border-border p-5 pr-14">
              <div className="flex flex-wrap items-center gap-3">
                <DialogTitle>{it.title}</DialogTitle>
                {it.sample && <Badge>{labels.sample}</Badge>}
                {many && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    <b className="font-serif text-base font-normal text-amber-light">{pos + 1}</b> {labels.of} {order.length}
                  </span>
                )}
              </div>
              <DialogDescription asChild>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {it.date && <time dateTime={it.iso}>{it.date}</time>}
                  {it.speciesName &&
                    (it.speciesUrl ? (
                      <a href={it.speciesUrl} className="text-amber-light">
                        <i>{it.speciesName}</i> <small>{labels.profile} →</small>
                      </a>
                    ) : (
                      <i>{it.speciesName}</i>
                    ))}
                </div>
              </DialogDescription>
              {it.caption && <p className="m-0 text-[15px] text-[#d3cfbf]">{it.caption}</p>}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
