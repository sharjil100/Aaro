/* ----------------------------------------------------------------------------
   Domain types — mirror the Prisma schema (prisma/schema.prisma).
   These power the Phase-0 UI from typed mock data; the same shapes will be
   returned by the database layer in Phase 1.
---------------------------------------------------------------------------- */

export type UserRole = "customer" | "seller" | "admin";

export type AdminRole =
  | "super_admin"
  | "operations"
  | "finance"
  | "seller_manager"
  | "product_moderator"
  | "support";

/** Seller account state machine (brief §6.3). */
export type SellerStatus =
  | "active"
  | "warning"
  | "due_soon"
  | "overdue"
  | "paused"
  | "suspended";

/** Trust ladder (brief §7.3). */
export type VerificationLevel = "unverified" | "basic" | "trusted" | "top";

/** Order lifecycle (brief §15). */
export type OrderStatus =
  | "pending"
  | "accepted"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "returned"
  | "disputed";

export type DueStatus = "pending" | "partial" | "paid" | "overdue";

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string; // lucide icon name
  productCount: number;
}

export interface Seller {
  id: string;
  slug: string;
  shopName: string;
  ownerName: string;
  city: string;
  status: SellerStatus;
  verification: VerificationLevel;
  rating: number;
  ratingCount: number;
  ordersCompleted: number;
  joinedYear: number;
  responseRate: number; // %
  categories: string[];
  socials: { facebook?: string; instagram?: string; tiktok?: string };
  // commission / due snapshot
  commissionRate: number; // %
  creditLimit: number;
  dueOutstanding: number;
  dueDeadlineHours?: number; // hours until current due deadline
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  sellerId: string;
  price: number;
  discountPrice?: number;
  rating: number;
  ratingCount: number;
  sold: number;
  stock: number;
  codAvailable: boolean;
  freeDelivery?: boolean;
  deliveryDays: string; // e.g. "1–3 days"
  badges?: ("new" | "deal" | "trending")[];
}

export interface OrderItemRow {
  productTitle: string;
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  code: string; // human order code
  customerName: string;
  sellerId: string;
  status: OrderStatus;
  total: number;
  placedAgo: string;
  items: OrderItemRow[];
}

/** A ledger-backed commission due entry (brief §14). */
export interface DueEntry {
  id: string;
  orderCode: string;
  sellerId: string;
  orderAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: DueStatus;
  deadlineHours: number; // hours remaining (negative = overdue)
}
