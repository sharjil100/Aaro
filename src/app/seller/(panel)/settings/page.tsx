import { Store, Link2, Wallet, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSeller } from "@/lib/data";

export const metadata = { title: "Settings" };

function Field({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted">{label}</label>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface"
      />
    </div>
  );
}

export default function SellerSettings() {
  const seller = getSeller("s1")!;
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your shop profile, links and payout details.</p>
      </div>

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-card">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
          <Store className="h-5 w-5 text-brand-600" /> Shop profile
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Shop name" value={seller.shopName} />
          <Field label="Owner name" value={seller.ownerName} />
          <Field label="Phone" placeholder="01XXXXXXXXX" />
          <Field label="City / area" value={seller.city} />
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-card">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
          <Link2 className="h-5 w-5 text-brand-600" /> Social links
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Facebook page" value={seller.socials.facebook} />
          <Field label="Instagram" value={seller.socials.instagram} />
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-card">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
          <Wallet className="h-5 w-5 text-brand-600" /> Payment for dues
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="bKash / Nagad number" placeholder="01XXXXXXXXX" />
          <Field label="Bank account (optional)" placeholder="Account no." />
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5 shadow-card">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
          <Bell className="h-5 w-5 text-brand-600" /> Notifications
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {["New order alerts", "Due deadline reminders", "Payment approval updates"].map((n) => (
            <li key={n} className="flex items-center justify-between">
              <span className="text-ink">{n}</span>
              <span className="inline-flex h-6 w-11 items-center rounded-full bg-brand-600 p-0.5">
                <span className="h-5 w-5 translate-x-5 rounded-full bg-white transition" />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" size="md">Cancel</Button>
        <Button variant="primary" size="md">Save changes</Button>
      </div>
    </div>
  );
}
