import Link from "next/link";
import { SlidersHorizontal, Star, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { CategoryIcon } from "@/components/icon";
import { categories, products, getCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

type SP = Record<string, string | string[] | undefined>;

const sortOptions = [
  { key: "relevance", label: "Relevance" },
  { key: "new", label: "Newest" },
  { key: "price_asc", label: "Price ↑" },
  { key: "price_desc", label: "Price ↓" },
  { key: "rating", label: "Top rated" },
];

function priceOf(p: { price: number; discountPrice?: number }) {
  return p.discountPrice ?? p.price;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const deal = typeof sp.deal === "string";
  const sort = typeof sp.sort === "string" ? sp.sort : "relevance";

  let list = [...products];
  if (category) list = list.filter((p) => p.categorySlug === category);
  if (deal) list = list.filter((p) => p.badges?.includes("deal"));
  if (q) list = list.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));

  if (sort === "price_asc") list.sort((a, b) => priceOf(a) - priceOf(b));
  else if (sort === "price_desc") list.sort((a, b) => priceOf(b) - priceOf(a));
  else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
  else if (sort === "new")
    list.sort(
      (a, b) =>
        Number(b.badges?.includes("new") ?? false) -
        Number(a.badges?.includes("new") ?? false),
    );

  const cat = category ? getCategory(category) : undefined;
  const title = cat
    ? cat.name
    : q
      ? `Results for “${q}”`
      : deal
        ? "Today's Deals"
        : "All products";

  const buildSort = (key: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    if (deal) params.set("deal", "1");
    if (key !== "relevance") params.set("sort", key);
    const qs = params.toString();
    return "/products" + (qs ? `?${qs}` : "");
  };

  return (
    <div className="container-aaro py-6">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-faint">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-brand-700">Products</Link>
        {cat && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-ink">{cat.name}</span>
          </>
        )}
      </nav>

      <div className="mt-3 flex items-end justify-between gap-4">
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          {title}
        </h1>
        <span className="shrink-0 text-sm text-muted">
          {list.length} {list.length === 1 ? "result" : "results"}
        </span>
      </div>

      <div className="mt-6 flex gap-6">
        {/* ---- filters ---- */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 space-y-5">
            <div className="rounded-2xl border border-line bg-surface p-4 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                <SlidersHorizontal className="h-4 w-4" /> Categories
              </h3>
              <ul className="mt-3 space-y-1">
                <li>
                  <Link
                    href="/products"
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-2 text-sm",
                      !category ? "bg-brand-50 font-semibold text-brand-700" : "text-muted hover:bg-black/5",
                    )}
                  >
                    All products
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/products?category=${c.slug}`}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm",
                        category === c.slug
                          ? "bg-brand-50 font-semibold text-brand-700"
                          : "text-muted hover:bg-black/5",
                      )}
                    >
                      <CategoryIcon name={c.icon} className="h-4 w-4" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-4 shadow-card">
              <h3 className="text-sm font-bold text-ink">Price range</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {["Under ৳500", "৳500 – ৳1,500", "৳1,500 – ৳3,000", "Over ৳3,000"].map((r) => (
                  <li key={r}>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-line accent-brand-600" />
                      {r}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-4 shadow-card">
              <h3 className="text-sm font-bold text-ink">Trust & delivery</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-line accent-brand-600" />
                    <ShieldCheck className="h-4 w-4 text-brand-600" /> Verified sellers
                  </label>
                </li>
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-line accent-brand-600" />
                    <Star className="h-4 w-4 text-accent-500" /> 4★ & above
                  </label>
                </li>
                <li>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-line accent-brand-600" />
                    <Truck className="h-4 w-4 text-brand-600" /> Free delivery
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* ---- results ---- */}
        <div className="min-w-0 flex-1">
          {/* mobile category chips */}
          <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 no-scrollbar lg:hidden">
            <Link
              href="/products"
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-sm",
                !category ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-muted",
              )}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-sm",
                  category === c.slug ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-muted",
                )}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {/* sort bar */}
          <div className="mb-4 flex items-center gap-2 overflow-x-auto rounded-2xl border border-line bg-surface p-2 no-scrollbar">
            <span className="shrink-0 px-2 text-xs font-semibold uppercase text-faint">Sort</span>
            {sortOptions.map((o) => (
              <Link
                key={o.key}
                href={buildSort(o.key)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium",
                  sort === o.key ? "bg-brand-600 text-white" : "text-muted hover:bg-black/5",
                )}
              >
                {o.label}
              </Link>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-line bg-surface py-24 text-center">
              <p className="font-display text-lg font-bold text-ink">No products found</p>
              <p className="mt-1 text-sm text-muted">Try a different category or search term.</p>
              <Link href="/products" className="mt-4 text-sm font-semibold text-brand-700">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
