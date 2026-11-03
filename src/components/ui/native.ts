/**
 * Natywne pola formularzy w stylu shadcn/ui (jak „native-select” z shadcn) – do użycia w plikach .astro,
 * tam gdzie pole obsługuje zwykły skrypt lub wysyłka formularza (FormSubmit).
 */
import { inputClass } from './input';

export { inputClass };

export const nativeSelectClass = `${inputClass} native-select cursor-pointer appearance-none pr-10`;

export const textareaClass = `${inputClass} min-h-28 resize-y`;

export const nativeCheckboxClass =
  'native-check peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-input bg-[rgba(11,18,13,0.6)] outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 checked:border-primary checked:bg-primary checked:shadow-[0_0_12px_rgba(232,165,71,0.5)] disabled:cursor-not-allowed disabled:opacity-50';

export const nativeSwitchClass =
  "relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full border border-input bg-[rgba(11,18,13,0.6)] outline-none transition-colors before:absolute before:left-[3px] before:top-[3px] before:size-4 before:rounded-full before:bg-muted-foreground before:transition-transform before:content-[''] checked:border-primary checked:bg-primary/20 checked:before:translate-x-5 checked:before:bg-amber-light checked:before:shadow-[0_0_12px_var(--amber)] focus-visible:ring-[3px] focus-visible:ring-ring/50";
