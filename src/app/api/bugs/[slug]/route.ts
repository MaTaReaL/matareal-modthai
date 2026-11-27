import { NextRequest, NextResponse } from "next/server";
import { getModBySlug } from "@/data/mods";
import { SITE_CONFIG } from "@/data/site";
import { addBugReport, deleteBugReport, getBugReports, updateBugStatus } from "@/lib/store";
import { isCurrentUserAdmin } from "@/lib/admin";
import type { BugReportItem } from "@/data/types";

export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const mod = getModBySlug(slug);
  if (!mod) {
    return NextResponse.json({ error: "Mod not found" }, { status: 404 });
  }
  const bugs = await getBugReports(slug);
  return NextResponse.json({ slug, bugs });
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

  let message = "";
  let imageFile: File | null = null;
  let imagePreview: string | undefined;

  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      message = String(form.get("message") || "").trim().slice(0, 1200);
      const rawPreview = String(form.get("imagePreview") || "").trim();
      if (rawPreview.startsWith("data:image/") && rawPreview.length < 220_000) {
        imagePreview = rawPreview;
      }
      const maybeFile = form.get("image");
      if (maybeFile instanceof File && maybeFile.size > 0) {
        if (maybeFile.size > MAX_IMAGE_BYTES) {
          return NextResponse.json(
            { error: "ไฟล์ภาพต้องมีขนาดไม่เกิน 5 MB" },
            { status: 400 }
          );
        }
        if (!maybeFile.type.startsWith("image/")) {
          return NextResponse.json(
            { error: "รองรับเฉพาะไฟล์รูปภาพ (PNG, JPG, WebP)" },
            { status: 400 }
          );
        }
        imageFile = maybeFile;
      }
    } else {
      const body = (await req.json()) as { message?: string };
      message = String(body.message || "").trim().slice(0, 1200);
    }
  } catch {
    return NextResponse.json({ error: "ไม่สามารถอ่านข้อมูลที่ส่งมาได้" }, { status: 400 });
  }

  if (!message && !imageFile) {
    return NextResponse.json(
      { error: "กรุณาแนบภาพหรือพิมพ์รายละเอียดปัญหาอย่างน้อย 1 อย่าง" },
      { status: 400 }
    );
  }

  const now = new Date();
  const report: BugReportItem = {
    id: `BUG-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    slug,
    message,
    imagePreview,
    hasImage: Boolean(imageFile),
    version: mod.specs.version,
    status: "รับเรื่องแล้ว",
    createdAt: now.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };

  const saved = await addBugReport(slug, report, getClientIp(req));
  if (!saved.ok) {
    return NextResponse.json({ error: saved.error }, { status: 429 });
  }

  // Forward message + real attached image directly to Discord Webhook
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  let discordSent = false;
  if (webhookUrl) {
    try {
      const embed: Record<string, unknown> = {
        title: `[${report.id}] แจ้งปัญหา — ${mod.gameTitle} (${mod.specs.version})`,
        description: message || "*ผู้ใช้งานส่งเฉพาะรูปภาพ*",
        color: 0xff4d8d,
        footer: {
          text: `${SITE_CONFIG.nameTh} • ${SITE_CONFIG.siteUrl}/mods/${slug}`,
        },
        timestamp: now.toISOString(),
      };

      if (imageFile) {
        const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${report.id.toLowerCase()}.${ext}`;
        embed.image = { url: `attachment://${fileName}` };

        const discordForm = new FormData();
        discordForm.append(
          "payload_json",
          JSON.stringify({
            username: "MaTaReaL ม็อดไทย",
            embeds: [embed],
          })
        );
        discordForm.append("files[0]", imageFile, fileName);

        const res = await fetch(webhookUrl, {
          method: "POST",
          body: discordForm,
        });
        discordSent = res.ok;
      } else {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "MaTaReaL ม็อดไทย",
            embeds: [embed],
          }),
        });
        discordSent = res.ok;
      }
    } catch {
      discordSent = false;
    }
  }

  return NextResponse.json({ ok: true, report, discordSent });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  if (!(await isCurrentUserAdmin())) {
    return NextResponse.json({ error: "เฉพาะแอดมินเท่านั้น" }, { status: 401 });
  }
  const { slug } = await context.params;
  const body = (await req.json()) as { id?: string; status?: BugReportItem["status"] };
  const valid: BugReportItem["status"][] = ["รับเรื่องแล้ว", "กำลังแก้ไข", "แก้ไขแล้ว"];
  if (!body.id || !body.status || !valid.includes(body.status)) {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
  const updated = await updateBugStatus(slug, body.id, body.status);
  if (!updated) return NextResponse.json({ error: "ไม่พบรายการ" }, { status: 404 });
  return NextResponse.json({ ok: true, report: updated });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  if (!(await isCurrentUserAdmin())) {
    return NextResponse.json({ error: "เฉพาะแอดมินเท่านั้น" }, { status: 401 });
  }
  const { slug } = await context.params;
  const id = (req.nextUrl.searchParams.get("id") || "").trim();
  if (!id) return NextResponse.json({ error: "ไม่พบรหัส" }, { status: 400 });
  const deleted = await deleteBugReport(slug, id);
  if (!deleted) return NextResponse.json({ error: "ไม่พบรายการ" }, { status: 404 });
  return NextResponse.json({ ok: true, id });
}
