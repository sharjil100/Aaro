import { cn, hashIndex } from "@/lib/utils";

const palettes = [
  "from-emerald-100 to-teal-200",
  "from-amber-100 to-orange-200",
  "from-rose-100 to-pink-200",
  "from-indigo-100 to-violet-200",
  "from-sky-100 to-cyan-200",
  "from-lime-100 to-emerald-200",
  "from-fuchsia-100 to-purple-200",
  "from-stone-200 to-amber-100",
];

/**
 * Branded placeholder "image" tile. Deterministic gradient + monogram so the
 * catalogue looks designed without external image dependencies. Real product
 * images plug in here in Phase 1 (next/image + Cloudflare R2).
 */
export function Thumb({
  seed,
  label,
  className,
  rounded = "rounded-xl",
}: {
  seed: string;
  label: string;
  className?: string;
  rounded?: string;
}) {
  const i = hashIndex(seed, palettes.length);
  const initials = label
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br",
        palettes[i],
        rounded,
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
      <span className="relative font-display text-3xl font-extrabold text-ink/20 select-none">
        {initials || "AA"}
      </span>
    </div>
  );
}
