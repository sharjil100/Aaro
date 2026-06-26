import Link from "next/link";
import { ShieldCheck, Truck } from "lucide-react";
import { Thumb } from "./thumb";
import { RatingStars } from "./rating-stars";
import { Badge } from "@/components/ui/badge";
import { getSeller } from "@/lib/data";
import type { Product } from "@/lib/types";
import { cn, discountPct, formatBDT } from "@/lib/utils";
import { productKeyword } from "@/lib/images";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const seller = getSeller(product.sellerId);
  const off = discountPct(product.price, product.discountPrice);
  const price = product.discountPrice ?? product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-pop",
        className,
      )}
    >
      <div className="relative aspect-square p-3">
        <Thumb
          seed={product.slug}
          label={product.title}
          query={productKeyword(product.categorySlug)}
          className="h-full w-full"
          rounded="rounded-xl"
        />
        <div className="absolute left-5 top-5 flex flex-col gap-1.5">
          {off > 0 && (
            <Badge tone="solidDeal" size="sm">
              -{off}%
            </Badge>
          )}
          {product.badges?.includes("new") && (
            <Badge tone="info" size="sm">
              New
            </Badge>
          )}
        </div>
        {product.freeDelivery && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-ink/85 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
            <Truck className="h-3 w-3" />
            Free
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 pt-1">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand-700">
          {product.title}
        </h3>

        <div className="mt-auto flex items-end gap-2">
          <span className="font-display text-lg font-extrabold text-ink">
            {formatBDT(price)}
          </span>
          {off > 0 && (
            <span className="pb-0.5 text-sm text-faint line-through">
              {formatBDT(product.price)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <RatingStars value={product.rating} count={product.ratingCount} />
          <span className="text-xs text-faint">
            {product.sold.toLocaleString("en-IN")} sold
          </span>
        </div>

        {seller && (
          <div className="flex items-center gap-1 border-t border-line pt-2 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-500" />
            <span className="truncate">{seller.shopName}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
