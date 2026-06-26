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
  Store,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);

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
            Join Aaro today.
          </h1>
          <p className="mt-4 max-w-sm text-emerald-50/90">
            Create your free account to shop from thousands of verified Bangladeshi
            shops — with cash on delivery and buyer protection on every order.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              { icon: ShieldCheck, t: "Verified sellers only" },
              { icon: Truck, t: "Cash on delivery nationwide" },
              { icon: Star, t: "Save your favourites & track orders" },
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

          <h2 className="font-display text-2xl font-extrabold text-ink">Create your account</h2>
          <p className="mt-1 text-sm text-muted">It only takes a minute.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            <div>
              <label className="text-xs font-semibold text-muted">Full name</label>
              <input
                placeholder="Your name"
                className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted">Phone number</label>
              <input
                placeholder="01XXXXXXXXX"
                className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted">Email (optional)</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="mt-1 h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted">Password</label>
              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Create a password"
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

            <label className="flex cursor-pointer items-start gap-2 text-xs text-muted">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-line accent-brand-600" />
              I agree to Aaro&apos;s Terms and Privacy Policy.
            </label>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-700">Sign in</Link>
          </p>

          <div className="mt-4 rounded-xl border border-line bg-canvas p-3 text-center text-sm">
            <span className="text-muted">Want to sell instead? </span>
            <Link href="/seller/register" className="inline-flex items-center gap-1 font-semibold text-brand-700">
              <Store className="h-4 w-4" /> Become a seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
