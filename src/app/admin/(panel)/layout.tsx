"use client";

import { LayoutDashboard, Store, PackageSearch, Wallet } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard/shell";

const nav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Sellers", href: "/admin/sellers", icon: Store, badge: 2 },
  { label: "Product moderation", href: "/admin/products", icon: PackageSearch, badge: 5 },
  { label: "Due management", href: "/admin/due", icon: Wallet, badge: 3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      nav={nav}
      roleLabel="Super Admin"
      userName="Aaro Admin"
      userMeta="Operations"
    >
      {children}
    </DashboardShell>
  );
}
