import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "mr_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function getSigningSecret(): string {
  return (
    process.env.SESSION_SIGNING_KEY ||
    process.env.ADMIN_SECRET ||
    "local-dev-only-unsigned-fallback"
  );
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET && process.env.ADMIN_SECRET.length >= 16);
}

/** Constant-time verification immune to timing attacks */
export function verifyAdminKey(input: string): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected || !input) return false;
  const a = Buffer.from(input.trim(), "utf-8");
  const b = Buffer.from(expected.trim(), "utf-8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createAdminSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC;
  const nonce = crypto.randomBytes(12).toString("hex");
  const payload = `admin.${exp}.${nonce}`;
  const sig = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [role, expStr, nonce, sig] = parts;
  if (role !== "admin") return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  const payload = `${role}.${expStr}.${nonce}`;
  const expectedSig = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("hex");

  const a = Buffer.from(sig, "utf-8");
  const b = Buffer.from(expectedSig, "utf-8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export const ADMIN_COOKIE_OPTIONS = {
  name: ADMIN_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SEC,
};
