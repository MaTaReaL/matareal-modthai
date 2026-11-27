"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ExternalLink, MessageSquarePlus } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { NexusModsLogo, ThaiFlagIcon } from "./BrandIcons";
import { SearchModal } from "./SearchModal";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Match physical KeyK (works on BOTH English & Thai keyboards!) + "/" shortcut
      if ((e.metaKey || e.ctrlKey) && (e.code === "KeyK" || e.key.toLowerCase() === "k")) {
        e.preventDefault();
        e.stopPropagation();
        setSearchOpen((prev) => !prev);
        return;
      }

      const tag = (e.target as HTMLElement | null)?.tagName;
      const isEditable =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (e.target as HTMLElement | null)?.isContentEditable;

      if (!isEditable && !e.ctrlKey && !e.metaKey && !e.altKey && e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#070609]/85 backdrop-blur-2xl">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-3">
          {/* Brand Logo (Crimson Gold Seal B) + Thai Flag + Free */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
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
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base tracking-tight text-white">
                  {SITE_CONFIG.nameTh}
                </span>
                <ThaiFlagIcon className="w-5 h-3.5" />
                <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-400/35">
                  ฟรี
                </span>
              </div>
            </Link>

            <Link
              href="/requests"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                pathname === "/requests"
                  ? "bg-[#ff4d8d]/20 border-[#ff4d8d]/50 text-white"
                  : "bg-white/[0.03] border-white/[0.08] text-[#cbc5d0] hover:text-white hover:border-[#ff4d8d]/40"
              }`}
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#ff77a9]" />
              <span>เสนอม็อดไทย</span>
            </Link>
          </div>

          {/* Search Trigger (Press "/" or click — reliable on Thai/EN keyboards in Brave) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center justify-between gap-3 flex-1 max-w-xs px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-[#ff4d8d]/35 text-xs text-[#9c94a6] transition cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#ff77a9] shrink-0" />
              <span>ค้นหาม็อด...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono text-[10px] text-white/65">
              /
            </kbd>
          </button>

          {/* Right Actions: Mobile Links + SINGLE Top-Right Nexus Mods Button WITH Username */}
          <div className="flex items-center gap-2">
            <Link
              href="/requests"
              aria-label="เสนอม็อดไทย"
              className="sm:hidden w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#ff77a9]"
            >
              <MessageSquarePlus className="w-4 h-4" />
            </Link>

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
              title="Nexus Mods (MaTaReaL1) — ม็อดไทยและม็อดอื่นๆ ของผม"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-white/[0.05] hover:bg-[#D97B29]/20 border border-white/12 hover:border-[#F5A64B]/55 transition shrink-0"
            >
              <NexusModsLogo className="w-4 h-4 shrink-0" />
              <span>Nexus Mods ({SITE_CONFIG.nexusUsername})</span>
              <span className="hidden xl:inline text-[11px] font-normal text-[#bdb5c5]">
                • ม็อดไทยและม็อดอื่นๆ ของผม
              </span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
