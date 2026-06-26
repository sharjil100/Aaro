import Link from "next/link";
import { MapPin, PackageCheck } from "lucide-react";
import { Thumb } from "./thumb";
import { RatingStars } from "./rating-stars";
import { VerifiedBadge } from "./verified-badge";
import { buttonVariants } from "@/components/ui/button";
import type { Seller } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SHOP_KEYWORD } from "@/lib/images";

export function SellerCard({ seller }: { seller: Seller }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-pop">
      <div className="relative h-20 gradient-mesh">
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>
      <div className="relative px-4 pb-4">
        <div className="-mt-8 mb-2 flex items-end justify-between">
          <Thumb
            seed={seller.slug}
            label={seller.shopName}
            query={SHOP_KEYWORD}
            className="h-16 w-16 ring-4 ring-surface"
            rounded="rounded-2xl"
          />
          <VerifiedBadge level={seller.verification} />
        </div>
        <h3 className="font-display text-base font-bold text-ink">
          {seller.shopName}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {seller.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <PackageCheck className="h-3.5 w-3.5" />
            {seller.ordersCompleted.toLocaleString("en-IN")} orders
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <RatingStars value={seller.rating} count={seller.ratingCount} />
          <Link
            href={`/shop/${seller.slug}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            Visit shop
          </Link>
        </div>
      </div>
    </div>
  );
}
