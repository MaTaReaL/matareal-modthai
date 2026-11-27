"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Crown,
  KeyRound,
  Lock,
  LogOut,
  MessageSquarePlus,
  ShieldCheck,
} from "lucide-react";
import { MODS } from "@/data/mods";
import type { SiteStats } from "@/lib/store";

interface AdminLoginClientProps {
  initialIsAdmin: boolean;
  stats: SiteStats;
  pendingRequestsCount: number;
}

export function AdminLoginClient({
  initialIsAdmin,
  stats,
  pendingRequestsCount,
}: AdminLoginClientProps) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }
      setIsAdmin(true);
      setKey("");
      router.refresh();
      window.location.reload();
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAdmin(false);
    router.refresh();
    window.location.reload();
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        <form
          onSubmit={handleLogin}
          className="glass-panel rounded-2xl p-6 sm:p-7 space-y-5 border border-white/12"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff4d8d]/15 border border-[#ff4d8d]/35 flex items-center justify-center text-[#ff77a9]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white">
                MaTaReaL Admin Access
              </h1>
              <p className="text-xs text-[#8a8293]">สำหรับผู้ดูแลระบบเท่านั้น</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#cbc5d0]">
              Admin Access Key
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#17131c] border border-white/12 focus-within:border-[#ff4d8d]">
              <KeyRound className="w-4 h-4 text-[#ff77a9] shrink-0" />
              <input
                type="password"
                required
                autoFocus
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="กรอกรหัสลับแอดมิน..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-[#7c7486] outline-none font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="text-xs text-rose-300 bg-rose-500/12 border border-rose-400/30 rounded-xl px-3.5 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-pink-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold cursor-pointer disabled:opacity-60"
          >
            {loading ? "กำลังตรวจสอบ..." : "เข้าสู่โหมดแอดมิน"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-6">
      <div className="glass-panel rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 border border-amber-300/30">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-300/40 flex items-center justify-center text-amber-300">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-white">
              แผงควบคุมแอดมิน — MaTaReaL
            </h1>
            <p className="text-xs text-emerald-300 inline-flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              เชื่อมต่อเซสชันเข้ารหัส HttpOnly เรียบร้อย
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-rose-600/80 border border-white/12 text-white inline-flex items-center gap-1.5 transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          ออกจากโหมดแอดมิน
        </button>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ["ออนไลน์ตอนนี้", `${stats.onlineNow} คน`],
          ["ผู้เข้าชมรวม", `${stats.totalVisits} ครั้ง`],
          ["ยอดโหลดรวม", `${stats.totalDownloads} ครั้ง`],
          ["คำขอเกมรอตรวจ", `${pendingRequestsCount} เกม`],
        ].map(([k, v]) => (
          <div key={k} className="glass-panel rounded-xl p-4">
            <div className="text-[11px] text-[#8a8293]">{k}</div>
            <div className="font-display text-lg font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>

      {/* Quick Admin Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/requests"
          className="glass-panel spot-card rounded-2xl p-5 flex items-center justify-between gap-4 border border-amber-300/25 hover:border-amber-300/60"
        >
          <div className="relative z-10 space-y-1">
            <div className="text-sm font-bold text-white inline-flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-[#ff77a9]" />
              จัดการบอร์ดเสนอทำม็อดภาษาไทย
            </div>
            <p className="text-xs text-[#9c94a6]">
              กดปุ่มเขียว (ทำเสร็จแล้ว) / ปุ่มฟ้า (กำลังทำ) / ปุ่มแดง (ทำไม่ได้) หรือลบสแปม
            </p>
          </div>
          <ArrowRight className="relative z-10 w-5 h-5 text-amber-300 shrink-0" />
        </Link>

        <div className="glass-panel rounded-2xl p-5 space-y-2.5">
          <div className="text-sm font-bold text-white">จัดการแท็บแจ้งบัคของแต่ละเกม</div>
          <div className="flex flex-wrap gap-2">
            {MODS.map((m) => (
              <Link
                key={m.slug}
                href={`/mods/${m.slug}`}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.05] hover:bg-[#ff4d8d]/20 border border-white/10 text-white transition"
              >
                {m.gameTitle} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
