import { headers } from "next/headers";
import { recordVisit } from "@/lib/analytics";

export async function trackPageVisit(path: string) {
  if (path.startsWith("/admin") || path.startsWith("/api")) return;

  const h = await headers();
  const referrer = h.get("referer");
  const userAgent = h.get("user-agent");

  const url = h.get("x-url") ?? "";
  let utmSource: string | null = null;
  let utmMedium: string | null = null;
  let utmCampaign: string | null = null;

  if (url) {
    try {
      const u = new URL(url);
      utmSource = u.searchParams.get("utm_source");
      utmMedium = u.searchParams.get("utm_medium");
      utmCampaign = u.searchParams.get("utm_campaign");
    } catch {
      /* ignore */
    }
  }

  try {
    await recordVisit({
      path,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      userAgent,
    });
  } catch {
    /* DB yoksa site çalışmaya devam etsin */
  }
}
