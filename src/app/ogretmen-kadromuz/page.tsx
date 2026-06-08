import Image from "next/image";
import Link from "next/link";
import { Lightbulb, UsersThree } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { getTeachers } from "@/lib/content";
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

const PAGE_HEADER = {
  badgeLabel: "Öğretmen Kadrosu",
  title: "Alanında uzman, sevgi dolu ekip",
  subtitle:
    "Çocukların gelişimini destekleyen güçlü bir rehberlik ve eğitim kadrosu.",
};

const teacherAccent = ["#8A4FFF", "#f97316", "#6366f1", "#22c55e"] as const;

export const metadata = pageMetadata({
  title: "Niğde Anaokulu Öğretmen Kadrosu",
  description:
    "Niğde anaokulu İzdüşümü öğretmen kadrosu: alanında uzman, deneyimli ve sevgi dolu eğitimcilerle okul öncesi eğitim.",
  path: "/ogretmen-kadromuz",
  keywords: ["Niğde anaokulu öğretmenleri", "Niğde okul öncesi öğretmen kadrosu"],
});

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Öğretmen Kadromuz", path: "/ogretmen-kadromuz" },
        ])}
      />
      <section
        className="relative overflow-x-hidden pb-0"
        style={{
          backgroundColor: PURPLE,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      >
        <Container className="relative z-10 pb-6 pt-14 sm:pb-8 sm:pt-18">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
              <Lightbulb
                size={22}
                weight="duotone"
                className="text-[#FFD600]"
              />
              {PAGE_HEADER.badgeLabel}
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {PAGE_HEADER.title}
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              {PAGE_HEADER.subtitle}
            </p>
            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center justify-center rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              İletişime geç
            </Link>
          </FadeIn>
        </Container>

        <div className="pointer-events-none relative z-[1] w-full select-none">
          <div className="relative mx-auto w-full max-w-[100vw] aspect-[3840/468]">
            <Image
              src="/banner-bg-1.png"
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="page-section relative z-10 -mt-1 bg-white py-10 sm:py-12">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <UsersThree
                size={22}
                weight="duotone"
                className="text-fuchsia-600"
              />
              Ekibimiz
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Öğretmenlerimiz
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher, index) => (
              <FadeIn
                key={`${teacher.name}-${index}`}
                delay={index * 0.05}
                className="flex h-full flex-col rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a]"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-black text-xl font-bold text-white shadow-[3px_3px_0_#0f172a]"
                  style={{
                    backgroundColor: teacherAccent[index % teacherAccent.length],
                  }}
                  aria-hidden
                >
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 font-sans text-lg font-bold text-slate-900">
                  {teacher.name}
                </h3>
                <p className="mt-1 font-sans text-sm font-semibold text-fuchsia-700">
                  {teacher.role}
                </p>
                <p className="font-display mt-3 text-sm leading-relaxed text-slate-600">
                  {teacher.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <Container>
          <FadeIn className="flex flex-wrap items-center justify-center gap-4" delay={0.05}>
            <Link
              href="/kurumsal"
              className="inline-flex items-center justify-center rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Hakkımızda
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-8 py-3.5 font-sans text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Ana sayfaya dön
            </Link>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
