import type { Metadata } from "next";
import { getAllModSlugs } from "@/data/mods";
import { isCurrentUserAdmin } from "@/lib/admin";
import { getModRequests, getSiteStats } from "@/lib/store";
import { AdminLoginClient } from "@/components/AdminLoginClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [isAdmin, stats, requests] = await Promise.all([
    isCurrentUserAdmin(),
    getSiteStats(getAllModSlugs()),
    getModRequests(),
  ]);

  const pendingRequestsCount = requests.filter((r) => r.status === "รอพิจารณา").length;

  return (
    <AdminLoginClient
      initialIsAdmin={isAdmin}
      stats={stats}
      pendingRequestsCount={pendingRequestsCount}
    />
  );
}
