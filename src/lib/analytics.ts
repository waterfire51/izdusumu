import { prisma } from "@/lib/prisma";

export type VisitInput = {
  path: string;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  userAgent?: string | null;
};

function parseReferrerHost(referrer?: string | null) {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname;
  } catch {
    return null;
  }
}

export function classifySource(
  referrerHost: string | null,
  utmSource: string | null
) {
  if (utmSource) {
    const s = utmSource.toLowerCase();
    if (s.includes("instagram") || s === "ig") return "Instagram";
    if (s.includes("facebook") || s === "fb") return "Facebook";
    if (s.includes("google")) return "Google Reklamları";
    if (s.includes("youtube") || s === "yt") return "YouTube";
    return utmSource;
  }

  if (!referrerHost) return "Doğrudan";

  const host = referrerHost.toLowerCase();
  if (host.includes("instagram")) return "Instagram";
  if (host.includes("facebook") || host.includes("fb.")) return "Facebook";
  if (host.includes("google")) return "Google";
  if (host.includes("youtube")) return "YouTube";
  if (host.includes("twitter") || host.includes("x.com")) return "X / Twitter";
  if (host.includes("tiktok")) return "TikTok";
  if (host.includes("linkedin")) return "LinkedIn";

  return referrerHost;
}

export async function recordVisit(input: VisitInput) {
  const referrerHost = parseReferrerHost(input.referrer);

  await prisma.pageVisit.create({
    data: {
      path: input.path,
      referrer: input.referrer ?? null,
      referrerHost,
      utmSource: input.utmSource ?? null,
      utmMedium: input.utmMedium ?? null,
      utmCampaign: input.utmCampaign ?? null,
      userAgent: input.userAgent ?? null,
    },
  });
}

export async function getAnalyticsSummary(days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const visits = await prisma.pageVisit.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
  });

  const total = visits.length;
  const bySource: Record<string, number> = {};
  const byPath: Record<string, number> = {};
  const byDay: Record<string, number> = {};

  for (const v of visits) {
    const source = classifySource(v.referrerHost, v.utmSource);
    bySource[source] = (bySource[source] ?? 0) + 1;
    byPath[v.path] = (byPath[v.path] ?? 0) + 1;
    const day = v.createdAt.toISOString().slice(0, 10);
    byDay[day] = (byDay[day] ?? 0) + 1;
  }

  const topSources = Object.entries(bySource)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topPages = Object.entries(byPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const dailyTrend = Object.entries(byDay)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  return { total, topSources, topPages, dailyTrend, days };
}
