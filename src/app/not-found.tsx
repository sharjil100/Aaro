import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas p-6">
      <div className="w-full max-w-md text-center">
        <Logo className="justify-center" />
        <p className="mt-8 font-display text-7xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold text-ink">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-2 text-muted">
          The product or shop you&apos;re looking for may have moved or sold out.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
            <Home className="h-4 w-4" /> Go home
          </Link>
          <Link href="/products" className={cn(buttonVariants({ variant: "secondary", size: "md" }))}>
            <Search className="h-4 w-4" /> Browse products
          </Link>
        </div>
      </div>
    </div>
  );
}
