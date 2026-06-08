import type { MetadataRoute } from "next";
import { getBlogPosts, getPressPosts, getRooms } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const now = new Date();

  const [rooms, blogPosts, pressPosts] = await Promise.all([
    getRooms(),
    getBlogPosts(),
    getPressPosts(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/kurumsal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/egitim-programimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dersliklerimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ogretmen-kadromuz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/veli-yorumlarimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/duyurular`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
  ];

  const roomPages: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: `${baseUrl}/dersliklerimiz/${room.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/duyurular/blog/${post.slug}`,
    lastModified: post.date instanceof Date ? post.date : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const pressPages: MetadataRoute.Sitemap = pressPosts.map((post) => ({
    url: `${baseUrl}/duyurular/basinda-biz/${post.slug}`,
    lastModified: post.date instanceof Date ? post.date : now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...roomPages, ...blogPages, ...pressPages];
}
