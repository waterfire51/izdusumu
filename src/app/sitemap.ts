import type { MetadataRoute } from "next";
import { rooms } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://izdusumuanaokulu.com";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/dersliklerimiz`, lastModified: new Date() },
    { url: `${baseUrl}/kurumsal`, lastModified: new Date() },
    { url: `${baseUrl}/egitim-programimiz`, lastModified: new Date() },
    { url: `${baseUrl}/veli-yorumlarimiz`, lastModified: new Date() },
    { url: `${baseUrl}/galeri`, lastModified: new Date() },
    { url: `${baseUrl}/duyurular`, lastModified: new Date() },
    { url: `${baseUrl}/iletisim`, lastModified: new Date() },
    ...rooms.map((room) => ({
      url: `${baseUrl}/dersliklerimiz/${room.slug}`,
      lastModified: new Date(),
    })),
  ];
}
