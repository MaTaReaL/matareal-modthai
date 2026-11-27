import fs from "fs/promises";
import path from "path";
import type { BugReportItem, ModRequestItem, ModRequestStatus } from "@/data/types";

interface LocalStoreSchema {
  downloads: Record<string, number>;
  bugs: Record<string, BugReportItem[]>;
  requests: ModRequestItem[];
  visits: number;
}

export interface SiteStats {
  onlineNow: number;
  totalVisits: number;
  totalDownloads: number;
  totalMods: number;
}

const LOCAL_STORE_PATH = path.join(process.cwd(), ".local-data.json");
const RATE_LIMIT_MAP = new Map<string, number>();
const LOGIN_FAIL_MAP = new Map<string, { count: number; resetAt: number }>();
const LOCAL_ONLINE_MAP = new Map<string, number>();

function getRedisConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

function hasUpstash(): boolean {
  return Boolean(getRedisConfig());
}

async function upstashCmd<T = unknown>(command: (string | number)[]): Promise<T | null> {
  const cfg = getRedisConfig();
  if (!cfg) return null;

  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { result?: T };
  return json.result ?? null;
}

async function readLocalStore(): Promise<LocalStoreSchema> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<LocalStoreSchema>;
    return {
      downloads: parsed.downloads || {},
      bugs: parsed.bugs || {},
      requests: parsed.requests || [],
      visits: parsed.visits || 0,
    };
  } catch {
    return { downloads: {}, bugs: {}, requests: [], visits: 0 };
  }
}

async function writeLocalStore(data: LocalStoreSchema): Promise<void> {
  try {
    await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Serverless read-only FS fallback when Redis is not configured
  }
}

/* ==================== ADMIN BRUTE-FORCE GUARD ==================== */

export async function checkAdminLoginAllowed(clientIp: string): Promise<boolean> {
  const key = `admin_fail:${clientIp}`;
  if (hasUpstash()) {
    const count = Number(await upstashCmd<string | number>(["GET", key])) || 0;
    return count < 5;
  }
  const entry = LOGIN_FAIL_MAP.get(key);
  if (!entry || entry.resetAt < Date.now()) return true;
  return entry.count < 5;
}

export async function recordAdminLoginFailure(clientIp: string): Promise<void> {
  const key = `admin_fail:${clientIp}`;
  if (hasUpstash()) {
    const c = Number(await upstashCmd<number>(["INCR", key])) || 1;
    if (c === 1) await upstashCmd(["EXPIRE", key, 900]); // 15-minute lockout window
    return;
  }
  const now = Date.now();
  const entry = LOGIN_FAIL_MAP.get(key);
  if (!entry || entry.resetAt < now) {
    LOGIN_FAIL_MAP.set(key, { count: 1, resetAt: now + 900_000 });
  } else {
    entry.count += 1;
  }
}

export async function clearAdminLoginFailures(clientIp: string): Promise<void> {
  const key = `admin_fail:${clientIp}`;
  if (hasUpstash()) {
    await upstashCmd(["DEL", key]);
    return;
  }
  LOGIN_FAIL_MAP.delete(key);
}

/* ==================== DOWNLOADS & PRESENCE ==================== */

export async function getDownloadCount(slug: string): Promise<number> {
  if (hasUpstash()) {
    const val = await upstashCmd<string | number>(["GET", `dl:${slug}`]);
    return Number(val) || 0;
  }
  const store = await readLocalStore();
  return store.downloads[slug] || 0;
}

export async function getAllDownloadCounts(slugs: string[]): Promise<Record<string, number>> {
  const result: Record<string, number> = {};
  await Promise.all(
    slugs.map(async (s) => {
      result[s] = await getDownloadCount(s);
    })
  );
  return result;
}

export async function getSiteStats(slugs: string[]): Promise<SiteStats> {
  const counts = await getAllDownloadCounts(slugs);
  const totalDownloads = Object.values(counts).reduce((a, b) => a + b, 0);
  const nowSec = Math.floor(Date.now() / 1000);

  if (hasUpstash()) {
    await upstashCmd(["ZREMRANGEBYSCORE", "site:online", 0, nowSec - 120]);
    const [onlineRaw, visitsRaw] = await Promise.all([
      upstashCmd<number>(["ZCARD", "site:online"]),
      upstashCmd<string | number>(["GET", "site:visits"]),
    ]);
    return {
      onlineNow: Math.max(1, Number(onlineRaw) || 0),
      totalVisits: Number(visitsRaw) || 0,
      totalDownloads,
      totalMods: slugs.length,
    };
  }

  for (const [sid, ts] of LOCAL_ONLINE_MAP.entries()) {
    if (nowSec - ts > 120) LOCAL_ONLINE_MAP.delete(sid);
  }
  const store = await readLocalStore();
  return {
    onlineNow: Math.max(1, LOCAL_ONLINE_MAP.size),
    totalVisits: store.visits,
    totalDownloads,
    totalMods: slugs.length,
  };
}

export async function recordPresence(
  sessionId: string,
  clientIp: string,
  allSlugs: string[]
): Promise<SiteStats> {
  const nowSec = Math.floor(Date.now() / 1000);
  const safeSid = sessionId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || clientIp;

  if (hasUpstash()) {
    await Promise.all([
      upstashCmd(["ZADD", "site:online", nowSec, safeSid]),
      upstashCmd(["ZREMRANGEBYSCORE", "site:online", 0, nowSec - 120]),
    ]);

    const visitLock = await upstashCmd<string | null>([
      "SET",
      `visit_rl:${clientIp}`,
      "1",
      "EX",
      1800,
      "NX",
    ]);
    if (visitLock === "OK") {
      await upstashCmd(["INCR", "site:visits"]);
    }

    return getSiteStats(allSlugs);
  }

  LOCAL_ONLINE_MAP.set(safeSid, nowSec);
  const lastVisit = RATE_LIMIT_MAP.get(`visit_rl:${clientIp}`) || 0;
  if (Date.now() - lastVisit > 1_800_000) {
    RATE_LIMIT_MAP.set(`visit_rl:${clientIp}`, Date.now());
    const store = await readLocalStore();
    store.visits = (store.visits || 0) + 1;
    await writeLocalStore(store);
  }
  return getSiteStats(allSlugs);
}

export async function recordDownload(
  slug: string,
  clientIp: string
): Promise<{ count: number; counted: boolean }> {
  const debounceKey = `dl_rl:${slug}:${clientIp}`;

  if (hasUpstash()) {
    const lock = await upstashCmd<string | null>(["SET", debounceKey, "1", "EX", 300, "NX"]);
    if (lock === "OK") {
      const nextCount = await upstashCmd<number>(["INCR", `dl:${slug}`]);
      return { count: Number(nextCount) || 1, counted: true };
    }
    const existing = await getDownloadCount(slug);
    return { count: existing, counted: false };
  }

  const now = Date.now();
  const lastHit = RATE_LIMIT_MAP.get(debounceKey) || 0;
  const store = await readLocalStore();
  const current = store.downloads[slug] || 0;

  if (now - lastHit < 10_000) {
    return { count: current, counted: false };
  }

  RATE_LIMIT_MAP.set(debounceKey, now);
  store.downloads[slug] = current + 1;
  await writeLocalStore(store);
  return { count: store.downloads[slug], counted: true };
}

/* ==================== BUG REPORTS ==================== */

export async function getBugReports(slug: string): Promise<BugReportItem[]> {
  if (hasUpstash()) {
    const rawList = await upstashCmd<string[]>(["LRANGE", `bugs:${slug}`, 0, 99]);
    if (!Array.isArray(rawList)) return [];
    return rawList
      .map((item) => {
        try {
          return JSON.parse(item) as BugReportItem;
        } catch {
          return null;
        }
      })
      .filter((x): x is BugReportItem => x !== null);
  }

  const store = await readLocalStore();
  return store.bugs[slug] || [];
}

async function saveBugReportsList(slug: string, list: BugReportItem[]): Promise<void> {
  if (hasUpstash()) {
    await upstashCmd(["DEL", `bugs:${slug}`]);
    if (list.length > 0) {
      await upstashCmd(["RPUSH", `bugs:${slug}`, ...list.map((b) => JSON.stringify(b))]);
    }
    return;
  }
  const store = await readLocalStore();
  store.bugs[slug] = list;
  await writeLocalStore(store);
}

export async function addBugReport(
  slug: string,
  report: BugReportItem,
  clientIp: string
): Promise<{ ok: boolean; error?: string }> {
  const rlKey = `bug_rl:${clientIp}`;

  if (hasUpstash()) {
    const lock = await upstashCmd<string | null>(["SET", rlKey, "1", "EX", 30, "NX"]);
    if (lock !== "OK") {
      return { ok: false, error: "ส่งรายงานถี่เกินไป กรุณารอ 30 วินาทีแล้วลองใหม่ครับ" };
    }
    await upstashCmd(["LPUSH", `bugs:${slug}`, JSON.stringify(report)]);
    await upstashCmd(["LTRIM", `bugs:${slug}`, 0, 99]);
    return { ok: true };
  }

  const now = Date.now();
  const lastHit = RATE_LIMIT_MAP.get(rlKey) || 0;
  if (now - lastHit < 10_000) {
    return { ok: false, error: "ส่งรายงานถี่เกินไป กรุณารอสักครู่ครับ" };
  }
  RATE_LIMIT_MAP.set(rlKey, now);

  const store = await readLocalStore();
  const list = store.bugs[slug] || [];
  list.unshift(report);
  store.bugs[slug] = list.slice(0, 100);
  await writeLocalStore(store);
  return { ok: true };
}

export async function updateBugStatus(
  slug: string,
  bugId: string,
  status: BugReportItem["status"]
): Promise<BugReportItem | null> {
  const list = await getBugReports(slug);
  const idx = list.findIndex((b) => b.id === bugId);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], status };
  await saveBugReportsList(slug, list);
  return list[idx];
}

export async function deleteBugReport(slug: string, bugId: string): Promise<boolean> {
  const list = await getBugReports(slug);
  const filtered = list.filter((b) => b.id !== bugId);
  if (filtered.length === list.length) return false;
  await saveBugReportsList(slug, filtered);
  return true;
}

/* ==================== MOD REQUEST BOARD ==================== */

export async function getModRequests(): Promise<ModRequestItem[]> {
  if (hasUpstash()) {
    const raw = await upstashCmd<string>(["GET", "site:mod_requests"]);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ModRequestItem[]) : [];
    } catch {
      return [];
    }
  }
  const store = await readLocalStore();
  return store.requests || [];
}

async function saveModRequests(list: ModRequestItem[]): Promise<void> {
  if (hasUpstash()) {
    await upstashCmd(["SET", "site:mod_requests", JSON.stringify(list.slice(0, 200))]);
    return;
  }
  const store = await readLocalStore();
  store.requests = list.slice(0, 200);
  await writeLocalStore(store);
}

export async function addModRequest(
  item: ModRequestItem,
  clientIp: string
): Promise<{ ok: boolean; error?: string; existing?: ModRequestItem }> {
  const rlKey = `req_rl:${clientIp}`;
  if (hasUpstash()) {
    const lock = await upstashCmd<string | null>(["SET", rlKey, "1", "EX", 45, "NX"]);
    if (lock !== "OK") {
      return { ok: false, error: "เสนอเกมถี่เกินไป กรุณารอ 45 วินาทีแล้วลองใหม่ครับ" };
    }
  } else {
    const last = RATE_LIMIT_MAP.get(rlKey) || 0;
    if (Date.now() - last < 8_000) {
      return { ok: false, error: "เสนอเกมถี่เกินไป กรุณารอสักครู่ครับ" };
    }
    RATE_LIMIT_MAP.set(rlKey, Date.now());
  }

  const list = await getModRequests();
  // Prevent duplicate Steam AppID or exact same game name
  const dup = list.find(
    (r) =>
      (item.steamAppId && r.steamAppId === item.steamAppId) ||
      r.gameName.trim().toLowerCase() === item.gameName.trim().toLowerCase()
  );
  if (dup) {
    return {
      ok: false,
      existing: dup,
      error: `เกม "${dup.gameName}" มีผู้เสนอไว้แล้ว สามารถกดโหวตสนับสนุนรายการเดิมได้เลยครับ`,
    };
  }

  list.unshift(item);
  await saveModRequests(list);
  return { ok: true };
}

export async function voteModRequest(
  requestId: string,
  clientIp: string
): Promise<{ ok: boolean; item?: ModRequestItem; error?: string }> {
  const voteKey = `req_vote:${requestId}:${clientIp}`;
  if (hasUpstash()) {
    const lock = await upstashCmd<string | null>(["SET", voteKey, "1", "EX", 86400 * 30, "NX"]);
    if (lock !== "OK") {
      return { ok: false, error: "คุณโหวตเกมนี้ไปแล้วครับ" };
    }
  } else {
    if (RATE_LIMIT_MAP.has(voteKey)) {
      return { ok: false, error: "คุณโหวตเกมนี้ไปแล้วครับ" };
    }
    RATE_LIMIT_MAP.set(voteKey, Date.now());
  }

  const list = await getModRequests();
  const idx = list.findIndex((r) => r.id === requestId);
  if (idx === -1) return { ok: false, error: "ไม่พบรายการที่เลือก" };

  list[idx] = { ...list[idx], votes: (list[idx].votes || 1) + 1 };
  await saveModRequests(list);
  return { ok: true, item: list[idx] };
}

export async function updateModRequestAdmin(
  requestId: string,
  patch: { status: ModRequestStatus; adminReason?: string; modSlug?: string }
): Promise<ModRequestItem | null> {
  const list = await getModRequests();
  const idx = list.findIndex((r) => r.id === requestId);
  if (idx === -1) return null;

  list[idx] = {
    ...list[idx],
    status: patch.status,
    adminReason: patch.adminReason !== undefined ? patch.adminReason.trim().slice(0, 300) : list[idx].adminReason,
    modSlug: patch.modSlug !== undefined ? patch.modSlug.trim().slice(0, 120) : list[idx].modSlug,
  };
  await saveModRequests(list);
  return list[idx];
}

export async function deleteModRequestAdmin(requestId: string): Promise<boolean> {
  const list = await getModRequests();
  const filtered = list.filter((r) => r.id !== requestId);
  if (filtered.length === list.length) return false;
  await saveModRequests(filtered);
  return true;
}
