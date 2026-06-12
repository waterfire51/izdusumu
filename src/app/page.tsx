import HomeAnnouncements from "@/components/HomeAnnouncements";
import HomeCounters from "@/components/HomeCounters";
import HomeHero from "@/components/HomeHero";
import HomeTestimonials from "@/components/HomeTestimonials";
import JsonLd from "@/components/seo/JsonLd";
import {
  getAnnouncements,
  getHeroSection,
  getTestimonials,
} from "@/lib/content";
import { buildFaqJsonLd, HOME_FAQ, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title:
    "Niğde Anaokulu | Özel İzdüşümü Anaokulu - Çift Kanatlı Okul Öncesi Eğitim",
  description:
    "Niğde anaokulu arayan aileler için İzdüşümü Anaokulu: çift kanatlı okul öncesi eğitim, güvenli kampüs, deneyimli öğretmen kadrosu ve 2-6 yaş kayıt. Niğde okul öncesi eğitimde güvenilir adresiniz.",
  path: "/",
  absoluteTitle: true,
  keywords: [
    "Niğde anaokulu",
    "Niğde okul öncesi eğitim",
    "Niğde çift kanatlı eğitim",
  ],
});

export default async function Home() {
  const [hero, announcements, textTestimonials] =
    await Promise.all([
      getHeroSection(),
      getAnnouncements(),
      getTestimonials("text"),
    ]);

  return (
    <div>
      <JsonLd data={buildFaqJsonLd(HOME_FAQ)} />
      <HomeHero content={hero} />
      <HomeAnnouncements items={announcements} />
      <HomeCounters />
      <HomeTestimonials
        backgroundColor="white"
        showTopWave={false}
        items={textTestimonials.map((t) => ({
          name: t.name,
          role: t.role,
          quote: t.quote,
          rating: t.rating,
        }))}
      />
    </div>
  );
}
