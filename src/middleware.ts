import { NextRequest, NextResponse } from "next/server";

/**
 * Edge Security Shield:
 * 1. Blocks automated site-cloners & vulnerability scanners while preserving SEO bots.
 * 2. Enforces Same-Origin check on mutating API requests (CSRF defense).
 */
const BLOCKED_UA_PATTERNS = [
  /httrack/i,
  /webcopier/i,
  /teleport/i,
  /offline\s*explorer/i,
  /site\s*sucker/i,
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /nuclei/i,
  /acunetix/i,
  /dirbuster/i,
  /gobuster/i,
  /scrapy/i,
];

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (BLOCKED_UA_PATTERNS.some((re) => re.test(ua))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // CSRF / Cross-Origin write guard for /api/*
  if (
    req.nextUrl.pathname.startsWith("/api/") &&
    ["POST", "PATCH", "PUT", "DELETE"].includes(req.method)
  ) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json(
            { error: "Cross-origin request rejected" },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
