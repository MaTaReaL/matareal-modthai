import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_OPTIONS,
  createAdminSessionToken,
  isAdminConfigured,
  isCurrentUserAdmin,
  verifyAdminKey,
} from "@/lib/admin";
import {
  checkAdminLoginAllowed,
  clearAdminLoginFailures,
  recordAdminLoginFailure,
} from "@/lib/store";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

export async function GET() {
  const isAdmin = await isCurrentUserAdmin();
  return NextResponse.json({ isAdmin });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "ยังไม่ได้ตั้งค่า ADMIN_SECRET บนเซิร์ฟเวอร์" },
      { status: 503 }
    );
  }

  const allowed = await checkAdminLoginAllowed(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "ใส่รหัสผิดเกินกำหนด ถูกล็อกชั่วคราว 15 นาทีเพื่อความปลอดภัย" },
      { status: 429 }
    );
  }

  let key = "";
  try {
    const body = (await req.json()) as { key?: string };
    key = String(body.key || "");
  } catch {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  if (!verifyAdminKey(key)) {
    await recordAdminLoginFailure(ip);
    return NextResponse.json({ error: "Admin Access Key ไม่ถูกต้อง" }, { status: 401 });
  }

  await clearAdminLoginFailures(ip);
  const token = createAdminSessionToken();
  const res = NextResponse.json({ ok: true, isAdmin: true });
  res.cookies.set({ ...ADMIN_COOKIE_OPTIONS, value: token });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true, isAdmin: false });
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}
