import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Wallet,
  AlertTriangle,
  Store,
  Users,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusPill } from "@/components/status-pill";
import { Button, buttonVariants } from "@/components/ui/button";
import { Thumb } from "@/components/store/thumb";
import { sellers } from "@/lib/data";
import { cn, formatBDT } from "@/lib/utils";
import { SHOP_KEYWORD } from "@/lib/images";

export const metadata = { title: "Admin Overview" };

const proofs = [
  { shop: "GadgetHub BD", slug: "gadgethub-bd", amount: 1340, method: "bKash", txn: "TXN7K2P9", ago: "20 min ago" },
  { shop: "Rong Boutique", slug: "rong-boutique", amount: 420, method: "Nagad", txn: "NGD5530A", ago: "1 hr ago" },
  { shop: "Dhaka Threads", slug: "dhaka-threads", amount: 750, method: "Bank", txn: "BNK99213", ago: "3 hrs ago" },
];

export default function AdminOverview() {
  const totalDue = sellers.reduce((s, x) => s + x.dueOutstanding, 0);
  const overdueAmt = sellers.filter((s) => s.status === "overdue").reduce((a, x) => a + x.dueOutstanding, 0);
  const activeSellers = sellers.filter((s) => s.status === "active").length;
  const attention = [...sellers]
    .filter((s) => s.dueOutstanding > 0 || s.status === "overdue" || s.status === "warning")
    .sort((a, b) => (a.dueDeadlineHours ?? 99) - (b.dueDeadlineHours ?? 99));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Marketplace overview</h1>
        <p className="mt-1 text-sm text-muted">Track GMV, commissions, dues and seller health across Aaro.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total GMV (mo)" value="৳1.24Cr" icon={TrendingUp} delta={18} tone="brand" />
        <StatCard label="Orders (mo)" value="48,200" icon={ShoppingBag} delta={11} tone="brand" />
        <StatCard label="Commission earned" value={formatBDT(784300)} icon={Wallet} delta={14} tone="brand" />
        <StatCard label="Due from sellers" value={formatBDT(totalDue)} icon={Wallet} tone="accent" />
        <StatCard label="Overdue amount" value={formatBDT(overdueAmt)} icon={AlertTriangle} tone="rose" hint="1 seller paused" />
        <StatCard label="Active sellers" value={String(activeSellers)} icon={Store} delta={4} tone="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* sellers needing attention */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-base font-bold text-ink">Sellers needing attention</h2>
              <Link href="/admin/sellers" className="text-sm font-semibold text-brand-700">All sellers</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                    <th className="px-5 py-3 font-semibold">Shop</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Due</th>
                    <th className="px-5 py-3 font-semibold">Deadline</th>
                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attention.map((s) => (
                    <tr key={s.id} className="border-b border-line last:border-0 hover:bg-canvas">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Thumb seed={s.slug} label={s.shopName} query={SHOP_KEYWORD} className="h-9 w-9 shrink-0" rounded="rounded-lg" />
                          <span className="font-medium text-ink">{s.shopName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3"><StatusPill status={s.status} /></td>
                      <td className="px-5 py-3 font-semibold text-ink">{formatBDT(s.dueOutstanding)}</td>
                      <td className="px-5 py-3 text-xs text-faint">
                        {s.dueDeadlineHours == null ? "—" : s.dueDeadlineHours < 0 ? "Overdue" : `${s.dueDeadlineHours}h`}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link href="/admin/sellers" className="text-sm font-semibold text-brand-700">Manage</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* payment proofs */}
        <div>
          <div className="rounded-2xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-base font-bold text-ink">Payment proofs</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">{proofs.length} new</span>
            </div>
            <ul className="divide-y divide-line">
              {proofs.map((p) => (
                <li key={p.txn} className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink">{p.shop}</span>
                    <span className="font-display text-sm font-extrabold text-ink">{formatBDT(p.amount)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-faint">
                    {p.method} · {p.txn} · {p.ago}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button variant="primary" size="sm" className="h-8 flex-1"><Check className="h-4 w-4" /> Approve</Button>
                    <Button variant="secondary" size="sm" className="h-8"><X className="h-4 w-4" /></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/admin/sellers" className={cn(buttonVariants({ variant: "secondary", size: "md" }), "mt-4 w-full justify-between")}>
            <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> 2 new applications</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
