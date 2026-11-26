"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { NexusModsLogo } from "./BrandIcons";
import { SearchModal } from "./SearchModal";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#070609]/85 backdrop-blur-2xl">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
          {/* Brand Logo (Crimson Gold Seal B) */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#ff4d8d]/50 group-hover:ring-[#ff4d8d] transition-all duration-300">
              <Image
                src={SITE_CONFIG.logoPath}
                alt="MaTaReaL ม็อดไทย"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <span className="font-display font-bold text-base tracking-tight text-white">
              {SITE_CONFIG.nameTh}
            </span>
          </Link>

          {/* Compact Search Trigger */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center justify-between gap-3 flex-1 max-w-sm px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-[#ff4d8d]/35 text-xs text-[#9c94a6] transition cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#ff77a9] shrink-0" />
              <span>ค้นหาม็อด...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono text-[10px] text-white/60">
              Ctrl K
            </kbd>
          </button>

          {/* Right Actions: Mobile Search + Permanent Nexus Mods Profile Link */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="ค้นหา"
              className="md:hidden w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition"
            >
              <Search className="w-4 h-4" />
            </button>

            <a
              href={SITE_CONFIG.nexusProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-white/[0.05] hover:bg-[#D97B29]/20 border border-white/12 hover:border-[#F5A64B]/55 transition"
            >
              <NexusModsLogo className="w-4 h-4 shrink-0" />
              <span>Nexus Mods</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
