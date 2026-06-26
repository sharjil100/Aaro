import type { SellerStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const cfg: Record<SellerStatus, { label: string; cls: string; dot: string }> = {
  active: { label: "Active", cls: "bg-brand-50 text-brand-700", dot: "bg-brand-500" },
  warning: { label: "Warning", cls: "bg-accent-100 text-accent-600", dot: "bg-accent-500" },
  due_soon: { label: "Due soon", cls: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  overdue: { label: "Overdue", cls: "bg-rose-100 text-rose-600", dot: "bg-rose-500" },
  paused: { label: "Paused", cls: "bg-zinc-200 text-zinc-700", dot: "bg-zinc-500" },
  suspended: { label: "Suspended", cls: "bg-rose-600 text-white", dot: "bg-white" },
};

export function StatusPill({
  status,
  className,
}: {
  status: SellerStatus;
  className?: string;
}) {
  const { label, cls, dot } = cfg[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        cls,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
}
