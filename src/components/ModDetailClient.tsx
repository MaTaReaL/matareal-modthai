"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Bug,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileArchive,
  FileText,
  ImagePlus,
  Images,
  Send,
  Trash2,
  X,
} from "lucide-react";
import type { BugReportItem, ModEntry } from "@/data/types";
import type { LiveSteamData } from "@/lib/steam";
import { SITE_CONFIG } from "@/data/site";
import {
  AiModelLogos,
  DiscordLogo,
  EngineLogo,
  HostLogo,
  NexusModsLogo,
} from "./BrandIcons";
import { MediaStage } from "./MediaStage";
import { SteamStorePanel } from "./SteamStorePanel";

type TabId = "description" | "files" | "images" | "bugs";

interface ModDetailClientProps {
  mod: ModEntry;
  initialDownloads: number;
  initialBugs: BugReportItem[];
  steamData: LiveSteamData | null;
  isAdmin?: boolean;
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

  const tabs: { id: TabId; label: string; count?: number; icon: React.ReactNode }[] = [
    { id: "description", label: "คำอธิบาย", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "files", label: "ไฟล์", count: mod.files.length, icon: <FileArchive className="w-3.5 h-3.5" /> },
    { id: "images", label: "รูปภาพ", count: mod.media.gallery.length, icon: <Images className="w-3.5 h-3.5" /> },
    { id: "bugs", label: "แจ้งบัค", count: bugs.length, icon: <Bug className="w-3.5 h-3.5" /> },
  ];

  const primaryFile = mod.files[0];

  return (
    <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-6 pb-12 space-y-6">
      {/* HEADER BANNER (Exact 1300x372 Nexus Proportions, Unobstructed) */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel rounded-2xl overflow-hidden"
      >
        <div className="relative w-full aspect-[1300/372] bg-black overflow-hidden">
          <Image
            src={mod.media.header}
            alt={mod.thaiTitle}
            fill
            priority
            sizes="(max-width: 1260px) 100vw, 1260px"
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-black/65 hover:bg-black/85 text-white border border-white/15 backdrop-blur-md transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ff77a9]" />
              หน้าแรก
            </Link>
          </div>
        </div>

        {/* Clean Formal Title + Tab Bar */}
        <div className="px-5 sm:px-6 py-4 bg-[#0d0a11] border-t border-white/[0.08] space-y-3.5">
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
            {mod.thaiTitle}
          </h1>

          <div
            role="tablist"
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] overflow-x-auto max-w-full"
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
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
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
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <span className={isActive ? "text-[#ff77a9]" : "opacity-75"}>
                      {tab.icon}
                    </span>
                    {tab.label}
                    {typeof tab.count === "number" && (
                      <span className="px-1.5 rounded text-[10px] font-mono bg-white/[0.08] text-white/85">
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* MAIN 2-COLUMN BODY */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-6 min-w-0">
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
                <article className="glass-panel rounded-2xl p-6 space-y-6">
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
                    <ol className="space-y-2 text-sm text-[#cbc5d0] list-decimal pl-5 marker:text-[#ff77a9] marker:font-semibold">
                      {mod.installSteps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>

                    <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10">
                      <code className="text-xs font-mono text-white/90 truncate">
                        {mod.installPathExample}
                      </code>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            mod.installPathExample,
                            "install-path",
                            "คัดลอก Path แล้ว"
                          )
                        }
                        className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/[0.06] hover:bg-[#ff4d8d]/25 text-white transition cursor-pointer"
                      >
                        {copiedKey === "install-path" ? (
                          <Check className="w-3.5 h-3.5 text-[#ff77a9]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-[#ff77a9]" />
                        )}
                        <span>{copiedKey === "install-path" ? "คัดลอกแล้ว" : "คัดลอก"}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#8a8293] leading-relaxed">
                      <strong className="text-[#cbc5d0]">การถอนการติดตั้ง:</strong>{" "}
                      {mod.uninstallNote}
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
                {mod.files.map((file) => (
                  <div key={file.id} className="glass-panel rounded-2xl p-6 space-y-4">
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
                      </div>
                    </div>

                    <div className="rounded-xl p-4 bg-white/[0.03] border border-white/[0.07] space-y-2 text-xs leading-relaxed">
                      <p className="text-[#d4ced9]">{file.installNote}</p>
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
                ))}
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
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-base font-bold text-white">
                      แจ้งปัญหา / บัค
                    </h2>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[#9c94a6]">
                      <DiscordLogo className="w-3.5 h-3.5 shrink-0" />
                      แจ้งเตือนผ่าน Discord
                    </span>
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

        {/* RIGHT STICKY SIDEBAR (4 cols): Formal Structured Metadata */}
        <aside className="lg:col-span-4 lg:sticky lg:top-20">
          <div className="glass-panel spot-card rounded-2xl p-5 space-y-5">
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

                {mod.files.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("files");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-1.5 text-[11px] font-semibold text-[#ff77a9] hover:text-[#ff4d8d] hover:underline transition cursor-pointer"
                  >
                    เลือกดาวน์โหลดไฟล์ทั้งหมด ({mod.files.length} เวอร์ชัน) →
                  </button>
                )}
              </div>
            )}

            {/* Formal Specs Table (Required fields with Real Brand Logos) */}
            <dl className="relative z-10 pt-4 border-t border-white/[0.08] divide-y divide-white/[0.06] text-xs">
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
