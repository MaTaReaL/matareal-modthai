import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { isCurrentUserAdmin } from "@/lib/admin";
import { getModRequests } from "@/lib/store";
import { RequestBoardClient } from "@/components/RequestBoardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "เสนอทำม็อดภาษาไทย",
  description: `บอร์ดเสนอเกมสำหรับทำม็อดแปลภาษาไทยโดย ${SITE_CONFIG.authorName} — วางลิงก์ Steam หรือพิมพ์ชื่อเกมเพื่อเสนอและโหวตเกมที่อยากให้แปลไทย`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/requests`,
  },
};

export default async function RequestsPage() {
  const [requests, isAdmin] = await Promise.all([
    getModRequests(),
    isCurrentUserAdmin(),
  ]);

  return <RequestBoardClient initialRequests={requests} isAdmin={isAdmin} />;
}
