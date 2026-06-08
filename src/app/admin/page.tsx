import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { getAnalyticsSummary } from "@/lib/analytics";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getSession();
  const [analytics, counts] = await Promise.all([
    getAnalyticsSummary(30).catch(() => ({
      total: 0,
      topSources: [] as [string, number][],
      topPages: [] as [string, number][],
      dailyTrend: [] as { date: string; count: number }[],
      days: 30,
    })),
    Promise.all([
      prisma.testimonial.count(),
      prisma.room.count(),
      prisma.announcement.count(),
      prisma.pageVisit.count(),
    ]).catch(() => [0, 0, 0, 0]),
  ]);

  const [testimonialCount, roomCount, announcementCount, visitCount] = counts;

  const quickLinks = [
    { href: "/admin/hero", label: "Tanıtım Filmi" },
    { href: "/admin/testimonials", label: "Veli Yorumları" },
    { href: "/admin/rooms", label: "Sınıflar" },
    { href: "/admin/announcements", label: "Duyurular" },
    { href: "/admin/contact", label: "İletişim" },
    { href: "/admin/analytics", label: "Analitik" },
  ];

  return (
    <AdminLayout
      title={`Hoş geldiniz, ${session?.name ?? "Yönetici"}`}
      description="İzdüşümü Anaokulu yönetim paneli"
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Son 30 Gün Ziyaret", value: analytics.total },
          { label: "Toplam Kayıtlı Ziyaret", value: visitCount },
          { label: "Veli Yorumları", value: testimonialCount },
          { label: "Sınıflar", value: roomCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Trafik Kaynakları</h2>
          <p className="mt-1 text-sm text-slate-500">Son 30 gün</p>
          <ul className="mt-4 space-y-2">
            {analytics.topSources.length === 0 ? (
              <li className="text-sm text-slate-500">Henüz veri yok</li>
            ) : (
              analytics.topSources.map(([source, count]) => (
                <li
                  key={source}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-slate-800">{source}</span>
                  <span className="font-bold text-[#3c50e0]">{count}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Hızlı Erişim</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#3c50e0] hover:text-[#3c50e0]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Popüler Sayfalar</h2>
        <ul className="mt-4 space-y-2">
          {analytics.topPages.length === 0 ? (
            <li className="text-sm text-slate-500">Henüz veri yok</li>
          ) : (
            analytics.topPages.map(([path, count]) => (
              <li
                key={path}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="font-mono text-slate-700">{path}</span>
                <span className="font-bold text-[#3c50e0]">{count}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </AdminLayout>
  );
}
