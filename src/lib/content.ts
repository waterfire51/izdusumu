import { ABOUT_DEFAULTS } from "@/lib/about-defaults";
import { prisma } from "@/lib/prisma";
import {
  ageClasses,
  classroomShowcase,
  galleryItems,
  parentMenu,
  popularClassTopics,
  rooms,
  teachers,
  testimonials,
} from "@/lib/data";
import { educationBlogPosts } from "@/lib/blog";
import { pressPosts } from "@/lib/press";
import { parseFormFields } from "@/lib/registration-form-fields";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });
  if (settings) return settings;

  return {
    id: "default",
    address: "Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1, Niğde",
    phone: "+90 552 531 00 51",
    email: "iletisim@izdusumuanaokulu.com",
    hours: "Hafta içi 08:30 - 17:30",
    whatsapp: "905525310051",
    mapEmbedUrl: null,
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    footerTagline:
      "Çocukların güvenle keşfettiği, velilerin huzurla desteklediği modern ve renkli bir eğitim yuvası.",
  };
}

export async function getHeroSection() {
  const hero = await prisma.heroSection.findUnique({ where: { id: "default" } });
  if (hero) return hero;

  return {
    id: "default",
    headline: "İz Düşümü Anaokulu'nda Güzel Dokunuşlar",
    headlineHighlight1: "İz Düşümü Anaokulu",
    headlineHighlight2: "İz Bırakır",
    subtitle:
      "Her gün yeni keşifler ve gelişim fırsatları sunan sıcak bir topluluğa hoş geldiniz. Güvenli, neşeli ve öğrenmeye açık bir ortamda çocuklarınızın yanındayız.",
    videoUrl: "/videos/hero-drone.mp4",
    ctaText: "2-6 Yaş Arası Çocuklarımız İçin",
    ctaHref: "/dersliklerimiz",
  };
}

export async function getHomeAbout() {
  const [about, cards] = await Promise.all([
    prisma.homeAbout.findUnique({ where: { id: "default" } }),
    prisma.whyUsCard.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return {
    badgeLabel: about?.badgeLabel ?? "Neden Biz",
    sectionTitle:
      about?.sectionTitle ?? "İzdüşümü Anaokulu'nda farkımızı keşfedin",
    sectionDescription:
      about?.sectionDescription ??
      "Her çocuğun kendine özgü ritimde büyümesine inanıyoruz. Güvenli ortamımızda oyun, sanat ve keşifle desteklenen bir eğitim anlayışıyla velilerimizin yanındayız.",
    commitmentTitle: about?.commitmentTitle ?? "Taahhüdümüz",
    commitmentText:
      about?.commitmentText ??
      "Şeffaf iletişim, güvenli fiziki ortam ve alanında uzman ekibimizle kaliteli eğitimi sürdürülebilir kılmak.",
    whyUsCards:
      cards.length > 0
        ? cards.map((c) => ({
            id: c.id,
            text: c.title,
            color: c.color,
            description: c.description,
            icon: c.icon,
          }))
        : [
            { text: "Deneyimli öğretmen kadrosu", color: "#22c55e" },
            { text: "Güvenli okul ortamı", color: "#0ea5e9" },
            { text: "Aile ortamında ev sıcaklığı", color: "#f97316" },
            {
              text: "Kalabalık olmayan sınıf mevcutları (15 kişilik sınıflar)",
              color: "#e11d48",
            },
          ],
  };
}

export async function getAboutPage() {
  const page = await prisma.aboutPage.findUnique({ where: { id: "default" } });
  if (page) return page;

  return { id: "default", ...ABOUT_DEFAULTS };
}

export async function getAboutPageWithTeachers() {
  const [page, teacherList] = await Promise.all([
    getAboutPage(),
    getTeachers(),
  ]);
  return { page, teachers: teacherList };
}

export async function getEducationProgramSections() {
  const sections = await prisma.educationProgramSection.findMany({
    orderBy: { sortOrder: "asc" },
  });
  if (sections.length > 0) return sections;

  const { EDUCATION_SECTIONS } = await import("@/lib/education-defaults");
  return EDUCATION_SECTIONS.map((s) => ({
    id: s.key,
    key: s.key,
    title: s.title,
    content: s.content,
    icon: s.icon,
    sortOrder: s.sortOrder,
  }));
}

export async function getTestimonials(type?: "text" | "video") {
  const where = type ? { type, published: true } : { published: true };
  const items = await prisma.testimonial.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });
  if (items.length > 0) return items;

  if (type === "video") return [];

  return testimonials.map((t, i) => ({
    id: `static-${i}`,
    type: "text",
    name: t.name,
    role: t.role,
    quote: t.quote,
    rating: t.rating,
    videoUrl: null,
    title: null,
    sortOrder: i,
    published: true,
  }));
}

export async function getRooms() {
  const items = await prisma.room.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return items.length > 0 ? items : rooms;
}

export async function getRoomBySlug(slug: string) {
  const room = await prisma.room.findUnique({ where: { slug } });
  if (room) return room;
  return rooms.find((r) => r.slug === slug) ?? null;
}

export async function getAgeClasses() {
  const items = await prisma.ageClass.findMany({ orderBy: { sortOrder: "asc" } });
  return items.length > 0 ? items : ageClasses;
}

export async function getClassTopics() {
  const items = await prisma.classTopic.findMany({ orderBy: { sortOrder: "asc" } });
  return items.length > 0 ? items : popularClassTopics;
}

export async function getClassroomShowcase() {
  const items = await prisma.classroomShowcase.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return items.length > 0 ? items : classroomShowcase;
}

export async function getTeachers() {
  const items = await prisma.teacher.findMany({ orderBy: { sortOrder: "asc" } });
  return items.length > 0 ? items : teachers;
}

export async function getAnnouncements() {
  const items = await prisma.announcement.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  if (items.length > 0) return items.map((a) => a.text);
  return parentMenu.announcements;
}

export async function getMealMenus() {
  const items = await prisma.mealMenu.findMany({ orderBy: { sortOrder: "asc" } });
  if (items.length > 0) return items;
  return parentMenu.meals;
}

export async function getEvents() {
  const items = await prisma.event.findMany({ orderBy: { sortOrder: "asc" } });
  if (items.length > 0) return items;
  return parentMenu.events;
}

export async function getBlogPosts() {
  const items = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
  if (items.length > 0) return items;
  return educationBlogPosts.map((p) => ({
    ...p,
    id: p.slug,
    published: true,
    date: new Date(p.date),
    content: p.content,
  }));
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (post) return post;
  const staticPost = educationBlogPosts.find((p) => p.slug === slug);
  if (!staticPost) return null;
  return {
    ...staticPost,
    id: staticPost.slug,
    published: true,
    date: new Date(staticPost.date),
    content: staticPost.content,
  };
}

export async function getPressPosts() {
  const items = await prisma.pressPost.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
  if (items.length > 0) return items;
  return pressPosts.map((p) => ({
    ...p,
    id: p.slug,
    published: true,
    date: new Date(p.date),
    content: p.content,
  }));
}

export async function getPressPostBySlug(slug: string) {
  const post = await prisma.pressPost.findUnique({ where: { slug } });
  if (post) return post;
  const staticPost = pressPosts.find((p) => p.slug === slug);
  if (!staticPost) return null;
  return {
    ...staticPost,
    id: staticPost.slug,
    published: true,
    date: new Date(staticPost.date),
    content: staticPost.content,
  };
}

export async function getGalleryItems() {
  const items = await prisma.galleryItem.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  if (items.length > 0) {
    return items.map((item) => ({
      src: item.src,
      alt: item.alt,
      category: item.category,
    }));
  }
  return galleryItems;
}

export async function getRegistrationFormBySlug(slug: string) {
  const form = await prisma.registrationForm.findUnique({
    where: { slug, published: true },
  });
  if (!form) return null;
  return {
    ...form,
    fields: parseFormFields(form.fields),
  };
}
