import Parser from "rss-parser";

type Announcement = {
  title: string;
  link: string;
  date: string;
};

const fallbackAnnouncements: Announcement[] = [
  {
    title: "Bahar şenliği kayıtları başladı",
    link: "/veli-menusu",
    date: "10 Nisan 2026",
  },
  {
    title: "Mayıs ayı yemek listesi yayınlandı",
    link: "/veli-menusu",
    date: "08 Nisan 2026",
  },
  {
    title: "Yeni dönem ön kayıt formu açıldı",
    link: "/iletisim",
    date: "05 Nisan 2026",
  },
];

const parser = new Parser();

const normalizeDate = (input?: string) => {
  if (!input) return "Güncel";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "Güncel";
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export async function getAnnouncements(): Promise<Announcement[]> {
  const feedUrl = process.env.RSS_FEED_URL;
  if (!feedUrl) return fallbackAnnouncements;

  try {
    const response = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!response.ok) return fallbackAnnouncements;

    const xml = await response.text();
    const feed = await parser.parseString(xml);

    return (feed.items ?? []).slice(0, 3).map((item) => ({
      title: item.title ?? "Yeni duyuru",
      link: item.link ?? "/veli-menusu",
      date: normalizeDate(item.isoDate ?? item.pubDate ?? undefined),
    }));
  } catch (error) {
    console.error("RSS fetch failed", error);
    return fallbackAnnouncements;
  }
}
