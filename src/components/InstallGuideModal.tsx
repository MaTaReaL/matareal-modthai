"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  File,
  FileCheck2,
  Folder,
  FolderOpen,
  FolderTree,
  Gamepad2,
  Info,
  PackageCheck,
  X,
} from "lucide-react";
import type { InstallTreeNode, ModInstallGuide } from "@/data/installGuides";

interface InstallGuideModalProps {
  open: boolean;
  onClose: () => void;
  gameTitle: string;
  guide: ModInstallGuide;
}

export function InstallGuideModal({
  open,
  onClose,
  gameTitle,
  guide,
}: InstallGuideModalProps) {
  const [platIdx, setPlatIdx] = useState(0);

  useEffect(() => {
    if (open) setPlatIdx(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const activePlatform = guide.platforms[Math.min(platIdx, guide.platforms.length - 1)];

  const renderNode = (node: InstallTreeNode, depth: number) => {
    const isMod = node.role === "mod";
    const isOverwrite = node.role === "overwrite";
    const isAnchor = node.role === "anchor";

    // Intuitive color semantics:
    // Sky = existing game landmark | Emerald Green = drop/add mod here | Amber Gold = merge/replace safely (never red!)
    const rowBg = isMod
      ? "bg-emerald-500/12 border-emerald-400/30"
      : isOverwrite
      ? "bg-amber-400/10 border-amber-400/35"
      : "bg-white/[0.02] border-transparent";

    const badgeClass = isMod
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/45"
      : isOverwrite
      ? "bg-amber-400/20 text-amber-200 border-amber-400/45"
      : "bg-sky-500/15 text-sky-300 border-sky-400/35";

    return (
      <div key={`${depth}-${node.name}`} className="space-y-1">
        <div
          style={{ paddingLeft: `${depth * 18 + 10}px` }}
          className={`flex flex-wrap items-center justify-between gap-2 py-2 pr-3 rounded-lg border ${rowBg}`}
        >
          <span className="flex items-center gap-2 min-w-0">
            {node.type === "dir" ? (
              isMod || isOverwrite ? (
                <FolderOpen
                  className={`w-4 h-4 shrink-0 ${
                    isMod ? "text-emerald-300" : "text-amber-300"
                  }`}
                />
              ) : (
                <Folder className="w-4 h-4 text-sky-300/80 shrink-0" />
              )
            ) : isAnchor ? (
              <Gamepad2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
            ) : isMod || isOverwrite ? (
              <FileCheck2
                className={`w-3.5 h-3.5 shrink-0 ${
                  isMod ? "text-emerald-300" : "text-amber-300"
                }`}
              />
            ) : (
              <File className="w-3.5 h-3.5 text-[#8a8293] shrink-0" />
            )}

            <span
              className={`text-xs font-mono truncate ${
                isMod || isOverwrite
                  ? "font-bold text-white"
                  : isAnchor
                  ? "font-semibold text-sky-200"
                  : "text-[#cbc5d0]"
              }`}
            >
              {node.name}
            </span>

            {node.note && (
              <span className="text-[10px] text-[#9c94a6] hidden sm:inline">
                ({node.note})
              </span>
            )}
          </span>

          {node.badge && (
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border whitespace-nowrap shrink-0 ${badgeClass}`}
            >
              {node.badge}
            </span>
          )}
        </div>

        {node.children && node.children.length > 0 && (
          <div className="border-l border-white/[0.08] ml-4 space-y-1">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {open && activePlatform && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#100d13] border border-white/15 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header with single X close button */}
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/[0.08] flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h3 className="font-display text-sm sm:text-base font-bold text-white truncate">
                    ตำแหน่งวางไฟล์ — {gameTitle}
                  </h3>
                </div>
                <p className="text-[11px] text-[#9c94a6]">{guide.zipSourceHint}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="ปิด"
                className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center shrink-0 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Tabs (if multiple platforms) */}
            {guide.platforms.length > 1 && (
              <div className="px-4 sm:px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] flex flex-wrap items-center gap-2">
                {guide.platforms.map((p, idx) => {
                  const active = idx === platIdx;
                  return (
                    <button
                      key={p.platformLabel}
                      type="button"
                      onClick={() => setPlatIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                        active
                          ? "bg-emerald-500/20 border-emerald-400/50 text-white"
                          : "bg-white/[0.04] border-white/10 text-[#9c94a6] hover:text-white"
                      }`}
                    >
                      {p.platformLabel}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Step 1: Exact items to drag */}
              <div className="rounded-xl p-3.5 bg-emerald-500/[0.06] border border-emerald-400/25 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-white">
                    <PackageCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ไฟล์ที่ต้องลากไปวาง</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/35 whitespace-nowrap">
                    {activePlatform.dragSummary}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activePlatform.dragItems.map((it) => (
                    <span
                      key={it.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-xs font-semibold border whitespace-nowrap ${
                        it.action === "overwrite"
                          ? "bg-amber-400/15 text-amber-200 border-amber-400/40"
                          : "bg-emerald-500/15 text-emerald-200 border-emerald-400/40"
                      }`}
                    >
                      {it.type === "dir" ? (
                        <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                      )}
                      {it.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step 2: How to open game folder */}
              <div className="rounded-xl p-3.5 bg-white/[0.03] border border-white/[0.08] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>วิธีเปิดโฟลเดอร์เกม ({activePlatform.platformLabel})</span>
                </div>
                <p className="text-[#cbc5d0] leading-relaxed">{activePlatform.howToOpen}</p>
              </div>

              {/* Step 3: Visual Destination Folder Tree */}
              <div className="rounded-xl p-3.5 sm:p-4 bg-black/45 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.07] text-xs font-semibold text-white">
                  <FolderOpen className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="truncate">{activePlatform.rootFolderHint}</span>
                </div>

                <div className="space-y-1.5">
                  {activePlatform.tree.map((node) => renderNode(node, 0))}
                </div>
              </div>

              {/* Intuitive Color Legend (Sky = Game Landmark, Green = Add Mod, Amber = Merge/Replace Safely) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#9c94a6]">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-sm bg-sky-400/75" />
                  จุดสังเกตในโฟลเดอร์เกม
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                  วางไฟล์/โฟลเดอร์ม็อดเพิ่มตรงนี้
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                  วางทับ / รวมเข้ากับโฟลเดอร์เดิม
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
