import { MODS } from "@/data/mods";
import { SITE_CONFIG } from "@/data/site";
import { fetchLiveSteamData, type LiveSteamData } from "@/lib/steam";
import { getAllDownloadCounts } from "@/lib/store";
import { HomeClient } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [counts, steamList] = await Promise.all([
    getAllDownloadCounts(MODS.map((m) => m.slug)),
    Promise.all(
      MODS.map(async (m) => {
        const steamStore = m.stores.find((s) => s.platform === "steam" && s.steamAppId);
        const data = await fetchLiveSteamData(steamStore?.steamAppId, m.fallbackSteam);
        return [m.slug, data] as const;
      })
    ),
  ]);

  const steamMap: Record<string, LiveSteamData | null> = Object.fromEntries(steamList);

  // Long-term SEO Knowledge Graph: WebSite + Creator Entity (sameAs) + Mod Hub ItemList
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_CONFIG.nameTh,
      alternateName: [SITE_CONFIG.nameEn, "MaTaReaL", "ม็อดไทย MaTaReaL"],
      url: SITE_CONFIG.siteUrl,
      description: SITE_CONFIG.descriptionTh,
      inLanguage: "th-TH",
      publisher: {
        "@type": "Person",
        name: SITE_CONFIG.authorName,
        url: SITE_CONFIG.siteUrl,
        sameAs: [
          SITE_CONFIG.nexusProfileUrl,
          SITE_CONFIG.facebookUrl,
          "https://github.com/MaTaReaL",
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "รายการม็อดภาษาไทยโดย MaTaReaL",
      numberOfItems: MODS.length,
      itemListElement: MODS.map((mod, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${mod.gameTitle} ม็อดไทย`,
        url: `${SITE_CONFIG.siteUrl}/mods/${mod.slug}`,
        image: `${SITE_CONFIG.siteUrl}${mod.media.cover}`,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeClient mods={MODS} downloadCounts={counts} steamMap={steamMap} />
    </>
  );
}
