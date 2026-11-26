import type { FallbackSteamInfo, PcSpecRow } from "@/data/types";

export interface SteamPriceInfo {
  initialFormatted: string;
  finalFormatted: string;
  discountPercent: number;
  discountEndTimestamp?: number;
  discountEndLabel?: string;
  isFree?: boolean;
}

export interface SteamReviewInfo {
  reviewCount: number;
  percentPositive: number;
  label: string;
}

export interface MetacriticInfo {
  score: number;
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
  steamReview?: SteamReviewInfo;
  metacritic?: MetacriticInfo;
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

interface BrowseItemResponse {
  best_purchase_option?: {
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

/**
 * Fetches live Steam Store data (price, exact discount end date, Steam user reviews,
 * Metacritic score, and PC system requirements). Revalidates every 15 minutes automatically.
 */
export async function fetchLiveSteamData(
  appId?: number,
  fallback?: FallbackSteamInfo
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
    const [detRes, browseRes] = await Promise.all([
      fetch(detailsUrl, { headers, next: { revalidate: 900 } }).catch(() => null),
      fetch(browseUrl, { headers, next: { revalidate: 900 } }).catch(() => null),
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

    // Price + Live Discount End Date (prefer IStoreBrowseService because it includes discount_end_date!)
    let price: SteamPriceInfo | undefined;
    const bpo = browseItem?.best_purchase_option;
    const detPrice = detData?.price_overview as
      | { initial_formatted?: string; final_formatted?: string; discount_percent?: number }
      | undefined;

    if (detData?.is_free) {
      price = {
        initialFormatted: "ฟรี",
        finalFormatted: "เล่นฟรี",
        discountPercent: 0,
        isFree: true,
      };
    } else if (bpo?.formatted_final_price) {
      const endTs = bpo.active_discounts?.[0]?.discount_end_date;
      const activeDiscount =
        (bpo.discount_pct || 0) > 0 && (!endTs || endTs * 1000 > Date.now());
      price = {
        initialFormatted: bpo.formatted_original_price || bpo.formatted_final_price,
        finalFormatted: bpo.formatted_final_price,
        discountPercent: activeDiscount ? bpo.discount_pct || 0 : 0,
        discountEndTimestamp: activeDiscount ? endTs : undefined,
        discountEndLabel: activeDiscount ? formatThaiEndDate(endTs) : undefined,
      };
    } else if (detPrice?.final_formatted) {
      price = {
        initialFormatted: detPrice.initial_formatted || detPrice.final_formatted,
        finalFormatted: detPrice.final_formatted,
        discountPercent: detPrice.discount_percent || 0,
      };
    }

    // Live Steam User Reviews (Thai label + % positive + count)
    const revRaw = browseItem?.reviews?.summary_filtered;
    const steamReview: SteamReviewInfo | undefined =
      revRaw && typeof revRaw.percent_positive === "number" && (revRaw.review_count || 0) > 0
        ? {
            reviewCount: revRaw.review_count || 0,
            percentPositive: revRaw.percent_positive,
            label: revRaw.review_score_label || "รีวิวบน Steam",
          }
        : undefined;

    // Live Metacritic Score (from Steam appdetails when available)
    const metaRaw = detData?.metacritic as { score?: number; url?: string } | undefined;
    const metacritic: MetacriticInfo | undefined =
      metaRaw && typeof metaRaw.score === "number"
        ? { score: metaRaw.score, url: metaRaw.url }
        : undefined;

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
      metacritic,
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
      minimumSpecs: fallback.minimumSpecs,
      recommendedSpecs: fallback.recommendedSpecs,
      isLive: false,
    };
  }
}
