"use client";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Wallet,
  Settings,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard/shell";
import { getSeller } from "@/lib/data";

const nav: NavItem[] = [
  { label: "Dashboard", href: "/seller", icon: LayoutDashboard },
  { label: "Orders", href: "/seller/orders", icon: ShoppingBag, badge: 1 },
  { label: "Products", href: "/seller/products", icon: Package },
  { label: "Due & Commission", href: "/seller/due", icon: Wallet },
  { label: "Settings", href: "/seller/settings", icon: Settings },
];

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seller = getSeller("s1");
  return (
    <DashboardShell
      nav={nav}
      roleLabel="Seller Center"
      userName={seller?.ownerName ?? "Seller"}
      userMeta={seller?.shopName ?? ""}
    >
      {children}
    </DashboardShell>
  );
}
