import { NextResponse, type NextRequest } from "next/server";

/* ----------------------------------------------------------------------------
   Route-group guard (Phase 0 scaffold) — Next 16 "proxy" convention.

   Phase 1: read the Auth.js session here and redirect unauthenticated or
   forbidden users — e.g. non-sellers hitting /seller, non-admins hitting
   /admin. The matcher below already scopes the guard to those areas.

   For the Phase-0 clickable demo we allow navigation so every surface is
   explorable without a real login.
---------------------------------------------------------------------------- */

export function proxy(_req: NextRequest) {
  // const session = await auth();
  // if (!canAccess(session?.user.role, area)) return NextResponse.redirect(loginUrl);
  return NextResponse.next();
}

export const config = {
  matcher: ["/seller/:path*", "/admin/:path*"],
};
