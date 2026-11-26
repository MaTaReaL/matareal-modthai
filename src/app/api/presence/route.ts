import { NextRequest, NextResponse } from "next/server";
import { getAllModSlugs } from "@/data/mods";
import { getSiteStats, recordPresence } from "@/lib/store";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

export async function GET() {
  const stats = await getSiteStats(getAllModSlugs());
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  let sessionId = "";
  try {
    const body = (await req.json()) as { sessionId?: string };
    sessionId = String(body.sessionId || "").trim();
  } catch {
    sessionId = "";
  }

  const stats = await recordPresence(sessionId, getClientIp(req), getAllModSlugs());
  return NextResponse.json(stats);
}
