import { BadgeCheck, ShieldCheck, Crown } from "lucide-react";
import type { VerificationLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const cfg = {
  top: { label: "Top Seller", cls: "bg-accent-100 text-accent-600", Icon: Crown },
  trusted: { label: "Trusted", cls: "bg-brand-50 text-brand-700", Icon: ShieldCheck },
  basic: { label: "Verified", cls: "bg-trust-500/10 text-trust-600", Icon: BadgeCheck },
} as const;

export function VerifiedBadge({
  level,
  className,
  withLabel = true,
}: {
  level: VerificationLevel;
  className?: string;
  withLabel?: boolean;
}) {
  if (level === "unverified") return null;
  const { label, cls, Icon } = cfg[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold leading-none",
        cls,
        className,
      )}
      title={label}
    >
      <Icon className="h-3.5 w-3.5" />
      {withLabel && label}
    </span>
  );
}
