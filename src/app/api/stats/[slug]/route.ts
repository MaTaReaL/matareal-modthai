import { NextResponse } from "next/server";
import { getModBySlug } from "@/data/mods";
import { getDownloadCount } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const mod = getModBySlug(slug);
  if (!mod) {
    return NextResponse.json({ error: "Mod not found" }, { status: 404 });
  }

  const downloads = await getDownloadCount(slug);
  return NextResponse.json({ slug, downloads });
}
