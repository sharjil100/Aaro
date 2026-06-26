import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Store,
  MessageCircle,
  Flag,
  Check,
  Star,
} from "lucide-react";
import { Thumb } from "@/components/store/thumb";
import { RatingStars } from "@/components/store/rating-stars";
import { VerifiedBadge } from "@/components/store/verified-badge";
import { ProductCard } from "@/components/store/product-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  getProductBySlug,
  getSeller,
  getCategory,
  productsByCategory,
} from "@/lib/data";
import { cn, discountPct, formatBDT } from "@/lib/utils";
import { productKeyword } from "@/lib/images";

const reviews = [
  { name: "Sumaiya R.", rating: 5, text: "Exactly as described, fast delivery and the seller was very responsive. Highly recommend!", ago: "3 days ago" },
  { name: "Imran H.", rating: 4, text: "Good quality for the price. COD was smooth, paid on delivery without any issue.", ago: "1 week ago" },
  { name: "Nabila K.", rating: 5, text: "Verified shop, trusted them and was not disappointed. Will order again.", ago: "2 weeks ago" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const seller = getSeller(product.sellerId);
  const cat = getCategory(product.categorySlug);
  const off = discountPct(product.price, product.discountPrice);
  const price = product.discountPrice ?? product.price;
  const related = productsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="container-aaro py-6">
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-faint">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <ChevronRight className="h-4 w-4" />
        {cat && (
          <>
            <Link href={`/products?category=${cat.slug}`} className="hover:text-brand-700">
              {cat.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="line-clamp-1 font-medium text-ink">{product.title}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        {/* gallery */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-line bg-surface p-3 shadow-card">
            <Thumb seed={product.slug} label={product.title} query={productKeyword(product.categorySlug)} className="aspect-square w-full" rounded="rounded-2xl" />
          </div>
          <div className="mt-3 flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-xl border bg-surface p-1",
                  i === 0 ? "border-brand-500 ring-2 ring-brand-500/20" : "border-line",
                )}
              >
                <Thumb seed={product.slug + i} label={product.title} query={productKeyword(product.categorySlug)} className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {seller && <VerifiedBadge level={seller.verification} />}
            {product.badges?.includes("trending") && <Badge tone="accent" size="md">🔥 Trending</Badge>}
            {product.freeDelivery && (
              <Badge tone="brand" size="md">
                <Truck className="h-3.5 w-3.5" /> Free delivery
              </Badge>
            )}
          </div>

          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <RatingStars value={product.rating} count={product.ratingCount} />
            <span className="text-sm text-muted">
              {product.sold.toLocaleString("en-IN")} sold
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              <Check className="h-4 w-4" /> In stock
            </span>
          </div>

          {/* price */}
          <div className="mt-5 rounded-2xl border border-line bg-canvas p-5">
            <div className="flex flex-wrap items-end gap-3">
              <span className="font-display text-4xl font-extrabold text-ink">
                {formatBDT(price)}
              </span>
              {off > 0 && (
                <>
                  <span className="pb-1 text-lg text-faint line-through">
                    {formatBDT(product.price)}
                  </span>
                  <Badge tone="solidDeal" size="md" className="mb-1.5">-{off}%</Badge>
                </>
              )}
            </div>
            {off > 0 && (
              <p className="mt-1 text-sm font-semibold text-brand-700">
                You save {formatBDT(product.price - price)}
              </p>
            )}
          </div>

          {/* variants */}
          <div className="mt-5 space-y-4">
            <div>
              <span className="text-sm font-semibold text-ink">Size</span>
              <div className="mt-2 flex gap-2">
                {["S", "M", "L", "XL"].map((s, i) => (
                  <span
                    key={s}
                    className={cn(
                      "grid h-10 min-w-10 cursor-pointer place-items-center rounded-xl border px-3 text-sm font-medium",
                      i === 1 ? "border-brand-600 bg-brand-50 text-brand-700" : "border-line text-muted hover:border-brand-300",
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold text-ink">Quantity</span>
              <div className="mt-2 flex items-center gap-3">
                <div className="inline-flex items-center rounded-xl border border-line">
                  <span className="grid h-10 w-10 place-items-center text-muted"><Minus className="h-4 w-4" /></span>
                  <span className="grid h-10 w-12 place-items-center border-x border-line font-semibold">1</span>
                  <span className="grid h-10 w-10 place-items-center text-muted"><Plus className="h-4 w-4" /></span>
                </div>
                <span className="text-sm text-faint">{product.stock} pieces available</span>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/cart" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "flex-1")}>
              <ShoppingCart className="h-5 w-5" /> Add to cart
            </Link>
            <Link href="/cart" className={cn(buttonVariants({ variant: "accent", size: "lg" }), "flex-1")}>
              Buy now
            </Link>
          </div>

          {/* delivery / trust */}
          <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-surface p-5 shadow-card sm:grid-cols-2">
            {[
              { icon: Truck, t: "Cash on delivery", s: `Delivery in ${product.deliveryDays}` },
              { icon: ShieldCheck, t: "Buyer protection", s: "Verified seller & secure order" },
              { icon: RotateCcw, t: "Easy returns", s: "Return within return window" },
              { icon: MessageCircle, t: "Complaint support", s: "Aaro helps resolve issues" },
            ].map((x) => (
              <div key={x.t} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <x.icon className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{x.t}</span>
                  <span className="block text-xs text-muted">{x.s}</span>
                </span>
              </div>
            ))}
          </div>

          {/* seller */}
          {seller && (
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card">
              <Thumb seed={seller.slug} label={seller.shopName} className="h-14 w-14" rounded="rounded-2xl" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold text-ink">{seller.shopName}</span>
                  <VerifiedBadge level={seller.verification} withLabel={false} />
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted">
                  <RatingStars value={seller.rating} />
                  <span>{seller.responseRate}% response</span>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link href={`/shop/${seller.slug}`} className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
                  <Store className="h-4 w-4" /> Visit shop
                </Link>
              </div>
            </div>
          )}

          <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-faint hover:text-rose-600">
            <Flag className="h-3.5 w-3.5" /> Report this product
          </button>
        </div>
      </div>

      {/* description + specs */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-ink">Description</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The {product.title} is sourced directly from {seller?.shopName ?? "a verified Aaro seller"}.
            Carefully selected for quality and value, it ships from {seller?.city ?? "Bangladesh"} with
            cash-on-delivery available nationwide. Aaro verifies the shop&apos;s identity and tracks every
            order so you can buy with confidence.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {["Quality checked", "Genuine product", "Secure COD order", "Return supported"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-ink">
                <Check className="h-4 w-4 text-brand-600" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink">Specifications</h2>
          <dl className="mt-3 divide-y divide-line text-sm">
            {[
              ["Category", cat?.name ?? "—"],
              ["Shop", seller?.shopName ?? "—"],
              ["Ships from", seller?.city ?? "—"],
              ["Delivery", product.deliveryDays],
              ["Payment", "COD / bKash / Nagad"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* reviews */}
      <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-lg font-bold text-ink">Customer reviews</h2>
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-extrabold text-ink">{product.rating.toFixed(1)}</span>
            <div>
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-accent-400 text-accent-400" : "text-line")} />
                ))}
              </div>
              <span className="text-xs text-faint">{product.ratingCount.toLocaleString("en-IN")} ratings</span>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-xl border border-line bg-canvas p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{r.name}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                  <Check className="h-3 w-3" /> Verified
                </span>
              </div>
              <div className="mt-1 flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5", i < r.rating ? "fill-accent-400 text-accent-400" : "text-line")} />
                ))}
              </div>
              <p className="mt-2 text-sm text-muted">{r.text}</p>
              <span className="mt-2 block text-xs text-faint">{r.ago}</span>
            </div>
          ))}
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-5 font-display text-2xl font-extrabold text-ink">
            Similar products
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
