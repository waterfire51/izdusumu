import HomeAbout from "@/components/HomeAbout";
import HomeAgeClasses from "@/components/HomeAgeClasses";
import HomeHero from "@/components/HomeHero";
import HomeClassroomsCarousel from "@/components/HomeClassroomsCarousel";
import HomeTestimonials from "@/components/HomeTestimonials";
import HomeTopicsCarousel from "@/components/HomeTopicsCarousel";
import {
  getAgeClasses,
  getClassroomShowcase,
  getClassTopics,
  getHeroSection,
  getHomeAbout,
  getTestimonials,
} from "@/lib/content";

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
    </div>
  );
}
