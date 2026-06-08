import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  ageClasses,
  classroomShowcase,
  parentMenu,
  popularClassTopics,
  galleryItems,
  rooms,
  teachers,
  testimonials,
} from "../src/lib/data";
import { educationBlogPosts } from "../src/lib/blog";
import { pressPosts } from "../src/lib/press";
import { ABOUT_DEFAULTS } from "../src/lib/about-defaults";
import { EDUCATION_SECTIONS } from "../src/lib/education-defaults";

const prisma = new PrismaClient();

const HOME_ABOUT = {
  badgeLabel: "Neden Biz",
  sectionTitle: "İzdüşümü Anaokulu'nda farkımızı keşfedin",
  sectionDescription:
    "Her çocuğun kendine özgü ritimde büyümesine inanıyoruz. Güvenli ortamımızda oyun, sanat ve keşifle desteklenen bir eğitim anlayışıyla velilerimizin yanındayız.",
  commitmentTitle: "Taahhüdümüz",
  commitmentText:
    "Şeffaf iletişim, güvenli fiziki ortam ve alanında uzman ekibimizle kaliteli eğitimi sürdürülebilir kılmak.",
};

const WHY_US_CARDS = [
  { title: "Deneyimli öğretmen kadrosu", description: "", icon: "star", color: "#22c55e" },
  { title: "Güvenli okul ortamı", description: "", icon: "shield", color: "#0ea5e9" },
  { title: "Aile ortamında ev sıcaklığı", description: "", icon: "heart", color: "#f97316" },
  {
    title: "Kalabalık olmayan sınıf mevcutları (15 kişilik sınıflar)",
    description: "",
    icon: "users",
    color: "#e11d48",
  },
];

const VIDEO_TESTIMONIALS = [
  { type: "video", name: "Elif Hanım", title: "Veli Görüşü 01", videoUrl: "/videos/hero-drone.mp4", sortOrder: 0 },
  { type: "video", name: "Mehmet Bey", title: "Veli Görüşü 02", videoUrl: "/videos/hero-drone.mp4", sortOrder: 1 },
  { type: "video", name: "Selin Hanım", title: "Veli Görüşü 03", videoUrl: "/videos/hero-drone.mp4", sortOrder: 2 },
];

const BLOG_DATES: Record<string, string> = {
  "oyun-temelli-ogrenme-neden-kalicidir": "2026-04-14",
  "evde-rutin-olustururken-dikkat-edilmesi-gerekenler": "2026-04-10",
};

const PRESS_DATES: Record<string, string> = {
  "bahar-senligi-yerel-basinda": "2026-04-12",
  "degerler-egitimi-paneli-katilimi": "2026-04-08",
  "duvarsiz-egitim-roportaji": "2026-04-03",
};

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@izdusumuanaokulu.com";
  const password = process.env.ADMIN_PASSWORD ?? "Izdusumu2026!";
  const hash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, name: "Yönetici" },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      address: "Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1, Niğde",
      phone: "+90 552 531 00 51",
      email: "iletisim@izdusumuanaokulu.com",
      hours: "Hafta içi 08:30 - 17:30",
      whatsapp: "905525310051",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      footerTagline:
        "Çocukların güvenle keşfettiği, velilerin huzurla desteklediği modern ve renkli bir eğitim yuvası.",
    },
    create: {
      id: "default",
      address: "Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1, Niğde",
      phone: "+90 552 531 00 51",
      email: "iletisim@izdusumuanaokulu.com",
      hours: "Hafta içi 08:30 - 17:30",
      whatsapp: "905525310051",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      footerTagline:
        "Çocukların güvenle keşfettiği, velilerin huzurla desteklediği modern ve renkli bir eğitim yuvası.",
    },
  });

  await prisma.heroSection.upsert({
    where: { id: "default" },
    update: {
      headline: "İz Düşümü Anaokulu'nda Güzel Dokunuşlar",
      headlineHighlight1: "İz Düşümü Anaokulu",
      headlineHighlight2: "İz Bırakır",
      subtitle:
        "Her gün yeni keşifler ve gelişim fırsatları sunan sıcak bir topluluğa hoş geldiniz. Güvenli, neşeli ve öğrenmeye açık bir ortamda çocuklarınızın yanındayız.",
      videoUrl: "/videos/hero-drone.mp4",
      ctaText: "2-6 Yaş Arası Çocuklarımız İçin",
      ctaHref: "/dersliklerimiz",
    },
    create: {
      id: "default",
      headline: "İz Düşümü Anaokulu'nda Güzel Dokunuşlar",
      headlineHighlight1: "İz Düşümü Anaokulu",
      headlineHighlight2: "İz Bırakır",
      subtitle:
        "Her gün yeni keşifler ve gelişim fırsatları sunan sıcak bir topluluğa hoş geldiniz. Güvenli, neşeli ve öğrenmeye açık bir ortamda çocuklarınızın yanındayız.",
      videoUrl: "/videos/hero-drone.mp4",
      ctaText: "2-6 Yaş Arası Çocuklarımız İçin",
      ctaHref: "/dersliklerimiz",
    },
  });

  await prisma.homeAbout.upsert({
    where: { id: "default" },
    update: HOME_ABOUT,
    create: { id: "default", ...HOME_ABOUT },
  });

  await prisma.whyUsCard.deleteMany();
  await prisma.whyUsCard.createMany({
    data: WHY_US_CARDS.map((c, i) => ({ ...c, sortOrder: i })),
  });

  await prisma.aboutPage.upsert({
    where: { id: "default" },
    update: { ...ABOUT_DEFAULTS },
    create: { id: "default", ...ABOUT_DEFAULTS },
  });

  for (const s of EDUCATION_SECTIONS) {
    await prisma.educationProgramSection.upsert({
      where: { key: s.key },
      update: {
        title: s.title,
        content: s.content,
        icon: s.icon,
        sortOrder: s.sortOrder,
      },
      create: { ...s },
    });
  }

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      ...testimonials.map((t, i) => ({
        type: "text",
        name: t.name,
        role: t.role,
        quote: t.quote,
        rating: t.rating,
        sortOrder: i,
        published: true,
      })),
      ...VIDEO_TESTIMONIALS.map((v) => ({ ...v, published: true })),
    ],
  });

  for (const [i, room] of rooms.entries()) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      update: {
        name: room.name,
        description: room.description,
        image: room.image,
        images: room.images,
        sortOrder: i,
        published: true,
      },
      create: {
        slug: room.slug,
        name: room.name,
        description: room.description,
        image: room.image,
        images: room.images,
        sortOrder: i,
        published: true,
      },
    });
  }

  await prisma.ageClass.deleteMany();
  await prisma.ageClass.createMany({
    data: ageClasses.map((a, i) => ({
      title: a.title,
      ageLabel: a.ageLabel,
      description: a.description,
      color: a.color,
      icon: a.icon,
      sortOrder: i,
    })),
  });

  await prisma.classTopic.deleteMany();
  await prisma.classTopic.createMany({
    data: popularClassTopics.map((t, i) => ({
      label: t.label,
      color: t.color,
      icon: t.icon,
      sortOrder: i,
    })),
  });

  await prisma.classroomShowcase.deleteMany();
  await prisma.classroomShowcase.createMany({
    data: classroomShowcase.map((c, i) => ({
      slug: c.slug,
      title: c.title,
      ageRange: c.ageRange,
      duration: c.duration,
      rating: c.rating,
      reviewCount: c.reviewCount,
      teacherName: c.teacherName,
      teacherImage: c.teacherImage,
      color: c.color,
      image: c.image,
      sortOrder: i,
    })),
  });

  await prisma.teacher.deleteMany();
  await prisma.teacher.createMany({
    data: teachers.map((t, i) => ({
      name: t.name,
      role: t.role,
      description: t.description,
      sortOrder: i,
    })),
  });

  await prisma.announcement.deleteMany();
  await prisma.announcement.createMany({
    data: parentMenu.announcements.map((text, i) => ({
      text,
      sortOrder: i,
      published: true,
    })),
  });

  await prisma.mealMenu.deleteMany();
  await prisma.mealMenu.createMany({
    data: parentMenu.meals.map((m, i) => ({
      day: m.day,
      menu: m.menu,
      sortOrder: i,
    })),
  });

  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: parentMenu.events.map((e, i) => ({
      date: e.date,
      title: e.title,
      sortOrder: i,
    })),
  });

  for (const p of educationBlogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        content: p.content,
        date: new Date(BLOG_DATES[p.slug] ?? "2026-04-01"),
        published: true,
      },
      create: {
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        content: p.content,
        date: new Date(BLOG_DATES[p.slug] ?? "2026-04-01"),
        published: true,
      },
    });
  }

  for (const p of pressPosts) {
    await prisma.pressPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        source: p.source,
        content: p.content,
        date: new Date(PRESS_DATES[p.slug] ?? "2026-04-01"),
        published: true,
      },
      create: {
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        source: p.source,
        content: p.content,
        date: new Date(PRESS_DATES[p.slug] ?? "2026-04-01"),
        published: true,
      },
    });
  }

  await prisma.galleryItem.deleteMany();
  await prisma.galleryItem.createMany({
    data: galleryItems.map((g, i) => ({
      src: g.src,
      alt: g.alt,
      category: g.category,
      sortOrder: i,
      published: true,
    })),
  });

  console.log("✓ Tüm site verileri veritabanına senkronize edildi.");
  console.log("  Admin:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
