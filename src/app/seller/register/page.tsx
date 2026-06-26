import Link from "next/link";
import {
  Store,
  Wallet,
  Link2,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata = { title: "Become a Seller" };

function Field({
  label,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
      <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
        <Icon className="h-5 w-5 text-brand-600" />
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function SellerRegister() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* top bar */}
      <header className="border-b border-line bg-surface">
        <div className="container-aaro flex h-16 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <span className="text-sm text-muted">
            Already have a shop?{" "}
            <Link href="/login" className="font-semibold text-brand-700">Sign in</Link>
          </span>
        </div>
      </header>

      <div className="container-aaro grid gap-8 py-10 lg:grid-cols-3">
        {/* benefits */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
              <Store className="h-3.5 w-3.5" /> Seller onboarding
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
              Start selling on Aaro
            </h1>
            <p className="mt-2 text-pretty text-muted">
              Keep your payment. Keep your shop. Get more orders — and pay Aaro a small
              commission only after a successful delivery.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                { icon: Wallet, t: "You collect payment", s: "COD goes straight to you — Aaro never holds your sales money." },
                { icon: TrendingUp, t: "More orders", s: "Reach customers across Bangladesh from one trusted marketplace." },
                { icon: BadgeCheck, t: "Trust badge", s: "Get verified and stand out with a Trusted Seller badge." },
                { icon: ShieldCheck, t: "Pro dashboard", s: "Orders, products, dues and analytics — all in one place." },
              ].map((x) => (
                <li key={x.t} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-brand-600 shadow-card">
                    <x.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{x.t}</span>
                    <span className="block text-xs text-muted">{x.s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* form */}
        <div className="space-y-5 lg:col-span-2">
          <SectionCard icon={Store} title="Shop details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Shop name" placeholder="e.g. Dhaka Threads" required />
              <Field label="Owner name" placeholder="Your full name" required />
              <Field label="Business address" placeholder="Street, area" />
              <Field label="City / area" placeholder="e.g. Dhaka" required />
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-muted">Product categories</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((c, i) => (
                  <span
                    key={c.slug}
                    className={cn(
                      "cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium",
                      i < 2
                        ? "border-brand-600 bg-brand-50 text-brand-700"
                        : "border-line bg-surface text-muted hover:border-brand-300",
                    )}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="Contact & login">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone number" placeholder="01XXXXXXXXX" required />
              <Field label="Email" placeholder="you@shop.com" type="email" required />
              <Field label="Password" placeholder="Create a password" type="password" required />
              <Field label="Confirm password" placeholder="Repeat password" type="password" required />
            </div>
          </SectionCard>

          <SectionCard icon={Link2} title="Social presence (optional)">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Facebook page" placeholder="facebook.com/yourpage" />
              <Field label="Instagram" placeholder="@yourshop" />
              <Field label="TikTok" placeholder="@yourshop" />
              <Field label="Website" placeholder="https://" />
            </div>
          </SectionCard>

          <SectionCard icon={Wallet} title="Payment for dues">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="bKash / Nagad number" placeholder="01XXXXXXXXX" required />
              <Field label="Bank account (optional)" placeholder="Account number" />
            </div>
          </SectionCard>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-line accent-brand-600" />
              I accept the <span className="font-semibold text-brand-700">Aaro Seller Agreement</span>, return policy and commission terms.
            </label>
            <Link
              href="/seller"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-5 w-full")}
            >
              Submit application <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-faint">
              Our team reviews applications within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
