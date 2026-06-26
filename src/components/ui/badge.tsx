import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-semibold leading-none",
  {
    variants: {
      tone: {
        brand: "bg-brand-50 text-brand-700",
        accent: "bg-accent-100 text-accent-600",
        deal: "bg-rose-50 text-rose-600",
        info: "bg-trust-500/10 text-trust-600",
        neutral: "bg-black/5 text-muted",
        solidBrand: "bg-brand-600 text-white",
        solidDeal: "bg-rose-500 text-white",
        solidDark: "bg-ink/85 text-white backdrop-blur",
      },
      size: {
        sm: "px-2 py-1 text-[11px]",
        md: "px-2.5 py-1.5 text-xs",
      },
    },
    defaultVariants: { tone: "neutral", size: "sm" },
  },
);

export function Badge({
  className,
  tone,
  size,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone, size }), className)} {...props} />;
}
