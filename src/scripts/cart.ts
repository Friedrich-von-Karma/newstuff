/**
 * Koszyk – trzymany w przeglądarce (localStorage). Zamówienie wysyłane jest jednym e-mailem.
 * Pozycja = gatunek + wariant (nymph | mix | adult), ilość = liczba paczek po 10 szt.
 */
export interface CartLine {
  id: string; // id pozycji cennika
  latin: string;
  kind: 'nymph' | 'mix' | 'adult';
  kindLabel: string;
  price: number; // zł za paczkę 10 szt.
  qty: number;
}

const KEY = 'blattodea-cart-v1';
const EVT = 'cart:change';

function read(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(v) ? v.filter((l) => l && l.id && l.qty > 0) : [];
  } catch {
    return memory;
  }
}
let memory: CartLine[] = [];
function write(lines: CartLine[]) {
  memory = lines;
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* tryb prywatny – koszyk tylko w pamięci strony */
  }
  window.dispatchEvent(new CustomEvent(EVT, { detail: lines }));
}

export const cart = {
  lines: read,
  count: () => read().reduce((n, l) => n + l.qty, 0),
  total: () => read().reduce((n, l) => n + l.qty * l.price, 0),
  add(line: Omit<CartLine, 'qty'>, qty = 1) {
    const lines = read();
    const hit = lines.find((l) => l.id === line.id && l.kind === line.kind);
    if (hit) hit.qty = Math.min(99, hit.qty + qty);
    else lines.push({ ...line, qty });
    write(lines);
  },
  setQty(id: string, kind: string, qty: number) {
    const lines = read()
      .map((l) => (l.id === id && l.kind === kind ? { ...l, qty: Math.max(0, Math.min(99, qty)) } : l))
      .filter((l) => l.qty > 0);
    write(lines);
  },
  remove(id: string, kind: string) {
    write(read().filter((l) => !(l.id === id && l.kind === kind)));
  },
  clear() {
    write([]);
  },
  onChange(fn: (lines: CartLine[]) => void) {
    window.addEventListener(EVT, (e) => fn((e as CustomEvent<CartLine[]>).detail));
    window.addEventListener('storage', (e) => {
      if (e.key === KEY) fn(read());
    });
  },
};

/** Otwiera szufladę koszyka (obsługiwane przez CartDrawer). */
export function openCart() {
  window.dispatchEvent(new CustomEvent('cart:open'));
}
