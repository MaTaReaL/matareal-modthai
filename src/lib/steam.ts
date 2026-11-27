import type { CriticMetadata, FallbackSteamInfo, ModEntry, PcSpecRow } from "@/data/types";

export interface SteamPriceInfo {
  initialFormatted: string;
  finalFormatted: string;
  /** Numeric current official price in THB (includes active discounts; 0 = Free) */
  finalPriceThb: number;
  initialPriceThb: number;
  discountPercent: number;
  discountEndTimestamp?: number;
  discountEndLabel?: string;
  isFree?: boolean;
}

export interface SteamReviewInfo {
  reviewCount: number;
  percentPositive: number;
  label: string;
  /** Clearly specifies whether this score is All-Time or Recent (30 days) */
  scope: "all" | "recent";
}

export interface MetacriticInfo {
  score: number;
  url?: string;
}

export interface OpenCriticInfo {
  score: number;
  tier?: "Mighty" | "Strong" | "Fair" | "Weak";
  url?: string;
}

export interface LiveSteamData {
  appId: number;
  name: string;
  headerImage?: string;
  releaseDate: string;
  developers: string[];
  publishers: string[];
  genres: string[];
  shortDescription: string;
  price?: SteamPriceInfo;
  /** All-Time Steam user reviews */
  steamReview?: SteamReviewInfo;
  /** Recent 30-day Steam user reviews (when available) */
  steamRecentReview?: SteamReviewInfo;
  metacritic?: MetacriticInfo;
  openCritic?: OpenCriticInfo;
  minimumSpecs: PcSpecRow[];
  recommendedSpecs: PcSpecRow[];
  isLive: boolean;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&reg;/g, "®")
    .replace(/&trade;/g, "™")
    .replace(/\u00a0/g, " ");
}

function parseSteamRequirementsHtml(html?: string): PcSpecRow[] {
  if (!html) return [];
  const rows: PcSpecRow[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;

  while ((match = liRegex.exec(html)) !== null) {
    const rawItem = match[1].replace(/<br\s*\/?>/gi, " ").trim();
    const labelMatch = rawItem.match(/<strong[^>]*>([\s\S]*?)<\/strong>([\s\S]*)/i);
    if (labelMatch) {
      const label = decodeHtmlEntities(labelMatch[1].replace(/<[^>]+>/g, ""))
        .replace(/[:：]\s*$/, "")
        .trim();
      const value = decodeHtmlEntities(labelMatch[2].replace(/<[^>]+>/g, ""))
        .replace(/\s+/g, " ")
        .trim();
      if (label && value) {
        rows.push({ label, value });
      }
    }
  }

  return rows;
}

function formatThaiEndDate(unixSeconds?: number): string | undefined {
  if (!unixSeconds || unixSeconds * 1000 <= Date.now()) return undefined;
  try {
    return new Date(unixSeconds * 1000).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Bangkok",
    });
  } catch {
    return undefined;
  }
}

function parseFormattedThb(formatted?: string): number {
  if (!formatted) return 0;
  const cleaned = formatted.replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

interface BrowseItemResponse {
  appid?: number;
  name?: string;
  is_free?: boolean;
  best_purchase_option?: {
    final_price_in_cents?: string | number;
    original_price_in_cents?: string | number;
    formatted_final_price?: string;
    formatted_original_price?: string;
    discount_pct?: number;
    active_discounts?: { discount_end_date?: number }[];
  };
  reviews?: {
    summary_filtered?: {
      review_count?: number;
      percent_positive?: number;
      review_score_label?: string;
    };
  };
}

function extractPriceFromBrowse(
  bpo?: BrowseItemResponse["best_purchase_option"],
  isFree?: boolean,
  detPrice?: {
    initial?: number;
    final?: number;
    initial_formatted?: string;
    final_formatted?: string;
    discount_percent?: number;
  },
  estimatedPriceThb?: number
): SteamPriceInfo | undefined {
  if (isFree) {
    return {
      initialFormatted: "ฟรี",
      finalFormatted: "เล่นฟรี",
      finalPriceThb: 0,
      initialPriceThb: 0,
      discountPercent: 0,
      isFree: true,
    };
  }

  if (bpo?.formatted_final_price) {
    const endTs = bpo.active_discounts?.[0]?.discount_end_date;
    const activeDiscount =
      (bpo.discount_pct || 0) > 0 && (!endTs || endTs * 1000 > Date.now());
    const finalCents = Number(bpo.final_price_in_cents);
    const origCents = Number(bpo.original_price_in_cents);
    const finalPriceThb = Number.isFinite(finalCents) && finalCents > 0
      ? finalCents / 100
      : parseFormattedThb(bpo.formatted_final_price);
    const initialPriceThb = Number.isFinite(origCents) && origCents > 0
      ? origCents / 100
      : parseFormattedThb(bpo.formatted_original_price || bpo.formatted_final_price);

    return {
      initialFormatted: bpo.formatted_original_price || bpo.formatted_final_price,
      finalFormatted: bpo.formatted_final_price,
      finalPriceThb,
      initialPriceThb: initialPriceThb || finalPriceThb,
      discountPercent: activeDiscount ? bpo.discount_pct || 0 : 0,
      discountEndTimestamp: activeDiscount ? endTs : undefined,
      discountEndLabel: activeDiscount ? formatThaiEndDate(endTs) : undefined,
    };
  }

  if (detPrice?.final_formatted) {
    const finalPriceThb =
      typeof detPrice.final === "number"
        ? detPrice.final / 100
        : parseFormattedThb(detPrice.final_formatted);
    const initialPriceThb =
      typeof detPrice.initial === "number"
        ? detPrice.initial / 100
        : parseFormattedThb(detPrice.initial_formatted || detPrice.final_formatted);
    return {
      initialFormatted: detPrice.initial_formatted || detPrice.final_formatted,
      finalFormatted: detPrice.final_formatted,
      finalPriceThb,
      initialPriceThb: initialPriceThb || finalPriceThb,
      discountPercent: detPrice.discount_percent || 0,
    };
  }

  if (typeof estimatedPriceThb === "number") {
    if (estimatedPriceThb === 0) {
      return {
        initialFormatted: "ฟรี",
        finalFormatted: "เล่นฟรี",
        finalPriceThb: 0,
        initialPriceThb: 0,
        discountPercent: 0,
        isFree: true,
      };
    }
    const fmt = `฿${estimatedPriceThb.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    return {
      initialFormatted: fmt,
      finalFormatted: fmt,
      finalPriceThb: estimatedPriceThb,
      initialPriceThb: estimatedPriceThb,
      discountPercent: 0,
    };
  }

  return undefined;
}

/**
 * Fetches live Metacritic score directly from Metacritic JSON-LD (because Steam's
 * appdetails API frequently omits Metacritic scores for newer 2025/2026 titles!).
 */
async function fetchLiveMetacritic(slug?: string): Promise<MetacriticInfo | null> {
  if (!slug) return null;
  const url = `https://www.metacritic.com/game/${slug}/`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 21600 }, // 6 hours
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/"ratingValue"\s*:\s*"?(\d{1,3})"?/);
    if (!match) return null;
    const score = Number(match[1]);
    if (!Number.isFinite(score) || score <= 0 || score > 100) return null;
    return { score, url };
  } catch {
    return null;
  }
}

/**
 * Fetches live OpenCritic score & tier from the canonical OpenCritic page meta description.
 */
async function fetchLiveOpenCritic(url?: string): Promise<OpenCriticInfo | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 21600 }, // 6 hours
    });
    if (!res.ok) return null;
    const html = await res.text();
    const metaMatch =
      html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i) ||
      html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i);
    const desc = metaMatch?.[1] || "";
    const scoreMatch = desc.match(/average score of (\d{1,3})/i);
    if (!scoreMatch) return null;
    const score = Number(scoreMatch[1]);
    if (!Number.isFinite(score) || score <= 0 || score > 100) return null;
    const tierMatch = desc.match(/rated\s+'(Mighty|Strong|Fair|Weak)'/i);
    const tier = tierMatch?.[1] as OpenCriticInfo["tier"] | undefined;
    return { score, tier, url };
  } catch {
    return null;
  }
}

/**
 * Parses Steam's Recent (30-day) review summary from the official Steam Store page
 * so users clearly see BOTH "ทั้งหมด (All-Time)" and "30 วันล่าสุด (Recent)".
 */
async function fetchSteamRecentReview(appId: number): Promise<SteamReviewInfo | undefined> {
  try {
    const res = await fetch(`https://store.steampowered.com/app/${appId}/?l=thai&cc=th`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "Accept-Language": "th-TH,th;q=0.9,en;q=0.8",
        Cookie: "birthtime=568022401; mature_content=1; wants_mature_content=1",
      },
      next: { revalidate: 900 },
    });
    if (!res.ok) return undefined;
    const html = await res.text();
    const rowRegex =
      /class="user_reviews_summary_row"[^>]*data-tooltip-html="([^"]+)"[\s\S]*?class="subtitle column"[^>]*>([\s\S]*?)<\/div>[\s\S]*?class="game_review_summary[^"]*"[^>]*>([\s\S]*?)<\/span>/gi;
    let m: RegExpExecArray | null;
    while ((m = rowRegex.exec(html)) !== null) {
      const tooltip = decodeHtmlEntities(m[1]);
      const subtitle = decodeHtmlEntities(m[2]).trim();
      const label = decodeHtmlEntities(m[3]).trim();
      // Identify the "Recent Reviews / บทวิจารณ์ล่าสุด" row (30 days)
      if (
        subtitle.includes("ล่าสุด") ||
        subtitle.toLowerCase().includes("recent") ||
        tooltip.includes("30 วัน") ||
        tooltip.includes("30 days")
      ) {
        const pctMatch = tooltip.match(/(\d{1,3})%/);
        const countMatch = tooltip.match(/(?:จาก|of the)\s*([\d,]+)/i);
        if (pctMatch && countMatch) {
          const percentPositive = Number(pctMatch[1]);
          const reviewCount = Number(countMatch[1].replace(/,/g, ""));
          if (reviewCount > 0 && Number.isFinite(percentPositive)) {
            return {
              percentPositive,
              reviewCount,
              label: label || "รีวิวช่วง 30 วันล่าสุด",
              scope: "recent",
            };
          }
        }
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Super-fast batch fetcher for the Home catalog: pulls live price, active discount,
 * discount end date, and Steam all-time reviews for ALL mods in ONE single Steam API call!
 */
export async function fetchBatchSteamSummary(
  mods: ModEntry[]
): Promise<Record<string, LiveSteamData | null>> {
  const result: Record<string, LiveSteamData | null> = {};
  const entriesWithApp = mods
    .map((m) => ({
      mod: m,
      appId: m.stores.find((s) => s.platform === "steam" && s.steamAppId)?.steamAppId,
    }))
    .filter((x): x is { mod: ModEntry; appId: number } => typeof x.appId === "number");

  const browseByAppId = new Map<number, BrowseItemResponse>();

  if (entriesWithApp.length > 0) {
    const uniqueIds = Array.from(new Set(entriesWithApp.map((e) => e.appId)));
    const browseInput = encodeURIComponent(
      JSON.stringify({
        ids: uniqueIds.map((appid) => ({ appid })),
        context: { language: "thai", country_code: "TH" },
        data_request: { include_reviews: true, include_basic_info: true },
      })
    );
    const browseUrl = `https://api.steampowered.com/IStoreBrowseService/GetItems/v1/?input_json=${browseInput}`;
    try {
      const res = await fetch(browseUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept-Language": "th-TH,th;q=0.9,en;q=0.8",
        },
        next: { revalidate: 900 },
      });
      if (res.ok) {
        const json = await res.json();
        const items = (json?.response?.store_items || []) as BrowseItemResponse[];
        for (const item of items) {
          if (typeof item.appid === "number") {
            browseByAppId.set(item.appid, item);
          }
        }
      }
    } catch {
      // Fall back to estimated metadata cleanly
    }
  }

  for (const mod of mods) {
    const appId = mod.stores.find((s) => s.platform === "steam" && s.steamAppId)?.steamAppId;
    if (!appId) {
      result[mod.slug] = null;
      continue;
    }

    const browseItem = browseByAppId.get(appId);
    const price = extractPriceFromBrowse(
      browseItem?.best_purchase_option,
      browseItem?.is_free ?? mod.estimatedPriceThb === 0,
      undefined,
      mod.estimatedPriceThb
    );

    const revRaw = browseItem?.reviews?.summary_filtered;
    const steamReview: SteamReviewInfo | undefined =
      revRaw && typeof revRaw.percent_positive === "number" && (revRaw.review_count || 0) > 0
        ? {
            reviewCount: revRaw.review_count || 0,
            percentPositive: revRaw.percent_positive,
            label: revRaw.review_score_label || "รีวิวบน Steam",
            scope: "all",
          }
        : undefined;

    const metacritic: MetacriticInfo | undefined =
      typeof mod.critics?.metacriticScore === "number"
        ? {
            score: mod.critics.metacriticScore,
            url:
              mod.critics.metacriticUrl ||
              (mod.critics.metacriticSlug
                ? `https://www.metacritic.com/game/${mod.critics.metacriticSlug}/`
                : undefined),
          }
        : undefined;

    const openCritic: OpenCriticInfo | undefined =
      typeof mod.critics?.openCriticScore === "number"
        ? {
            score: mod.critics.openCriticScore,
            tier: mod.critics.openCriticTier,
            url: mod.critics.openCriticUrl,
          }
        : undefined;

    result[mod.slug] = {
      appId,
      name: browseItem?.name || mod.fallbackSteam?.name || mod.gameTitle,
      releaseDate: mod.fallbackSteam?.releaseDate || "-",
      developers: mod.fallbackSteam?.developers || [],
      publishers: mod.fallbackSteam?.publishers || [],
      genres: mod.genres.length ? mod.genres : mod.fallbackSteam?.genres || [],
      shortDescription: mod.fallbackSteam?.shortDescription || mod.shortDescription,
      price,
      steamReview,
      metacritic,
      openCritic,
      minimumSpecs: mod.fallbackSteam?.minimumSpecs || [],
      recommendedSpecs: mod.fallbackSteam?.recommendedSpecs || [],
      isLive: Boolean(browseItem),
    };
  }

  return result;
}

/**
 * Fetches rich live Steam + Metacritic + OpenCritic + Recent 30-day Reviews for a mod detail page.
 * Revalidates every 15 minutes (Steam) / 6 hours (Metacritic).
 */
export async function fetchLiveSteamData(
  appId?: number,
  fallback?: FallbackSteamInfo,
  critics?: CriticMetadata,
  estimatedPriceThb?: number
): Promise<LiveSteamData | null> {
  if (!appId) return null;

  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept-Language": "th-TH,th;q=0.9,en;q=0.8",
  };

  const detailsUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}&l=thai&cc=th`;
  const browseInput = encodeURIComponent(
    JSON.stringify({
      ids: [{ appid: appId }],
      context: { language: "thai", country_code: "TH" },
      data_request: { include_reviews: true },
    })
  );
  const browseUrl = `https://api.steampowered.com/IStoreBrowseService/GetItems/v1/?input_json=${browseInput}`;

  try {
    const [detRes, browseRes, recentReview, liveMeta, liveOc] = await Promise.all([
      fetch(detailsUrl, { headers, next: { revalidate: 900 } }).catch(() => null),
      fetch(browseUrl, { headers, next: { revalidate: 900 } }).catch(() => null),
      fetchSteamRecentReview(appId),
      fetchLiveMetacritic(critics?.metacriticSlug),
      fetchLiveOpenCritic(critics?.openCriticUrl),
    ]);

    let detData: Record<string, unknown> | null = null;
    if (detRes?.ok) {
      const detJson = await detRes.json();
      const entry = detJson?.[String(appId)];
      if (entry?.success && entry?.data) {
        detData = entry.data;
      }
    }

    let browseItem: BrowseItemResponse | null = null;
    if (browseRes?.ok) {
      const browseJson = await browseRes.json();
      browseItem = browseJson?.response?.store_items?.[0] || null;
    }

    if (!detData && !browseItem) {
      throw new Error("Both Steam endpoints unavailable");
    }

    const detPrice = detData?.price_overview as
      | {
          initial?: number;
          final?: number;
          initial_formatted?: string;
          final_formatted?: string;
          discount_percent?: number;
        }
      | undefined;

    const price = extractPriceFromBrowse(
      browseItem?.best_purchase_option,
      Boolean(detData?.is_free),
      detPrice,
      estimatedPriceThb
    );

    // All-Time Steam User Reviews
    const revRaw = browseItem?.reviews?.summary_filtered;
    const steamReview: SteamReviewInfo | undefined =
      revRaw && typeof revRaw.percent_positive === "number" && (revRaw.review_count || 0) > 0
        ? {
            reviewCount: revRaw.review_count || 0,
            percentPositive: revRaw.percent_positive,
            label: revRaw.review_score_label || "รีวิวบน Steam",
            scope: "all",
          }
        : undefined;

    // Metacritic priority: Live direct Metacritic scrape -> Steam appdetails -> Verified static fallback
    const steamMetaRaw = detData?.metacritic as { score?: number; url?: string } | undefined;
    const steamMeta: MetacriticInfo | undefined =
      steamMetaRaw && typeof steamMetaRaw.score === "number"
        ? { score: steamMetaRaw.score, url: steamMetaRaw.url }
        : undefined;
    const fallbackMeta: MetacriticInfo | undefined =
      typeof critics?.metacriticScore === "number"
        ? {
            score: critics.metacriticScore,
            url:
              critics.metacriticUrl ||
              (critics.metacriticSlug
                ? `https://www.metacritic.com/game/${critics.metacriticSlug}/`
                : undefined),
          }
        : undefined;
    const metacritic: MetacriticInfo | undefined = liveMeta || steamMeta || fallbackMeta;

    // OpenCritic score (Live scrape -> verified fallback)
    const fallbackOc: OpenCriticInfo | undefined =
      typeof critics?.openCriticScore === "number"
        ? {
            score: critics.openCriticScore,
            tier: critics.openCriticTier,
            url: critics.openCriticUrl,
          }
        : undefined;
    const openCritic: OpenCriticInfo | undefined = liveOc || fallbackOc;

    const pcReq = detData?.pc_requirements as
      | { minimum?: string; recommended?: string }
      | undefined;
    const minParsed = parseSteamRequirementsHtml(pcReq?.minimum);
    const recParsed = parseSteamRequirementsHtml(pcReq?.recommended);

    const releaseObj = detData?.release_date as { date?: string } | undefined;
    const genresArr = detData?.genres as { description: string }[] | undefined;

    return {
      appId,
      name: (detData?.name as string) || fallback?.name || `Steam App ${appId}`,
      headerImage: detData?.header_image as string | undefined,
      releaseDate: releaseObj?.date || fallback?.releaseDate || "-",
      developers:
        Array.isArray(detData?.developers) && (detData.developers as string[]).length
          ? (detData.developers as string[])
          : fallback?.developers || [],
      publishers:
        Array.isArray(detData?.publishers) && (detData.publishers as string[]).length
          ? (detData.publishers as string[])
          : fallback?.publishers || [],
      genres:
        Array.isArray(genresArr) && genresArr.length
          ? genresArr.map((g) => g.description)
          : fallback?.genres || [],
      shortDescription:
        typeof detData?.short_description === "string"
          ? decodeHtmlEntities(detData.short_description)
          : fallback?.shortDescription || "",
      price,
      steamReview,
      steamRecentReview: recentReview,
      metacritic,
      openCritic,
      minimumSpecs: minParsed.length ? minParsed : fallback?.minimumSpecs || [],
      recommendedSpecs: recParsed.length ? recParsed : fallback?.recommendedSpecs || [],
      isLive: true,
    };
  } catch {
    if (!fallback) return null;
    return {
      appId,
      name: fallback.name,
      releaseDate: fallback.releaseDate,
      developers: fallback.developers,
      publishers: fallback.publishers,
      genres: fallback.genres,
      shortDescription: fallback.shortDescription,
      price: extractPriceFromBrowse(undefined, estimatedPriceThb === 0, undefined, estimatedPriceThb),
      metacritic:
        typeof critics?.metacriticScore === "number"
          ? {
              score: critics.metacriticScore,
              url:
                critics.metacriticUrl ||
                (critics.metacriticSlug
                  ? `https://www.metacritic.com/game/${critics.metacriticSlug}/`
                  : undefined),
            }
          : undefined,
      openCritic:
        typeof critics?.openCriticScore === "number"
          ? {
              score: critics.openCriticScore,
              tier: critics.openCriticTier,
              url: critics.openCriticUrl,
            }
          : undefined,
      minimumSpecs: fallback.minimumSpecs,
      recommendedSpecs: fallback.recommendedSpecs,
      isLive: false,
    };
  }
}
