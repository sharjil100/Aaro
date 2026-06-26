import { Check, X, Truck, Eye } from "lucide-react";
import { OrderStatusBadge } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { sellerOrders } from "@/lib/data";
import { formatBDT } from "@/lib/utils";

export const metadata = { title: "Orders" };

const tabs = ["All", "New", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function SellerOrders() {
  const orders = sellerOrders.filter((o) => o.sellerId === "s1");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Orders</h1>
        <p className="mt-1 text-sm text-muted">Accept, process and track every order in one place.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold " +
              (i === 0 ? "bg-brand-600 text-white" : "border border-line bg-surface text-muted hover:text-ink")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border border-line bg-surface p-4 shadow-card sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-ink">{o.code}</span>
                <OrderStatusBadge status={o.status} />
              </div>
              <span className="text-xs text-faint">{o.placedAgo}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div className="text-sm">
                <p className="text-muted">
                  <span className="font-medium text-ink">{o.customerName}</span> ·{" "}
                  {o.items.map((it) => `${it.qty}× ${it.productTitle}`).join(", ")}
                </p>
                <p className="mt-1 font-display text-lg font-extrabold text-ink">{formatBDT(o.total)}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {o.status === "pending" ? (
                  <>
                    <Button variant="primary" size="sm"><Check className="h-4 w-4" /> Accept</Button>
                    <Button variant="secondary" size="sm"><X className="h-4 w-4" /> Reject</Button>
                  </>
                ) : o.status === "accepted" || o.status === "processing" ? (
                  <Button variant="primary" size="sm"><Truck className="h-4 w-4" /> Mark shipped</Button>
                ) : o.status === "shipped" ? (
                  <Button variant="primary" size="sm"><Check className="h-4 w-4" /> Mark delivered</Button>
                ) : null}
                <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /> Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
