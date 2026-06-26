import type { UserRole } from "./types";

/* ----------------------------------------------------------------------------
   Auth scaffold (Phase 0).

   In Phase 1 this is replaced by Auth.js (NextAuth v5) with the Prisma adapter.
   The JWT session will carry `role` and (for sellers) `sellerStatus`, and the
   helpers below will read that real session instead of the demo user.

   RBAC is enforced in two layers:
     1. src/middleware.ts — coarse guard on /seller and /admin route groups
     2. server actions / route handlers — re-check role + resource ownership
---------------------------------------------------------------------------- */

export interface SessionUser {
  id: string;
  name: string;
  role: UserRole;
  sellerStatus?: string;
}

/** Phase-0 demo session so the dashboards are explorable. Replace in Phase 1. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  return { id: "demo", name: "Demo User", role: "customer" };
}

/** Coarse access check used by middleware and guards. */
export function canAccess(
  role: UserRole | undefined,
  area: "seller" | "admin",
): boolean {
  if (area === "admin") return role === "admin";
  if (area === "seller") return role === "seller" || role === "admin";
  return true;
}
