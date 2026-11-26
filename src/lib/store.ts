import fs from "fs/promises";
import path from "path";
import type { BugReportItem } from "@/data/types";

interface LocalStoreSchema {
  downloads: Record<string, number>;
  bugs: Record<string, BugReportItem[]>;
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
      visits: parsed.visits || 0,
    };
  } catch {
    return { downloads: {}, bugs: {}, visits: 0 };
  }
}

async function writeLocalStore(data: LocalStoreSchema): Promise<void> {
  try {
    await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Serverless read-only FS fallback when Redis is not configured
  }
}

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

  // Local dev fallback
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

/**
 * Heartbeat + Visit counter backed by Upstash Redis Sorted Set.
 * Online users stay counted for 2 minutes since last heartbeat.
 * Total visits debounced once per 30 minutes per IP so F5 refreshes don't spam.
 */
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

/**
 * Increments real download count with lightweight IP debounce (5 minutes)
 * so spamming F5 or double-clicking doesn't inflate real download stats.
 */
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

export async function getBugReports(slug: string): Promise<BugReportItem[]> {
  if (hasUpstash()) {
    const rawList = await upstashCmd<string[]>(["LRANGE", `bugs:${slug}`, 0, 49]);
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
