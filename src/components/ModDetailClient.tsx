"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Bug,
  ChevronDown,
  Download,
  ExternalLink,
  FileArchive,
  FileText,
  FolderTree,
  ImagePlus,
  Images,
  Layers,
  Puzzle,
  Send,
  Trash2,
  X,
} from "lucide-react";
import type { BugReportItem, ModEntry, ModFileEntry } from "@/data/types";
import type { LiveSteamData } from "@/lib/steam";
import { ARCHIVE_TREES } from "@/data/archiveTrees";
import { INSTALL_GUIDES } from "@/data/installGuides";
import { SITE_CONFIG } from "@/data/site";
import {
  AiModelLogos,
  DiscordLogo,
  EngineLogo,
  HostLogo,
  NexusModsLogo,
} from "./BrandIcons";
import { ArchivePreviewModal } from "./ArchivePreviewModal";
import { InstallGuideModal } from "./InstallGuideModal";
import { MediaStage } from "./MediaStage";
import { SteamStorePanel } from "./SteamStorePanel";

type TabId = "description" | "files" | "images" | "bugs";

interface ModDetailClientProps {
  mod: ModEntry;
  seriesMods?: ModEntry[];
  initialDownloads: number;
  initialBugs: BugReportItem[];
  steamData: LiveSteamData | null;
  isAdmin?: boolean;
}

/** Highlights file names, folder names, and paths inside install/uninstall text so players spot them instantly */
const INSTALL_TOKEN_REGEX =
  /((?:[A-Za-z]:\\)?(?:[A-Za-z0-9_~.-]+\\)+[A-Za-z0-9_~.*-]*|[A-Za-z0-9_.-]+\.(?:zip|7z|exe|dll|ini|pak|utoc|ucas|ttf|otf|csv|json|bin|lnk|fdata|rdb|txt|md)|\.doorstop_version|\b(?:SOS_ThaiMod|SeaOfSolitude_Data|Mod_Files|ThaiMod(?:_EP[1-5]|_ScratchCreek)?|BepInEx|dotnet|archive|fdata_package|media|PIO|Routine|Denshattack_Proto|GoriCuddlyCarnage|TerribleLizards_Thai_P|terrible_lizards|HopeInTheCity_ThaiMod|HITC_Data|PDW|Content|Paks)\b|~mods)/g;

function renderHighlightedPaths(text: string): React.ReactNode {
  const parts = text.split(INSTALL_TOKEN_REGEX);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <code
          key={i}
          className="inline-block px-1.5 py-0.5 mx-0.5 rounded-md font-mono text-[11px] sm:text-xs font-semibold bg-emerald-500/14 text-emerald-200 border border-emerald-400/30 align-baseline"
        >
          {part}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** Resize & compress user screenshot client-side so upload + Discord embed + list thumbnail are fast */
async function prepareBugImage(file: File): Promise<{ uploadFile: File; previewDataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("อ่านไฟล์ภาพไม่สำเร็จ"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("ไฟล์ภาพไม่ถูกต้อง"));
      img.onload = () => {
        // High-res image for Discord (max 1440px)
        const maxW = 1440;
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compact thumbnail for web list (max 480px)
        const thumbScale = Math.min(1, 480 / img.width);
        const thumbCanvas = document.createElement("canvas");
        thumbCanvas.width = Math.round(img.width * thumbScale);
        thumbCanvas.height = Math.round(img.height * thumbScale);
        const tCtx = thumbCanvas.getContext("2d");
        tCtx?.drawImage(img, 0, 0, thumbCanvas.width, thumbCanvas.height);
        const previewDataUrl = thumbCanvas.toDataURL("image/jpeg", 0.72);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("แปลงไฟล์ภาพไม่สำเร็จ"));
            const uploadFile = new File([blob], "bug-screenshot.jpg", {
              type: "image/jpeg",
            });
            resolve({ uploadFile, previewDataUrl });
          },
          "image/jpeg",
          0.84
        );
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export function ModDetailClient({
  mod,
  seriesMods = [],
  initialDownloads,
  initialBugs,
  steamData,
  isAdmin = false,
}: ModDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [downloads, setDownloads] = useState<number>(initialDownloads);
  const [downloading, setDownloading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<ModFileEntry | null>(null);
  const [installGuideOpen, setInstallGuideOpen] = useState(false);
  const [optionalFilesOpen, setOptionalFilesOpen] = useState(false);
  const installGuide = INSTALL_GUIDES[mod.slug];

  // Ultra-simple Bug Report state (Image + Optional Text)
  const [bugs, setBugs] = useState<BugReportItem[]>(initialBugs);
  const [bugMessage, setBugMessage] = useState("");
  const [bugImageFile, setBugImageFile] = useState<File | null>(null);
  const [bugImagePreview, setBugImagePreview] = useState<string | null>(null);
  const [submittingBug, setSubmittingBug] = useState(false);
  const [bugZoomImg, setBugZoomImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((prev) => (prev === msg ? null : prev)), 3200);
  };

  const handleCopy = (text: string, key: string, msg: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedKey(key);
    showToast(msg);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = async (
    fileId: string,
    mirror: "primary" | "backup" = "primary"
  ) => {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(`/api/download/${mod.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, mirror }),
      });
      const data = await res.json();
      if (data.ok) {
        if (typeof data.downloads === "number") {
          setDownloads(data.downloads);
        }
        showToast(`เริ่มดาวน์โหลด ${data.fileName}`);
        window.open(data.url, "_blank", "noopener,noreferrer");
      } else {
        showToast("ไม่สามารถดาวน์โหลดได้ในขณะนี้");
      }
    } catch {
      showToast("เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ");
    } finally {
      setDownloading(false);
    }
  };

  const handleSelectBugImage = async (file: File | null | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("รองรับเฉพาะไฟล์รูปภาพ");
      return;
    }
    try {
      const { uploadFile, previewDataUrl } = await prepareBugImage(file);
      setBugImageFile(uploadFile);
      setBugImagePreview(previewDataUrl);
    } catch {
      showToast("ไม่สามารถอ่านไฟล์รูปภาพนี้ได้");
    }
  };

  const handleBugPaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        handleSelectBugImage(item.getAsFile());
        break;
      }
    }
  };

  const handleBugSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugMessage.trim() && !bugImageFile) {
      showToast("กรุณาแนบรูปภาพหรือพิมพ์รายละเอียดปัญหาอย่างน้อย 1 อย่าง");
      return;
    }
    setSubmittingBug(true);
    try {
      const form = new FormData();
      if (bugMessage.trim()) form.append("message", bugMessage.trim());
      if (bugImageFile) form.append("image", bugImageFile);
      if (bugImagePreview) form.append("imagePreview", bugImagePreview);

      const res = await fetch(`/api/bugs/${mod.slug}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "ส่งรายงานไม่สำเร็จ");
        return;
      }
      setBugs((prev) => [data.report, ...prev]);
      setBugMessage("");
      setBugImageFile(null);
      setBugImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      showToast("ส่งรายงานปัญหาเรียบร้อยแล้ว");
    } catch {
      showToast("เกิดข้อผิดพลาดในการส่งรายงาน");
    } finally {
      setSubmittingBug(false);
    }
  };

  const mainFiles = mod.files.filter((f) => !f.optional);
  const optionalFiles = mod.files.filter((f) => f.optional);
  const primaryFile = mainFiles[0] || mod.files[0];

  const tabs: { id: TabId; label: string; count?: number; icon: React.ReactNode }[] = [
    { id: "description", label: "คำอธิบาย", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "files", label: "ไฟล์", count: mainFiles.length, icon: <FileArchive className="w-3.5 h-3.5" /> },
    { id: "images", label: "รูปภาพ", count: mod.media.gallery.length, icon: <Images className="w-3.5 h-3.5" /> },
    { id: "bugs", label: "แจ้งบัค", count: bugs.length, icon: <Bug className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-[1260px] mx-auto px-3.5 sm:px-6 pt-3.5 sm:pt-5 pb-12 space-y-4 sm:space-y-6">
      {/* Clean Tactile Back Button */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-[#ff4d8d]/18 border border-white/12 hover:border-[#ff4d8d]/45 text-xs font-semibold text-white transition shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#ff77a9]" />
          <span>กลับหน้าหลัก</span>
        </Link>
      </div>

      {/* HEADER BANNER (Exact 1300x372 Uncropped Proportions Across Phone, iPad & Desktop) */}
      <section className="glass-panel rounded-2xl overflow-hidden">
        <div className="relative w-full aspect-[1300/372] bg-black overflow-hidden">
          <Image
            src={mod.media.header}
            alt={mod.thaiTitle}
            fill
            priority
            sizes="(max-width: 1260px) 100vw, 1260px"
            className="object-cover object-center"
          />
        </div>

        {/* Clean Formal Title + Series/Genre Chips + Tab Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0d0a11] border-t border-white/[0.08] space-y-3 sm:space-y-3.5">
          <div className="space-y-1.5">
            {(mod.series || mod.genres.length > 0) && (
              <div className="flex flex-wrap items-center gap-1.5">
                {mod.series && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ff4d8d]/18 text-[#ff9ec2] border border-[#ff4d8d]/40">
                    <Layers className="w-3 h-3" />
                    ซีรีส์: {mod.series.name}
                    {mod.series.badgeLabel ? ` · ${mod.series.badgeLabel}` : ""}
                  </span>
                )}
                {mod.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.05] border border-white/[0.09] text-[#b4acc0]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
            <h1 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {mod.thaiTitle}
            </h1>
          </div>

          <div
            role="tablist"
            className="grid grid-cols-4 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] w-full sm:w-auto"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-1.5 sm:px-4 py-2 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold inline-flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? "text-white" : "text-[#9c94a6] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mod-active-tab"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[#ff4d8d]/25 border border-[#ff4d8d]/45"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1 sm:gap-1.5">
                    <span className={`hidden sm:inline-flex ${isActive ? "text-[#ff77a9]" : "opacity-75"}`}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                    {typeof tab.count === "number" && (
                      <span className="px-1 sm:px-1.5 rounded text-[10px] font-mono bg-white/[0.08] text-white/85">
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MOBILE / IPAD QUICK DOWNLOAD BAR (Shown ONLY on Description tab so it doesn't clutter Files/Images/Bugs!) */}
      {primaryFile && activeTab === "description" && (
        <div className="lg:hidden glass-panel rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#9c94a6]">
              <span className="px-2 py-0.5 rounded-md font-bold bg-emerald-500/18 text-emerald-300 border border-emerald-400/35">
                ฟรี
              </span>
              <span>{mod.specs.version}</span>
              <span>•</span>
              <span>{mod.specs.fileSize}</span>
            </div>
            <div className="text-xs text-[#8a8293]">
              ดาวน์โหลด{" "}
              <strong className="font-display text-sm text-white tabular-nums">
                {downloads.toLocaleString("en-US")}
              </strong>{" "}
              ครั้ง
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              disabled={downloading}
              onClick={() => handleDownload(primaryFile.id, "primary")}
              className="btn-pink-primary w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "กำลังเตรียมไฟล์..." : "ดาวน์โหลดฟรี"}</span>
            </button>

            {primaryFile.backupUrl ? (
              <button
                type="button"
                onClick={() => handleDownload(primaryFile.id, "backup")}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-white inline-flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <HostLogo host={primaryFile.backupHost || "Google Drive"} className="w-4 h-4 shrink-0" />
                <span>ลิงก์สำรอง ({primaryFile.backupHost || "Google Drive"})</span>
              </button>
            ) : null}
          </div>

          {(mainFiles.length > 1 || optionalFiles.length > 0) && (
            <button
              type="button"
              onClick={() => setActiveTab("files")}
              className="w-full py-1 text-[11px] font-semibold text-[#ff77a9] hover:text-[#ff4d8d] text-center cursor-pointer"
            >
              {mainFiles.length > 1
                ? `เลือกดาวน์โหลดไฟล์ทั้งหมด (${mainFiles.length} แบบ) →`
                : `ดูไฟล์ทั้งหมด / เช็คไฟล์ข้างใน (+${optionalFiles.length} ม็อดเสริมไม่บังคับ) →`}
            </button>
          )}
        </div>
      )}

      {/* MAIN 2-COLUMN BODY */}
      <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-5 sm:space-y-6 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="tab-description"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.24 }}
                className="space-y-6"
              >
                {/* Interactive Media Stage (Style B) */}
                {mod.media.gallery.length > 0 && (
                  <MediaStage images={mod.media.gallery} />
                )}

                {/* Mod-Specific Description (Formal & Scannable) */}
                <article className="glass-panel rounded-2xl p-4 sm:p-6 space-y-5 sm:space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-display text-base font-bold text-white">
                      รายละเอียดม็อด
                    </h2>
                    <p className="text-sm text-[#cbc5d0] leading-relaxed">
                      {mod.overview}
                    </p>
                  </div>

                  <hr className="border-white/[0.07]" />

                  <div className="space-y-2.5">
                    <h2 className="font-display text-sm font-bold text-white">
                      ขอบเขตการแปลและฟีเจอร์
                    </h2>
                    <ul className="space-y-2 text-sm text-[#cbc5d0] list-disc pl-5 marker:text-[#ff4d8d]">
                      {mod.features.map((feat, i) => (
                        <li key={i} className="leading-relaxed">
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="border-white/[0.07]" />

                  <div className="space-y-3">
                    <h2 className="font-display text-sm font-bold text-white">
                      วิธีติดตั้ง
                    </h2>
                    <ol className="space-y-2.5 text-sm text-[#cbc5d0] list-decimal pl-5 marker:text-[#ff77a9] marker:font-semibold">
                      {mod.installSteps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {renderHighlightedPaths(step)}
                        </li>
                      ))}
                    </ol>

                    {installGuide && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setInstallGuideOpen(true)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/12 hover:bg-emerald-500/22 border border-emerald-400/35 hover:border-emerald-400/60 text-emerald-200 hover:text-white transition cursor-pointer"
                        >
                          <FolderTree className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>ดูตัวอย่างตำแหน่งวางไฟล์</span>
                        </button>
                      </div>
                    )}

                    <p className="text-xs text-[#8a8293] leading-relaxed">
                      <strong className="text-[#cbc5d0]">การถอนการติดตั้ง:</strong>{" "}
                      {renderHighlightedPaths(mod.uninstallNote)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.07] flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-[#8a8293]">
                    {mod.credits.map((c) => (
                      <div key={c.role}>
                        <span>{c.role}: </span>
                        <strong className="text-white">{c.name}</strong>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Live Steam Data + Multi-Platform Stores + PC Specs */}
                <SteamStorePanel stores={mod.stores} steamData={steamData} />

                {/* Related Games in the Same Series / Set */}
                {mod.series && seriesMods.length > 1 && (
                  <section className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#ff77a9]" />
                        <h2 className="font-display text-sm sm:text-base font-bold text-white">
                          เกมในซีรีส์เดียวกัน: {mod.series.name}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ff4d8d]/18 text-[#ff9ec2] border border-[#ff4d8d]/35">
                          {seriesMods.length} เกม
                        </span>
                      </div>
                      {mod.series.thaiName && (
                        <span className="text-xs text-[#8a8293]">{mod.series.thaiName}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {seriesMods.map((item) => {
                        const isCurrent = item.slug === mod.slug;
                        return (
                          <Link
                            key={item.slug}
                            href={`/mods/${item.slug}`}
                            className={`rounded-xl p-2.5 border flex items-center gap-3 transition ${
                              isCurrent
                                ? "bg-[#ff4d8d]/18 border-[#ff4d8d]/55 pointer-events-none"
                                : "bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08] hover:border-[#ff4d8d]/40"
                            }`}
                          >
                            <div className="relative w-16 aspect-video rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                              <Image
                                src={item.media.cover}
                                alt={item.gameTitle}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              {item.series?.badgeLabel && (
                                <div className="text-[10px] font-bold text-[#ff9ec2]">
                                  {item.series.badgeLabel}
                                  {isCurrent ? " • กำลังดูอยู่" : ""}
                                </div>
                              )}
                              <div className="text-xs font-semibold text-white truncate">
                                {item.gameTitle.replace(`${mod.series?.name} - `, "")}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}
              </motion.div>
            )}

            {activeTab === "files" && (
              <motion.div
                key="tab-files"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {mainFiles.map((file) => {
                  const archiveEntries = ARCHIVE_TREES[file.id] || [];
                  return (
                  <div key={file.id} className="glass-panel rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-display text-base font-bold text-white">
                            {file.fileName}
                          </h2>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ff4d8d]/18 text-[#ff77a9] border border-[#ff4d8d]/30">
                            {file.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8a8293]">
                          <span>{file.version}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.uploadedAt}</span>
                          {archiveEntries.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{archiveEntries.length} ไฟล์ข้างใน</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={downloading}
                          onClick={() => handleDownload(file.id, "primary")}
                          className="btn-pink-primary px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
                        >
                          <HostLogo host={file.primaryHost} className="w-4 h-4 shrink-0" />
                          <span>{file.primaryHost}</span>
                        </button>
                        {file.backupUrl && (
                          <button
                            type="button"
                            disabled={downloading}
                            onClick={() => handleDownload(file.id, "backup")}
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-white inline-flex items-center gap-2 transition cursor-pointer"
                          >
                            <HostLogo host={file.backupHost || "Google Drive"} className="w-4 h-4 shrink-0" />
                            <span>{file.backupHost || "Google Drive"}</span>
                          </button>
                        )}
                        {archiveEntries.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setPreviewFile(file)}
                            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-[#ff4d8d]/18 border border-white/12 hover:border-[#ff4d8d]/45 text-[#e4deeb] hover:text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <FolderTree className="w-3.5 h-3.5 text-[#ff77a9] shrink-0" />
                            <span>ดูไฟล์ข้างใน</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl p-4 bg-white/[0.03] border border-white/[0.07] space-y-2 text-xs leading-relaxed">
                      <p className="text-[#d4ced9]">{renderHighlightedPaths(file.installNote)}</p>
                      {file.knownNotice && (
                        <p className="text-amber-300/90 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{file.knownNotice}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8a8293] font-mono">
                      <span className="truncate">SHA-256: {file.sha256}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(file.sha256, `sha-${file.id}`, "คัดลอก SHA-256 แล้ว")
                        }
                        className="font-sans font-semibold text-[#ff77a9] hover:text-[#ff4d8d] cursor-pointer"
                      >
                        {copiedKey === `sha-${file.id}` ? "คัดลอกแล้ว" : "คัดลอก"}
                      </button>
                    </div>
                  </div>
                  );
                })}

                {/* OPTIONAL ADD-ON MODS (Collapsed by default with clear "ม็อดเสริม — ไม่ต้องลงก็ได้" notice) */}
                {optionalFiles.length > 0 && (
                  <div className="glass-panel rounded-2xl border border-dashed border-amber-400/30 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOptionalFilesOpen((v) => !v)}
                      aria-expanded={optionalFilesOpen}
                      className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-white/[0.03] transition cursor-pointer"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-400/35">
                            <Puzzle className="w-3 h-3" />
                            ม็อดเสริม • ไม่ต้องลงก็ได้
                          </span>
                          <span className="font-display text-sm font-bold text-white">
                            ม็อดเสริมเพิ่มเติม ({optionalFiles.length} ไฟล์)
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9c94a6]">
                          แยกจากม็อดภาษาไทยหลัก — หากต้องการเล่นแค่ภาษาไทย ไม่จำเป็นต้องดาวน์โหลดส่วนนี้
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-[#cbc5d0] shrink-0">
                        <span>{optionalFilesOpen ? "ย่อ" : "ขยายดู"}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            optionalFilesOpen ? "rotate-180 text-amber-300" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {optionalFilesOpen && (
                        <motion.div
                          key="optional-files-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden border-t border-white/[0.07]"
                        >
                          <div className="p-4 sm:p-5 space-y-4 bg-black/20">
                            {optionalFiles.map((file) => {
                              const archiveEntries = ARCHIVE_TREES[file.id] || [];
                              return (
                                <div
                                  key={file.id}
                                  className="rounded-xl p-4 sm:p-5 bg-white/[0.025] border border-white/[0.09] space-y-3.5"
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="space-y-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="font-display text-sm sm:text-base font-bold text-white">
                                          {file.fileName}
                                        </h3>
                                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-400/30">
                                          {file.label}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8a8293]">
                                        <span>{file.version}</span>
                                        <span>•</span>
                                        <span>{file.size}</span>
                                        <span>•</span>
                                        <span>{file.uploadedAt}</span>
                                        {archiveEntries.length > 0 && (
                                          <>
                                            <span>•</span>
                                            <span>{archiveEntries.length} ไฟล์ข้างใน</span>
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                      <button
                                        type="button"
                                        disabled={downloading}
                                        onClick={() => handleDownload(file.id, "primary")}
                                        className="px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.1] hover:bg-white/[0.18] border border-white/18 text-white inline-flex items-center gap-2 transition cursor-pointer disabled:opacity-60"
                                      >
                                        <HostLogo host={file.primaryHost} className="w-4 h-4 shrink-0" />
                                        <span>{file.primaryHost}</span>
                                      </button>
                                      {file.backupUrl && (
                                        <button
                                          type="button"
                                          disabled={downloading}
                                          onClick={() => handleDownload(file.id, "backup")}
                                          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.1] border border-white/12 text-[#d8d2de] hover:text-white inline-flex items-center gap-2 transition cursor-pointer"
                                        >
                                          <HostLogo host={file.backupHost || "Google Drive"} className="w-4 h-4 shrink-0" />
                                          <span>{file.backupHost || "Google Drive"}</span>
                                        </button>
                                      )}
                                      {archiveEntries.length > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => setPreviewFile(file)}
                                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.1] border border-white/12 text-[#d8d2de] hover:text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                                        >
                                          <FolderTree className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                                          <span>ดูไฟล์ข้างใน</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <div className="rounded-xl p-3.5 bg-black/30 border border-white/[0.06] text-xs leading-relaxed text-[#cbc5d0]">
                                    {file.installNote}
                                  </div>

                                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8a8293] font-mono">
                                    <span className="truncate">SHA-256: {file.sha256}</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCopy(file.sha256, `sha-${file.id}`, "คัดลอก SHA-256 แล้ว")
                                      }
                                      className="font-sans font-semibold text-amber-300 hover:text-amber-200 cursor-pointer"
                                    >
                                      {copiedKey === `sha-${file.id}` ? "คัดลอกแล้ว" : "คัดลอก"}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "images" && (
              <motion.div
                key="tab-images"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <MediaStage images={mod.media.gallery} />
              </motion.div>
            )}

            {activeTab === "bugs" && (
              <motion.div
                key="tab-bugs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                {/* ULTRA-SIMPLE BUG FORM: Image + Optional Message Only */}
                <form
                  onSubmit={handleBugSubmit}
                  onPaste={handleBugPaste}
                  className="glass-panel rounded-2xl p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-display text-base font-bold text-white">
                      แจ้งปัญหา / บัค
                    </h2>
                    <a
                      href={SITE_CONFIG.discordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#5865F2]/15 hover:bg-[#5865F2]/28 border border-[#5865F2]/40 text-[#c9d0ff] hover:text-white transition"
                    >
                      <DiscordLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>ส่งบัคทาง Discord โดยตรง</span>
                      <ExternalLink className="w-3 h-3 opacity-75" />
                    </a>
                  </div>

                  {/* Image Picker / Drop / Ctrl+V Zone */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => handleSelectBugImage(e.target.files?.[0])}
                      className="hidden"
                    />

                    {bugImagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black/50">
                        <img
                          src={bugImagePreview}
                          alt="ภาพที่แนบ"
                          className="max-h-64 w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setBugImageFile(null);
                            setBugImagePreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          aria-label="ลบภาพ"
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/75 hover:bg-[#d91e36] text-white flex items-center justify-center transition cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleSelectBugImage(e.dataTransfer.files?.[0]);
                        }}
                        className="w-full py-7 px-4 rounded-xl border border-dashed border-white/20 hover:border-[#ff4d8d]/60 bg-white/[0.02] hover:bg-white/[0.04] transition flex flex-col items-center justify-center gap-2 text-xs text-[#9c94a6] cursor-pointer"
                      >
                        <ImagePlus className="w-6 h-6 text-[#ff77a9]" />
                        <span className="font-medium text-white">
                          แนบรูปภาพ (คลิกเลือก ลากวาง หรือกด Ctrl+V)
                        </span>
                        <span className="text-[11px] text-[#8a8293]">
                          ส่งเฉพาะรูปภาพก็ได้ ไม่บังคับพิมพ์ข้อความ
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Optional Message Input */}
                  <textarea
                    rows={3}
                    value={bugMessage}
                    onChange={(e) => setBugMessage(e.target.value)}
                    placeholder="รายละเอียดปัญหา (ไม่บังคับ)"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#17131c] border border-white/12 text-white placeholder:text-[#7c7486] outline-none focus:border-[#ff4d8d] resize-none"
                  />

                  <button
                    type="submit"
                    disabled={submittingBug}
                    className="btn-pink-primary px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submittingBug ? "กำลังส่ง..." : "ส่งแจ้งบัค"}
                  </button>
                </form>

                {/* Bug Reports List */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-[#9c94a6]">
                    รายการที่แจ้ง ({bugs.length})
                  </div>

                  {bugs.length === 0 ? (
                    <div className="glass-panel rounded-2xl p-6 text-center text-xs text-[#8a8293]">
                      ยังไม่มีรายการแจ้งปัญหา
                    </div>
                  ) : (
                    bugs.map((bug) => (
                      <div
                        key={bug.id}
                        className="glass-panel rounded-2xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#cbc5d0]">
                              {bug.id}
                            </span>
                            <span className="px-2 py-0.5 rounded-full font-semibold bg-[#ff4d8d]/15 text-[#ff77a9] border border-[#ff4d8d]/30">
                              {bug.status}
                            </span>
                          </div>
                          <span className="text-[#8a8293]">{bug.createdAt}</span>
                        </div>

                        {bug.message && (
                          <p className="text-xs sm:text-sm text-[#e3dee8] leading-relaxed whitespace-pre-wrap">
                            {bug.message}
                          </p>
                        )}

                        {bug.imagePreview && (
                          <button
                            type="button"
                            onClick={() => setBugZoomImg(bug.imagePreview || null)}
                            className="block rounded-xl overflow-hidden border border-white/10 hover:border-[#ff4d8d]/50 transition cursor-pointer"
                          >
                            <img
                              src={bug.imagePreview}
                              alt={`ภาพประกอบ ${bug.id}`}
                              className="max-h-52 w-auto object-contain bg-black"
                            />
                          </button>
                        )}

                        {isAdmin && (
                          <div className="pt-2.5 border-t border-amber-300/20 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {(["รับเรื่องแล้ว", "กำลังแก้ไข", "แก้ไขแล้ว"] as const).map((st) => (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={async () => {
                                    const res = await fetch(`/api/bugs/${mod.slug}`, {
                                      method: "PATCH",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ id: bug.id, status: st }),
                                    });
                                    if (res.ok) {
                                      setBugs((prev) =>
                                        prev.map((x) => (x.id === bug.id ? { ...x, status: st } : x))
                                      );
                                      showToast(`อัปเดตสถานะบัคเป็น "${st}"`);
                                    }
                                  }}
                                  className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                                    bug.status === st
                                      ? "bg-emerald-600 text-white"
                                      : "bg-white/[0.06] hover:bg-white/[0.14] text-white/85"
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                const res = await fetch(
                                  `/api/bugs/${mod.slug}?id=${encodeURIComponent(bug.id)}`,
                                  { method: "DELETE" }
                                );
                                if (res.ok) {
                                  setBugs((prev) => prev.filter((x) => x.id !== bug.id));
                                  showToast("ลบรายการบัคแล้ว");
                                }
                              }}
                              className="p-1.5 rounded-md bg-white/[0.06] hover:bg-rose-600 text-white/80 hover:text-white transition cursor-pointer"
                              aria-label="ลบบัค"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT STICKY SIDEBAR (4 cols): On Mobile (< lg), show ONLY on Description tab and hide duplicate download buttons */}
        <aside
          className={`lg:col-span-4 lg:sticky lg:top-20 ${
            activeTab === "description" ? "" : "hidden lg:block"
          }`}
        >
          <div className="glass-panel spot-card rounded-2xl p-5 space-y-5">
            {/* Desktop-only Download Counter + Primary Download Buttons (avoids repeating download CTA on Mobile!) */}
            <div className="hidden lg:block space-y-5">
              {/* Real Download Counter */}
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#8a8293]">ยอดดาวน์โหลด</span>
                <motion.div
                  key={downloads}
                  initial={{ scale: 1.08, color: "#ff77a9" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  className="font-display text-2xl font-bold tabular-nums"
                >
                  {downloads.toLocaleString("en-US")}{" "}
                  <span className="text-xs font-normal text-[#8a8293]">ครั้ง</span>
                </motion.div>
              </div>

              {/* Download Buttons (Clear "ฟรี", no version number on button) */}
              {primaryFile && (
                <div className="relative z-10 space-y-2">
                  <button
                    type="button"
                    disabled={downloading}
                    onClick={() => handleDownload(primaryFile.id, "primary")}
                    className="btn-pink-primary w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloading ? "กำลังเตรียมไฟล์..." : "ดาวน์โหลดฟรี"}</span>
                  </button>

                  {primaryFile.backupUrl && (
                    <button
                      type="button"
                      onClick={() => handleDownload(primaryFile.id, "backup")}
                      className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#cbc5d0] hover:text-white inline-flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <HostLogo host={primaryFile.backupHost || "Google Drive"} className="w-3.5 h-3.5 shrink-0" />
                      <span>ลิงก์สำรอง ({primaryFile.backupHost || "Google Drive"})</span>
                    </button>
                  )}

                  {mod.nexusModUrl ? (
                    <a
                      href={mod.nexusModUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#F5A64B]/12 hover:bg-[#F5A64B]/22 border border-[#F5A64B]/35 text-[#F5A64B] hover:text-[#ffc278] inline-flex items-center justify-center gap-2 transition"
                    >
                      <NexusModsLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>ไปหน้าม็อดบน Nexus Mods</span>
                      <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title="ม็อดเกมนี้ไม่สามารถเผยแพร่บน Nexus Mods ได้"
                      className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white/[0.03] border border-white/[0.08] text-[#7c7486] inline-flex items-center justify-center gap-2 opacity-65 cursor-not-allowed select-none"
                    >
                      <NexusModsLogo className="w-3.5 h-3.5 shrink-0 grayscale opacity-60" />
                      <span>ไม่สามารถลง Nexus ได้</span>
                    </button>
                  )}

                  {(mainFiles.length > 1 || optionalFiles.length > 0) && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("files");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full py-1.5 text-[11px] font-semibold text-[#ff77a9] hover:text-[#ff4d8d] hover:underline transition cursor-pointer"
                    >
                      {mainFiles.length > 1
                        ? `เลือกดาวน์โหลดไฟล์ทั้งหมด (${mainFiles.length} แบบ) →`
                        : `ดูไฟล์ทั้งหมด / เช็คไฟล์ข้างใน (+${optionalFiles.length} ม็อดเสริม) →`}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Mobile-only compact Nexus link above specs (no duplicate download buttons!) */}
            <div className="lg:hidden relative z-10">
              {mod.nexusModUrl ? (
                <a
                  href={mod.nexusModUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#F5A64B]/12 hover:bg-[#F5A64B]/22 border border-[#F5A64B]/35 text-[#F5A64B] inline-flex items-center justify-center gap-2 transition"
                >
                  <NexusModsLogo className="w-3.5 h-3.5 shrink-0" />
                  <span>ไปหน้าม็อดบน Nexus Mods</span>
                  <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="ม็อดเกมนี้ไม่สามารถเผยแพร่บน Nexus Mods ได้"
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white/[0.03] border border-white/[0.08] text-[#7c7486] inline-flex items-center justify-center gap-2 opacity-65 cursor-not-allowed select-none"
                >
                  <NexusModsLogo className="w-3.5 h-3.5 shrink-0 grayscale opacity-60" />
                  <span>ไม่สามารถลง Nexus ได้</span>
                </button>
              )}
            </div>

            {/* Formal Specs Table (Required fields with Real Brand Logos) */}
            <dl className="relative z-10 pt-3 lg:pt-4 border-t border-white/[0.08] divide-y divide-white/[0.06] text-xs">
              <div className="py-2.5 flex items-start justify-between gap-3">
                <dt className="text-[#8a8293] shrink-0">เวอร์ชัน</dt>
                <dd className="text-right font-semibold text-white">{mod.specs.version}</dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-3">
                <dt className="text-[#8a8293] shrink-0">AI Model</dt>
                <dd className="text-right font-semibold text-[#ff77a9] inline-flex items-center justify-end gap-1.5">
                  <AiModelLogos model={mod.specs.aiModel} className="w-3.5 h-3.5" />
                  <span>{mod.specs.aiModel}</span>
                </dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-3">
                <dt className="text-[#8a8293] shrink-0">ข้อความที่แปล</dt>
                <dd className="text-right font-semibold text-white">{mod.specs.translatedLines}</dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-3">
                <dt className="text-[#8a8293] shrink-0">ฟอนต์ที่ใช้</dt>
                <dd className="text-right font-semibold text-white">{mod.specs.fontUsed}</dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-3">
                <dt className="text-[#8a8293] shrink-0">เอนจิน</dt>
                <dd className="text-right font-semibold text-white inline-flex items-center justify-end gap-1.5">
                  <EngineLogo engine={mod.specs.engine} className="w-3.5 h-3.5" />
                  <span>{mod.specs.engine}</span>
                </dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-3">
                <dt className="text-[#8a8293] shrink-0">ขนาดไฟล์</dt>
                <dd className="text-right font-semibold text-white">{mod.specs.fileSize}</dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-3">
                <dt className="text-[#8a8293] shrink-0">อัปเดตล่าสุด</dt>
                <dd className="text-right font-semibold text-white">{mod.specs.updatedAt}</dd>
              </div>
            </dl>

            {/* Author & Nexus Link */}
            <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#ff4d8d]/45">
                  <Image
                    src={SITE_CONFIG.logoPath}
                    alt="MaTaReaL"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-white">
                  {SITE_CONFIG.authorName}
                </span>
              </div>

              <a
                href={SITE_CONFIG.nexusProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-right group"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5A64B] group-hover:underline transition">
                  <NexusModsLogo className="w-3.5 h-3.5 shrink-0" />
                  <span>Nexus Mods</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </div>
                <div className="text-[10px] text-[#8a8293]">ม็อดไทยและม็อดอื่นๆ ของผม</div>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Visual Install Guide Modal */}
      {installGuide && (
        <InstallGuideModal
          open={installGuideOpen}
          onClose={() => setInstallGuideOpen(false)}
          gameTitle={mod.gameTitle}
          guide={installGuide}
        />
      )}

      {/* Archive File Contents Inspector Modal (Nexus-style Preview) */}
      <ArchivePreviewModal
        open={Boolean(previewFile)}
        onClose={() => setPreviewFile(null)}
        fileName={previewFile?.fileName || ""}
        version={previewFile?.version || ""}
        compressedSize={previewFile?.size || ""}
        entries={previewFile ? ARCHIVE_TREES[previewFile.id] || [] : []}
      />

      {/* Bug Image Zoom Modal */}
      <AnimatePresence>
        {bugZoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBugZoomImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <img
              src={bugZoomImg}
              alt="ภาพขยาย"
              className="max-h-[85vh] max-w-[92vw] rounded-xl border border-white/15 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#140f19]/95 border border-[#ff4d8d]/40 text-white text-xs font-medium shadow-2xl backdrop-blur-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
