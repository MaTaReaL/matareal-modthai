"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight, ExternalLink } from "lucide-react";
import { MODS } from "@/data/mods";
import { SITE_CONFIG } from "@/data/site";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MODS;
    return MODS.filter(
      (m) =>
        m.gameTitle.toLowerCase().includes(q) ||
        m.thaiTitle.toLowerCase().includes(q) ||
        m.shortDescription.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.specs.aiModel.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-[#100d13] border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
              <Search className="w-4 h-4 text-[#ff4d8d] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="พิมพ์ชื่อเกมหรือม็อดภาษาไทย..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#7c7486] outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {results.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <p className="text-sm text-[#a69eb0]">ไม่พบม็อดที่ตรงกับ “{query}” บนเว็บนี้</p>
                  <a
                    href={SITE_CONFIG.nexusProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff77a9] hover:text-[#ff4d8d]"
                  >
                    ลองค้นหาในโปรไฟล์ Nexus Mods ของ MaTaReaL1
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                results.map((mod) => (
                  <Link
                    key={mod.slug}
                    href={`/mods/${mod.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-[#ff4d8d]/30 transition group"
                  >
                    <div className="relative w-20 aspect-video rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={mod.media.cover}
                        alt={mod.gameTitle}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate group-hover:text-[#ff77a9] transition">
                        {mod.gameTitle}
                      </div>
                      <div className="text-xs text-[#8a8293] truncate">
                        {mod.specs.version} • {mod.specs.fileSize} • {mod.specs.aiModel}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8a8293] group-hover:text-[#ff4d8d] group-hover:translate-x-0.5 transition" />
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
