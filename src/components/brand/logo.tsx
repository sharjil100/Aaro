import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Aaro logo.
 * - Default: the brand image (public/logo.png) — for light backgrounds.
 * - `light`: a white knockout version for dark backgrounds (e.g. login panel),
 *   since the image has a white background.
 */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  if (light) {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path
              d="M6 8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5V17a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              opacity={0.55}
            />
            <path
              d="M9 9.5a3 3 0 0 1 6 0"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="m9.2 13.6 1.9 1.9 3.7-3.9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-display text-xl font-extrabold tracking-tight text-white">
          aaro<span className="text-accent-400">.</span>
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/aaro-logo.png"
      alt="Aaro — More shops. More trust."
      width={2172}
      height={724}
      priority
      unoptimized
      className={cn("h-8 w-auto sm:h-9", className)}
    />
  );
}
