"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  File,
  FileArchive,
  FileCode,
  FileImage,
  FileText,
  Folder,
  FolderOpen,
  FolderTree,
  Search,
  X,
} from "lucide-react";
import type { ArchiveFileItem } from "@/data/archiveTrees";

interface TreeNode {
  name: string;
  fullPath: string;
  isDir: boolean;
  size: number;
  children: TreeNode[];
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function buildTree(entries: ArchiveFileItem[]): TreeNode[] {
  const root: TreeNode = { name: "", fullPath: "", isDir: true, size: 0, children: [] };

  for (const item of entries) {
    const parts = item.p.split("/").filter(Boolean);
    let curr = root;
    let accPath = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      accPath = accPath ? `${accPath}/${part}` : part;
      const isLast = i === parts.length - 1;

      if (isLast) {
        curr.children.push({
          name: part,
          fullPath: accPath,
          isDir: false,
          size: item.s,
          children: [],
        });
      } else {
        let dir = curr.children.find((c) => c.isDir && c.name === part);
        if (!dir) {
          dir = {
            name: part,
            fullPath: accPath,
            isDir: true,
            size: 0,
            children: [],
          };
          curr.children.push(dir);
        }
        curr = dir;
      }
    }
  }

  // Recursively compute directory sizes and sort (dirs first, then alphabetical)
  const finalize = (node: TreeNode): number => {
    if (!node.isDir) return node.size;
    let total = 0;
    for (const c of node.children) {
      total += finalize(c);
    }
    node.size = total;
    node.children.sort((a, b) => {
      if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });
    return total;
  };

  finalize(root);
  return root.children;
}

function getFileIcon(name: string) {
  const lower = name.toLowerCase();
  if (/\.(zip|7z|pak|utoc|ucas|resources|lnk|fdata)$/.test(lower)) {
    return <FileArchive className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
  }
  if (/\.(png|jpg|jpeg|webp|dds|tga|ico)$/.test(lower)) {
    return <FileImage className="w-3.5 h-3.5 text-sky-300 shrink-0" />;
  }
  if (/\.(dll|exe|cs|json|ini|cfg|xml|ps1)$/.test(lower)) {
    return <FileCode className="w-3.5 h-3.5 text-[#ff77a9] shrink-0" />;
  }
  if (/\.(txt|md|csv|ttf|otf)$/.test(lower)) {
    return <FileText className="w-3.5 h-3.5 text-emerald-300 shrink-0" />;
  }
  return <File className="w-3.5 h-3.5 text-[#9c94a6] shrink-0" />;
}

interface ArchivePreviewModalProps {
  open: boolean;
  onClose: () => void;
  fileName: string;
  version: string;
  compressedSize: string;
  entries: ArchiveFileItem[];
}

export function ArchivePreviewModal({
  open,
  onClose,
  fileName,
  version,
  compressedSize,
  entries,
}: ArchivePreviewModalProps) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const allDirPaths = useMemo(() => {
    const dirs = new Set<string>();
    for (const item of entries) {
      const parts = item.p.split("/").filter(Boolean);
      let acc = "";
      for (let i = 0; i < parts.length - 1; i++) {
        acc = acc ? `${acc}/${parts[i]}` : parts[i];
        dirs.add(acc);
      }
    }
    return dirs;
  }, [entries]);

  // Expand top 2 levels by default when modal opens
  useEffect(() => {
    if (!open) return;
    setQuery("");
    const initial = new Set<string>();
    for (const d of allDirPaths) {
      if (d.split("/").length <= 2) {
        initial.add(d);
      }
    }
    setExpanded(initial);
  }, [open, allDirPaths]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => e.p.toLowerCase().includes(q));
  }, [entries, query]);

  const tree = useMemo(() => buildTree(filteredEntries), [filteredEntries]);
  const totalUnpacked = useMemo(
    () => entries.reduce((sum, e) => sum + e.s, 0),
    [entries]
  );

  const toggleDir = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const renderNode = (node: TreeNode, depth: number) => {
    const isFiltering = query.trim().length > 0;
    const isOpen = isFiltering || expanded.has(node.fullPath);

    if (node.isDir) {
      return (
        <div key={node.fullPath}>
          <button
            type="button"
            onClick={() => toggleDir(node.fullPath)}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            className="w-full flex items-center justify-between gap-2 py-1.5 pr-3 rounded-lg hover:bg-white/[0.06] text-left transition cursor-pointer"
          >
            <span className="flex items-center gap-1.5 min-w-0">
              {isOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#8a8293] shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#8a8293] shrink-0" />
              )}
              {isOpen ? (
                <FolderOpen className="w-3.5 h-3.5 text-[#ff77a9] shrink-0" />
              ) : (
                <Folder className="w-3.5 h-3.5 text-[#ff77a9]/80 shrink-0" />
              )}
              <span className="text-xs font-semibold text-white truncate">
                {node.name}/
              </span>
              <span className="text-[10px] text-[#7c7486] shrink-0">
                ({node.children.length})
              </span>
            </span>
            <span className="text-[11px] font-mono text-[#8a8293] shrink-0 tabular-nums">
              {formatBytes(node.size)}
            </span>
          </button>
          {isOpen && (
            <div className="border-l border-white/[0.06] ml-3.5">
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.fullPath}
        style={{ paddingLeft: `${depth * 16 + 24}px` }}
        className="flex items-center justify-between gap-2 py-1.5 pr-3 rounded-lg hover:bg-white/[0.04] transition"
      >
        <span className="flex items-center gap-2 min-w-0">
          {getFileIcon(node.name)}
          <span className="text-xs font-mono text-[#d8d2de] truncate" title={node.fullPath}>
            {node.name}
          </span>
        </span>
        <span className="text-[11px] font-mono text-[#8a8293] shrink-0 tabular-nums">
          {formatBytes(node.size)}
        </span>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {open && (
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
            className="w-full max-w-2xl max-h-[84vh] rounded-2xl bg-[#100d13] border border-white/15 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3.5 border-b border-white/[0.08] flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-[#ff77a9] shrink-0" />
                  <h3 className="font-display text-sm sm:text-base font-bold text-white truncate">
                    โครงสร้างไฟล์ใน {fileName}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8a8293]">
                  <span>{version}</span>
                  <span>•</span>
                  <span>{entries.length.toLocaleString("en-US")} ไฟล์</span>
                  <span>•</span>
                  <span>บีบอัด {compressedSize}</span>
                  <span>•</span>
                  <span>แตกไฟล์แล้ว {formatBytes(totalUnpacked)}</span>
                </div>
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

            {/* Search + Expand/Collapse Toolbar */}
            <div className="px-4 sm:px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] flex flex-wrap items-center justify-between gap-2">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 text-[#8a8293] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ค้นหาชื่อไฟล์หรือโฟลเดอร์ข้างใน..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[#17131c] border border-white/10 text-white placeholder:text-[#7c7486] outline-none focus:border-[#ff4d8d]"
                />
              </div>

              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setExpanded(new Set(allDirPaths))}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#cbc5d0] hover:text-white transition cursor-pointer"
                >
                  กางทั้งหมด
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(new Set())}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#cbc5d0] hover:text-white transition cursor-pointer"
                >
                  พับทั้งหมด
                </button>
              </div>
            </div>

            {/* Tree Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-0.5">
              {tree.length === 0 ? (
                <div className="py-10 text-center text-xs text-[#8a8293]">
                  ไม่พบไฟล์ที่ตรงกับ “{query}”
                </div>
              ) : (
                tree.map((node) => renderNode(node, 0))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
