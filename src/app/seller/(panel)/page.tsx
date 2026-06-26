import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  TrendingUp,
  Wallet,
  Star,
  Package,
  AlertTriangle,
  ArrowRight,
  Plus,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusPill } from "@/components/status-pill";
import { OrderStatusBadge } from "@/components/order-status";
import { buttonVariants } from "@/components/ui/button";
import { getSeller, sellerOrders } from "@/lib/data";
import { cn, formatBDT, timeLeft } from "@/lib/utils";

export const metadata = { title: "Seller Dashboard" };

export default function SellerDashboard() {
  const seller = getSeller("s1")!;
  const orders = sellerOrders.filter((o) => o.sellerId === "s1");
  const pending = orders.filter((o) => o.status === "pending").length;
  const creditUsed = Math.round((seller.dueOutstanding / seller.creditLimit) * 100);

  return (
    <div className="space-y-6">
      {/* heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">
            Welcome back, {seller.ownerName.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted">
            {seller.shopName} <StatusPill status={seller.status} />
          </p>
        </div>
        <Link href="/seller/products" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      {/* due alert */}
      {seller.dueOutstanding > 0 && (
        <div className="overflow-hidden rounded-2xl border border-accent-200 bg-accent-50">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-400 text-ink">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-base font-bold text-ink">
                  Aaro commission due: {formatBDT(seller.dueOutstanding)}
                </h2>
                <p className="text-sm text-accent-700">
                  Clear your due within{" "}
                  <strong>{timeLeft(seller.dueDeadlineHours ?? 0)}</strong> to keep receiving new orders.
                </p>
              </div>
            </div>
            <Link href="/seller/due" className={cn(buttonVariants({ variant: "dark", size: "md" }), "shrink-0")}>
              Pay due now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* credit usage */}
          <div className="border-t border-accent-200 bg-accent-100/50 px-5 py-3">
            <div className="flex items-center justify-between text-xs font-medium text-accent-800">
              <span>Credit limit used</span>
              <span>
                {formatBDT(seller.dueOutstanding)} / {formatBDT(seller.creditLimit)}
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-accent-500"
                style={{ width: `${Math.min(creditUsed, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Today's orders" value="8" icon={ShoppingBag} delta={12} tone="brand" />
        <StatCard label="Pending" value={String(pending)} icon={Clock} tone="accent" hint="Needs your action" />
        <StatCard label="Delivered (mo)" value="142" icon={Package} delta={8} tone="brand" />
        <StatCard label="Sales (mo)" value={formatBDT(240500)} icon={TrendingUp} delta={15} tone="brand" />
        <StatCard label="Commission due" value={formatBDT(seller.dueOutstanding)} icon={Wallet} tone="rose" hint="Due in 31h" />
        <StatCard label="Shop rating" value={seller.rating.toFixed(1)} icon={Star} tone="accent" />
      </div>

      {/* orders + side */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* recent orders */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-base font-bold text-ink">Recent orders</h2>
              <Link href="/seller/orders" className="text-sm font-semibold text-brand-700">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                    <th className="px-5 py-3 font-semibold">Order</th>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Amount</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Placed</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-line last:border-0 hover:bg-canvas">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-ink">{o.code}</td>
                      <td className="px-5 py-3 text-muted">{o.customerName}</td>
                      <td className="px-5 py-3 font-semibold text-ink">{formatBDT(o.total)}</td>
                      <td className="px-5 py-3"><OrderStatusBadge status={o.status} /></td>
                      <td className="px-5 py-3 text-xs text-faint">{o.placedAgo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* side */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-ink">Account health</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {[
                ["On-time due payments", "Good"],
                ["Cancellation rate", "1.2%"],
                ["Response rate", `${seller.responseRate}%`],
                ["Verification", "Top Seller"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between">
                  <span className="text-muted">{k}</span>
                  <span className="font-semibold text-brand-700">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-ink">Quick actions</h2>
            <div className="mt-3 grid gap-2">
              <Link href="/seller/products" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "justify-start")}>
                <Package className="h-4 w-4" /> Manage products
              </Link>
              <Link href="/seller/orders" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "justify-start")}>
                <ShoppingBag className="h-4 w-4" /> View orders
              </Link>
              <Link href="/seller/due" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "justify-start")}>
                <Wallet className="h-4 w-4" /> Pay commission due
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
