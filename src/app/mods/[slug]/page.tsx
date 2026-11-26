import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllModSlugs, getModBySlug } from "@/data/mods";
import { SITE_CONFIG } from "@/data/site";
import { fetchLiveSteamData } from "@/lib/steam";
import { getBugReports, getDownloadCount } from "@/lib/store";
import { ModDetailClient } from "@/components/ModDetailClient";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getAllModSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModBySlug(slug);
  if (!mod) return { title: "ไม่พบม็อด" };

  const title = `${mod.gameTitle} ม็อดไทย (${mod.specs.version}) ดาวน์โหลดฟรี`;
  const description = `${mod.shortDescription} | โดย ${SITE_CONFIG.authorName} — โหลดตรงเต็มสปีดพร้อมคู่มือติดตั้ง`;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}/mods/${mod.slug}`;

  // Auto-generate core Thai/English search intent keywords for EVERY future game
  const autoKeywords = Array.from(
    new Set([
      `${mod.gameTitle} ม็อดไทย`,
      `${mod.gameTitle} ม็อดภาษาไทย`,
      `${mod.gameTitle} แปลไทย`,
      `${mod.gameTitle} Thai Mod`,
      `ดาวน์โหลดม็อดไทย ${mod.gameTitle}`,
      `วิธีลงม็อดไทย ${mod.gameTitle}`,
      SITE_CONFIG.nameTh,
      SITE_CONFIG.nameEn,
      ...mod.seoKeywords,
    ])
  );

  return {
    title,
    description,
    keywords: autoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "th_TH",
      url: canonicalUrl,
      siteName: `${SITE_CONFIG.nameTh} (${SITE_CONFIG.nameEn})`,
      title: `${title} | ${SITE_CONFIG.nameTh}`,
      description,
      images: [
        {
          url: mod.media.ogImage,
          width: 1200,
          height: 630,
          alt: mod.thaiTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.nameTh}`,
      description,
      images: [mod.media.ogImage],
    },
  };
}

export default async function ModDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModBySlug(slug);
  if (!mod) notFound();

  const steamStore = mod.stores.find((s) => s.platform === "steam" && s.steamAppId);

  const [downloads, bugs, steamData] = await Promise.all([
    getDownloadCount(mod.slug),
    getBugReports(mod.slug),
    fetchLiveSteamData(steamStore?.steamAppId, mod.fallbackSteam),
  ]);

  const pageUrl = `${SITE_CONFIG.siteUrl}/mods/${mod.slug}`;

  // Rich Structured Data for Google Search (SoftwareApplication + BreadcrumbList + FAQPage)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${mod.gameTitle} ม็อดไทย`,
      alternateName: mod.thaiTitle,
      applicationCategory: "GameApplication",
      operatingSystem: "Windows 10, Windows 11",
      softwareVersion: mod.specs.version,
      fileSize: mod.specs.fileSize,
      inLanguage: "th-TH",
      description: mod.shortDescription,
      url: pageUrl,
      image: `${SITE_CONFIG.siteUrl}${mod.media.ogImage}`,
      author: {
        "@type": "Person",
        name: SITE_CONFIG.authorName,
        url: SITE_CONFIG.nexusProfileUrl,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "THB",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE_CONFIG.nameTh,
          item: SITE_CONFIG.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${mod.gameTitle} ม็อดไทย`,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `ม็อดภาษาไทย ${mod.gameTitle} ติดตั้งอย่างไร?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: mod.installSteps.join(" "),
          },
        },
        {
          "@type": "Question",
          name: `ม็อดไทย ${mod.gameTitle} ปลอดภัยและถอนการติดตั้งได้ไหม?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `ปลอดภัย 100% ไม่มีไฟล์ .exe หรือ .bat และไม่กระทบเซฟเกม ${mod.uninstallNote}`,
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModDetailClient
        mod={mod}
        initialDownloads={downloads}
        initialBugs={bugs}
        steamData={steamData}
      />
    </>
  );
}
