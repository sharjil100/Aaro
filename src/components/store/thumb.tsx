"use client";

import { useState } from "react";
import { cn, hashIndex } from "@/lib/utils";
import { loremflickrUrl, picsumUrl } from "@/lib/images";

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
 * Image tile. When `query` is given, loads a relevant photo (loremflickr →
 * picsum fallback) over a branded gradient/monogram. If both photos fail, the
 * gradient remains — so the UI never shows a broken image.
 */
export function Thumb({
  seed,
  label,
  query,
  className,
  rounded = "rounded-xl",
}: {
  seed: string;
  label: string;
  query?: string;
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

  // 0 = relevant photo, 1 = fallback photo, 2 = gradient only
  const [step, setStep] = useState(0);
  const showImg = !!query && step < 2;
  const src = step === 0 ? loremflickrUrl(query ?? "product", seed) : picsumUrl(seed);

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
      {showImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={label}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setStep((s) => s + 1)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
