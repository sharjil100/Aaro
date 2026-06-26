"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Package,
  Menu,
  X,
  ChevronDown,
  Store,
  LayoutGrid,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { CategoryIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Deals", href: "/products?deal=1" },
  { label: "Verified Shops", href: "/shops" },
  { label: "New Arrivals", href: "/products?sort=new" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md">
      {/* primary row */}
      <div className="container-aaro flex h-16 items-center gap-3 lg:gap-6">
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-black/5 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* search */}
        <form
          action="/products"
          className="relative hidden flex-1 items-center md:flex"
        >
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-faint" />
          <input
            name="q"
            placeholder="Search products, brands and shops…"
            className="h-11 w-full rounded-xl border border-line bg-canvas pl-11 pr-28 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-500/20"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1.5 h-8"
          >
            Search
          </Button>
        </form>

        {/* actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link
            href="/login"
            className="hidden flex-col items-start rounded-lg px-3 py-1.5 text-left hover:bg-black/5 sm:flex"
          >
            <span className="text-[11px] leading-none text-faint">Account</span>
            <span className="text-sm font-semibold leading-tight text-ink">Sign in</span>
          </Link>
          <Link
            href="/login"
            className="hidden h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-ink hover:bg-black/5 lg:flex"
          >
            <Package className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-black/5"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
              2
            </span>
          </Link>
          <Link href="/login" className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-black/5 sm:hidden" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* mobile search */}
      <div className="container-aaro pb-3 md:hidden">
        <form action="/products" className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-faint" />
          <input
            name="q"
            placeholder="Search on Aaro…"
            className="h-11 w-full rounded-xl border border-line bg-canvas pl-11 pr-4 text-sm outline-none placeholder:text-faint focus:border-brand-400 focus:bg-surface"
          />
        </form>
      </div>

      {/* category nav row */}
      <div className="hidden border-t border-line bg-surface/60 lg:block">
        <div className="container-aaro flex h-12 items-center gap-1">
          <button
            onClick={() => setMegaOpen((v) => !v)}
            onMouseEnter={() => setMegaOpen(true)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors",
              megaOpen ? "bg-brand-600 text-white" : "text-ink hover:bg-black/5",
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            All Categories
            <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} />
          </button>

          {categories.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-black/5 hover:text-ink"
            >
              {c.name}
            </Link>
          ))}

          <div className="ml-auto flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-semibold text-ink transition-colors hover:bg-black/5"
              >
                {l.label}
              </Link>
            ))}
            <span className="mx-1 h-5 w-px bg-line" />
            <Link
              href="/seller"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              <Store className="h-4 w-4" />
              Seller Center
            </Link>
          </div>
        </div>

        {/* mega panel */}
        {megaOpen && (
          <div
            onMouseLeave={() => setMegaOpen(false)}
            className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-pop"
          >
            <div className="container-aaro grid grid-cols-4 gap-3 py-6">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products?category=${c.slug}`}
                  onClick={() => setMegaOpen(false)}
                  className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-brand-200 hover:bg-brand-50"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-canvas text-brand-600 transition-colors group-hover:bg-white">
                    <CategoryIcon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{c.name}</span>
                    <span className="block text-xs text-faint">
                      {c.productCount.toLocaleString("en-IN")} products
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-line bg-surface lg:hidden">
          <nav className="container-aaro flex flex-col py-3">
            <span className="px-1 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-faint">
              Categories
            </span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-1 py-2.5 text-sm font-medium text-ink hover:bg-black/5"
              >
                <CategoryIcon name={c.icon} className="h-4 w-4 text-brand-600" />
                {c.name}
              </Link>
            ))}
            <span className="mt-2 border-t border-line px-1 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-faint">
              More
            </span>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-1 py-2.5 text-sm font-semibold text-ink hover:bg-black/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/seller"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-1 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Seller Center
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
