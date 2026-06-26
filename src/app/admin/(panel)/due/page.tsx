import {
  Wallet,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Check,
  X,
  Pause,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusPill } from "@/components/status-pill";
import { Thumb } from "@/components/store/thumb";
import { Button } from "@/components/ui/button";
import { sellers } from "@/lib/data";
import { formatBDT } from "@/lib/utils";

export const metadata = { title: "Due Management" };

const proofs = [
  { shop: "GadgetHub BD", slug: "gadgethub-bd", amount: 1340, method: "bKash", txn: "TXN7K2P9", ago: "20 min ago" },
  { shop: "Rong Boutique", slug: "rong-boutique", amount: 420, method: "Nagad", txn: "NGD5530A", ago: "1 hr ago" },
  { shop: "Dhaka Threads", slug: "dhaka-threads", amount: 750, method: "Bank", txn: "BNK99213", ago: "3 hrs ago" },
];

export default function AdminDue() {
  const withDue = sellers.filter((s) => s.dueOutstanding > 0);
  const totalDue = withDue.reduce((a, s) => a + s.dueOutstanding, 0);
  const overdue = sellers.filter((s) => s.status === "overdue").reduce((a, s) => a + s.dueOutstanding, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Due management</h1>
        <p className="mt-1 text-sm text-muted">
          Track commission dues across all sellers and approve their payments.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total due from sellers" value={formatBDT(totalDue)} icon={Wallet} tone="accent" />
        <StatCard label="Overdue" value={formatBDT(overdue)} icon={AlertTriangle} tone="rose" hint="auto-paused" />
        <StatCard label="Collected today" value={formatBDT(18650)} icon={CheckCircle2} tone="brand" delta={9} />
        <StatCard label="Pending proofs" value={String(proofs.length)} icon={FileCheck} tone="neutral" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* dues across sellers */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <div className="border-b border-line px-5 py-4">
              <h2 className="font-display text-base font-bold text-ink">Outstanding dues by seller</h2>
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
                  {withDue.map((s) => (
                    <tr key={s.id} className="border-b border-line last:border-0 hover:bg-canvas">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Thumb seed={s.slug} label={s.shopName} className="h-9 w-9 shrink-0" rounded="rounded-lg" />
                          <span className="font-medium text-ink">{s.shopName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3"><StatusPill status={s.status} /></td>
                      <td className="px-5 py-3 font-semibold text-ink">{formatBDT(s.dueOutstanding)}</td>
                      <td className="px-5 py-3 text-xs text-faint">
                        {s.dueDeadlineHours == null ? "—" : s.dueDeadlineHours < 0 ? "Overdue" : `${s.dueDeadlineHours}h left`}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1">
                          <button title="Waive / adjust" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-black/5 hover:text-ink">…</button>
                          <button title="Pause" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-accent-100 hover:text-accent-600"><Pause className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* proofs */}
        <div>
          <div className="rounded-2xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-base font-bold text-ink">Payment proofs</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">{proofs.length}</span>
            </div>
            <ul className="divide-y divide-line">
              {proofs.map((p) => (
                <li key={p.txn} className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink">{p.shop}</span>
                    <span className="font-display text-sm font-extrabold text-ink">{formatBDT(p.amount)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-faint">{p.method} · {p.txn} · {p.ago}</p>
                  <div className="mt-2 flex gap-2">
                    <Button variant="primary" size="sm" className="h-8 flex-1"><Check className="h-4 w-4" /> Approve</Button>
                    <Button variant="secondary" size="sm" className="h-8"><X className="h-4 w-4" /></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
