"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, LogOut, MessageSquarePlus, ShieldCheck } from "lucide-react";

export function AdminBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    fetch("/api/admin/auth", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { isAdmin?: boolean }) => {
        if (active && d.isAdmin) setIsAdmin(true);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAdmin(false);
    router.refresh();
    window.location.reload();
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#881337] via-[#be123c] to-[#9f1239] border-b border-amber-300/35 text-white">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold">
          <Crown className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>โหมดแอดมิน (MaTaReaL)</span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-black/30 text-amber-200 border border-amber-300/30">
            <ShieldCheck className="w-3 h-3" />
            มองเห็นเฉพาะคุณ
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/requests"
            className="inline-flex items-center gap-1 hover:text-amber-200 font-semibold transition"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            จัดการคำขอเกม
          </Link>
          <Link
            href="/admin"
            className="hidden sm:inline hover:text-amber-200 font-semibold transition"
          >
            แผงแอดมิน
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/30 hover:bg-black/50 text-white/95 font-semibold transition cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            ออก
          </button>
        </div>
      </div>
    </div>
  );
}
