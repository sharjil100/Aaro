import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Bangladeshi Taka (lakh/crore grouping). */
export function formatBDT(amount: number, opts: { decimals?: boolean } = {}) {
  const value = opts.decimals ? amount : Math.round(amount);
  return "৳" + value.toLocaleString("en-IN");
}

/** Compact money for tight UI, e.g. ৳1.2L, ৳3.4K. */
export function compactBDT(amount: number) {
  if (amount >= 1_00_00_000) return "৳" + (amount / 1_00_00_000).toFixed(2).replace(/\.00$/, "") + "Cr";
  if (amount >= 1_00_000) return "৳" + (amount / 1_00_000).toFixed(1).replace(/\.0$/, "") + "L";
  if (amount >= 1_000) return "৳" + (amount / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return "৳" + Math.round(amount);
}

/** Discount percentage from price + discountPrice. */
export function discountPct(price: number, discountPrice?: number | null) {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

/** Deterministic index from a string — used to pick stable placeholder palettes. */
export function hashIndex(input: string, modulo: number) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h % modulo;
}

/** Relative-ish time label for mock timestamps. */
export function timeLeft(hours: number) {
  if (hours <= 0) return "Overdue";
  if (hours < 1) return Math.round(hours * 60) + "m left";
  if (hours < 24) return Math.round(hours) + "h left";
  return Math.round(hours / 24) + "d left";
}
