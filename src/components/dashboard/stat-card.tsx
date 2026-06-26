import { type LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  tone = "brand",
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: number;
  tone?: "brand" | "accent" | "rose" | "neutral";
  hint?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    accent: "bg-accent-100 text-accent-600",
    rose: "bg-rose-50 text-rose-600",
    neutral: "bg-black/5 text-ink",
  };
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span className={cn("grid h-11 w-11 place-items-center rounded-xl", tones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        {delta != null && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold",
              delta >= 0 ? "bg-brand-50 text-brand-700" : "bg-rose-50 text-rose-600",
            )}
          >
            {delta >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div className="mt-4 font-display text-2xl font-extrabold text-ink">{value}</div>
      <div className="text-sm text-muted">{label}</div>
      {hint && <div className="mt-1 text-xs text-faint">{hint}</div>}
    </div>
  );
}
