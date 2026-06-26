# Aaro — More shops. More trust.

Bangladesh's trusted B2C marketplace for social-commerce sellers. This repo is the
**Phase 0 foundation**: a premium, fully navigable front-end for all three surfaces
(customer storefront, seller dashboard, super-admin console) built on the approved
infrastructure stack.

## Run it

```bash
npm install      # already done
npm run dev      # http://localhost:3000
```

Build for production: `npm run build` then `npm run start`.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 + custom Aaro design system |
| Icons | lucide-react |
| Validation | Zod |
| Database (Phase 1) | PostgreSQL via Supabase — schema in [`prisma/schema.prisma`](prisma/schema.prisma) |
| Auth (Phase 1) | Auth.js (NextAuth v5) — scaffold in `src/lib/auth.ts` + `src/proxy.ts` |

## What's built (Phase 0)

**Customer storefront** (`/`)
- Homepage: hero, category grid, flash deals, trusted shops, new arrivals, recommendations, seller CTA
- Product listing (`/products`) with working category/deal/search/sort via URL params + filter rail
- Product detail (`/product/[slug]`): gallery, buy box, variants, trust panel, seller card, reviews, related
- Seller shop page (`/shop/[slug]`) and verified-shops directory (`/shops`)
- Cart / checkout summary (`/cart`) with COD messaging

**Seller Center** (`/seller`)
- Dashboard with metrics + due alert + credit-limit bar
- Orders, Products, Settings
- **Due & Commission** ledger — the core business model (collect directly, pay commission after delivery)

**Super Admin** (`/admin`)
- Marketplace overview (GMV, dues, seller health, payment proofs)
- Seller management, product moderation, due management

**Auth** — split-screen login with role selection (`/login`) + seller onboarding (`/seller/register`)

## Architecture notes

- **Single Next.js app, route groups**: `(store)` (customer + chrome), `seller/(panel)`, `admin/(panel)` each with their own layout. RBAC guard scaffold in `src/proxy.ts` (scoped to `/seller`, `/admin`).
- **Design system** in `src/app/globals.css` — emerald/teal "trust" brand, gold accent, Plus Jakarta Sans (display) + Inter (body), tokens like `bg-brand-600`, `text-ink`, `shadow-card`.
- **Phase-0 data is mock** — typed in `src/lib/data.ts`, mirroring `prisma/schema.prisma`. Wiring Supabase in Phase 1 is a drop-in replacement (same shapes).
- Service env vars documented in [`.env.example`](.env.example).

## Next (Phase 1)

1. Provision Supabase (Mumbai) → set `DATABASE_URL`, run `npx prisma migrate dev`.
2. Replace `src/lib/data.ts` selectors with Prisma queries.
3. Wire Auth.js + activate the `src/proxy.ts` role guards.
4. Build the ledger/due engine + the scheduled "due sweep" (see plan).
