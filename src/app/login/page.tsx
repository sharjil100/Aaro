"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  Star,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Store,
  Shield,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const roles = [
  { key: "customer", label: "Customer", icon: User, dest: "/" },
  { key: "seller", label: "Seller", icon: Store, dest: "/seller" },
  { key: "admin", label: "Admin", icon: Shield, dest: "/admin" },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<(typeof roles)[number]["key"]>("customer");
  const [show, setShow] = useState(false);

  const active = roles.find((r) => r.key === role)!;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* brand panel */}
      <div className="relative hidden gradient-mesh p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <Link href="/" className="relative">
          <Logo light />
        </Link>
        <div className="relative">
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white">
            More shops.
            <br />
            More trust.
          </h1>
          <p className="mt-4 max-w-sm text-emerald-50/90">
            Bangladesh&apos;s trusted marketplace — verified shops, real ratings, and
            cash on delivery you can rely on.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              { icon: ShieldCheck, t: "Verified sellers only" },
              { icon: Truck, t: "Cash on delivery nationwide" },
              { icon: Star, t: "Real ratings & complaint support" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-3 text-emerald-50">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
                  <x.icon className="h-5 w-5" />
                </span>
                {x.t}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-emerald-50/70">© 2026 Aaro · Made in Bangladesh 🇧🇩</p>
      </div>

      {/* form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <h2 className="font-display text-2xl font-extrabold text-ink">Welcome back</h2>
          <p className="mt-1 text-sm text-muted">Sign in to continue to Aaro.</p>

          {/* role tabs */}
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl bg-canvas p-1">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-semibold transition-colors",
                  role === r.key ? "bg-surface text-brand-700 shadow-sm" : "text-muted hover:text-ink",
                )}
              >
                <r.icon className="h-4 w-4" />
                {r.label}
              </button>
            ))}
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(active.dest);
            }}
          >
            <div>
              <label className="text-xs font-semibold text-muted">
                {role === "customer" ? "Phone or email" : "Email"}
              </label>
              <input
                placeholder={role === "customer" ? "01XXXXXXXXX" : "you@shop.com"}
                className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted">Password</label>
                <Link href="#" className="text-xs font-semibold text-brand-700">Forgot?</Link>
              </div>
              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-line bg-canvas px-3 pr-10 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-faint hover:text-ink"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign in as {active.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {role === "seller" ? (
              <>
                New seller?{" "}
                <Link href="/seller/register" className="font-semibold text-brand-700">
                  Create a shop
                </Link>
              </>
            ) : (
              <>
                New to Aaro?{" "}
                <Link href="#" className="font-semibold text-brand-700">
                  Create an account
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
