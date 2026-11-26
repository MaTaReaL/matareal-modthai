import { NextRequest, NextResponse } from "next/server";
import { getModBySlug } from "@/data/mods";
import { recordDownload } from "@/lib/store";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const mod = getModBySlug(slug);
  if (!mod) {
    return NextResponse.json({ error: "Mod not found" }, { status: 404 });
  }

  let fileId = mod.files[0]?.id;
  let mirror: "primary" | "backup" = "primary";
  try {
    const body = (await req.json()) as { fileId?: string; mirror?: "primary" | "backup" };
    if (body.fileId) fileId = body.fileId;
    if (body.mirror === "backup") mirror = "backup";
  } catch {
    // default file & primary mirror
  }

  const file = mod.files.find((f) => f.id === fileId) || mod.files[0];
  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const targetUrl =
    mirror === "backup" && file.backupUrl ? file.backupUrl : file.primaryUrl;

  const { count, counted } = await recordDownload(slug, getClientIp(req));

  return NextResponse.json({
    ok: true,
    slug,
    fileName: file.fileName,
    url: targetUrl,
    downloads: count,
    counted,
  });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const mod = getModBySlug(slug);
  if (!mod || !mod.files[0]) {
    return NextResponse.json({ error: "Mod not found" }, { status: 404 });
  }

  const mirror = req.nextUrl.searchParams.get("mirror") === "backup" ? "backup" : "primary";
  const file = mod.files[0];
  const targetUrl =
    mirror === "backup" && file.backupUrl ? file.backupUrl : file.primaryUrl;

  await recordDownload(slug, getClientIp(req));
  return NextResponse.redirect(targetUrl, 302);
}
