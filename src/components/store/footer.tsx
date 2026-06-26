import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All categories", href: "/products" },
      { label: "Today's deals", href: "/products?deal=1" },
      { label: "Verified shops", href: "/shops" },
      { label: "New arrivals", href: "/products?sort=new" },
    ],
  },
  {
    title: "Sell on Aaro",
    links: [
      { label: "Become a seller", href: "/seller/register" },
      { label: "Seller Center", href: "/seller" },
      { label: "Commission & dues", href: "/seller/due" },
      { label: "Seller agreement", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help center", href: "#" },
      { label: "Track your order", href: "/login" },
      { label: "Returns & refunds", href: "#" },
      { label: "Report a problem", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Aaro", href: "#" },
      { label: "Terms & conditions", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const trust = [
  { icon: ShieldCheck, title: "Verified sellers", sub: "Every shop is reviewed" },
  { icon: Truck, title: "Cash on delivery", sub: "Pay when it arrives" },
  { icon: RotateCcw, title: "Easy returns", sub: "Clear refund process" },
  { icon: Headphones, title: "Real support", sub: "Complaint resolution" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      {/* trust strip */}
      <div className="border-b border-line">
        <div className="container-aaro grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <t.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{t.title}</span>
                <span className="block text-xs text-faint">{t.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-aaro grid grid-cols-2 gap-8 py-12 md:grid-cols-6">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Aaro is Bangladesh&apos;s trusted marketplace — more shops in one place,
            with real ratings, cash on delivery and complaint support.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["bKash", "Nagad", "Rocket", "Visa", "COD"].map((m) => (
              <span
                key={m}
                className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-xs font-semibold text-muted"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold text-ink">{col.title}</h4>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-brand-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-aaro flex flex-col items-center justify-between gap-3 py-5 text-xs text-faint sm:flex-row">
          <p>© {2026} Aaro. More shops. More trust.</p>
          <div className="flex items-center gap-4">
            <Link href="/seller" className="hover:text-brand-700">
              Seller Center
            </Link>
            <Link href="/admin" className="hover:text-brand-700">
              Admin
            </Link>
            <span>Made in Bangladesh 🇧🇩</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
