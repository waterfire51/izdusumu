import { headers } from "next/headers";
import { trackPageVisit } from "@/lib/track-visit";

export default async function VisitTracker() {
  const h = await headers();
  const url = h.get("x-url") ?? "/";
  const path = url.split("?")[0] || "/";
  await trackPageVisit(path);
  return null;
}
