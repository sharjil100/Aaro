import { BadgeCheck, Pause, Eye, Search } from "lucide-react";
import { StatusPill } from "@/components/status-pill";
import { VerifiedBadge } from "@/components/store/verified-badge";
import { Thumb } from "@/components/store/thumb";
import { sellers } from "@/lib/data";
import { formatBDT } from "@/lib/utils";
import { SHOP_KEYWORD } from "@/lib/images";

export const metadata = { title: "Sellers" };

const tabs = ["All", "Active", "Warning", "Overdue", "Paused", "Applications (2)"];

export default function AdminSellers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Sellers</h1>
          <p className="mt-1 text-sm text-muted">Approve, verify, set commission and manage seller status.</p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            placeholder="Search shops…"
            className="h-10 w-56 rounded-xl border border-line bg-surface pl-9 pr-3 text-sm outline-none placeholder:text-faint focus:border-brand-400"
          />
        </div>
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

      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                <th className="px-5 py-3 font-semibold">Shop</th>
                <th className="px-5 py-3 font-semibold">Verification</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Comm.</th>
                <th className="px-5 py-3 font-semibold">Due</th>
                <th className="px-5 py-3 font-semibold">Credit limit</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((s) => (
                <tr key={s.id} className="border-b border-line last:border-0 hover:bg-canvas">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Thumb seed={s.slug} label={s.shopName} query={SHOP_KEYWORD} className="h-10 w-10 shrink-0" rounded="rounded-lg" />
                      <div className="min-w-0">
                        <span className="block font-medium text-ink">{s.shopName}</span>
                        <span className="block text-xs text-faint">{s.ownerName} · {s.city}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {s.verification === "unverified" ? (
                      <span className="text-xs text-faint">Unverified</span>
                    ) : (
                      <VerifiedBadge level={s.verification} />
                    )}
                  </td>
                  <td className="px-5 py-3"><StatusPill status={s.status} /></td>
                  <td className="px-5 py-3 text-muted">{s.commissionRate}%</td>
                  <td className="px-5 py-3 font-semibold text-ink">{formatBDT(s.dueOutstanding)}</td>
                  <td className="px-5 py-3 text-muted">{formatBDT(s.creditLimit)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button title="Verify" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-brand-50 hover:text-brand-700"><BadgeCheck className="h-4 w-4" /></button>
                      <button title="Pause" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-accent-100 hover:text-accent-600"><Pause className="h-4 w-4" /></button>
                      <button title="View" className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-black/5 hover:text-ink"><Eye className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
