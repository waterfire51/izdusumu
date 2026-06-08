import HomeAbout from "@/components/HomeAbout";
import HomeAgeClasses from "@/components/HomeAgeClasses";
import HomeFaq from "@/components/HomeFaq";
import HomeHero from "@/components/HomeHero";
import HomeClassroomsCarousel from "@/components/HomeClassroomsCarousel";
import HomeTestimonials from "@/components/HomeTestimonials";
import HomeTopicsCarousel from "@/components/HomeTopicsCarousel";
import JsonLd from "@/components/seo/JsonLd";
import {
  getAgeClasses,
  getClassroomShowcase,
  getClassTopics,
  getHeroSection,
  getHomeAbout,
  getTestimonials,
} from "@/lib/content";
import { buildFaqJsonLd, HOME_FAQ, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title:
    "Niğde Anaokulu | Özel İzdüşümü Anaokulu - Çift Taraflı Okul Öncesi Eğitim",
  description:
    "Niğde anaokulu arayan aileler için İzdüşümü Anaokulu: çift taraflı okul öncesi eğitim, güvenli kampüs, deneyimli öğretmen kadrosu ve 2-6 yaş kayıt. Niğde okul öncesi eğitimde güvenilir adresiniz.",
  path: "/",
  absoluteTitle: true,
  keywords: [
    "Niğde anaokulu",
    "Niğde okul öncesi eğitim",
    "Niğde çift taraflı eğitim",
  ],
});

export default async function Home() {
  const [hero, homeAbout, ageClasses, topics, showcase, textTestimonials] =
    await Promise.all([
      getHeroSection(),
      getHomeAbout(),
      getAgeClasses(),
      getClassTopics(),
      getClassroomShowcase(),
      getTestimonials("text"),
    ]);

  return (
    <div>
      <JsonLd data={buildFaqJsonLd(HOME_FAQ)} />
      <HomeHero content={hero} />
      <HomeAbout
        badgeLabel={homeAbout.badgeLabel}
        sectionTitle={homeAbout.sectionTitle}
        sectionDescription={homeAbout.sectionDescription}
        whyUsCards={homeAbout.whyUsCards.map((c) => ({
          text: c.text,
          color: c.color,
        }))}
        commitmentTitle={homeAbout.commitmentTitle}
        commitmentText={homeAbout.commitmentText}
      />
      <HomeAgeClasses classes={ageClasses} />
      <HomeTopicsCarousel topics={topics} />
      <HomeClassroomsCarousel items={showcase} />
      <HomeTestimonials
        items={textTestimonials.map((t) => ({
          name: t.name,
          role: t.role,
          quote: t.quote,
          rating: t.rating,
        }))}
      />
      <HomeFaq />
    </div>
  );
}
