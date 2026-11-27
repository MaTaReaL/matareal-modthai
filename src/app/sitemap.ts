import type { MetadataRoute } from "next";
import { MODS } from "@/data/mods";
import { SITE_CONFIG } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const modEntries: MetadataRoute.Sitemap = MODS.map((mod) => ({
    url: `${SITE_CONFIG.siteUrl}/mods/${mod.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  return [
    {
      url: SITE_CONFIG.siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.siteUrl}/requests`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...modEntries,
  ];
}
