import AdminLayout from "@/components/admin/AdminLayout";
import { getAnalyticsSummary } from "@/lib/analytics";

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalyticsSummary(30).catch(() => ({
    total: 0,
    topSources: [] as [string, number][],
    topPages: [] as [string, number][],
    dailyTrend: [] as { date: string; count: number }[],
    days: 30,
  }));

  const maxDaily = Math.max(...analytics.dailyTrend.map((d) => d.count), 1);

  return (
    <AdminLayout
      title="Analitik"
      description="Ziyaretçi trafiği, kaynaklar ve yönlendirme analizi"
    >
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        <strong>UTM parametreleri:</strong> Instagram, Facebook veya reklam
        kampanyalarından gelen trafiği takip etmek için linklerinize{" "}
        <code className="rounded bg-white px-1">?utm_source=instagram&utm_medium=social</code>{" "}
        gibi parametreler ekleyin.
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
          <p className="text-sm text-slate-500">Son {analytics.days} gün</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{analytics.total}</p>
          <p className="mt-1 text-sm text-slate-500">toplam sayfa görüntüleme</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900">Günlük Trend</h2>
          <div className="mt-4 flex h-40 items-end gap-1">
            {analytics.dailyTrend.length === 0 ? (
              <p className="text-sm text-slate-500">Henüz veri yok</p>
            ) : (
              analytics.dailyTrend.map((d) => (
                <div
                  key={d.date}
                  className="group flex flex-1 flex-col items-center justify-end"
                  title={`${d.date}: ${d.count}`}
                >
                  <div
                    className="w-full rounded-t bg-[#3c50e0] transition group-hover:bg-[#2f3fbb]"
                    style={{
                      height: `${Math.max((d.count / maxDaily) * 100, 4)}%`,
                      minHeight: 4,
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Trafik Kaynakları</h2>
          <p className="mt-1 text-sm text-slate-500">
            Instagram, Facebook, Google, doğrudan giriş vb.
          </p>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="pb-2 font-semibold">Kaynak</th>
                <th className="pb-2 text-right font-semibold">Ziyaret</th>
                <th className="pb-2 text-right font-semibold">%</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topSources.map(([source, count]) => (
                <tr key={source} className="border-b border-slate-100">
                  <td className="py-2.5 font-medium text-slate-800">{source}</td>
                  <td className="py-2.5 text-right font-bold text-[#3c50e0]">
                    {count}
                  </td>
                  <td className="py-2.5 text-right text-slate-500">
                    {analytics.total > 0
                      ? Math.round((count / analytics.total) * 100)
                      : 0}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">En Çok Ziyaret Edilen Sayfalar</h2>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="pb-2 font-semibold">Sayfa</th>
                <th className="pb-2 text-right font-semibold">Ziyaret</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topPages.map(([path, count]) => (
                <tr key={path} className="border-b border-slate-100">
                  <td className="py-2.5 font-mono text-slate-700">{path}</td>
                  <td className="py-2.5 text-right font-bold text-[#3c50e0]">
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
