"use client";

import { useEffect, useRef } from "react";

export function AmbientBackdrop() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Never run mouse-tracking RAF loop on touch phones / iPads (saves 100% mobile CPU/GPU)
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const tick = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.14;
      currentY += dy * 0.14;
      el.style.transform = `translate3d(${currentX - 280}px, ${currentY - 280}px, 0)`;

      // Stop RAF automatically once settled so idle desktop uses 0% GPU
      if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";

      const card = (e.target as HTMLElement | null)?.closest?.(".spot-card") as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Responsive Subtle AAA Marvel-Style Ensemble Backdrop (<picture> fetches ONLY 1 file per device!) */}
      <div className="backdrop-breathe absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet="/brand/bg-landscape.webp" />
          <img
            src="/brand/bg-portrait.webp"
            alt=""
            decoding="async"
            fetchPriority="low"
            className="w-full h-full object-cover object-top md:object-center opacity-[0.50] md:opacity-[0.60] saturate-[0.80]"
          />
        </picture>
      </div>

      {/* Smooth Obsidian-Rose Veil so text and cards always stay razor-sharp & uncluttered */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 25%, rgba(7,6,9,0.40) 0%, rgba(7,6,9,0.72) 60%, rgba(7,6,9,0.92) 100%)",
        }}
      />

      {/* GPU-Light Pure Radial-Gradient Aurora Orbs (ZERO heavy CSS filter:blur!) */}
      <div
        className="aurora-orb-1 absolute -top-56 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[12%] w-[560px] md:w-[980px] h-[420px] md:h-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,77,141,0.22) 0%, rgba(217,30,54,0.11) 34%, transparent 70%)",
        }}
      />

      <div
        className="aurora-orb-2 hidden sm:block absolute top-[18%] -right-48 w-[760px] h-[760px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(217,30,54,0.16) 0%, rgba(255,119,169,0.08) 38%, transparent 68%)",
        }}
      />

      <div
        className="aurora-orb-3 hidden lg:block absolute -bottom-56 -left-40 w-[780px] h-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,77,141,0.14) 0%, rgba(217,30,54,0.06) 40%, transparent 70%)",
        }}
      />

      {/* Subtle Crisp Dot Grid */}
      <div className="absolute inset-0 bg-subtle-grid opacity-35 md:opacity-45" />

      {/* Interactive Cursor-Following Pink/Crimson Halo (Desktop mouse only, zero CSS blur!) */}
      <div
        ref={cursorRef}
        className="hidden lg:block fixed top-0 left-0 w-[560px] h-[560px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,141,0.16) 0%, rgba(217,30,54,0.07) 34%, transparent 68%)",
        }}
      />
    </div>
  );
}
