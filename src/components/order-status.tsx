import type { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const cfg: Record<OrderStatus, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
  accepted: { label: "Accepted", cls: "bg-trust-500/10 text-trust-600" },
  processing: { label: "Processing", cls: "bg-indigo-100 text-indigo-700" },
  shipped: { label: "Shipped", cls: "bg-sky-100 text-sky-700" },
  delivered: { label: "Delivered", cls: "bg-brand-50 text-brand-700" },
  completed: { label: "Completed", cls: "bg-brand-600 text-white" },
  cancelled: { label: "Cancelled", cls: "bg-zinc-200 text-zinc-600" },
  returned: { label: "Returned", cls: "bg-rose-100 text-rose-600" },
  disputed: { label: "Disputed", cls: "bg-rose-600 text-white" },
};

export function OrderStatusBadge({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  const { label, cls } = cfg[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        cls,
        className,
      )}
    >
      {label}
    </span>
  );
}
