import Link from "next/link";
import { ShieldCheck, Truck, BadgeCheck, RotateCcw, Store } from "lucide-react";

const points = [
  { icon: ShieldCheck, text: "Verified shops only" },
  { icon: Truck, text: "Cash on delivery nationwide" },
  { icon: BadgeCheck, text: "Real ratings & reviews" },
  { icon: RotateCcw, text: "Easy returns & support" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-aaro flex h-9 items-center justify-between gap-4 text-xs">
        <div className="flex min-w-0 items-center gap-6">
          {points.map((p, i) => (
            <span
              key={p.text}
              className={`items-center gap-1.5 text-white/85 ${i === 0 ? "flex" : "hidden md:flex"}`}
            >
              <p.icon className="h-3.5 w-3.5 text-brand-400" />
              {p.text}
            </span>
          ))}
        </div>
        <Link
          href="/seller/register"
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-300 hover:text-brand-200"
        >
          <Store className="h-3.5 w-3.5" />
          Sell on Aaro
        </Link>
      </div>
    </div>
  );
}
