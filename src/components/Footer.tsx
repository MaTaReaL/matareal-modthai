import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ShieldAlert } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { FacebookLogo, NexusModsLogo } from "./BrandIcons";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#070609]/95 mt-12 sm:mt-16">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-7 sm:py-8 space-y-5">
        {/* Official Anti-Piracy & Distribution Credit Notice */}
        <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.025] border border-white/[0.08] flex items-start gap-3 text-xs leading-relaxed text-[#bdb5c5]">
          <ShieldAlert className="w-4 h-4 text-[#ff4d8d] shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="text-white/95 font-medium">
              ม็อดภาษาไทยทุกชิ้นแจกฟรี ไม่มีขาย และไม่สนับสนุนเกมเถื่อน
            </p>
            <p>
              เผยแพร่อย่างเป็นทางการเฉพาะบนเว็บไซต์นี้, บัญชี{" "}
              <a
                href={SITE_CONFIG.nexusProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 align-middle text-[#F5A64B] hover:underline font-semibold"
              >
                <NexusModsLogo className="w-3.5 h-3.5 inline-block" />
                Nexus Mods ({SITE_CONFIG.nexusUsername})
              </a>{" "}
              และ{" "}
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 align-middle text-[#60A5FA] hover:underline font-semibold"
              >
                <FacebookLogo className="w-3.5 h-3.5 inline-block" />
                Facebook ({SITE_CONFIG.facebookName})
              </a>{" "}
              เท่านั้น หากพบเห็นที่อื่นและไม่ใช่การแชร์โดยเจตนาดี ถือว่าคัดลอกหรืออาจประสงค์ร้าย ระวังด้วยนะจ๊ะ
            </p>
          </div>
        </div>

        {/* Bottom Brand Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8a8293]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#ff4d8d]/40">
              <Image
                src={SITE_CONFIG.logoPath}
                alt="MaTaReaL"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-white">{SITE_CONFIG.nameTh}</span>
            <span className="opacity-40">•</span>
            <span>{SITE_CONFIG.nameEn}</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-white transition">
              หน้าแรก
            </Link>
            <a
              href={SITE_CONFIG.nexusProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#F5A64B] font-medium transition"
            >
              <NexusModsLogo className="w-3.5 h-3.5" />
              <span>Nexus Mods</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
