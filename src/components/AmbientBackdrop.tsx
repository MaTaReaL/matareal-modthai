"use client";

import { useEffect, useRef } from "react";

export function AmbientBackdrop() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";

      const card = (e.target as HTMLElement | null)?.closest?.(".spot-card") as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      el.style.transform = `translate3d(${currentX - 280}px, ${currentY - 280}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Responsive Subtle AAA Marvel-Style Ensemble Backdrop (Landscape on Desktop, Portrait on Mobile) */}
      <div className="backdrop-breathe absolute inset-0">
        <img
          src="/brand/bg-landscape.webp"
          alt=""
          className="hidden md:block w-full h-full object-cover object-center opacity-[0.62] saturate-[0.82]"
        />
        <img
          src="/brand/bg-portrait.webp"
          alt=""
          className="block md:hidden w-full h-full object-cover object-top opacity-[0.58] saturate-[0.82]"
        />
      </div>

      {/* Smooth Obsidian-Rose Veil so text and cards always stay razor-sharp & uncluttered */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 25%, rgba(7,6,9,0.34) 0%, rgba(7,6,9,0.68) 60%, rgba(7,6,9,0.90) 100%)",
        }}
      />

      {/* Top Animated Sakura-Pink & Crimson Aurora */}
      <div
        className="aurora-orb-1 absolute -top-44 left-[18%] w-[780px] h-[460px] rounded-full blur-[125px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,141,0.34) 0%, rgba(217,30,54,0.18) 48%, transparent 74%)",
        }}
      />

      {/* Right Drifting Crimson-Rose Glow */}
      <div
        className="aurora-orb-2 absolute top-[22%] -right-40 w-[640px] h-[640px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(217,30,54,0.24) 0%, rgba(255,119,169,0.12) 45%, transparent 72%)",
        }}
      />

      {/* Lower Left Soft Pink Mist */}
      <div
        className="aurora-orb-3 absolute -bottom-48 -left-32 w-[620px] h-[520px] rounded-full blur-[135px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,141,0.20) 0%, rgba(217,30,54,0.10) 50%, transparent 75%)",
        }}
      />

      {/* Subtle Crisp Dot Grid */}
      <div className="absolute inset-0 bg-subtle-grid opacity-45" />

      {/* Interactive Cursor-Following Pink/Crimson Halo */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[560px] h-[560px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,141,0.18) 0%, rgba(217,30,54,0.08) 38%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
}
