import Image from "next/image";
import Link from "next/link";
import { Flask, PaintBrush, PuzzlePiece } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import HomeAbout from "@/components/HomeAbout";
import HomeAgeClasses from "@/components/HomeAgeClasses";
import HomeHero from "@/components/HomeHero";
import HomeClassroomsCarousel from "@/components/HomeClassroomsCarousel";
import HomeTestimonials from "@/components/HomeTestimonials";
import HomeTopicsCarousel from "@/components/HomeTopicsCarousel";
import SectionHeading from "@/components/SectionHeading";
import { faqItems, galleryItems, programs } from "@/lib/data";
import { getAnnouncements } from "@/lib/rss";

export default async function Home() {
  const announcements = await getAnnouncements();

  return (
    <div>
      <HomeHero />

      <HomeAbout />

      <HomeAgeClasses />

      <HomeTopicsCarousel />

      <HomeClassroomsCarousel />

      <HomeTestimonials />
    </div>
  );
}
