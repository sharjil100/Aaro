import { Check, X, Flag } from "lucide-react";
import { Thumb } from "@/components/store/thumb";
import { Button } from "@/components/ui/button";
import { products, getSeller, getCategory } from "@/lib/data";
import { formatBDT } from "@/lib/utils";

export const metadata = { title: "Product Moderation" };

export default function AdminProducts() {
  // first few products presented as a pending-approval queue
  const queue = products.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Product moderation</h1>
        <p className="mt-1 text-sm text-muted">
          Review newly submitted products before they go live on the marketplace.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-accent-50 px-4 py-3 text-sm text-accent-800">
        <Flag className="h-4 w-4" />
        <span><strong>{queue.length}</strong> products waiting for review</span>
      </div>

      <div className="space-y-3">
        {queue.map((p) => {
          const seller = getSeller(p.sellerId);
          const cat = getCategory(p.categorySlug);
          return (
            <div key={p.id} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card sm:flex-row sm:items-center">
              <Thumb seed={p.slug} label={p.title} className="h-20 w-20 shrink-0" rounded="rounded-xl" />
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-ink">{p.title}</h3>
                <p className="mt-0.5 text-xs text-faint">
                  {seller?.shopName} · {cat?.name} · {formatBDT(p.discountPrice ?? p.price)} · stock {p.stock}
                </p>
                <span className="mt-2 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  Pending review
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" size="sm"><Check className="h-4 w-4" /> Approve</Button>
                <Button variant="secondary" size="sm"><X className="h-4 w-4" /> Reject</Button>
                <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50"><Flag className="h-4 w-4" /></Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
