"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { uploadToGitHub } from "@/lib/github-upload";
import type { RegistrationFieldConfig } from "@/lib/registration-form-fields";
import { REGISTRATION_FIELD_TEMPLATES } from "@/lib/registration-form-fields";

async function guard() {
  try {
    await requireAdmin();
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Oturum gerekli" };
  }
}

async function uploadFile(formData: FormData, field: string) {
  const file = formData.get(field);
  if (!file || !(file instanceof File) || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadToGitHub(buffer, file.name);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveHero(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const existing = await prisma.heroSection.findUnique({
    where: { id: "default" },
  });
  const videoUrl = existing?.videoUrl ?? "/videos/hero-drone.mp4";

  await prisma.heroSection.upsert({
    where: { id: "default" },
    update: {
      headline: formData.get("headline") as string,
      headlineHighlight1: formData.get("headlineHighlight1") as string,
      headlineHighlight2: formData.get("headlineHighlight2") as string,
      subtitle: formData.get("subtitle") as string,
      videoUrl,
      ctaText: formData.get("ctaText") as string,
      ctaHref: formData.get("ctaHref") as string,
    },
    create: {
      id: "default",
      headline: formData.get("headline") as string,
      headlineHighlight1: formData.get("headlineHighlight1") as string,
      headlineHighlight2: formData.get("headlineHighlight2") as string,
      subtitle: formData.get("subtitle") as string,
      videoUrl,
      ctaText: formData.get("ctaText") as string,
      ctaHref: formData.get("ctaHref") as string,
    },
  });

  revalidatePath("/");
  return { ok: true };
}

export async function saveHomeAbout(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const aboutData = {
    badgeLabel: formData.get("badgeLabel") as string,
    sectionTitle: formData.get("sectionTitle") as string,
    sectionDescription: formData.get("sectionDescription") as string,
    commitmentTitle: formData.get("commitmentTitle") as string,
    commitmentText: formData.get("commitmentText") as string,
  };

  await prisma.homeAbout.upsert({
    where: { id: "default" },
    update: aboutData,
    create: { id: "default", ...aboutData },
  });

  const cardCount = Number(formData.get("cardCount") ?? 0);
  for (let i = 0; i < cardCount; i++) {
    const id = formData.get(`card_${i}_id`) as string;
    const title = formData.get(`card_${i}_title`) as string;
    const color = formData.get(`card_${i}_color`) as string;
    if (!title) continue;
    if (id) {
      await prisma.whyUsCard.update({
        where: { id },
        data: { title, color, sortOrder: i },
      });
    } else {
      await prisma.whyUsCard.create({
        data: { title, color, description: "", icon: "star", sortOrder: i },
      });
    }
  }

  revalidatePath("/");
  return { ok: true };
}

export async function saveAboutPage(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const pageData = {
    heroBadgeLabel: formData.get("heroBadgeLabel") as string,
    heroTitle: formData.get("heroTitle") as string,
    heroSubtitle: formData.get("heroSubtitle") as string,
    missionText: formData.get("missionText") as string,
    visionText: formData.get("visionText") as string,
    educationModelText: formData.get("educationModelText") as string,
    storyBadgeLabel: formData.get("storyBadgeLabel") as string,
    storyTitle: formData.get("storyTitle") as string,
    storyText: formData.get("storyText") as string,
  };

  await prisma.aboutPage.upsert({
    where: { id: "default" },
    update: pageData,
    create: { id: "default", ...pageData },
  });

  revalidatePath("/kurumsal");
  return { ok: true };
}

export async function saveTeacher(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = (formData.get("id") as string) || null;
  const data = {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    description: formData.get("description") as string,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (!data.name?.trim()) {
    return { ok: false, error: "Ad soyad gerekli" };
  }

  if (id) {
    await prisma.teacher.update({ where: { id }, data });
  } else {
    await prisma.teacher.create({ data });
  }

  revalidatePath("/ogretmen-kadromuz");
  revalidatePath("/admin/teachers");
  return { ok: true };
}

export async function deleteTeacher(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  await prisma.teacher.delete({ where: { id } });
  revalidatePath("/ogretmen-kadromuz");
  revalidatePath("/admin/teachers");
  return { ok: true };
}

const EDUCATION_SECTION_COUNT = 4;

export async function saveEducationProgram(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  for (let i = 0; i < EDUCATION_SECTION_COUNT; i++) {
    const key = formData.get(`section_${i}_key`) as string;
    const id = (formData.get(`section_${i}_id`) as string) || null;
    const title = (formData.get(`section_${i}_title`) as string) || null;
    const content = formData.get(`section_${i}_content`) as string;
    const iconRaw = formData.get(`section_${i}_icon`) as string;
    const icon = iconRaw && iconRaw !== "none" ? iconRaw : null;

    const data = { title, content, icon, sortOrder: i };

    if (id) {
      await prisma.educationProgramSection.update({ where: { id }, data });
    } else {
      await prisma.educationProgramSection.upsert({
        where: { key },
        update: data,
        create: { key, ...data },
      });
    }
  }

  revalidatePath("/egitim-programimiz");
  revalidatePath("/admin/education");
  return { ok: true };
}

export async function saveTestimonial(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = formData.get("id") as string;
  let videoUrl = (formData.get("videoUrl") as string) || null;
  const uploaded = await uploadFile(formData, "videoFile");
  if (uploaded) videoUrl = uploaded;

  const data = {
    type: formData.get("type") as string,
    name: formData.get("name") as string,
    role: (formData.get("role") as string) || null,
    quote: (formData.get("quote") as string) || null,
    rating: formData.get("rating") ? Number(formData.get("rating")) : null,
    videoUrl,
    title: (formData.get("title") as string) || null,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/veli-yorumlarimiz");
  revalidatePath("/admin/testimonials");
  return { ok: true };
}

export async function deleteTestimonial(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/veli-yorumlarimiz");
  revalidatePath("/admin/testimonials");
  return { ok: true };
}

export async function saveRoom(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = (formData.get("id") as string) || null;
  const name = formData.get("name") as string;
  const image = (formData.get("image") as string) || "";

  if (!name?.trim()) {
    return { ok: false, error: "Sınıf adı gerekli" };
  }
  if (!image) {
    return { ok: false, error: "Kapak fotoğrafı gerekli" };
  }

  let images: string[] = [];
  try {
    images = JSON.parse((formData.get("images") as string) || "[]") as string[];
  } catch {
    images = [];
  }
  if (!Array.isArray(images)) images = [];

  const slug =
    (formData.get("slug") as string) || slugify(name);

  const data = {
    slug,
    name,
    description: formData.get("description") as string,
    image,
    images: images.length > 0 ? images : [image],
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (id) {
    await prisma.room.update({ where: { id }, data });
    revalidatePath(`/dersliklerimiz/${slug}`);
  } else {
    await prisma.room.create({ data });
  }

  revalidatePath("/dersliklerimiz");
  revalidatePath("/");
  revalidatePath("/admin/rooms");
  return { ok: true };
}

export async function deleteRoom(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  const room = await prisma.room.findUnique({ where: { id } });
  await prisma.room.delete({ where: { id } });
  revalidatePath("/dersliklerimiz");
  revalidatePath("/");
  revalidatePath("/admin/rooms");
  if (room) revalidatePath(`/dersliklerimiz/${room.slug}`);
  return { ok: true };
}

export async function saveAnnouncement(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = formData.get("id") as string;
  const data = {
    text: formData.get("text") as string,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (id) {
    await prisma.announcement.update({ where: { id }, data });
  } else {
    await prisma.announcement.create({ data });
  }

  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
  return { ok: true };
}

export async function deleteAnnouncement(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
  return { ok: true };
}

export async function saveMealMenu(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = formData.get("id") as string;
  const data = {
    day: formData.get("day") as string,
    menu: formData.get("menu") as string,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (id) {
    await prisma.mealMenu.update({ where: { id }, data });
  } else {
    await prisma.mealMenu.create({ data });
  }

  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
  return { ok: true };
}

export async function deleteMealMenu(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  await prisma.mealMenu.delete({ where: { id } });
  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
  return { ok: true };
}

export async function saveEvent(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = formData.get("id") as string;
  const data = {
    date: formData.get("date") as string,
    title: formData.get("title") as string,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data });
  }

  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
  return { ok: true };
}

export async function deleteEvent(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  await prisma.event.delete({ where: { id } });
  revalidatePath("/duyurular");
  revalidatePath("/admin/announcements");
  return { ok: true };
}

export async function saveGalleryItem(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = (formData.get("id") as string) || null;
  const src = (formData.get("src") as string) || "";

  if (!src) {
    return { ok: false, error: "Görsel gerekli" };
  }

  const data = {
    src,
    alt: formData.get("alt") as string,
    category: formData.get("category") as string,
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (id) {
    await prisma.galleryItem.update({ where: { id }, data });
  } else {
    await prisma.galleryItem.create({ data });
  }

  revalidatePath("/galeri");
  revalidatePath("/admin/gallery");
  return { ok: true };
}

export async function deleteGalleryItem(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/galeri");
  revalidatePath("/admin/gallery");
  return { ok: true };
}

async function uniqueFormSlug(base: string, excludeId?: string) {
  let slug = slugify(base) || "kayit-formu";
  let attempt = slug;
  let n = 1;
  while (true) {
    const existing = await prisma.registrationForm.findUnique({
      where: { slug: attempt },
    });
    if (!existing || existing.id === excludeId) return attempt;
    n += 1;
    attempt = `${slug}-${n}`;
  }
}

function parseFieldsFromFormData(formData: FormData): RegistrationFieldConfig[] {
  const keys = formData.getAll("field_keys") as string[];
  const fields: RegistrationFieldConfig[] = [];

  for (const key of keys) {
    const template = REGISTRATION_FIELD_TEMPLATES.find((t) => t.key === key);
    if (!template) continue;
    fields.push({
      ...template,
      required: formData.get(`field_required_${key}`) === "on",
    });
  }

  return fields;
}

export async function saveRegistrationForm(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  const id = (formData.get("id") as string) || null;
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const fields = parseFieldsFromFormData(formData);

  if (!title) return { ok: false, error: "Form başlığı gerekli" };
  if (fields.length === 0) {
    return { ok: false, error: "En az bir alan seçin" };
  }

  const published = formData.get("published") === "on";

  if (id) {
    const existing = await prisma.registrationForm.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "Form bulunamadı" };

    await prisma.registrationForm.update({
      where: { id },
      data: { title, description, fields, published },
    });
    revalidatePath("/admin/forms");
    revalidatePath(`/admin/forms/${id}`);
    revalidatePath(`/kayit/${existing.slug}`);
    return { ok: true, slug: existing.slug };
  }

  const slug = await uniqueFormSlug(title);
  await prisma.registrationForm.create({
    data: { slug, title, description, fields, published },
  });

  revalidatePath("/admin/forms");
  revalidatePath(`/kayit/${slug}`);
  return { ok: true, slug };
}

export async function deleteRegistrationForm(id: string) {
  const g = await guard();
  if (!g.ok) return g;

  const form = await prisma.registrationForm.findUnique({ where: { id } });
  await prisma.registrationForm.delete({ where: { id } });

  revalidatePath("/admin/forms");
  if (form) revalidatePath(`/kayit/${form.slug}`);
  return { ok: true };
}

export async function deleteRegistrationSubmission(id: string) {
  const g = await guard();
  if (!g.ok) return g;

  const sub = await prisma.registrationSubmission.findUnique({
    where: { id },
    include: { form: true },
  });
  if (!sub) return { ok: false, error: "Başvuru bulunamadı" };

  await prisma.registrationSubmission.delete({ where: { id } });
  revalidatePath(`/admin/forms/${sub.formId}`);
  return { ok: true };
}

export async function submitRegistrationForm(formData: FormData) {
  const slug = formData.get("slug") as string;
  const form = await prisma.registrationForm.findUnique({
    where: { slug, published: true },
  });

  if (!form) {
    return { ok: false, error: "Form bulunamadı veya yayında değil" };
  }

  const fields = form.fields as RegistrationFieldConfig[];
  const data: Record<string, string> = {};

  for (const field of fields) {
    const value = (formData.get(field.key) as string)?.trim() ?? "";
    if (field.required && !value) {
      return { ok: false, error: `${field.label} alanı zorunludur` };
    }
    if (value) data[field.key] = value;
  }

  await prisma.registrationSubmission.create({
    data: { formId: form.id, data },
  });

  revalidatePath(`/admin/forms/${form.id}`);
  return { ok: true };
}

export async function saveContactSettings(formData: FormData) {
  const g = await guard();
  if (!g.ok) return g;

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      hours: formData.get("hours") as string,
      whatsapp: formData.get("whatsapp") as string,
      mapEmbedUrl: (formData.get("mapEmbedUrl") as string) || null,
      instagram: (formData.get("instagram") as string) || null,
      facebook: (formData.get("facebook") as string) || null,
      youtube: (formData.get("youtube") as string) || null,
      footerTagline: (formData.get("footerTagline") as string) || null,
    },
    create: {
      id: "default",
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      hours: formData.get("hours") as string,
      whatsapp: formData.get("whatsapp") as string,
      mapEmbedUrl: (formData.get("mapEmbedUrl") as string) || null,
      instagram: (formData.get("instagram") as string) || null,
      facebook: (formData.get("facebook") as string) || null,
      youtube: (formData.get("youtube") as string) || null,
      footerTagline: (formData.get("footerTagline") as string) || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/iletisim");
  return { ok: true };
}
