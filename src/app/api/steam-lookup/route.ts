import { NextRequest, NextResponse } from "next/server";
import { fetchLiveSteamData } from "@/lib/steam";

export const dynamic = "force-dynamic";

export interface SteamLookupResult {
  appId: number;
  name: string;
  headerImage: string;
  steamUrl: string;
  priceLabel?: string;
  releaseDate?: string;
}

function extractAppId(input: string): number | null {
  const urlMatch = input.match(/store\.steampowered\.com\/app\/(\d+)/i);
  if (urlMatch) return Number(urlMatch[1]);
  if (/^\d{3,9}$/.test(input.trim())) return Number(input.trim());
  return null;
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim().slice(0, 200);
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Case 1: Direct Steam Store URL or App ID
  const directAppId = extractAppId(q);
  if (directAppId) {
    const data = await fetchLiveSteamData(directAppId);
    if (!data) {
      return NextResponse.json(
        { results: [], error: "ไม่พบข้อมูลเกมจากลิงก์ Steam นี้" },
        { status: 404 }
      );
    }
    const item: SteamLookupResult = {
      appId: data.appId,
      name: data.name,
      headerImage:
        data.headerImage ||
        `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${data.appId}/header.jpg`,
      steamUrl: `https://store.steampowered.com/app/${data.appId}/`,
      priceLabel: data.price?.finalFormatted,
      releaseDate: data.releaseDate,
    };
    return NextResponse.json({ results: [item], exact: true });
  }

  // Case 2: Search by Game Name via Steam Store Search API
  try {
    const url = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(
      q
    )}&l=thai&cc=th`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Steam search HTTP ${res.status}`);
    const json = (await res.json()) as {
      items?: {
        id: number;
        name: string;
        tiny_image?: string;
        price?: { final?: number; currency?: string };
      }[];
    };

    const results: SteamLookupResult[] = (json.items || []).slice(0, 6).map((item) => {
      const priceVal =
        item.price && typeof item.price.final === "number"
          ? item.price.final === 0
            ? "เล่นฟรี"
            : `฿${(item.price.final / 100).toLocaleString("th-TH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
          : undefined;

      return {
        appId: item.id,
        name: item.name,
        headerImage: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${item.id}/header.jpg`,
        steamUrl: `https://store.steampowered.com/app/${item.id}/`,
        priceLabel: priceVal,
      };
    });

    return NextResponse.json({ results, exact: false });
  } catch {
    return NextResponse.json({ results: [], error: "ไม่สามารถเชื่อมต่อ Steam Search ได้ในขณะนี้" });
  }
}
