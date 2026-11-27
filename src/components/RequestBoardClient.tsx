"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Crown,
  ExternalLink,
  Loader2,
  MessageSquarePlus,
  Search,
  Send,
  ThumbsUp,
  Trash2,
  Wrench,
  XCircle,
} from "lucide-react";
import type { ModRequestItem, ModRequestStatus } from "@/data/types";
import type { SteamLookupResult } from "@/app/api/steam-lookup/route";
import { MODS } from "@/data/mods";
import { SteamLogo } from "./BrandIcons";

interface RequestBoardClientProps {
  initialRequests: ModRequestItem[];
  isAdmin: boolean;
}

const STATUS_META: Record<
  ModRequestStatus,
  { badge: string; icon: React.ReactNode; label: string }
> = {
  รอพิจารณา: {
    badge: "bg-white/[0.07] text-[#d4ced9] border-white/15",
    icon: <Clock className="w-3 h-3" />,
    label: "รอพิจารณา",
  },
  กำลังทำ: {
    badge: "bg-sky-500/18 text-sky-300 border-sky-400/40",
    icon: <Wrench className="w-3 h-3" />,
    label: "กำลังทำม็อด",
  },
  ทำเสร็จแล้ว: {
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/45",
    icon: <CheckCircle2 className="w-3 h-3" />,
    label: "ทำเสร็จแล้ว",
  },
  ทำไม่ได้: {
    badge: "bg-rose-500/20 text-rose-300 border-rose-400/45",
    icon: <XCircle className="w-3 h-3" />,
    label: "ทำไม่ได้",
  },
};

export function RequestBoardClient({
  initialRequests,
  isAdmin,
}: RequestBoardClientProps) {
  const [requests, setRequests] = useState<ModRequestItem[]>(initialRequests);
  const [filter, setFilter] = useState<"ทั้งหมด" | ModRequestStatus>("ทั้งหมด");

  // Steam lookup & submission state
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [lookupResults, setLookupResults] = useState<SteamLookupResult[]>([]);
  const [selectedGame, setSelectedGame] = useState<SteamLookupResult | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Admin inline modal/reason state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [completeSlug, setCompleteSlug] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((prev) => (prev === msg ? null : prev)), 3500);
  };

  const handleSteamLookup = async () => {
    const q = query.trim();
    if (q.length < 2) {
      showToast("กรุณาพิมพ์ชื่อเกมหรือวางลิงก์ Steam");
      return;
    }
    setSearching(true);
    setLookupResults([]);
    try {
      const res = await fetch(`/api/steam-lookup?q=${encodeURIComponent(q)}`);
      const data = (await res.json()) as {
        results?: SteamLookupResult[];
        exact?: boolean;
        error?: string;
      };
      const items = data.results || [];
      if (items.length === 1 && data.exact) {
        setSelectedGame(items[0]);
        setLookupResults([]);
      } else if (items.length > 0) {
        setLookupResults(items);
        setSelectedGame(null);
      } else {
        showToast(data.error || "ไม่พบเกมบน Steam สามารถกดส่งชื่อเกมเองได้เลยครับ");
      }
    } catch {
      showToast("เชื่อมต่อ Steam ไม่สำเร็จ");
    } finally {
      setSearching(false);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const gameName = selectedGame?.name || query.trim();
    if (gameName.length < 2) {
      showToast("กรุณาระบุชื่อเกมหรือดึงข้อมูลจากลิงก์ Steam ก่อนส่ง");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameName,
          steamAppId: selectedGame?.appId,
          steamUrl: selectedGame?.steamUrl,
          headerImage: selectedGame?.headerImage,
          priceLabel: selectedGame?.priceLabel,
          releaseDate: selectedGame?.releaseDate,
          note: note.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "ส่งคำขอไม่สำเร็จ");
        return;
      }
      setRequests((prev) => [data.item, ...prev]);
      setQuery("");
      setNote("");
      setSelectedGame(null);
      setLookupResults([]);
      showToast(`เสนอเกม "${data.item.gameName}" เรียบร้อยแล้ว`);
    } catch {
      showToast("เกิดข้อผิดพลาดระหว่างส่งคำขอ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "vote", id }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "โหวตไม่สำเร็จ");
        return;
      }
      setRequests((prev) => prev.map((r) => (r.id === id ? data.item : r)));
      showToast("บันทึกโหวตสนับสนุนแล้ว");
    } finally {
      setBusyId(null);
    }
  };

  const handleAdminStatus = async (
    id: string,
    status: ModRequestStatus,
    adminReason?: string,
    modSlug?: string
  ) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "admin_status",
          id,
          status,
          adminReason,
          modSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "อัปเดตสถานะไม่สำเร็จ");
        return;
      }
      setRequests((prev) => prev.map((r) => (r.id === id ? data.item : r)));
      setRejectingId(null);
      setRejectReason("");
      setCompletingId(null);
      setCompleteSlug("");
      showToast(`เปลี่ยนสถานะเป็น "${status}" แล้ว`);
    } finally {
      setBusyId(null);
    }
  };

  const handleAdminDelete = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/requests?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        showToast("ลบรายการไม่สำเร็จ");
        return;
      }
      setRequests((prev) => prev.filter((r) => r.id !== id));
      showToast("ลบรายการเรียบร้อยแล้ว");
    } finally {
      setBusyId(null);
    }
  };

  const visibleRequests = useMemo(() => {
    const filtered =
      filter === "ทั้งหมด" ? requests : requests.filter((r) => r.status === filter);
    return [...filtered].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  }, [requests, filter]);

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-7 pb-16 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="space-y-1.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#9c94a6] hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ff77a9]" />
            กลับหน้าแรก
          </Link>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              บอร์ดเสนอทำม็อดภาษาไทย
            </h1>
            {isAdmin && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-300/40">
                <Crown className="w-3.5 h-3.5" />
                มุมมองแอดมิน
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#9c94a6]">
            พิมพ์ชื่อเกมหรือวางลิงก์ Steam เพื่อดึงข้อมูลเกมและเสนอให้ทำม็อดภาษาไทย
          </p>
        </div>
      </div>

      {/* Submit Game Request Form with Live Steam Lookup */}
      <form
        onSubmit={handleSubmitRequest}
        className="glass-panel spot-card rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-white">
          <MessageSquarePlus className="w-4 h-4 text-[#ff4d8d]" />
          <span>เสนอเกมใหม่</span>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-2.5">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#17131c] border border-white/12 focus-within:border-[#ff4d8d]">
            <SteamLogo className="w-4 h-4 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (selectedGame && e.target.value !== selectedGame.name) {
                  setSelectedGame(null);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !selectedGame) {
                  e.preventDefault();
                  handleSteamLookup();
                }
              }}
              placeholder="พิมพ์ชื่อเกมให้ตรง หรือวางลิงก์ Steam (เช่น https://store.steampowered.com/app/...)"
              className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-[#7c7486] outline-none"
            />
          </div>

          <button
            type="button"
            disabled={searching}
            onClick={handleSteamLookup}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#1b2838] hover:bg-[#23354a] border border-[#66c0f4]/40 text-white inline-flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-60 shrink-0"
          >
            {searching ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#66c0f4]" />
            ) : (
              <Search className="w-4 h-4 text-[#66c0f4]" />
            )}
            <span>ดึงข้อมูลจาก Steam</span>
          </button>
        </div>

        {/* Steam Search Picker Results */}
        {lookupResults.length > 0 && (
          <div className="relative z-10 space-y-2">
            <div className="text-[11px] text-[#9c94a6]">เลือกเกมที่ตรงจาก Steam:</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {lookupResults.map((item) => (
                <button
                  key={item.appId}
                  type="button"
                  onClick={() => {
                    setSelectedGame(item);
                    setQuery(item.name);
                    setLookupResults([]);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.04] hover:bg-[#ff4d8d]/15 border border-white/10 hover:border-[#ff4d8d]/50 text-left transition cursor-pointer"
                >
                  <div className="relative w-20 aspect-[460/215] rounded-lg overflow-hidden bg-black shrink-0">
                    <Image
                      src={item.headerImage}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{item.name}</div>
                    <div className="text-[11px] text-[#8a8293] mt-0.5">
                      {item.priceLabel || `AppID ${item.appId}`}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Steam Game Live Preview Card */}
        {selectedGame && (
          <div className="relative z-10 rounded-xl p-3 bg-white/[0.04] border border-[#66c0f4]/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-28 aspect-[460/215] rounded-lg overflow-hidden bg-black shrink-0 border border-white/15">
                <Image
                  src={selectedGame.headerImage}
                  alt={selectedGame.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate">
                  {selectedGame.name}
                </div>
                <div className="text-xs text-[#9c94a6] flex flex-wrap items-center gap-2 mt-0.5">
                  <span>AppID {selectedGame.appId}</span>
                  {selectedGame.priceLabel && (
                    <>
                      <span>•</span>
                      <span className="text-white font-semibold">{selectedGame.priceLabel}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedGame(null)}
              className="text-xs text-[#9c94a6] hover:text-white cursor-pointer"
            >
              เปลี่ยนเกม
            </button>
          </div>
        )}

        <div className="relative z-10 flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="หมายเหตุเพิ่มเติม (ไม่บังคับ เช่น อยากให้แปลภาคไหน / DLC ไหน)"
            className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-[#17131c] border border-white/12 text-white placeholder:text-[#7c7486] outline-none focus:border-[#ff4d8d]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-pink-primary px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? "กำลังส่ง..." : "ส่งเสนอเกม"}</span>
          </button>
        </div>
      </form>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap pb-1 sm:pb-0 w-full">
          {(["ทั้งหมด", "รอพิจารณา", "กำลังทำ", "ทำเสร็จแล้ว", "ทำไม่ได้"] as const).map(
            (st) => {
              const count =
                st === "ทั้งหมด"
                  ? requests.length
                  : requests.filter((r) => r.status === st).length;
              const active = filter === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilter(st)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    active
                      ? "bg-[#ff4d8d]/22 border-[#ff4d8d]/50 text-white"
                      : "bg-white/[0.03] border-white/[0.08] text-[#9c94a6] hover:text-white"
                  }`}
                >
                  {st} <span className="font-mono opacity-75 ml-1">{count}</span>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Request Cards List */}
      <div className="space-y-3.5">
        {visibleRequests.length === 0 ? (
          <div className="glass-panel rounded-2xl p-10 text-center text-xs text-[#8a8293]">
            ยังไม่มีรายการเกมในหมวดนี้ — พิมพ์ชื่อเกมหรือวางลิงก์ Steam ด้านบนเพื่อเสนอเกมแรกได้เลยครับ
          </div>
        ) : (
          visibleRequests.map((req) => {
            const meta = STATUS_META[req.status];
            return (
              <div
                key={req.id}
                className={`glass-panel spot-card rounded-2xl p-4 sm:p-5 space-y-4 ${
                  req.status === "ทำเสร็จแล้ว"
                    ? "border-emerald-400/30"
                    : req.status === "ทำไม่ได้"
                      ? "border-rose-400/25"
                      : ""
                }`}
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                    {req.headerImage && (
                      <div className="relative w-full sm:w-44 aspect-[460/215] rounded-xl overflow-hidden bg-black border border-white/12 shrink-0">
                        <Image
                          src={req.headerImage}
                          alt={req.gameName}
                          fill
                          sizes="(max-width: 640px) 100vw, 176px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${meta.badge}`}
                        >
                          {meta.icon}
                          {meta.label}
                        </span>
                        <span className="text-[11px] text-[#8a8293] font-mono">
                          {req.id}
                        </span>
                        <span className="text-[11px] text-[#8a8293]">• {req.createdAt}</span>
                      </div>

                      <h2 className="font-display text-base sm:text-lg font-bold text-white">
                        {req.gameName}
                      </h2>

                      {req.note && (
                        <p className="text-xs text-[#cbc5d0] leading-relaxed">{req.note}</p>
                      )}

                      {req.adminReason && (
                        <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-400/25 rounded-lg px-3 py-1.5 inline-block">
                          หมายเหตุแอดมิน: {req.adminReason}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                        {req.steamUrl && (
                          <a
                            href={req.steamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#66c0f4] hover:underline font-medium"
                          >
                            <SteamLogo className="w-3.5 h-3.5" />
                            <span>ดูบน Steam</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {req.modSlug && (
                          <Link
                            href={`/mods/${req.modSlug}`}
                            className="inline-flex items-center gap-1.5 text-emerald-300 hover:underline font-bold"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ไปหน้าดาวน์โหลดม็อดไทย →</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Public Upvote Button */}
                  <button
                    type="button"
                    disabled={busyId === req.id}
                    onClick={() => handleVote(req.id)}
                    className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#ff4d8d]/20 border border-white/12 hover:border-[#ff4d8d]/50 text-xs font-bold text-white transition cursor-pointer disabled:opacity-50"
                  >
                    <ThumbsUp className="w-4 h-4 text-[#ff77a9]" />
                    <span className="tabular-nums">{req.votes || 1}</span>
                    <span className="text-[#9c94a6] font-normal">โหวต</span>
                  </button>
                </div>

                {/* ADMIN-ONLY ACTION BAR (Hidden completely for normal users!) */}
                {isAdmin && (
                  <div className="relative z-10 pt-3.5 border-t border-amber-300/20 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-amber-200 inline-flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5" />
                        จัดการสถานะ (แอดมิน):
                      </span>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* GREEN BUTTON: Done */}
                        <button
                          type="button"
                          disabled={busyId === req.id}
                          onClick={() => {
                            setCompletingId(completingId === req.id ? null : req.id);
                            setCompleteSlug(req.modSlug || "");
                            setRejectingId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ทำเสร็จแล้ว
                        </button>

                        {/* BLUE BUTTON: In Progress */}
                        <button
                          type="button"
                          disabled={busyId === req.id}
                          onClick={() => handleAdminStatus(req.id, "กำลังทำ", "")}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Wrench className="w-3.5 h-3.5" />
                          กำลังทำ
                        </button>

                        {/* RED BUTTON: Cannot Do */}
                        <button
                          type="button"
                          disabled={busyId === req.id}
                          onClick={() => {
                            setRejectingId(rejectingId === req.id ? null : req.id);
                            setRejectReason(req.adminReason || "");
                            setCompletingId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          ทำไม่ได้
                        </button>

                        {/* Reset to Pending */}
                        {req.status !== "รอพิจารณา" && (
                          <button
                            type="button"
                            disabled={busyId === req.id}
                            onClick={() => handleAdminStatus(req.id, "รอพิจารณา", "", "")}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.07] hover:bg-white/[0.14] text-white/90 transition cursor-pointer"
                          >
                            รีเซ็ต
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          type="button"
                          disabled={busyId === req.id}
                          onClick={() => handleAdminDelete(req.id)}
                          aria-label="ลบรายการ"
                          className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-rose-600 text-white/80 hover:text-white transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Green Confirmation (Optional link to finished mod page) */}
                    {completingId === req.id && (
                      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                        <select
                          value={completeSlug}
                          onChange={(e) => setCompleteSlug(e.target.value)}
                          className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg text-xs bg-[#17131c] border border-white/15 text-white outline-none"
                        >
                          <option value="">ไม่แนบลิงก์หน้าม็อด (แค่ขึ้นสถานะทำเสร็จแล้ว)</option>
                          {MODS.map((m) => (
                            <option key={m.slug} value={m.slug}>
                              เชื่อมไปหน้าม็อด: {m.gameTitle}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            handleAdminStatus(req.id, "ทำเสร็จแล้ว", "", completeSlug)
                          }
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                        >
                          ยืนยัน “ทำเสร็จแล้ว”
                        </button>
                      </div>
                    )}

                    {/* Inline Red Confirmation (Optional reason why it can't be done) */}
                    {rejectingId === req.id && (
                      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-400/30">
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="เหตุผลที่ทำไม่ได้ (ไม่บังคับ เช่น ติดระบบป้องกัน / ไฟล์เข้ารหัส)"
                          className="flex-1 min-w-[220px] px-3 py-1.5 rounded-lg text-xs bg-[#17131c] border border-white/15 text-white placeholder:text-[#7c7486] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleAdminStatus(req.id, "ทำไม่ได้", rejectReason, "")
                          }
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                        >
                          ยืนยัน “ทำไม่ได้”
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

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
