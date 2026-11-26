"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Flame,
  Gamepad2,
  Sparkles,
  Tag,
  ThumbsUp,
  Trophy,
  Users,
} from "lucide-react";
import type { ModEntry } from "@/data/types";
import type { LiveSteamData } from "@/lib/steam";
import type { SiteStats } from "@/lib/store";
import { SITE_CONFIG } from "@/data/site";
import { NexusModsLogo, SteamLogo, StoreLogo, ThaiFlagIcon } from "./BrandIcons";

interface HomeClientProps {
  mods: ModEntry[];
  downloadCounts: Record<string, number>;
  steamMap: Record<string, LiveSteamData | null>;
  initialStats: SiteStats;
}

interface HeroSlide {
  mod: ModEntry;
  badgeLabel: string;
  badgeType: "sale" | "popular" | "latest" | "trending";
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

  // 1. Games currently on Steam Sale (real-time)
  const onSale = mods.filter((m) => (steamMap[m.slug]?.price?.discountPercent || 0) > 0);
  onSale.forEach((m) => {
    const pct = steamMap[m.slug]?.price?.discountPercent || 0;
    pushUnique(m, `เกมลดราคา -${pct}%`, "sale");
  });

  // 2. Most Popular (highest real downloads)
  const byDownloads = [...mods].sort(
    (a, b) => (downloadCounts[b.slug] || 0) - (downloadCounts[a.slug] || 0)
  );
  if (byDownloads[0] && (downloadCounts[byDownloads[0].slug] || 0) > 0) {
    pushUnique(byDownloads[0], "ม็อดยอดนิยม", "popular");
  }

  // 3. Trending
  mods.filter((m) => m.trending).forEach((m) => pushUnique(m, "กำลังเป็นกระแส", "trending"));

  // 4. Latest Releases
  mods.forEach((m) => pushUnique(m, "ม็อดล่าสุด", "latest"));

  return slides.slice(0, 6);
}

const SLIDE_INTERVAL_MS = 6500;

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

  const currentMod = currentSlide?.mod;
  const currentSteam = currentMod ? steamMap[currentMod.slug] : null;
  const currentDownloads = currentMod ? downloadCounts[currentMod.slug] || 0 : 0;

  return (
    <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-7 pb-14 space-y-10">
      {/* CLEAN FORMAL HEADER WITH THAI FLAG + CLEAR "ฟรี" SIGNAL */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-5 pb-6 border-b border-white/[0.08]"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {SITE_CONFIG.nameTh}
              </h1>
              <ThaiFlagIcon className="w-7 h-5" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/18 text-emerald-300 border border-emerald-400/40">
                แจกฟรี 100%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9c94a6]">
              คลังม็อดภาษาไทยอย่างเป็นทางการ — {SITE_CONFIG.nameEn}
            </p>
          </div>

          <a
            href={SITE_CONFIG.nexusProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-[#D97B29]/20 border border-white/10 hover:border-[#F5A64B]/55 text-white transition"
          >
            <NexusModsLogo className="w-4 h-4 shrink-0" />
            <span>Nexus Mods ({SITE_CONFIG.nexusUsername})</span>
            <span className="hidden sm:inline text-[11px] font-normal text-[#a69eb0]">
              — ม็อดไทยและม็อดอื่นๆ ของผม
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* REAL-TIME SITE STATS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="glass-panel spot-card rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="relative z-10">
              <div className="text-[11px] text-[#8a8293] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                กำลังออนไลน์
              </div>
              <div className="font-display text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.onlineNow.toLocaleString("en-US")}{" "}
                <span className="text-xs font-normal text-[#8a8293]">คน</span>
              </div>
            </div>
            <Users className="relative z-10 w-5 h-5 text-emerald-400/80 shrink-0" />
          </div>

          <div className="glass-panel spot-card rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="relative z-10">
              <div className="text-[11px] text-[#8a8293]">ผู้เข้าชมทั้งหมด</div>
              <div className="font-display text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.totalVisits.toLocaleString("en-US")}{" "}
                <span className="text-xs font-normal text-[#8a8293]">ครั้ง</span>
              </div>
            </div>
            <Eye className="relative z-10 w-5 h-5 text-[#ff77a9]/85 shrink-0" />
          </div>

          <div className="glass-panel spot-card rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="relative z-10">
              <div className="text-[11px] text-[#8a8293]">ยอดดาวน์โหลดรวม</div>
              <div className="font-display text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.totalDownloads.toLocaleString("en-US")}{" "}
                <span className="text-xs font-normal text-[#8a8293]">ครั้ง</span>
              </div>
            </div>
            <Download className="relative z-10 w-5 h-5 text-[#ff4d8d] shrink-0" />
          </div>

          <div className="glass-panel spot-card rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="relative z-10">
              <div className="text-[11px] text-[#8a8293]">ม็อดภาษาไทยทั้งหมด</div>
              <div className="font-display text-xl font-bold text-white tabular-nums mt-0.5">
                {stats.totalMods.toLocaleString("en-US")}{" "}
                <span className="text-xs font-normal text-[#8a8293]">เกม</span>
              </div>
            </div>
            <Gamepad2 className="relative z-10 w-5 h-5 text-[#ff77a9]/85 shrink-0" />
          </div>
        </div>
      </motion.section>

      {/* STEAM-STYLE AUTO-SLIDING HERO CAROUSEL */}
      {currentSlide && currentMod && (
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="space-y-3"
        >
          <div className="grid lg:grid-cols-12 gap-4 items-stretch">
            {/* LEFT: Pure Edge-to-Edge 16:9 Cover Card */}
            <div className="lg:col-span-8 relative aspect-video w-full rounded-2xl overflow-hidden border border-white/12 bg-black shadow-[0_24px_64px_-22px_rgba(255,77,141,0.32)] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMod.slug}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <Link href={`/mods/${currentMod.slug}`} className="block relative w-full h-full">
                    <Image
                      src={currentMod.media.cover}
                      alt={currentMod.thaiTitle}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 840px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Category Badge positioned at top-right */}
              <div className="pointer-events-none absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/75 backdrop-blur-md border border-white/15 text-white shadow">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-[#ff4d8d] text-white border border-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepSlide(1)}
                    aria-label="สไลด์ถัดไป"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-[#ff4d8d] text-white border border-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
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
            <div className="lg:col-span-4 glass-panel spot-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMod.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/18 text-emerald-300 border border-emerald-400/35">
                      ฟรี
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#9c94a6]">
                      {currentMod.stores.slice(0, 2).map((s) => (
                        <StoreLogo key={s.platform} platform={s.platform} className="w-3.5 h-3.5" />
                      ))}
                      {currentMod.specs.supportedGamePlatform}
                    </span>
                  </div>

                  <h2 className="font-display text-xl sm:text-[22px] font-bold text-white leading-snug">
                    {currentMod.gameTitle}
                  </h2>

                  {/* Live Steam Price + Review Strip */}
                  {(currentSteam?.price || currentSteam?.steamReview) && (
                    <div className="rounded-xl p-3 bg-white/[0.035] border border-white/[0.08] space-y-2">
                      {currentSteam.price && (
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="text-[#8a8293] inline-flex items-center gap-1.5">
                            <SteamLogo className="w-3.5 h-3.5 shrink-0" />
                            Steam
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
                            รีวิว
                          </span>
                          <span className="font-semibold text-[#66c0f4]">
                            {currentSteam.steamReview.percentPositive}% {currentSteam.steamReview.label}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Neutral Compact Metadata */}
                  <dl className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl py-2 px-2 bg-white/[0.03] border border-white/[0.06]">
                      <dt className="text-[10px] text-[#8a8293]">เวอร์ชัน</dt>
                      <dd className="font-bold text-white mt-0.5">{currentMod.specs.version}</dd>
                    </div>
                    <div className="rounded-xl py-2 px-2 bg-white/[0.03] border border-white/[0.06]">
                      <dt className="text-[10px] text-[#8a8293]">ไฟล์</dt>
                      <dd className="font-bold text-white mt-0.5">{currentMod.files.length} แบบ</dd>
                    </div>
                    <div className="rounded-xl py-2 px-2 bg-white/[0.03] border border-white/[0.06]">
                      <dt className="text-[10px] text-[#8a8293]">ดาวน์โหลด</dt>
                      <dd className="font-bold text-white mt-0.5 tabular-nums">
                        {currentDownloads.toLocaleString("en-US")}
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              </AnimatePresence>

              <Link
                href={`/mods/${currentMod.slug}`}
                className="relative z-10 btn-pink-primary w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2"
              >
                ดูรายละเอียด & ดาวน์โหลดฟรี
                <ArrowRight className="w-4 h-4" />
              </Link>
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
        </motion.section>
      )}

      {/* MOD LIBRARY GRID */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ThaiFlagIcon className="w-5 h-3.5" />
          <h2 className="font-display text-lg font-bold text-white">
            รายการม็อดภาษาไทย ({mods.length})
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mods.map((mod) => {
            const count = downloadCounts[mod.slug] || 0;
            const st = steamMap[mod.slug];
            return (
              <Link
                key={mod.slug}
                href={`/mods/${mod.slug}`}
                className="glass-panel spot-card rounded-2xl overflow-hidden group hover:-translate-y-1 flex flex-col"
              >
                {/* Exact 16:9 Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <Image
                    src={mod.media.cover}
                    alt={mod.thaiTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-black/75 text-emerald-300 border border-emerald-400/40 backdrop-blur">
                      ฟรี
                    </span>
                    {st?.price && st.price.discountPercent > 0 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500 text-black shadow">
                        -{st.price.discountPercent}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative z-10 p-4 flex-1 flex flex-col justify-between gap-3">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-[#ff77a9] transition line-clamp-2">
                    {mod.gameTitle}
                  </h3>

                  <div className="pt-2.5 border-t border-white/[0.07] flex items-center justify-between text-xs text-[#8a8293]">
                    <span className="inline-flex items-center gap-1.5">
                      {mod.stores.slice(0, 2).map((s) => (
                        <StoreLogo key={s.platform} platform={s.platform} className="w-3.5 h-3.5" />
                      ))}
                      <span>{mod.specs.version}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-white tabular-nums">
                      <Download className="w-3.5 h-3.5 text-[#ff4d8d]" />
                      {count.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Minimal Formal Nexus Profile Link Card */}
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
        </div>
      </section>
    </div>
  );
}
