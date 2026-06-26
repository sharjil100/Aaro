import Link from "next/link";
import { Plus, Pencil, Trash2, Upload, Check } from "lucide-react";
import { Thumb } from "@/components/store/thumb";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { productsBySeller } from "@/lib/data";
import { cn, formatBDT } from "@/lib/utils";
import { productKeyword } from "@/lib/images";

export const metadata = { title: "Products" };

export default function SellerProducts() {
  const items = productsBySeller("s1");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Products</h1>
          <p className="mt-1 text-sm text-muted">{items.length} products · all approved & active</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="md"><Upload className="h-4 w-4" /> Bulk CSV</Button>
          <Link href="#" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
            <Plus className="h-4 w-4" /> Add product
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold">Sold</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0 hover:bg-canvas">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Thumb seed={p.slug} label={p.title} query={productKeyword(p.categorySlug)} className="h-11 w-11 shrink-0" rounded="rounded-lg" />
                      <span className="line-clamp-1 max-w-[220px] font-medium text-ink">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-semibold text-ink">{formatBDT(p.discountPrice ?? p.price)}</td>
                  <td className="px-5 py-3">
                    <span className={p.stock < 30 ? "font-semibold text-rose-600" : "text-muted"}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3 text-muted">{p.sold.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3">
                    <Badge tone="brand" size="md"><Check className="h-3.5 w-3.5" /> Active</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-black/5 hover:text-ink"><Pencil className="h-4 w-4" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
