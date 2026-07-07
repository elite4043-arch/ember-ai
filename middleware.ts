// middleware.ts (root of project)
// ─────────────────────────────────────────────────────────────
// Routes subdomains to the correct page:
//   flexcore.useember.io  → /store/flexcore
//   www.useember.io       → normal routing (homepage)
//   useember.io           → normal routing (homepage)
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";

// Subdomains that should NOT be treated as store slugs
const RESERVED = new Set([
  "www",
  "api",
  "app",
  "admin",
  "mail",
  "staging",
  "dev",
  "test123",
]);

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // Extract subdomain: "flexcore.useember.io" → "flexcore"
  // Works for both production and localhost development
  let subdomain: string | null = null;

  if (hostname.endsWith(".useember.io")) {
    subdomain = hostname.replace(".useember.io", "").toLowerCase();
  } else if (hostname.includes("localhost")) {
    // Local dev: use ?store=flexcore or x-store header
    subdomain = url.searchParams.get("store") || req.headers.get("x-store") || null;
  }

  // No subdomain or reserved name → normal routing
  if (!subdomain || RESERVED.has(subdomain)) {
    return NextResponse.next();
  }

  // Rewrite to the store page
  // flexcore.useember.io → /store/flexcore
  // flexcore.useember.io/success → /store/flexcore/success
  const path = url.pathname;

  if (path === "/" || path === "") {
    url.pathname = `/store/${subdomain}`;
  } else {
    url.pathname = `/store/${subdomain}${path}`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  // Run on all routes except static files and API routes
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|products/|data/|api/).*)",
  ],
};
