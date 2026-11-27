"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Flame,
  Gamepad2,
  Grid2x2,
  LayoutGrid,
  Layers,
  List,
  MessageSquarePlus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  ThumbsUp,
  Trophy,
  Users,
  X,
} from "lucide-react";
import type { FilterablePlatform, ModEntry } from "@/data/types";
import type { LiveSteamData } from "@/lib/steam";
import type { SiteStats } from "@/lib/store";
import { SITE_CONFIG } from "@/data/site";
import {
  MetacriticLogo,
  NexusModsLogo,
  OpenCriticLogo,
  SteamLogo,
  StoreLogo,
  ThaiFlagIcon,
} from "./BrandIcons";

interface HomeClientProps {
  mods: ModEntry[];
  downloadCounts: Record<string, number>;
  steamMap: Record<string, LiveSteamData | null>;
  initialStats: SiteStats;
}

type ViewMode = "grid3" | "grid4" | "list" | "series";
type SortMode = "latest" | "popular" | "price-asc" | "price-desc" | "rating" | "name";
type PlatformFilter = "all" | FilterablePlatform;

interface HeroSlide {
  mod: ModEntry;
  badgeLabel: string;
  badgeType: "sale" | "popular" | "latest" | "trending";
}

function getEffectivePriceThb(mod: ModEntry, st: LiveSteamData | null | undefined): number {
  if (st?.price) {
    return st.price.isFree ? 0 : st.price.finalPriceThb;
  }
  if (typeof mod.estimatedPriceThb === "number") return mod.estimatedPriceThb;
  return Number.POSITIVE_INFINITY;
}

function getPopularityScore(
  mod: ModEntry,
  downloadCounts: Record<string, number>,
  st: LiveSteamData | null | undefined
): number {
  const webDl = downloadCounts[mod.slug] || 0;
  const nexusDl = mod.nexusDownloads || 0;
  const steamRev = st?.steamReview?.reviewCount || 0;
  // Prioritize real mod downloads (web + Nexus), use log-weighted Steam popularity as gentle tie-breaker
  return webDl * 3 + nexusDl + Math.round(Math.log10(steamRev + 1) * 8);
}

function getBestRatingScore(mod: ModEntry, st: LiveSteamData | null | undefined): number {
  const mc = st?.metacritic?.score ?? mod.critics?.metacriticScore ?? 0;
  const oc = st?.openCritic?.score ?? mod.critics?.openCriticScore ?? 0;
  const sr = st?.steamReview?.percentPositive ?? 0;
  if (mc > 0 && oc > 0) return Math.round((mc + oc) / 2);
  if (mc > 0) return mc;
  if (oc > 0) return oc;
  return sr;
}

function getPcPlatforms(mod: ModEntry): FilterablePlatform[] {
  const set = new Set<FilterablePlatform>();
  for (const s of mod.stores) {
    if (s.platform === "steam" || s.platform === "xbox" || s.platform === "epic") {
      set.add(s.platform);
    }
  }
  return Array.from(set);
}

function buildHeroSlides(
  mods: ModEntry[],
  downloadCounts: Record<string, number>,
  steamMap: Record<string, LiveSteamData | null>
): HeroSlide[] {
  const slides: HeroSlide[] = [];
  const seen = new Set<string>();

  const pushUnique = (
    mod: ModEntry | undefined,
    badgeLabel: string,
    badgeType: HeroSlide["badgeType"]
  ) => {
    if (!mod || seen.has(mod.slug)) return;
    seen.add(mod.slug);
    slides.push({ mod, badgeLabel, badgeType });
  };

  // 1. Games currently on Steam Sale (highest discount first)
  const onSale = mods
    .filter((m) => (steamMap[m.slug]?.price?.discountPercent || 0) > 0)
    .sort(
      (a, b) =>
        (steamMap[b.slug]?.price?.discountPercent || 0) -
        (steamMap[a.slug]?.price?.discountPercent || 0)
    );
  onSale.slice(0, 2).forEach((m) => {
    const pct = steamMap[m.slug]?.price?.discountPercent || 0;
    pushUnique(m, `เกมลดราคา -${pct}%`, "sale");
  });

  // 2. Most Popular
  const byPop = [...mods].sort(
    (a, b) =>
      getPopularityScore(b, downloadCounts, steamMap[b.slug]) -
      getPopularityScore(a, downloadCounts, steamMap[a.slug])
  );
  if (byPop[0]) {
    pushUnique(byPop[0], "ม็อดยอดนิยม", "popular");
  }

  // 3. Trending
  mods.filter((m) => m.trending).forEach((m) => pushUnique(m, "กำลังเป็นกระแส", "trending"));

  // 4. Featured / Latest Releases
  mods.filter((m) => m.featured).forEach((m) => pushUnique(m, "ม็อดล่าสุด", "latest"));
  mods.forEach((m) => pushUnique(m, "ม็อดล่าสุด", "latest"));

  return slides.slice(0, 6);
}

const SLIDE_INTERVAL_MS = 6500;

const PC_PLATFORM_FILTERS: { id: PlatformFilter; label: string }[] = [
  { id: "all", label: "ทุกแพลตฟอร์ม PC" },
  { id: "steam", label: "Steam" },
  { id: "xbox", label: "Xbox / Game Pass" },
  { id: "epic", label: "Epic Games" },
];

export function HomeClient({
  mods,
  downloadCounts,
  steamMap,
  initialStats,
}: HomeClientProps) {
  const slides = useMemo(
    () => buildHeroSlides(mods, downloadCounts, steamMap),
    [mods, downloadCounts, steamMap]
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stats, setStats] = useState<SiteStats>(initialStats);
  const touchStartX = useRef<number | null>(null);

  // Catalog filter, sort & view state (filter drawer starts collapsed by default)
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid3");
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [selectedSeries, setSelectedSeries] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>("all");
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time visitor presence & site visits heartbeat (every 45s)
  useEffect(() => {
    let sid = "";
    try {
      sid = sessionStorage.getItem("mr_sid") || "";
      if (!sid) {
        sid = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
        sessionStorage.setItem("mr_sid", sid);
      }
    } catch {
      sid = `s_${Math.random().toString(36).slice(2, 10)}`;
    }

    let cancelled = false;
    const ping = async () => {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sid }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as SiteStats;
        if (!cancelled && typeof data.onlineNow === "number") {
          setStats(data);
        }
      } catch {
        // ignore transient network glitches
      }
    };

    ping();
    const interval = setInterval(ping, 45_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const safeIdx = Math.min(activeIdx, Math.max(0, slides.length - 1));
  const currentSlide = slides[safeIdx];

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  const stepSlide = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + slides.length) % slides.length);
  };

  // Derive available Series collections (auto-discovers every series in MODS!)
  const seriesOptions = useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; thaiName?: string; description?: string; count: number }
    >();
    for (const m of mods) {
      if (!m.series) continue;
      const existing = map.get(m.series.id);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(m.series.id, {
          id: m.series.id,
          name: m.series.name,
          thaiName: m.series.thaiName,
          description: m.series.description,
          count: 1,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [mods]);

  // Derive available Thai genres sorted by frequency
  const genreOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of mods) {
      for (const g of m.genres) {
        counts.set(g, (counts.get(g) || 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "th"));
  }, [mods]);

  // Platform counts (PC only: Steam / Xbox / Epic)
  const platformCounts = useMemo(() => {
    const counts: Record<FilterablePlatform, number> = { steam: 0, xbox: 0, epic: 0 };
    for (const m of mods) {
      for (const p of getPcPlatforms(m)) {
        counts[p] += 1;
      }
    }
    return counts;
  }, [mods]);

  const onSaleCount = useMemo(
    () => mods.filter((m) => (steamMap[m.slug]?.price?.discountPercent || 0) > 0).length,
    [mods, steamMap]
  );

  // Filtered + Sorted list
  const filteredMods = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = mods.filter((m) => {
      if (selectedSeries !== "all") {
        if (selectedSeries === "standalone") {
          if (m.series) return false;
        } else if (m.series?.id !== selectedSeries) {
          return false;
        }
      }
      if (selectedGenre !== "all" && !m.genres.includes(selectedGenre)) {
        return false;
      }
      if (selectedPlatform !== "all") {
        const pcPlats = getPcPlatforms(m);
        if (!pcPlats.includes(selectedPlatform)) return false;
      }
      if (onlyOnSale) {
        if ((steamMap[m.slug]?.price?.discountPercent || 0) <= 0) return false;
      }
      if (q) {
        const hit =
          m.gameTitle.toLowerCase().includes(q) ||
          m.thaiTitle.toLowerCase().includes(q) ||
          m.shortDescription.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q)) ||
          (m.series?.name.toLowerCase().includes(q) ?? false) ||
          (m.series?.thaiName?.toLowerCase().includes(q) ?? false) ||
          m.tags.some((t) => t.toLowerCase().includes(q));
        if (!hit) return false;
      }
      return true;
    });

    // If user selected a specific series and is on default sort, order naturally by installment/episode order!
    if (selectedSeries !== "all" && selectedSeries !== "standalone" && sortMode === "latest") {
      return [...list].sort((a, b) => (a.series?.order ?? 999) - (b.series?.order ?? 999));
    }

    return [...list].sort((a, b) => {
      switch (sortMode) {
        case "popular":
          return (
            getPopularityScore(b, downloadCounts, steamMap[b.slug]) -
            getPopularityScore(a, downloadCounts, steamMap[a.slug])
          );
        case "price-asc": {
          const pa = getEffectivePriceThb(a, steamMap[a.slug]);
          const pb = getEffectivePriceThb(b, steamMap[b.slug]);
          if (pa !== pb) return pa - pb;
          return a.gameTitle.localeCompare(b.gameTitle);
        }
        case "price-desc": {
          const pa = getEffectivePriceThb(a, steamMap[a.slug]);
          const pb = getEffectivePriceThb(b, steamMap[b.slug]);
          const safeA = Number.isFinite(pa) ? pa : -1;
          const safeB = Number.isFinite(pb) ? pb : -1;
          if (safeA !== safeB) return safeB - safeA;
          return a.gameTitle.localeCompare(b.gameTitle);
        }
        case "rating": {
          const ra = getBestRatingScore(a, steamMap[a.slug]);
          const rb = getBestRatingScore(b, steamMap[b.slug]);
          if (ra !== rb) return rb - ra;
          return (
            (steamMap[b.slug]?.steamReview?.reviewCount || 0) -
            (steamMap[a.slug]?.steamReview?.reviewCount || 0)
          );
        }
        case "name":
          return a.gameTitle.localeCompare(b.gameTitle, undefined, { sensitivity: "base" });
        case "latest":
        default: {
          const da = a.releasedOrder || "";
          const db = b.releasedOrder || "";
          if (da !== db) return db.localeCompare(da);
          return 0;
        }
      }
    });
  }, [
    mods,
    searchQuery,
    selectedSeries,
    selectedGenre,
    selectedPlatform,
    onlyOnSale,
    sortMode,
    downloadCounts,
    steamMap,
  ]);

  // Grouped view data (for "จัดกลุ่มตามซีรีส์/เซ็ต")
  const groupedSections = useMemo(() => {
    const seriesMap = new Map<
      string,
      {
        id: string;
        title: string;
        subtitle?: string;
        description?: string;
        items: ModEntry[];
      }
    >();
    const standalone: ModEntry[] = [];

    for (const m of filteredMods) {
      if (m.series) {
        const g = seriesMap.get(m.series.id);
        if (g) {
          g.items.push(m);
        } else {
          seriesMap.set(m.series.id, {
            id: m.series.id,
            title: m.series.name,
            subtitle: m.series.thaiName,
            description: m.series.description,
            items: [m],
          });
        }
      } else {
        standalone.push(m);
      }
    }

    const groups = Array.from(seriesMap.values())
      .map((g) => ({
        ...g,
        items:
          sortMode === "latest"
            ? [...g.items].sort((a, b) => (a.series?.order ?? 99) - (b.series?.order ?? 99))
            : g.items,
      }))
      .sort((a, b) => b.items.length - a.items.length || a.title.localeCompare(b.title));

    if (standalone.length > 0) {
      groups.push({
        id: "standalone",
        title: "เกมเดี่ยว (Standalone Games)",
        subtitle: "รวมม็อดภาษาไทยเกมเดี่ยวครบทุกแนว",
        description: undefined,
        items: standalone,
      });
    }

    return groups;
  }, [filteredMods, sortMode]);

  const activeFilterCount =
    (selectedSeries !== "all" ? 1 : 0) +
    (selectedGenre !== "all" ? 1 : 0) +
    (selectedPlatform !== "all" ? 1 : 0) +
    (onlyOnSale ? 1 : 0);

  const hasActiveFilter =
    activeFilterCount > 0 ||
    searchQuery.trim().length > 0 ||
    sortMode !== "latest";

  const resetFilters = () => {
    setSelectedSeries("all");
    setSelectedGenre("all");
    setSelectedPlatform("all");
    setOnlyOnSale(false);
    setSearchQuery("");
    setSortMode("latest");
  };

  const currentMod = currentSlide?.mod;
  const currentSteam = currentMod ? steamMap[currentMod.slug] : null;
  const currentDownloads = currentMod ? downloadCounts[currentMod.slug] || 0 : 0;

  const renderCard = (mod: ModEntry, compact = false) => {
    const count = downloadCounts[mod.slug] || 0;
    const st = steamMap[mod.slug];
    const pcPlatforms = getPcPlatforms(mod);
    const mcScore = st?.metacritic?.score ?? mod.critics?.metacriticScore;
    const ocScore = st?.openCritic?.score ?? mod.critics?.openCriticScore;
    const price = st?.price;

    return (
      <Link
        key={mod.slug}
        href={`/mods/${mod.slug}`}
        className="glass-panel spot-card rounded-2xl overflow-hidden group lg:hover:-translate-y-1 flex flex-col"
      >
        {/* Exact 16:9 Cover */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <Image
            src={mod.media.cover}
            alt={mod.thaiTitle}
            fill
            sizes={
              compact
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            }
            className="object-cover transition-transform duration-500 lg:group-hover:scale-[1.03]"
          />

          {/* Top-Left Series Badge */}
          {mod.series && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/80 text-[#ff9ec2] border border-[#ff4d8d]/45 backdrop-blur-sm">
              <Layers className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate max-w-[140px]">
                {mod.series.name}
                {mod.series.badgeLabel ? ` · ${mod.series.badgeLabel}` : ""}
              </span>
            </div>
          )}

          {/* Top-Right Discount Badge Only (No redundant "ฟรี" pill on cards) */}
          {price && price.discountPercent > 0 && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500 text-black shadow">
                -{price.discountPercent}%
              </span>
            </div>
          )}
        </div>

        <div className={`relative z-10 ${compact ? "p-3" : "p-4"} flex-1 flex flex-col justify-between gap-2.5`}>
          <div className="space-y-1.5">
            <h3
              className={`font-display ${
                compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
              } font-bold text-white group-hover:text-[#ff77a9] transition line-clamp-2 leading-snug`}
            >
              {mod.gameTitle}
            </h3>

            {/* Genre + Critic Score Mini Row */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              {mod.genres.slice(0, compact ? 2 : 3).map((g) => (
                <span
                  key={g}
                  className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[#b4acc0]"
                >
                  {g}
                </span>
              ))}
              {typeof mcScore === "number" && (
                <span
                  title="Metacritic"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] font-mono font-bold text-white"
                >
                  <MetacriticLogo className="w-2.5 h-2.5" />
                  {mcScore}
                </span>
              )}
              {typeof ocScore === "number" && !compact && (
                <span
                  title="OpenCritic"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] font-mono font-bold text-white"
                >
                  <OpenCriticLogo className="w-2.5 h-2.5" />
                  {ocScore}
                </span>
              )}
            </div>
          </div>

          <div className="pt-2.5 border-t border-white/[0.07] flex items-center justify-between gap-2 text-xs">
            {/* PC Store Logos + Official Game Price (clearly labeled ราคาเกม) */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="inline-flex items-center gap-1 shrink-0">
                {pcPlatforms.map((p) => (
                  <StoreLogo key={p} platform={p} className="w-3.5 h-3.5" />
                ))}
              </span>
              {price ? (
                <span className="inline-flex items-center gap-1 min-w-0 truncate">
                  {!compact && (
                    <span className="text-[10px] text-[#8a8293] shrink-0">ราคาเกม</span>
                  )}
                  {price.discountPercent > 0 && (
                    <span className="text-[10px] line-through text-[#7c7486] hidden sm:inline shrink-0">
                      {price.initialFormatted}
                    </span>
                  )}
                  <span
                    className={`font-semibold tabular-nums whitespace-nowrap ${
                      price.isFree || price.discountPercent > 0
                        ? "text-emerald-300"
                        : "text-[#d5cedc]"
                    }`}
                  >
                    {price.finalFormatted}
                  </span>
                </span>
              ) : (
                <span className="text-[#8a8293]">{mod.specs.version}</span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 font-semibold text-white tabular-nums shrink-0">
              <Download className="w-3.5 h-3.5 text-[#ff4d8d]" />
              {count.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </Link>
    );
  };

  const renderListItem = (mod: ModEntry) => {
    const count = downloadCounts[mod.slug] || 0;
    const st = steamMap[mod.slug];
    const pcPlatforms = getPcPlatforms(mod);
    const mcScore = st?.metacritic?.score ?? mod.critics?.metacriticScore;
    const ocScore = st?.openCritic?.score ?? mod.critics?.openCriticScore;
    const price = st?.price;

    return (
      <Link
        key={mod.slug}
        href={`/mods/${mod.slug}`}
        className="glass-panel spot-card rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5 group"
      >
        {/* Left Thumbnail */}
        <div className="relative w-full sm:w-52 md:w-60 aspect-video rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
          <Image
            src={mod.media.cover}
            alt={mod.thaiTitle}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover transition-transform duration-500 lg:group-hover:scale-[1.03]"
          />
          {price && price.discountPercent > 0 && (
            <div className="absolute top-2 right-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500 text-black">
                -{price.discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Center Info */}
        <div className="relative z-10 flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {mod.series && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ff4d8d]/18 text-[#ff9ec2] border border-[#ff4d8d]/35">
                <Layers className="w-2.5 h-2.5" />
                {mod.series.name}
                {mod.series.badgeLabel ? ` · ${mod.series.badgeLabel}` : ""}
              </span>
            )}
            {mod.genres.slice(0, 3).map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 rounded-md text-[10px] bg-white/[0.05] border border-white/[0.08] text-[#b4acc0]"
              >
                {g}
              </span>
            ))}
          </div>

          <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-[#ff77a9] transition truncate">
            {mod.gameTitle}
          </h3>

          <p className="text-xs text-[#9c94a6] line-clamp-2 leading-relaxed">
            {mod.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-[#8a8293]">
            <span className="inline-flex items-center gap-1.5 text-white/85">
              {pcPlatforms.map((p) => (
                <StoreLogo key={p} platform={p} className="w-3.5 h-3.5" />
              ))}
              <span>{mod.specs.supportedGamePlatform}</span>
            </span>
            <span>•</span>
            <span>{mod.specs.version}</span>
            <span>•</span>
            <span>{mod.specs.fileSize}</span>
            {st?.steamReview && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-[#66c0f4] font-semibold">
                  <ThumbsUp className="w-3 h-3" />
                  ทั้งหมด {st.steamReview.percentPositive}%
                </span>
              </>
            )}
            {typeof mcScore === "number" && (
              <span className="inline-flex items-center gap-1 font-mono font-bold text-white">
                <MetacriticLogo className="w-3 h-3" />
                {mcScore}
              </span>
            )}
            {typeof ocScore === "number" && (
              <span className="inline-flex items-center gap-1 font-mono font-bold text-white">
                <OpenCriticLogo className="w-3 h-3" />
                {ocScore}
              </span>
            )}
          </div>
        </div>

        {/* Right Price & Downloads */}
        <div className="relative z-10 flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-white/[0.07] shrink-0 sm:min-w-[130px]">
          {price && (
            <div className="text-left sm:text-right">
              <div className="text-[10px] text-[#8a8293]">ราคาเกมปัจจุบัน</div>
              {price.discountPercent > 0 && (
                <div className="text-[10px] line-through text-[#8a8293]">
                  {price.initialFormatted}
                </div>
              )}
              <div
                className={`font-display text-sm font-bold tabular-nums ${
                  price.isFree || price.discountPercent > 0 ? "text-emerald-300" : "text-white"
                }`}
              >
                {price.finalFormatted}
              </div>
              {price.discountPercent > 0 && price.discountEndLabel && (
                <div className="text-[10px] text-emerald-300/85">ถึง {price.discountEndLabel}</div>
              )}
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white tabular-nums">
            <Download className="w-3.5 h-3.5 text-[#ff4d8d]" />
            {count.toLocaleString("en-US")}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-[1260px] mx-auto px-3.5 sm:px-6 pt-5 sm:pt-7 pb-12 sm:pb-14 space-y-7 sm:space-y-10">
      {/* CLEAN FORMAL HEADER WITH THAI FLAG + CLEAR "ฟรี" SIGNAL */}
      <section className="space-y-4 sm:space-y-5 pb-5 sm:pb-6 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 sm:gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <h1 className="font-display text-xl sm:text-3xl font-bold tracking-tight text-white">
                {SITE_CONFIG.nameTh}
              </h1>
              <ThaiFlagIcon className="w-6 h-4 sm:w-7 sm:h-5 shrink-0" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-extrabold bg-emerald-500/18 text-emerald-300 border border-emerald-400/40">
                แจกฟรี 100%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9c94a6]">
              คลังม็อดภาษาไทยอย่างเป็นทางการ — {SITE_CONFIG.nameEn}
            </p>
          </div>

          <Link
            href="/requests"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold bg-[#ff4d8d]/15 hover:bg-[#ff4d8d]/28 border border-[#ff4d8d]/40 text-white transition shrink-0"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-[#ff77a9]" />
            <span>เสนอทำม็อดภาษาไทย</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ff77a9]" />
          </Link>
        </div>

        {/* REAL-TIME SITE STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="glass-panel spot-card rounded-xl p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative z-10 min-w-0">
              <div className="text-[11px] text-[#8a8293] flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                กำลังออนไลน์
              </div>
              <div className="font-display text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.onlineNow.toLocaleString("en-US")}{" "}
                <span className="text-[11px] sm:text-xs font-normal text-[#8a8293]">คน</span>
              </div>
            </div>
            <Users className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-emerald-400/80 shrink-0" />
          </div>

          <div className="glass-panel spot-card rounded-xl p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative z-10 min-w-0">
              <div className="text-[11px] text-[#8a8293] truncate">ผู้เข้าชมทั้งหมด</div>
              <div className="font-display text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.totalVisits.toLocaleString("en-US")}{" "}
                <span className="text-[11px] sm:text-xs font-normal text-[#8a8293]">ครั้ง</span>
              </div>
            </div>
            <Eye className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#ff77a9]/85 shrink-0" />
          </div>

          <div className="glass-panel spot-card rounded-xl p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative z-10 min-w-0">
              <div className="text-[11px] text-[#8a8293] truncate">ยอดดาวน์โหลดรวม</div>
              <div className="font-display text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.totalDownloads.toLocaleString("en-US")}{" "}
                <span className="text-[11px] sm:text-xs font-normal text-[#8a8293]">ครั้ง</span>
              </div>
            </div>
            <Download className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#ff4d8d] shrink-0" />
          </div>

          <div className="glass-panel spot-card rounded-xl p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative z-10 min-w-0">
              <div className="text-[11px] text-[#8a8293] truncate">ม็อดภาษาไทย</div>
              <div className="font-display text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.totalMods.toLocaleString("en-US")}{" "}
                <span className="text-[11px] sm:text-xs font-normal text-[#8a8293]">เกม</span>
              </div>
            </div>
            <Gamepad2 className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#ff77a9]/85 shrink-0" />
          </div>
        </div>
      </section>

      {/* STEAM-STYLE AUTO-SLIDING HERO CAROUSEL */}
      {currentSlide && currentMod && (
        <section
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="space-y-3"
        >
          <div className="grid lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
            {/* LEFT: Pure Edge-to-Edge 16:9 Cover Card */}
            <div
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
                setPaused(true);
              }}
              onTouchEnd={(e) => {
                const start = touchStartX.current;
                const end = e.changedTouches[0]?.clientX ?? null;
                touchStartX.current = null;
                if (start !== null && end !== null && Math.abs(end - start) > 40 && slides.length > 1) {
                  stepSlide(end < start ? 1 : -1);
                }
                setPaused(false);
              }}
              className="lg:col-span-8 relative aspect-video w-full rounded-2xl overflow-hidden border border-white/12 bg-black shadow-[0_18px_48px_-20px_rgba(255,77,141,0.32)] group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMod.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="relative w-full h-full"
                >
                  <Link href={`/mods/${currentMod.slug}`} className="block relative w-full h-full">
                    <Image
                      src={currentMod.media.cover}
                      alt={currentMod.thaiTitle}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 840px"
                      className="object-cover transition-transform duration-700 ease-out lg:group-hover:scale-[1.025]"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-black/80 border border-white/15 text-white shadow">
                {currentSlide.badgeType === "sale" && <Tag className="w-3 h-3 text-emerald-400" />}
                {currentSlide.badgeType === "popular" && <Trophy className="w-3 h-3 text-amber-300" />}
                {currentSlide.badgeType === "trending" && <Flame className="w-3 h-3 text-[#ff4d8d]" />}
                {currentSlide.badgeType === "latest" && <Sparkles className="w-3 h-3 text-[#ff77a9]" />}
                <span>{currentSlide.badgeLabel}</span>
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => stepSlide(-1)}
                    aria-label="สไลด์ก่อนหน้า"
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-[#ff4d8d] text-white border border-white/15 flex items-center justify-center opacity-85 lg:opacity-0 lg:group-hover:opacity-100 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepSlide(1)}
                    aria-label="สไลด์ถัดไป"
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-[#ff4d8d] text-white border border-white/15 flex items-center justify-center opacity-85 lg:opacity-0 lg:group-hover:opacity-100 transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {slides.length > 1 && !paused && (
                <motion.div
                  key={`progress-${safeIdx}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: "linear" }}
                  style={{ transformOrigin: "0% 50%" }}
                  className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#ff4d8d] to-[#d91e36] z-10"
                />
              )}
            </div>

            {/* RIGHT: Harmonized Glass Spotlight Info Panel */}
            <div className="lg:col-span-4 glass-panel spot-card rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col md:grid md:grid-cols-12 md:items-center lg:flex lg:flex-col lg:items-stretch lg:justify-between gap-4">
              <div className="relative z-10 md:col-span-7 lg:col-span-12 space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/18 text-emerald-300 border border-emerald-400/35">
                    ฟรี
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#9c94a6]">
                    {getPcPlatforms(currentMod).map((p) => (
                      <StoreLogo key={p} platform={p} className="w-3.5 h-3.5" />
                    ))}
                    {currentMod.specs.supportedGamePlatform}
                  </span>
                </div>

                <h2 className="font-display text-lg sm:text-xl lg:text-[22px] font-bold text-white leading-snug">
                  {currentMod.gameTitle}
                </h2>

                {(currentSteam?.price || currentSteam?.steamReview) && (
                  <div className="rounded-xl p-3 bg-white/[0.035] border border-white/[0.08] space-y-2">
                    {currentSteam.price && (
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-[#8a8293] inline-flex items-center gap-1.5 whitespace-nowrap">
                          <SteamLogo className="w-3.5 h-3.5 shrink-0" />
                          ราคาเกม
                        </span>
                        <div className="flex items-center gap-2">
                          {currentSteam.price.discountPercent > 0 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-black">
                              -{currentSteam.price.discountPercent}%
                            </span>
                          )}
                          {currentSteam.price.discountPercent > 0 && (
                            <span className="text-[11px] line-through text-[#8a8293]">
                              {currentSteam.price.initialFormatted}
                            </span>
                          )}
                          <span className="font-bold text-white">
                            {currentSteam.price.finalFormatted}
                          </span>
                        </div>
                      </div>
                    )}

                    {currentSteam.price?.discountPercent ? (
                      currentSteam.price.discountEndLabel && (
                        <div className="flex items-center justify-end gap-1 text-[11px] text-emerald-300">
                          <Clock className="w-3 h-3" />
                          ถึง {currentSteam.price.discountEndLabel}
                        </div>
                      )
                    ) : null}

                    {currentSteam.steamReview && (
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                        <span className="text-[#8a8293] inline-flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-[#66c0f4]" />
                          รีวิวทั้งหมด
                        </span>
                        <span className="font-semibold text-[#66c0f4] text-right">
                          {currentSteam.steamReview.percentPositive}% {currentSteam.steamReview.label}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="relative z-10 md:col-span-5 lg:col-span-12 space-y-3 sm:space-y-4">
                <dl className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl py-2 px-1.5 bg-white/[0.03] border border-white/[0.06]">
                    <dt className="text-[10px] text-[#8a8293]">เวอร์ชัน</dt>
                    <dd className="font-bold text-white mt-0.5">{currentMod.specs.version}</dd>
                  </div>
                  <div className="rounded-xl py-2 px-1.5 bg-white/[0.03] border border-white/[0.06]">
                    <dt className="text-[10px] text-[#8a8293]">ไฟล์</dt>
                    <dd className="font-bold text-white mt-0.5">
                      {currentMod.files.filter((f) => !f.optional).length} แบบ
                    </dd>
                  </div>
                  <div className="rounded-xl py-2 px-1.5 bg-white/[0.03] border border-white/[0.06]">
                    <dt className="text-[10px] text-[#8a8293]">ดาวน์โหลด</dt>
                    <dd className="font-bold text-white mt-0.5 tabular-nums">
                      {currentDownloads.toLocaleString("en-US")}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/mods/${currentMod.slug}`}
                  className="btn-pink-primary w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2"
                >
                  ดูรายละเอียด & ดาวน์โหลดฟรี
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-1">
              {slides.map((s, idx) => {
                const active = idx === safeIdx;
                return (
                  <button
                    key={s.mod.slug}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={s.mod.gameTitle}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      active
                        ? "w-8 bg-gradient-to-r from-[#ff4d8d] to-[#d91e36]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* MOD LIBRARY WITH SERIES SETS, FILTERS, SORTING & VIEW MODES */}
      <section className="space-y-4">
        {/* Clean Single-Line Title + Controls Bar (Never wraps title or count badge!) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <ThaiFlagIcon className="w-5 h-3.5 shrink-0" />
            <h2 className="font-display text-base sm:text-lg font-bold text-white whitespace-nowrap">
              รายการม็อดภาษาไทย
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-white/[0.07] text-[#ff9ec2] border border-white/10 tabular-nums whitespace-nowrap shrink-0">
              {filteredMods.length === mods.length
                ? `${mods.length} เกม`
                : `${filteredMods.length} / ${mods.length}`}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Inline Search */}
            <div className="relative flex-1 sm:flex-initial sm:w-44 md:w-48">
              <Search className="w-3.5 h-3.5 text-[#8a8293] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาเกม..."
                className="w-full pl-8 pr-7 py-2 rounded-xl text-xs bg-[#141019] border border-white/12 text-white placeholder:text-[#7c7486] outline-none focus:border-[#ff4d8d]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="ล้างคำค้น"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8a8293] hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector (Dark-mode safe) */}
            <div className="relative inline-flex items-center shrink-0">
              <ArrowDownWideNarrow className="w-3.5 h-3.5 text-[#ff77a9] absolute left-3 pointer-events-none" />
              <select
                aria-label="เรียงลำดับ"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="pl-8 pr-7 py-2 rounded-xl text-xs font-semibold bg-[#141019] border border-white/12 text-white outline-none focus:border-[#ff4d8d] cursor-pointer whitespace-nowrap"
              >
                <option value="latest">ล่าสุด</option>
                <option value="popular">ยอดนิยม</option>
                <option value="price-asc">ราคาเกม: น้อย → มาก</option>
                <option value="price-desc">ราคาเกม: มาก → น้อย</option>
                <option value="rating">คะแนนรีวิว</option>
                <option value="name">ชื่อ A–Z</option>
              </select>
            </div>

            {/* View Mode Switcher (Concise Formal Labels) */}
            <div
              role="group"
              aria-label="รูปแบบการแสดงผล"
              className="inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 shrink-0"
            >
              {(
                [
                  { id: "grid3", label: "ตาราง", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
                  { id: "grid4", label: "กระชับ", icon: <Grid2x2 className="w-3.5 h-3.5" /> },
                  { id: "list", label: "รายการ", icon: <List className="w-3.5 h-3.5" /> },
                  { id: "series", label: "ซีรีส์", icon: <Layers className="w-3.5 h-3.5" /> },
                ] as const
              ).map((v) => {
                const active = viewMode === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    title={v.label}
                    onClick={() => setViewMode(v.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                      active
                        ? "bg-[#ff4d8d]/25 text-white border border-[#ff4d8d]/45"
                        : "text-[#9c94a6] hover:text-white border border-transparent"
                    }`}
                  >
                    {v.icon}
                    <span className="hidden sm:inline">{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FULL-BAR CLICKABLE COLLAPSIBLE FILTER PANEL (Collapsed by default) */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div
            role="button"
            tabIndex={0}
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFiltersOpen((v) => !v);
              }
            }}
            className="w-full px-4 py-3 flex flex-wrap items-center justify-between gap-2 hover:bg-white/[0.03] transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 min-w-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff77a9] shrink-0" />
              <span className="text-xs font-bold text-white whitespace-nowrap">ตัวกรอง</span>
              <span className="text-[11px] text-[#8a8293] hidden sm:inline whitespace-nowrap">
                ซีรีส์ · แพลตฟอร์ม · แนวเกม
              </span>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ff4d8d]/25 text-[#ff9ec2] border border-[#ff4d8d]/45 whitespace-nowrap">
                  {activeFilterCount}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {!filtersOpen && selectedSeries !== "all" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSeries("all");
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#ff4d8d]/20 border border-[#ff4d8d]/45 text-white cursor-pointer whitespace-nowrap"
                >
                  <span>
                    {selectedSeries === "standalone"
                      ? "เกมเดี่ยว"
                      : seriesOptions.find((s) => s.id === selectedSeries)?.name || selectedSeries}
                  </span>
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
              {!filtersOpen && selectedPlatform !== "all" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlatform("all");
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#ff4d8d]/20 border border-[#ff4d8d]/45 text-white cursor-pointer whitespace-nowrap"
                >
                  <span>{PC_PLATFORM_FILTERS.find((p) => p.id === selectedPlatform)?.label}</span>
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
              {!filtersOpen && selectedGenre !== "all" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGenre("all");
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#ff4d8d]/20 border border-[#ff4d8d]/45 text-white cursor-pointer whitespace-nowrap"
                >
                  <span>{selectedGenre}</span>
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
              {!filtersOpen && onlyOnSale && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOnlyOnSale(false);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/20 border border-emerald-400/45 text-emerald-200 cursor-pointer whitespace-nowrap"
                >
                  <span>กำลังลดราคา</span>
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetFilters();
                  }}
                  className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-white/[0.06] hover:bg-white/12 text-[#ff9ec2] inline-flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>รีเซ็ต</span>
                </button>
              )}
              <ChevronDown
                className={`w-4 h-4 text-[#9c94a6] transition-transform duration-200 shrink-0 ${
                  filtersOpen ? "rotate-180 text-[#ff77a9]" : ""
                }`}
              />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                key="catalog-filters-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden border-t border-white/[0.07]"
              >
                <div className="p-3.5 sm:p-4 space-y-3">
                  {/* Row 1: Series / Game Sets */}
                  {seriesOptions.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-[11px] font-bold text-[#9c94a6] inline-flex items-center gap-1 mr-1">
                        <Layers className="w-3.5 h-3.5 text-[#ff77a9]" />
                        เซ็ต / ซีรีส์:
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedSeries("all")}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer ${
                          selectedSeries === "all"
                            ? "bg-[#ff4d8d]/22 border-[#ff4d8d]/50 text-white"
                            : "bg-white/[0.03] border-white/[0.08] text-[#b4acc0] hover:text-white hover:border-white/20"
                        }`}
                      >
                        ทั้งหมด ({mods.length})
                      </button>
                      {seriesOptions.map((s) => {
                        const active = selectedSeries === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedSeries(active ? "all" : s.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer inline-flex items-center gap-1.5 ${
                              active
                                ? "bg-[#ff4d8d]/25 border-[#ff4d8d]/55 text-white shadow-sm"
                                : "bg-white/[0.04] border-white/10 text-[#e2dce8] hover:border-[#ff4d8d]/40 hover:text-white"
                            }`}
                          >
                            <span>{s.name}</span>
                            <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono text-[#ff9ec2]">
                              {s.count}
                            </span>
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedSeries(selectedSeries === "standalone" ? "all" : "standalone")
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer ${
                          selectedSeries === "standalone"
                            ? "bg-[#ff4d8d]/22 border-[#ff4d8d]/50 text-white"
                            : "bg-white/[0.03] border-white/[0.08] text-[#9c94a6] hover:text-white"
                        }`}
                      >
                        เกมเดี่ยว ({mods.filter((m) => !m.series).length})
                      </button>
                    </div>
                  )}

                  {/* Row 2: PC Platforms (Steam, Xbox, Epic ONLY) + Sale Toggle */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[11px] font-bold text-[#9c94a6] mr-1">แพลตฟอร์ม PC:</span>
                    {PC_PLATFORM_FILTERS.map((pf) => {
                      const active = selectedPlatform === pf.id;
                      const count = pf.id === "all" ? mods.length : platformCounts[pf.id];
                      return (
                        <button
                          key={pf.id}
                          type="button"
                          onClick={() => setSelectedPlatform(pf.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer inline-flex items-center gap-1.5 ${
                            active
                              ? "bg-[#ff4d8d]/22 border-[#ff4d8d]/50 text-white"
                              : "bg-white/[0.03] border-white/[0.08] text-[#b4acc0] hover:text-white hover:border-white/20"
                          }`}
                        >
                          {pf.id !== "all" && <StoreLogo platform={pf.id} className="w-3.5 h-3.5" />}
                          <span>{pf.label}</span>
                          <span className="text-[10px] opacity-70 font-mono">({count})</span>
                        </button>
                      );
                    })}

                    {onSaleCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setOnlyOnSale((v) => !v)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer inline-flex items-center gap-1.5 ${
                          onlyOnSale
                            ? "bg-emerald-500/25 border-emerald-400/60 text-emerald-200"
                            : "bg-emerald-500/8 border-emerald-400/25 text-emerald-300/90 hover:bg-emerald-500/18"
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        <span>กำลังลดราคา ({onSaleCount})</span>
                      </button>
                    )}
                  </div>

                  {/* Row 3: Genres (แนวเกม) */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.06]">
                    <span className="text-[11px] font-bold text-[#9c94a6] mr-1">แนวเกม:</span>
                    <button
                      type="button"
                      onClick={() => setSelectedGenre("all")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer ${
                        selectedGenre === "all"
                          ? "bg-white/15 border-white/30 text-white"
                          : "bg-white/[0.02] border-white/[0.07] text-[#9c94a6] hover:text-white"
                      }`}
                    >
                      ทุกแนว
                    </button>
                    {genreOptions.map((g) => {
                      const active = selectedGenre === g.name;
                      return (
                        <button
                          key={g.name}
                          type="button"
                          onClick={() => setSelectedGenre(active ? "all" : g.name)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition cursor-pointer ${
                            active
                              ? "bg-[#ff4d8d]/22 border-[#ff4d8d]/50 text-white font-semibold"
                              : "bg-white/[0.02] border-white/[0.07] text-[#b4acc0] hover:text-white hover:border-white/20"
                          }`}
                        >
                          {g.name} <span className="text-[10px] opacity-65">({g.count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CATALOG RESULTS */}
        {filteredMods.length === 0 ? (
          <div className="glass-panel rounded-2xl p-10 text-center space-y-3">
            <p className="text-sm font-semibold text-white">ไม่พบม็อดที่ตรงกับเงื่อนไขที่เลือก</p>
            <p className="text-xs text-[#8a8293]">
              ลองเปลี่ยนแพลตฟอร์ม แนวเกม หรือกดล้างตัวกรองเพื่อดูรายการทั้งหมด
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-pink-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              แสดงม็อดทั้งหมด ({mods.length} เกม)
            </button>
          </div>
        ) : viewMode === "series" ? (
          /* GROUPED BY SERIES / COLLECTION VIEW */
          <div className="space-y-8">
            {groupedSections.map((group) => (
              <div key={group.id} className="space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#ff77a9]" />
                      <h3 className="font-display text-base sm:text-lg font-bold text-white">
                        {group.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#ff4d8d]/18 text-[#ff9ec2] border border-[#ff4d8d]/35">
                        {group.items.length} เกม
                      </span>
                    </div>
                    {group.subtitle && (
                      <p className="text-xs text-[#8a8293]">{group.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {group.items.map((mod) => renderCard(mod, false))}
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === "list" ? (
          /* LIST VIEW */
          <div className="space-y-3">
            {filteredMods.map((mod) => renderListItem(mod))}
          </div>
        ) : (
          /* GRID 3 (DEFAULT) OR GRID 4 (COMPACT) */
          <div
            className={
              viewMode === "grid4"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            }
          >
            {filteredMods.map((mod) => renderCard(mod, viewMode === "grid4"))}

            {/* Minimal Formal Nexus Profile Link Card */}
            {!hasActiveFilter && (
              <a
                href={SITE_CONFIG.nexusProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel spot-card rounded-2xl p-5 border-dashed flex flex-col justify-between gap-4 group"
              >
                <div className="relative z-10 space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#F5A64B]">
                    <NexusModsLogo className="w-3.5 h-3.5" />
                    Nexus Mods
                  </div>
                  <h3 className="font-display text-base font-bold text-white">
                    ม็อดไทย และม็อดอื่นๆ ของผม
                  </h3>
                  <p className="text-xs text-[#8a8293] leading-relaxed">
                    ดูผลงานทั้งหมดบนโปรไฟล์ Nexus Mods ({SITE_CONFIG.nexusUsername})
                  </p>
                </div>
                <div className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff77a9] group-hover:text-[#ff4d8d]">
                  เปิดโปรไฟล์ Nexus Mods
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
