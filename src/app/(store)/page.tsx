import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Truck,
  Star,
  ArrowRight,
  Zap,
  Store,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/store/product-card";
import { SellerCard } from "@/components/store/seller-card";
import { Thumb } from "@/components/store/thumb";
import { CategoryIcon } from "@/components/icon";
import {
  categories,
  products,
  dealProducts,
  newProducts,
  trustedSellers,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { productKeyword } from "@/lib/images";

function SectionHeader({
  eyebrow,
  title,
  href,
  icon: Icon,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-600">
            {Icon && <Icon className="h-4 w-4" />}
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const deals = dealProducts().slice(0, 5);
  const fresh = [...newProducts(), ...products].slice(0, 5);
  const recommended = products.slice(0, 10);
  const shops = trustedSellers().slice(0, 4);

  return (
    <div className="pb-4">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="container-aaro relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          {/* copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Bangladesh&apos;s trusted marketplace
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ink text-balance sm:text-5xl lg:text-6xl">
              More shops.{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                More trust.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-base text-muted text-pretty">
              Discover thousands of verified Bangladeshi shops in one place — fashion,
              beauty, gadgets and more. Real ratings, cash on delivery, and proper
              complaint support.
            </p>

            <form action="/products" className="relative mt-6 flex max-w-md items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-faint" />
              <input
                name="q"
                placeholder="Search 1.8M+ products…"
                className="h-14 w-full rounded-2xl border border-line bg-surface pl-12 pr-32 text-sm shadow-card outline-none placeholder:text-faint focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
              />
              <Button type="submit" size="md" className="absolute right-2">
                Search
              </Button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" /> Verified sellers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-brand-600" /> COD available
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-accent-400 text-accent-400" /> 4.8 avg rating
              </span>
            </div>

            <div className="mt-8 flex gap-8">
              {[
                { n: "12,400+", l: "Verified shops" },
                { n: "1.8M+", l: "Products" },
                { n: "98%", l: "On-time delivery" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-extrabold text-ink">{s.n}</div>
                  <div className="text-xs text-faint">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl gradient-mesh p-6 shadow-pop">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="relative grid h-full grid-cols-2 grid-rows-2 gap-4">
                {products.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="overflow-hidden rounded-2xl bg-white/90 p-2 shadow-card backdrop-blur"
                  >
                    <Thumb seed={p.slug} label={p.title} query={productKeyword(p.categorySlug)} className="h-full w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute -left-4 top-10 flex items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2 shadow-pop">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <span className="text-xs">
                <span className="block font-bold text-ink">Shop verified</span>
                <span className="block text-faint">Identity checked</span>
              </span>
            </div>
            <div className="absolute -bottom-4 right-6 flex items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2 shadow-pop">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-100 text-accent-600">
                <Truck className="h-5 w-5" />
              </span>
              <span className="text-xs">
                <span className="block font-bold text-ink">COD available</span>
                <span className="block text-faint">Pay on delivery</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CATEGORIES ===================== */}
      <section className="container-aaro pt-6">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-4 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-pop"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <CategoryIcon name={c.icon} className="h-6 w-6" />
              </span>
              <span className="text-center text-xs font-semibold text-ink">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================== FLASH DEALS ===================== */}
      <section className="container-aaro pt-14">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
          <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-rose-500 to-accent-500 px-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <Zap className="h-6 w-6 fill-white" />
              <h2 className="font-display text-xl font-extrabold sm:text-2xl">Flash Deals</h2>
              <Badge tone="solidDark" size="md" className="ml-2 hidden sm:inline-flex">
                Ends in 04 : 12 : 36
              </Badge>
            </div>
            <Link
              href="/products?deal=1"
              className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 lg:grid-cols-5">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TRUSTED SHOPS ===================== */}
      <section className="container-aaro pt-14">
        <SectionHeader
          eyebrow="Trusted by thousands"
          title="Featured verified shops"
          href="/shops"
          icon={Store}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shops.map((s) => (
            <SellerCard key={s.id} seller={s} />
          ))}
        </div>
      </section>

      {/* ===================== NEW ARRIVALS ===================== */}
      <section className="container-aaro pt-14">
        <SectionHeader eyebrow="Fresh in" title="New arrivals" href="/products?sort=new" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {fresh.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ===================== RECOMMENDED ===================== */}
      <section className="container-aaro pt-14">
        <SectionHeader
          eyebrow="Picked for you"
          title="Recommended products"
          href="/products"
          icon={TrendingUp}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ===================== SELLER CTA ===================== */}
      <section className="container-aaro pt-16">
        <div className="relative overflow-hidden rounded-3xl gradient-mesh px-6 py-12 text-center shadow-pop sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <Store className="h-3.5 w-3.5" /> For sellers
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white text-balance sm:text-4xl">
              Keep your payment. Keep your shop. Get more orders.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-emerald-50/90">
              You collect customer payments directly. Aaro only charges a small
              commission after a successful delivery — and you get a professional
              dashboard, real orders, and a trust badge.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/seller/register"
                className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
              >
                Start selling
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/seller"
                className={cn(buttonVariants({ variant: "outlineLight", size: "lg" }))}
              >
                Explore Seller Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
