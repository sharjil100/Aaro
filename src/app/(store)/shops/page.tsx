import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { SellerCard } from "@/components/store/seller-card";
import { sellers } from "@/lib/data";

export const metadata = { title: "Verified Shops" };

export default function ShopsPage() {
  const verified = sellers.filter((s) => s.verification !== "unverified");

  return (
    <div className="container-aaro py-6">
      <nav className="flex items-center gap-1.5 text-sm text-faint">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-ink">Verified Shops</span>
      </nav>

      <div className="mt-4 overflow-hidden rounded-3xl gradient-mesh p-8 shadow-pop">
        <div className="absolute inset-0" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5" /> Identity-checked sellers
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
          Verified shops on Aaro
        </h1>
        <p className="mt-2 max-w-xl text-emerald-50/90">
          Every shop below is reviewed by the Aaro team — real businesses, real
          ratings, and cash on delivery you can trust.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {verified.map((s) => (
          <SellerCard key={s.id} seller={s} />
        ))}
      </div>
    </div>
  );
}
