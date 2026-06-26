import type {
  Category,
  Seller,
  Product,
  Order,
  DueEntry,
} from "./types";

/* ----------------------------------------------------------------------------
   Phase-0 mock data. Realistic Bangladesh social-commerce catalogue.
   Replace with Prisma/Supabase queries in Phase 1 — shapes are identical.
---------------------------------------------------------------------------- */

export const categories: Category[] = [
  { id: "c1", slug: "fashion", name: "Fashion", icon: "Shirt", productCount: 12840 },
  { id: "c2", slug: "beauty", name: "Beauty", icon: "Sparkles", productCount: 8420 },
  { id: "c3", slug: "gadgets", name: "Gadgets", icon: "Smartphone", productCount: 6310 },
  { id: "c4", slug: "home-lifestyle", name: "Home & Lifestyle", icon: "Sofa", productCount: 9970 },
  { id: "c5", slug: "accessories", name: "Accessories", icon: "Watch", productCount: 5560 },
  { id: "c6", slug: "kids", name: "Kids", icon: "Baby", productCount: 3210 },
  { id: "c7", slug: "grocery", name: "Grocery", icon: "ShoppingBasket", productCount: 4480 },
  { id: "c8", slug: "sports", name: "Sports", icon: "Dumbbell", productCount: 2190 },
];

export const sellers: Seller[] = [
  {
    id: "s1", slug: "dhaka-threads", shopName: "Dhaka Threads", ownerName: "Tahmina Akter",
    city: "Dhaka", status: "active", verification: "top", rating: 4.9, ratingCount: 3120,
    ordersCompleted: 18430, joinedYear: 2021, responseRate: 98, categories: ["fashion", "accessories"],
    socials: { facebook: "dhakathreads", instagram: "dhaka.threads" },
    commissionRate: 7, creditLimit: 10000, dueOutstanding: 750, dueDeadlineHours: 31,
  },
  {
    id: "s2", slug: "glow-and-co", shopName: "Glow & Co.", ownerName: "Sadia Rahman",
    city: "Dhaka", status: "active", verification: "trusted", rating: 4.8, ratingCount: 2140,
    ordersCompleted: 9650, joinedYear: 2022, responseRate: 96, categories: ["beauty"],
    socials: { facebook: "glowandco.bd", instagram: "glow.and.co" },
    commissionRate: 9, creditLimit: 10000, dueOutstanding: 0,
  },
  {
    id: "s3", slug: "gadgethub-bd", shopName: "GadgetHub BD", ownerName: "Rakibul Hasan",
    city: "Chattogram", status: "warning", verification: "basic", rating: 4.6, ratingCount: 1880,
    ordersCompleted: 7200, joinedYear: 2023, responseRate: 91, categories: ["gadgets", "accessories"],
    socials: { facebook: "gadgethubbd" },
    commissionRate: 5, creditLimit: 2000, dueOutstanding: 1340, dueDeadlineHours: 9,
  },
  {
    id: "s4", slug: "nakshi-home", shopName: "Nakshi Home", ownerName: "Farzana Islam",
    city: "Sylhet", status: "active", verification: "trusted", rating: 4.7, ratingCount: 1320,
    ordersCompleted: 5410, joinedYear: 2022, responseRate: 94, categories: ["home-lifestyle"],
    socials: { facebook: "nakshihome", instagram: "nakshi.home" },
    commissionRate: 8, creditLimit: 10000, dueOutstanding: 0,
  },
  {
    id: "s5", slug: "rong-boutique", shopName: "Rong Boutique", ownerName: "Nusrat Jahan",
    city: "Dhaka", status: "active", verification: "top", rating: 4.9, ratingCount: 4210,
    ordersCompleted: 22100, joinedYear: 2020, responseRate: 99, categories: ["fashion"],
    socials: { facebook: "rongboutique", instagram: "rong.boutique", tiktok: "rongboutique" },
    commissionRate: 7, creditLimit: 10000, dueOutstanding: 420, dueDeadlineHours: 40,
  },
  {
    id: "s6", slug: "techmart-ctg", shopName: "TechMart Chattogram", ownerName: "Imran Khan",
    city: "Chattogram", status: "overdue", verification: "basic", rating: 4.4, ratingCount: 960,
    ordersCompleted: 3120, joinedYear: 2023, responseRate: 88, categories: ["gadgets"],
    socials: { facebook: "techmartctg" },
    commissionRate: 5, creditLimit: 2000, dueOutstanding: 1980, dueDeadlineHours: -6,
  },
  {
    id: "s7", slug: "komol-kids", shopName: "Komol Kids", ownerName: "Shirin Sultana",
    city: "Khulna", status: "active", verification: "basic", rating: 4.5, ratingCount: 540,
    ordersCompleted: 1840, joinedYear: 2024, responseRate: 90, categories: ["kids", "fashion"],
    socials: { instagram: "komol.kids" },
    commissionRate: 6, creditLimit: 500, dueOutstanding: 0,
  },
  {
    id: "s8", slug: "tasveer-crafts", shopName: "Tasveer Crafts", ownerName: "Mahir Ahmed",
    city: "Dhaka", status: "active", verification: "trusted", rating: 4.8, ratingCount: 770,
    ordersCompleted: 2960, joinedYear: 2023, responseRate: 95, categories: ["home-lifestyle", "accessories"],
    socials: { facebook: "tasveercrafts", instagram: "tasveer.crafts" },
    commissionRate: 8, creditLimit: 10000, dueOutstanding: 0,
  },
];

const p = (
  slug: string, title: string, categorySlug: string, sellerId: string,
  price: number, discountPrice: number | undefined, rating: number, ratingCount: number,
  sold: number, stock: number, deliveryDays: string,
  extra: Partial<Product> = {},
): Product => ({
  id: "p_" + slug, slug, title, categorySlug, sellerId, price, discountPrice,
  rating, ratingCount, sold, stock, codAvailable: true, deliveryDays, ...extra,
});

export const products: Product[] = [
  p("kataan-silk-saree", "Hand-block Katan Silk Saree", "fashion", "s5", 4200, 3360, 4.9, 412, 1320, 38, "2–4 days", { badges: ["trending", "deal"], freeDelivery: true }),
  p("premium-panjabi", "Premium Cotton Panjabi — Eid Edition", "fashion", "s1", 2400, 1990, 4.8, 286, 980, 64, "1–3 days", { badges: ["deal"], freeDelivery: true }),
  p("kurti-set-3pc", "Designer 3-piece Unstitched Kurti", "fashion", "s5", 3100, 2480, 4.7, 198, 540, 22, "2–4 days", { badges: ["new"] }),
  p("denim-jacket", "Oversized Washed Denim Jacket", "fashion", "s1", 2890, undefined, 4.6, 142, 410, 31, "1–3 days"),

  p("vitc-serum", "Vitamin C Brightening Serum 30ml", "beauty", "s2", 1450, 1090, 4.8, 1240, 5600, 120, "1–2 days", { badges: ["trending", "deal"], freeDelivery: true }),
  p("matte-lip-set", "Velvet Matte Liquid Lipstick — Set of 4", "beauty", "s2", 1290, 990, 4.7, 870, 3100, 88, "1–2 days", { badges: ["deal"] }),
  p("sunscreen-spf50", "Daily Sunscreen SPF 50+ PA++++", "beauty", "s2", 980, undefined, 4.9, 2210, 8400, 240, "1–2 days", { badges: ["trending"] }),

  p("anc-earbuds", "Pro ANC Wireless Earbuds", "gadgets", "s3", 3200, 2390, 4.6, 940, 2700, 54, "2–4 days", { badges: ["deal", "trending"], freeDelivery: true }),
  p("smartwatch-amoled", "AMOLED Smartwatch — BT Calling", "gadgets", "s6", 2790, 2190, 4.4, 612, 1450, 40, "2–5 days", { badges: ["deal"] }),
  p("powerbank-20k", "20,000mAh Fast-charge Power Bank", "gadgets", "s3", 1890, 1490, 4.7, 1320, 4200, 96, "2–4 days"),
  p("usbc-hub", "7-in-1 USB-C Hub for Laptops", "gadgets", "s6", 1650, undefined, 4.5, 320, 760, 28, "2–5 days", { badges: ["new"] }),

  p("nakshi-cushion", "Nakshi Kantha Cushion Cover (Set of 2)", "home-lifestyle", "s4", 1180, 940, 4.8, 410, 1640, 70, "2–4 days", { badges: ["deal"] }),
  p("ceramic-dinner-set", "Hand-glazed Ceramic Dinner Set — 16pc", "home-lifestyle", "s4", 4600, 3900, 4.7, 188, 520, 18, "3–5 days", { freeDelivery: true }),
  p("rattan-lamp", "Handwoven Rattan Pendant Lamp", "home-lifestyle", "s8", 2250, undefined, 4.9, 96, 240, 14, "3–6 days", { badges: ["new", "trending"] }),
  p("jute-rug", "Handmade Round Jute Area Rug", "home-lifestyle", "s8", 1990, 1590, 4.6, 132, 380, 24, "3–6 days", { badges: ["deal"] }),

  p("leather-wallet", "Full-grain Leather Bifold Wallet", "accessories", "s1", 1290, 990, 4.7, 540, 2100, 60, "1–3 days", { badges: ["deal"] }),
  p("minimal-watch", "Minimalist Mesh-strap Watch", "accessories", "s5", 2490, 1990, 4.6, 410, 1240, 33, "2–4 days", { badges: ["trending"] }),
  p("canvas-tote", "Printed Canvas Tote Bag", "accessories", "s8", 690, 540, 4.8, 760, 3400, 140, "2–4 days"),

  p("kids-frock", "Cotton Floral Kids Frock (2–7y)", "kids", "s7", 980, 740, 4.7, 220, 980, 80, "2–4 days", { badges: ["deal"] }),
  p("kids-shoe-led", "LED Light-up Kids Sneakers", "kids", "s7", 1290, undefined, 4.5, 140, 460, 36, "2–4 days", { badges: ["new"] }),

  p("organic-honey", "Sundarban Raw Organic Honey 500g", "grocery", "s4", 850, 690, 4.9, 1640, 6200, 200, "1–3 days", { badges: ["trending", "deal"], freeDelivery: true }),
  p("yoga-mat", "Anti-slip TPE Yoga Mat 6mm", "sports", "s8", 1490, 1190, 4.6, 280, 720, 44, "2–4 days", { badges: ["deal"] }),
];

export const sellerOrders: Order[] = [
  { id: "o1", code: "AAR-9F3K2", customerName: "Imran H.", sellerId: "s1", status: "pending", total: 1990, placedAgo: "12 min ago", items: [{ productTitle: "Premium Cotton Panjabi", qty: 1, unitPrice: 1990 }] },
  { id: "o2", code: "AAR-9F2X8", customerName: "Sumaiya R.", sellerId: "s1", status: "accepted", total: 3980, placedAgo: "48 min ago", items: [{ productTitle: "Premium Cotton Panjabi", qty: 2, unitPrice: 1990 }] },
  { id: "o3", code: "AAR-9E8Q1", customerName: "Tanvir A.", sellerId: "s1", status: "shipped", total: 2890, placedAgo: "3 hrs ago", items: [{ productTitle: "Denim Jacket", qty: 1, unitPrice: 2890 }] },
  { id: "o4", code: "AAR-9E5M7", customerName: "Nabila K.", sellerId: "s1", status: "delivered", total: 1290, placedAgo: "Yesterday", items: [{ productTitle: "Leather Wallet", qty: 1, unitPrice: 1290 }] },
  { id: "o5", code: "AAR-9D9P0", customerName: "Rifat S.", sellerId: "s1", status: "completed", total: 3980, placedAgo: "2 days ago", items: [{ productTitle: "Premium Cotton Panjabi", qty: 2, unitPrice: 1990 }] },
  { id: "o6", code: "AAR-9D2L4", customerName: "Mehjabin C.", sellerId: "s1", status: "cancelled", total: 990, placedAgo: "2 days ago", items: [{ productTitle: "Canvas Tote Bag", qty: 1, unitPrice: 990 }] },
];

export const sellerDues: DueEntry[] = [
  { id: "d1", orderCode: "AAR-9E5M7", sellerId: "s1", orderAmount: 1290, commissionRate: 7, commissionAmount: 90, status: "pending", deadlineHours: 31 },
  { id: "d2", orderCode: "AAR-9D9P0", sellerId: "s1", orderAmount: 3980, commissionRate: 7, commissionAmount: 279, status: "partial", deadlineHours: 19 },
  { id: "d3", orderCode: "AAR-9C8R2", sellerId: "s1", orderAmount: 5400, commissionRate: 7, commissionAmount: 378, status: "paid", deadlineHours: 0 },
  { id: "d4", orderCode: "AAR-9C1T9", sellerId: "s1", orderAmount: 2890, commissionRate: 7, commissionAmount: 202, status: "pending", deadlineHours: 44 },
];

/* ---- selectors -------------------------------------------------------- */
export const getSeller = (id: string) => sellers.find((s) => s.id === id);
export const getSellerBySlug = (slug: string) => sellers.find((s) => s.slug === slug);
export const getProductBySlug = (slug: string) => products.find((x) => x.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: string) => products.filter((x) => x.categorySlug === slug);
export const productsBySeller = (id: string) => products.filter((x) => x.sellerId === id);
export const dealProducts = () => products.filter((x) => x.badges?.includes("deal"));
export const trendingProducts = () => products.filter((x) => x.badges?.includes("trending"));
export const newProducts = () => products.filter((x) => x.badges?.includes("new"));
export const trustedSellers = () =>
  sellers.filter((s) => s.verification === "top" || s.verification === "trusted");
