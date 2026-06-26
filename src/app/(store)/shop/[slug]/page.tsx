import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  PackageCheck,
  CalendarDays,
  MessageSquareReply,
  Facebook,
  Instagram,
  Store,
  Flag,
} from "lucide-react";
import { Thumb } from "@/components/store/thumb";
import { RatingStars } from "@/components/store/rating-stars";
import { VerifiedBadge } from "@/components/store/verified-badge";
import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { getSellerBySlug, productsBySeller } from "@/lib/data";
import { SHOP_KEYWORD } from "@/lib/images";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = getSellerBySlug(slug);
  if (!seller) notFound();

  const items = productsBySeller(seller.id);
  const stats = [
    { icon: PackageCheck, label: "Orders", value: seller.ordersCompleted.toLocaleString("en-IN") },
    { icon: MessageSquareReply, label: "Response", value: `${seller.responseRate}%` },
    { icon: CalendarDays, label: "Since", value: String(seller.joinedYear) },
  ];

  return (
    <div className="container-aaro py-6">
      <nav className="flex items-center gap-1.5 text-sm text-faint">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shops" className="hover:text-brand-700">Shops</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-ink">{seller.shopName}</span>
      </nav>

      {/* banner */}
      <div className="mt-4 overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
        <div className="relative h-36 gradient-mesh sm:h-44">
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
        <div className="px-5 pb-5 sm:px-7">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Thumb
                seed={seller.slug}
                label={seller.shopName}
                query={SHOP_KEYWORD}
                className="h-24 w-24 ring-4 ring-surface"
                rounded="rounded-3xl"
              />
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-extrabold text-ink">{seller.shopName}</h1>
                  <VerifiedBadge level={seller.verification} />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <RatingStars value={seller.rating} count={seller.ratingCount} />
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {seller.city}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Button variant="primary" size="md">
                <Store className="h-4 w-4" /> Follow
              </Button>
              <Button variant="secondary" size="md">Chat</Button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-canvas p-3 text-center">
                <s.icon className="mx-auto h-5 w-5 text-brand-600" />
                <div className="mt-1 font-display text-lg font-extrabold text-ink">{s.value}</div>
                <div className="text-xs text-faint">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* body */}
      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        {/* about */}
        <aside className="space-y-4 lg:col-span-1">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h3 className="text-sm font-bold text-ink">About this shop</h3>
            <p className="mt-2 text-sm text-muted">
              {seller.shopName} is a {seller.verification === "top" ? "top-rated" : "verified"} seller
              on Aaro, run by {seller.ownerName}. Cash on delivery available.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              {seller.socials.facebook && (
                <a href="#" className="flex items-center gap-2 text-muted hover:text-brand-700">
                  <Facebook className="h-4 w-4" /> /{seller.socials.facebook}
                </a>
              )}
              {seller.socials.instagram && (
                <a href="#" className="flex items-center gap-2 text-muted hover:text-brand-700">
                  <Instagram className="h-4 w-4" /> @{seller.socials.instagram}
                </a>
              )}
            </div>
            <div className="mt-4 border-t border-line pt-3">
              <span className="text-xs font-semibold uppercase text-faint">Categories</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {seller.categories.map((c) => (
                  <Link
                    key={c}
                    href={`/products?category=${c}`}
                    className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium capitalize text-muted hover:text-brand-700"
                  >
                    {c.replace("-", " & ")}
                  </Link>
                ))}
              </div>
            </div>
            <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-faint hover:text-rose-600">
              <Flag className="h-3.5 w-3.5" /> Report shop
            </button>
          </div>
        </aside>

        {/* products */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold text-ink">
              Products <span className="text-faint">({items.length})</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
