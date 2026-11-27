"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Cpu, Clock } from "lucide-react";
import type { StoreLink, StorePlatform } from "@/data/types";
import type { LiveSteamData } from "@/lib/steam";
import { MetacriticLogo, SteamLogo, StoreLogo } from "./BrandIcons";

interface SteamStorePanelProps {
  stores: StoreLink[];
  steamData: LiveSteamData | null;
}

/** Strict store priority: Steam (1) -> Xbox (2) -> PlayStation (3) -> Epic (4) -> GOG (5, subtle) */
const PLATFORM_PRIORITY: Record<StorePlatform, number> = {
  steam: 1,
  xbox: 2,
  playstation: 3,
  epic: 4,
  gog: 5,
};

const PLATFORM_STYLE: Record<StorePlatform, string> = {
  steam:
    "bg-[#1b2838]/65 hover:bg-[#1b2838] border-[#66c0f4]/40 hover:border-[#66c0f4]/80 text-white",
  xbox:
    "bg-[#107c10]/15 hover:bg-[#107c10]/30 border-[#107c10]/45 hover:border-[#4ade80]/70 text-white",
  playstation:
    "bg-[#00439c]/20 hover:bg-[#00439c]/40 border-[#0070d1]/45 hover:border-[#60a5fa]/70 text-white",
  epic:
    "bg-white/[0.05] hover:bg-white/[0.12] border-white/15 hover:border-white/40 text-white",
  gog:
    "bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08] text-[#a69eb0] hover:text-white",
};

function getReviewTone(percent: number): string {
  if (percent >= 70) return "text-[#66c0f4] bg-[#66c0f4]/10 border-[#66c0f4]/30";
  if (percent >= 40) return "text-amber-300 bg-amber-500/10 border-amber-400/30";
  return "text-rose-300 bg-rose-500/10 border-rose-400/30";
}

function getMetacriticTone(score: number): string {
  if (score >= 75) return "bg-emerald-500 text-black";
  if (score >= 50) return "bg-amber-400 text-black";
  return "bg-rose-500 text-white";
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
          {/* Official Store Cover Art from Steam */}
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
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#8a8293]">
                {steamData.isLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/12 text-emerald-300 border border-emerald-400/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                )}
                {steamData.developers[0] && <span>{steamData.developers[0]}</span>}
                {steamData.releaseDate && (
                  <>
                    <span>•</span>
                    <span>{steamData.releaseDate}</span>
                  </>
                )}
                {steamData.genres.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{steamData.genres.join(", ")}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live Steam Price + Sale End Date */}
        {steamData?.price && (
          <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
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

      {/* Store Buttons (Sorted: Steam -> Xbox -> PlayStation -> Epic -> GOG) + Real-Time Reviews */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {sortedStores.map((store) => (
            <a
              key={`${store.platform}-${store.url}`}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
                PLATFORM_STYLE[store.platform]
              }`}
            >
              <StoreLogo platform={store.platform} className="w-4 h-4 shrink-0" />
              <span>{store.label}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          ))}
        </div>

        {/* Live Steam Review & Metacritic with Official Logos */}
        <div className="flex flex-wrap items-center gap-2">
          {steamData?.steamReview && (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${getReviewTone(
                steamData.steamReview.percentPositive
              )}`}
            >
              <SteamLogo className="w-3.5 h-3.5 shrink-0" />
              <span>
                {steamData.steamReview.percentPositive}% ({steamData.steamReview.label})
              </span>
              <span className="text-[11px] opacity-75 font-normal">
                · {steamData.steamReview.reviewCount.toLocaleString("en-US")} รีวิว
              </span>
            </div>
          )}

          {steamData?.metacritic ? (
            <a
              href={steamData.metacritic.url || "https://www.metacritic.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/12 text-xs font-semibold text-white transition"
            >
              <MetacriticLogo className="w-3.5 h-3.5 shrink-0" />
              <span
                className={`px-1.5 py-0.5 rounded font-mono text-[11px] font-extrabold ${getMetacriticTone(
                  steamData.metacritic.score
                )}`}
              >
                {steamData.metacritic.score}
              </span>
              <span>Metacritic</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-[#8a8293]">
              <MetacriticLogo className="w-3.5 h-3.5 opacity-60 shrink-0" />
              <span>Metacritic: ยังไม่มีคะแนน</span>
            </div>
          )}
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
