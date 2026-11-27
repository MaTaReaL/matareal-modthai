"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ExternalLink, Cpu, Clock } from "lucide-react";
import type { StoreLink, StorePlatform } from "@/data/types";
import type { LiveSteamData } from "@/lib/steam";
import { MetacriticLogo, OpenCriticLogo, SteamLogo, StoreLogo } from "./BrandIcons";

interface SteamStorePanelProps {
  stores: StoreLink[];
  steamData: LiveSteamData | null;
}

/** Strict store priority: PC stores first (Steam -> Xbox -> Epic -> EA -> GOG), then Console info-only (PlayStation -> Nintendo) */
const PLATFORM_PRIORITY: Record<StorePlatform, number> = {
  steam: 1,
  xbox: 2,
  epic: 3,
  ea: 4,
  gog: 5,
  playstation: 6,
  nintendo: 7,
};

const PLATFORM_STYLE: Record<StorePlatform, string> = {
  steam:
    "bg-[#1b2838]/65 hover:bg-[#1b2838] border-[#66c0f4]/40 hover:border-[#66c0f4]/80 text-white",
  xbox:
    "bg-[#107c10]/15 hover:bg-[#107c10]/30 border-[#107c10]/45 hover:border-[#4ade80]/70 text-white",
  epic:
    "bg-white/[0.06] hover:bg-white/[0.14] border-white/18 hover:border-white/45 text-white",
  ea:
    "bg-[#ff4747]/12 hover:bg-[#ff4747]/24 border-[#ff4747]/35 hover:border-[#ff4747]/65 text-white",
  gog:
    "bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08] text-[#a69eb0] hover:text-white",
  playstation:
    "bg-[#00439c]/18 hover:bg-[#00439c]/35 border-[#0070d1]/40 hover:border-[#60a5fa]/65 text-white/90",
  nintendo:
    "bg-[#e60012]/14 hover:bg-[#e60012]/28 border-[#e60012]/35 hover:border-[#ff4d5a]/65 text-white/90",
};

function getMetacriticTone(score: number): string {
  if (score >= 75) return "bg-emerald-500 text-black";
  if (score >= 50) return "bg-amber-400 text-black";
  return "bg-rose-500 text-white";
}

function getOpenCriticTone(score: number, tier?: string): string {
  if (tier === "Mighty" || score >= 84) return "bg-[#FC430A] text-white";
  if (tier === "Strong" || score >= 75) return "bg-amber-400 text-black";
  if (tier === "Fair" || score >= 65) return "bg-sky-400 text-black";
  return "bg-zinc-500 text-white";
}

export function SteamStorePanel({ stores, steamData }: SteamStorePanelProps) {
  const [specTab, setSpecTab] = useState<"minimum" | "recommended">("recommended");

  const sortedStores = useMemo(
    () =>
      [...stores].sort(
        (a, b) => PLATFORM_PRIORITY[a.platform] - PLATFORM_PRIORITY[b.platform]
      ),
    [stores]
  );

  const primaryStore = sortedStores[0];
  const activeSpecs =
    specTab === "minimum"
      ? steamData?.minimumSpecs || []
      : steamData?.recommendedSpecs || [];

  return (
    <section className="glass-panel spot-card rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* Top Row: Official Store Cover Capsule + Game Details + Live Price */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
          {steamData?.headerImage && (
            <a
              href={primaryStore?.url || `https://store.steampowered.com/app/${steamData.appId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full sm:w-44 aspect-[460/215] rounded-xl overflow-hidden border border-white/15 shrink-0 bg-black group"
            >
              <Image
                src={steamData.headerImage}
                alt={steamData.name}
                fill
                sizes="(max-width: 640px) 100vw, 176px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          )}

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              {primaryStore && (
                <StoreLogo platform={primaryStore.platform} className="w-4 h-4 shrink-0" />
              )}
              <h2 className="font-display text-sm sm:text-base font-bold text-white truncate min-w-0">
                {steamData?.name || "ข้อมูลเกมและร้านค้า"}
              </h2>
            </div>

            {steamData && (
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8a8293]">
                  {steamData.isLive && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/12 text-emerald-300 border border-emerald-400/25 whitespace-nowrap shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  )}
                  {steamData.developers[0] && (
                    <span className="whitespace-nowrap">{steamData.developers[0]}</span>
                  )}
                  {steamData.releaseDate && (
                    <span className="whitespace-nowrap text-[#7c7486]">
                      · {steamData.releaseDate}
                    </span>
                  )}
                </div>
                {steamData.genres.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {steamData.genres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.05] border border-white/[0.08] text-[#b4acc0] whitespace-nowrap"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live Steam Price + Sale End Date */}
        {steamData?.price && (
          <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
            <span className="text-[10px] font-semibold text-[#8a8293]">ราคาเกมปัจจุบัน</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              {steamData.price.discountPercent > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500 text-black">
                  -{steamData.price.discountPercent}%
                </span>
              )}
              <div className="text-right leading-tight">
                {steamData.price.discountPercent > 0 && (
                  <div className="text-[10px] line-through text-[#8a8293]">
                    {steamData.price.initialFormatted}
                  </div>
                )}
                <div className="text-xs font-bold text-white">
                  {steamData.price.finalFormatted}
                </div>
              </div>
            </div>
            {steamData.price.discountPercent > 0 && steamData.price.discountEndLabel && (
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                <Clock className="w-3 h-3" />
                ลดราคาถึง {steamData.price.discountEndLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 1: Official Platforms & Stores */}
      <div className="relative z-10 space-y-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wide text-[#8a8293]">
          แพลตฟอร์มวางจำหน่าย
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {sortedStores.map((store) => {
            const isConsoleOnly =
              store.platform === "playstation" || store.platform === "nintendo";
            return (
              <a
                key={`${store.platform}-${store.url}`}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                title={
                  isConsoleOnly
                    ? `${store.label} (วางจำหน่ายบนคอนโซล — ม็อดไทยรองรับเฉพาะ PC)`
                    : store.label
                }
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
                  PLATFORM_STYLE[store.platform]
                }`}
              >
                <StoreLogo platform={store.platform} className="w-4 h-4 shrink-0" />
                <span>{store.label}</span>
                {isConsoleOnly && (
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-black/35 text-white/70">
                    คอนโซล
                  </span>
                )}
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Separated Review Scores (Steam All+Recent Unified Card & Metacritic+OpenCritic Unified Card) */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08] space-y-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wide text-[#8a8293]">
          คะแนนรีวิว
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Block 1: Unified Steam Reviews (ALWAYS pairs All-Time + Recent 30d together, never wraps mid-word) */}
          <div className="rounded-xl p-3.5 bg-white/[0.03] border border-white/[0.09] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white whitespace-nowrap">
              <SteamLogo className="w-4 h-4 shrink-0" />
              <span>รีวิวผู้เล่นบน Steam</span>
            </div>

            <div className="space-y-2 text-[11px] sm:text-xs">
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="text-[#9c94a6] whitespace-nowrap shrink-0">ทั้งหมด</span>
                {steamData?.steamReview ? (
                  <span
                    className={`inline-flex items-center gap-1.5 font-semibold whitespace-nowrap shrink-0 ${
                      steamData.steamReview.percentPositive >= 70
                        ? "text-[#66c0f4]"
                        : steamData.steamReview.percentPositive >= 40
                        ? "text-amber-300"
                        : "text-rose-300"
                    }`}
                  >
                    <span>
                      {steamData.steamReview.percentPositive}% {steamData.steamReview.label}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#8a8293] font-normal tabular-nums">
                      ({steamData.steamReview.reviewCount.toLocaleString("en-US")})
                    </span>
                  </span>
                ) : (
                  <span className="text-[#7c7486] whitespace-nowrap">ยังไม่มีคะแนน</span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06] min-w-0">
                <span className="text-[#9c94a6] whitespace-nowrap shrink-0">ล่าสุด (30 วัน)</span>
                {steamData?.steamRecentReview ? (
                  <span
                    className={`inline-flex items-center gap-1.5 font-semibold whitespace-nowrap shrink-0 ${
                      steamData.steamRecentReview.percentPositive >= 70
                        ? "text-[#66c0f4]"
                        : steamData.steamRecentReview.percentPositive >= 40
                        ? "text-amber-300"
                        : "text-rose-300"
                    }`}
                  >
                    <span>
                      {steamData.steamRecentReview.percentPositive}% {steamData.steamRecentReview.label}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#8a8293] font-normal tabular-nums">
                      ({steamData.steamRecentReview.reviewCount.toLocaleString("en-US")})
                    </span>
                  </span>
                ) : (
                  <span className="text-[#7c7486] whitespace-nowrap">ยังไม่มีคะแนน</span>
                )}
              </div>
            </div>
          </div>

          {/* Block 2: Unified Critic Scores (Distinct Award header icon — no duplicate Metacritic logo!) */}
          <div className="rounded-xl p-3.5 bg-white/[0.03] border border-white/[0.09] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white whitespace-nowrap">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>คะแนนสื่อวิจารณ์</span>
            </div>

            <div className="space-y-2 text-[11px] sm:text-xs">
              {/* Metacritic Row */}
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[#cbc5d0] font-medium whitespace-nowrap shrink-0">
                  <MetacriticLogo className="w-3.5 h-3.5 shrink-0" />
                  <span>Metacritic</span>
                </span>
                {steamData?.metacritic ? (
                  <a
                    href={steamData.metacritic.url || "https://www.metacritic.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:opacity-85 transition whitespace-nowrap shrink-0"
                  >
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[11px] font-extrabold ${getMetacriticTone(
                        steamData.metacritic.score
                      )}`}
                    >
                      {steamData.metacritic.score}
                    </span>
                    <ExternalLink className="w-3 h-3 text-[#8a8293]" />
                  </a>
                ) : (
                  <span className="text-[#7c7486] whitespace-nowrap">ยังไม่มีคะแนน</span>
                )}
              </div>

              {/* OpenCritic Row */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06] min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[#cbc5d0] font-medium whitespace-nowrap shrink-0">
                  <OpenCriticLogo className="w-3.5 h-3.5 shrink-0" />
                  <span>OpenCritic</span>
                </span>
                {steamData?.openCritic ? (
                  <a
                    href={steamData.openCritic.url || "https://opencritic.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:opacity-85 transition whitespace-nowrap shrink-0"
                  >
                    {steamData.openCritic.tier && (
                      <span className="text-[11px] text-[#a69eb0]">
                        {steamData.openCritic.tier}
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[11px] font-extrabold ${getOpenCriticTone(
                        steamData.openCritic.score,
                        steamData.openCritic.tier
                      )}`}
                    >
                      {steamData.openCritic.score}
                    </span>
                    <ExternalLink className="w-3 h-3 text-[#8a8293]" />
                  </a>
                ) : (
                  <span className="text-[#7c7486] whitespace-nowrap">ยังไม่มีคะแนน</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PC System Requirements */}
      {steamData &&
        (steamData.minimumSpecs.length > 0 || steamData.recommendedSpecs.length > 0) && (
          <div className="relative z-10 space-y-3 pt-4 border-t border-white/[0.08]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-white">
                <Cpu className="w-3.5 h-3.5 text-[#ff4d8d]" />
                สเปก PC
              </div>

              <div className="inline-flex p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                {(["minimum", "recommended"] as const).map((t) => {
                  const active = specTab === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSpecTab(t)}
                      className={`relative px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        active ? "text-white" : "text-[#8a8293] hover:text-white"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="spec-pill"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          className="absolute inset-0 rounded-lg bg-[#ff4d8d]/20 border border-[#ff4d8d]/40"
                        />
                      )}
                      <span className="relative z-10">
                        {t === "minimum" ? "ขั้นต่ำ" : "แนะนำ"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
              {activeSpecs.map((row) => (
                <div
                  key={`${specTab}-${row.label}`}
                  className="flex flex-col py-1.5 border-b border-white/[0.05]"
                >
                  <span className="text-[11px] text-[#8a8293]">{row.label}</span>
                  <span className="text-[#ebe6ef] mt-0.5">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
    </section>
  );
}
