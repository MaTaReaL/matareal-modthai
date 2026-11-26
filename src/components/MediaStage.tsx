"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { GalleryImage } from "@/data/types";

interface MediaStageProps {
  images: GalleryImage[];
  initialIndex?: number;
}

export function MediaStage({ images, initialIndex = 0 }: MediaStageProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeIndex = Math.min(activeIndex, Math.max(0, images.length - 1));
  const current = images[safeIndex];

  const step = useCallback(
    (dir: number) => {
      setActiveIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, step]);

  if (!images.length) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center text-xs text-[#8a8293]">
        ไม่มีรูปภาพเพิ่มเติม
      </div>
    );
  }

  return (
    <>
      <div className="glass-panel rounded-2xl p-2.5 sm:p-3 space-y-2.5">
        {/* Main 16:9 Interactive Stage */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative w-full h-full cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 820px"
                className="object-cover"
                priority={safeIndex === 0}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/75 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="ภาพก่อนหน้า"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-[#ff4d8d] text-white backdrop-blur-md border border-white/15 flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="ภาพถัดไป"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-[#ff4d8d] text-white backdrop-blur-md border border-white/15 flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="ขยายเต็มจอ"
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 hover:bg-[#ff4d8d] text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-3 pointer-events-none">
            <span className="text-xs text-white/95 truncate">{current.caption}</span>
            <span className="shrink-0 font-mono text-[11px] px-2 py-0.5 rounded bg-black/65 text-white/90">
              {safeIndex + 1}/{images.length}
            </span>
          </div>
        </div>

        {/* All Thumbnails Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {images.map((img, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={`${img.src}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer focus:outline-none ${
                  isSelected
                    ? "border-[#ff4d8d] opacity-100"
                    : "border-white/10 opacity-55 hover:opacity-95"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="ปิด"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff4d8d] text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="ภาพก่อนหน้า"
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#ff4d8d] text-white flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="ภาพถัดไป"
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#ff4d8d] text-white flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden border border-white/15 bg-black"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </motion.div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 text-xs text-white/90"
            >
              <span>{current.caption}</span>
              <span className="font-mono opacity-75">
                {safeIndex + 1}/{images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
