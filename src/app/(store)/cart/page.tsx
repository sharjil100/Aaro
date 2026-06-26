import Link from "next/link";
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Truck,
  ShieldCheck,
  Store,
  Tag,
} from "lucide-react";
import { Thumb } from "@/components/store/thumb";
import { Button } from "@/components/ui/button";
import { products, getSeller } from "@/lib/data";
import { formatBDT } from "@/lib/utils";
import { productKeyword } from "@/lib/images";

export const metadata = { title: "Your Cart" };

const cart = [
  { product: products[1], qty: 1 },
  { product: products[4], qty: 2 },
];

export default function CartPage() {
  const lines = cart.map(({ product, qty }) => ({
    product,
    qty,
    unit: product.discountPrice ?? product.price,
    seller: getSeller(product.sellerId),
  }));
  const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);
  const delivery = 60;
  const total = subtotal + delivery;

  return (
    <div className="container-aaro py-6">
      <nav className="flex items-center gap-1.5 text-sm text-faint">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-ink">Cart</span>
      </nav>

      <h1 className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
        Your cart <span className="text-faint">({lines.length})</span>
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* items */}
        <div className="space-y-4 lg:col-span-2">
          {lines.map((l) => (
            <div key={l.product.id} className="flex gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card">
              <Thumb seed={l.product.slug} label={l.product.title} query={productKeyword(l.product.categorySlug)} className="h-24 w-24 shrink-0" rounded="rounded-xl" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/product/${l.product.slug}`} className="line-clamp-2 font-medium text-ink hover:text-brand-700">
                    {l.product.title}
                  </Link>
                  <button className="shrink-0 text-faint hover:text-rose-600" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {l.seller && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                    <Store className="h-3.5 w-3.5 text-brand-500" /> {l.seller.shopName}
                  </span>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-xl border border-line">
                    <span className="grid h-9 w-9 place-items-center text-muted"><Minus className="h-4 w-4" /></span>
                    <span className="grid h-9 w-10 place-items-center border-x border-line text-sm font-semibold">{l.qty}</span>
                    <span className="grid h-9 w-9 place-items-center text-muted"><Plus className="h-4 w-4" /></span>
                  </div>
                  <span className="font-display text-lg font-extrabold text-ink">{formatBDT(l.unit * l.qty)}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 rounded-2xl border border-dashed border-line bg-surface p-3">
            <Tag className="h-4 w-4 text-brand-600" />
            <input
              placeholder="Promo code (e.g. EID25)"
              className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
            />
            <Button variant="secondary" size="sm">Apply</Button>
          </div>
        </div>

        {/* summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h2 className="font-display text-lg font-bold text-ink">Order summary</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-medium text-ink">{formatBDT(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery</dt>
                <dd className="font-medium text-ink">{formatBDT(delivery)}</dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-line pt-3">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{formatBDT(total)}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
              <span className="flex items-center gap-1.5 font-semibold">
                <Truck className="h-4 w-4" /> Cash on delivery
              </span>
              <p className="mt-1 text-xs text-brand-700/80">
                Pay the seller directly when your order arrives. No advance payment needed.
              </p>
            </div>

            <Link href="/login" className="mt-4 block">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to checkout
              </Button>
            </Link>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-faint">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" /> Buyer protection on every order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
