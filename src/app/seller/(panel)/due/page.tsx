import {
  Wallet,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  Upload,
  ShieldCheck,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { getSeller, sellerDues } from "@/lib/data";
import { cn, formatBDT, timeLeft } from "@/lib/utils";
import type { DueStatus } from "@/lib/types";

export const metadata = { title: "Due & Commission" };

const dueCfg: Record<DueStatus, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
  partial: { label: "Partial", cls: "bg-trust-500/10 text-trust-600" },
  paid: { label: "Paid", cls: "bg-brand-50 text-brand-700" },
  overdue: { label: "Overdue", cls: "bg-rose-100 text-rose-600" },
};

export default function SellerDue() {
  const seller = getSeller("s1")!;
  const dues = sellerDues.filter((d) => d.sellerId === "s1");

  const outstanding = dues
    .filter((d) => d.status !== "paid")
    .reduce((s, d) => s + d.commissionAmount, 0);
  const within48 = dues
    .filter((d) => d.status !== "paid" && d.deadlineHours > 0 && d.deadlineHours <= 48)
    .reduce((s, d) => s + d.commissionAmount, 0);
  const overdue = dues
    .filter((d) => d.deadlineHours < 0 && d.status !== "paid")
    .reduce((s, d) => s + d.commissionAmount, 0);
  const paid = dues.filter((d) => d.status === "paid").reduce((s, d) => s + d.commissionAmount, 0);
  const creditUsed = Math.round((outstanding / seller.creditLimit) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Due &amp; Commission</h1>
        <p className="mt-1 text-sm text-muted">
          You collect customer payments directly — Aaro only charges commission after a successful delivery.
        </p>
      </div>

      {/* deadline alert */}
      <div className="flex flex-col gap-4 rounded-2xl border border-accent-200 bg-accent-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-400 text-ink">
            <Clock className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-base font-bold text-ink">
              {formatBDT(outstanding)} due · deadline in {timeLeft(seller.dueDeadlineHours ?? 31)}
            </h2>
            <p className="text-sm text-accent-700">
              Pay before the deadline to keep your shop active and receiving new orders.
            </p>
          </div>
        </div>
        <Button variant="dark" size="md" className="shrink-0">Pay {formatBDT(outstanding)}</Button>
      </div>

      {/* summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total due to Aaro" value={formatBDT(outstanding)} icon={Wallet} tone="rose" />
        <StatCard label="Due within 48h" value={formatBDT(within48)} icon={Clock} tone="accent" />
        <StatCard label="Overdue" value={formatBDT(overdue)} icon={AlertTriangle} tone="rose" />
        <StatCard label="Paid this month" value={formatBDT(paid)} icon={CheckCircle2} tone="brand" />
      </div>

      {/* credit limit */}
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-ink">Credit limit</span>
          <span className="text-muted">
            {formatBDT(outstanding)} used of {formatBDT(seller.creditLimit)} ·{" "}
            <span className="font-semibold text-brand-700">{formatBDT(seller.creditLimit - outstanding)} remaining</span>
          </span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-canvas">
          <div className={cn("h-full rounded-full", creditUsed > 80 ? "bg-rose-500" : "bg-brand-500")} style={{ width: `${Math.min(creditUsed, 100)}%` }} />
        </div>
        <p className="mt-2 text-xs text-faint">
          If unpaid dues reach your credit limit, new orders are paused until you clear them.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ledger */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <div className="border-b border-line px-5 py-4">
              <h2 className="font-display text-base font-bold text-ink">Commission ledger</h2>
              <p className="text-xs text-faint">Each delivered order creates a commission due entry.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                    <th className="px-5 py-3 font-semibold">Order</th>
                    <th className="px-5 py-3 font-semibold">Order amt</th>
                    <th className="px-5 py-3 font-semibold">Rate</th>
                    <th className="px-5 py-3 font-semibold">Commission</th>
                    <th className="px-5 py-3 font-semibold">Deadline</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dues.map((d) => (
                    <tr key={d.id} className="border-b border-line last:border-0 hover:bg-canvas">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-ink">{d.orderCode}</td>
                      <td className="px-5 py-3 text-muted">{formatBDT(d.orderAmount)}</td>
                      <td className="px-5 py-3 text-muted">{d.commissionRate}%</td>
                      <td className="px-5 py-3 font-semibold text-ink">{formatBDT(d.commissionAmount)}</td>
                      <td className="px-5 py-3 text-xs text-faint">
                        {d.status === "paid" ? "—" : timeLeft(d.deadlineHours)}
                      </td>
                      <td className="px-5 py-3">
                        <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", dueCfg[d.status].cls)}>
                          {dueCfg[d.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* explainer */}
          <div className="mt-4 flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4">
            <Info className="h-5 w-5 shrink-0 text-brand-600" />
            <div className="text-sm text-brand-800">
              <p className="font-semibold">How dues work</p>
              <p className="mt-1 text-brand-700/90">
                You keep the customer&apos;s payment. After an order is delivered, Aaro creates a
                commission due (order amount × your rate). Clear it within 48 hours via bKash, Nagad
                or bank, then submit proof here for admin approval.
              </p>
            </div>
          </div>
        </div>

        {/* payment proof */}
        <div>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-base font-bold text-ink">Submit payment proof</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted">Amount paid</label>
                <input
                  defaultValue={outstanding}
                  className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none focus:border-brand-400 focus:bg-surface"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted">Method</label>
                <select className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none focus:border-brand-400 focus:bg-surface">
                  <option>bKash merchant</option>
                  <option>Nagad</option>
                  <option>Bank transfer</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted">Transaction ID</label>
                <input
                  placeholder="e.g. TXN8H2K9P"
                  className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted">Screenshot</label>
                <div className="mt-1 grid cursor-pointer place-items-center rounded-xl border border-dashed border-line bg-canvas py-6 text-center hover:border-brand-300">
                  <Upload className="h-6 w-6 text-faint" />
                  <span className="mt-1 text-xs text-faint">Tap to upload proof</span>
                </div>
              </div>
              <Button variant="primary" size="md" className="w-full">Submit for approval</Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-faint">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-600" /> Admin verifies within a few hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
