import { NextRequest, NextResponse } from "next/server";
import { SITE_CONFIG } from "@/data/site";
import type { ModRequestItem, ModRequestStatus } from "@/data/types";
import { isCurrentUserAdmin } from "@/lib/admin";
import {
  addModRequest,
  deleteModRequestAdmin,
  getModRequests,
  updateModRequestAdmin,
  voteModRequest,
} from "@/lib/store";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

export async function GET() {
  const requests = await getModRequests();
  return NextResponse.json({ requests });
}

export async function POST(req: NextRequest) {
  let body: {
    gameName?: string;
    steamAppId?: number;
    steamUrl?: string;
    headerImage?: string;
    priceLabel?: string;
    releaseDate?: string;
    note?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const gameName = String(body.gameName || "").trim().slice(0, 140);
  if (gameName.length < 2) {
    return NextResponse.json({ error: "กรุณาระบุชื่อเกมหรือลิงก์ Steam" }, { status: 400 });
  }

  const steamAppId =
    typeof body.steamAppId === "number" && Number.isInteger(body.steamAppId) && body.steamAppId > 0
      ? body.steamAppId
      : undefined;

  const steamUrl =
    steamAppId
      ? `https://store.steampowered.com/app/${steamAppId}/`
      : typeof body.steamUrl === "string" &&
          body.steamUrl.startsWith("https://store.steampowered.com/")
        ? body.steamUrl.slice(0, 240)
        : undefined;

  const headerImage =
    steamAppId
      ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steamAppId}/header.jpg`
      : undefined;

  const now = new Date();
  const item: ModRequestItem = {
    id: `REQ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    gameName,
    steamAppId,
    steamUrl,
    headerImage,
    priceLabel: body.priceLabel ? String(body.priceLabel).slice(0, 40) : undefined,
    releaseDate: body.releaseDate ? String(body.releaseDate).slice(0, 40) : undefined,
    note: body.note ? String(body.note).trim().slice(0, 400) : undefined,
    votes: 1,
    status: "รอพิจารณา",
    createdAt: now.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };

  const saved = await addModRequest(item, getClientIp(req));
  if (!saved.ok) {
    return NextResponse.json({ error: saved.error, existing: saved.existing }, { status: 409 });
  }

  // Notify Discord Webhook when a new game is requested
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "MaTaReaL ม็อดไทย • เสนอม็อดใหม่",
        embeds: [
          {
            title: `[${item.id}] เสนอทำม็อดไทย: ${item.gameName}`,
            url: item.steamUrl || `${SITE_CONFIG.siteUrl}/requests`,
            description: item.note || "*ไม่มีหมายเหตุเพิ่มเติม*",
            color: 0xff4d8d,
            thumbnail: item.headerImage ? { url: item.headerImage } : undefined,
            footer: { text: `${SITE_CONFIG.nameTh} • ${SITE_CONFIG.siteUrl}/requests` },
            timestamp: now.toISOString(),
          },
        ],
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, item });
}

export async function PATCH(req: NextRequest) {
  let body: {
    action?: "vote" | "admin_status";
    id?: string;
    status?: ModRequestStatus;
    adminReason?: string;
    modSlug?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const id = String(body.id || "").trim();
  if (!id) {
    return NextResponse.json({ error: "ไม่พบรหัสรายการ" }, { status: 400 });
  }

  // Public Upvote
  if (body.action === "vote") {
    const res = await voteModRequest(id, getClientIp(req));
    if (!res.ok) {
      return NextResponse.json({ error: res.error }, { status: 409 });
    }
    return NextResponse.json({ ok: true, item: res.item });
  }

  // Admin Status Change (Protected!)
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "เฉพาะแอดมินเท่านั้น" }, { status: 401 });
  }

  const validStatuses: ModRequestStatus[] = [
    "รอพิจารณา",
    "กำลังทำ",
    "ทำเสร็จแล้ว",
    "ทำไม่ได้",
  ];
  if (!body.status || !validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "สถานะไม่ถูกต้อง" }, { status: 400 });
  }

  const updated = await updateModRequestAdmin(id, {
    status: body.status,
    adminReason: body.adminReason,
    modSlug: body.modSlug,
  });
  if (!updated) {
    return NextResponse.json({ error: "ไม่พบรายการ" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "เฉพาะแอดมินเท่านั้น" }, { status: 401 });
  }

  const id = (req.nextUrl.searchParams.get("id") || "").trim();
  if (!id) {
    return NextResponse.json({ error: "ไม่พบรหัสรายการ" }, { status: 400 });
  }

  const deleted = await deleteModRequestAdmin(id);
  if (!deleted) {
    return NextResponse.json({ error: "ไม่พบรายการ" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, id });
}
