import Image from "next/image";
import Link from "next/link";
import {
  Certificate,
  Lightbulb,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { certificates, teachers } from "@/lib/data";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

const missionBlocks = [
  {
    title: "Misyonumuz",
    description:
      "Çocukların bilişsel, sosyal ve duygusal gelişimini destekleyen güvenli bir öğrenme alanı sunmak.",
    color: "#f97316",
  },
  {
    title: "Vizyonumuz",
    description:
      "Yaratıcı, mutlu ve özgüvenli bireyler yetiştiren öncü bir okul olmak.",
    color: "#A855F7",
  },
  {
    title: "Eğitim Yaklaşımımız",
    description:
      "Oyun temelli, proje destekli ve çocuk merkezli bir öğrenme modeli uyguluyoruz.",
    color: "#22c55e",
  },
];

const teacherAccent = ["#8A4FFF", "#f97316", "#6366f1", "#22c55e"] as const;

export const metadata = {
  title: "Kurumsal | Özel İzdüşümü Anaokulu",
  description: "Hakkımızda, eğitim yaklaşımımız ve öğretmen kadromuz.",
};

export default function CorporatePage() {
  return (
    <div>
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
              Kurumsal
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Sevgi, güven ve modern eğitim yaklaşımı
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Çocukların merakını destekleyen, ailelerle güçlü bağlar kuran bir
              okul öncesi deneyimi sunuyoruz.
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

      <section className="page-section relative z-10 -mt-1 bg-white">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <Lightbulb
                size={22}
                weight="duotone"
                className="text-amber-500"
              />
              Hakkımızda
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Misyon, vizyon ve yaklaşımımız
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Her çocuğun kendine özgü ritimde büyümesine inanıyoruz; güvenli
              ortamda oyun, sanat ve keşifle ilerliyoruz.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {missionBlocks.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div
                  className="flex h-full flex-col rounded-2xl border-2 border-black p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-7"
                  style={{ backgroundColor: item.color }}
                >
                  <h3 className="font-sans text-xl font-bold">{item.title}</h3>
                  <p className="font-display mt-3 text-sm leading-relaxed text-white/95">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="page-section relative overflow-x-hidden"
        style={{ backgroundColor: "#fce7f3" }}
      >
        <div className="relative -mt-px w-full select-none" aria-hidden>
          <div className="relative mx-auto w-full aspect-[3840/532] max-h-24 sm:max-h-28 md:max-h-32">
            <Image
              src="/banner-bg-2.png"
              alt=""
              fill
              className="object-cover object-bottom"
              sizes="100vw"
            />
          </div>
        </div>

        <Container className="relative z-10 pt-4">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <UsersThree
                size={22}
                weight="duotone"
                className="text-fuchsia-600"
              />
              Öğretmen Kadrosu
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Alanında uzman, sevgi dolu ekip
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Çocukların gelişimini destekleyen güçlü bir rehberlik ve eğitim
              kadrosu.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher, index) => (
              <FadeIn
                key={teacher.name}
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

      <section className="page-section bg-white">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <Certificate
                size={22}
                weight="duotone"
                className="text-amber-500"
              />
              Sertifikalar
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Güvenilir ve belgeli hizmet anlayışı
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Kalite ve güvenlik standartlarını sürekli geliştiriyoruz.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {certificates.map((certificate, i) => (
              <FadeIn key={certificate} delay={i * 0.04}>
                <div className="flex gap-4 rounded-2xl border-2 border-black bg-amber-50/80 p-5 shadow-[6px_6px_0_#0f172a] sm:p-6">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-black"
                    style={{ backgroundColor: YELLOW }}
                  >
                    <Certificate
                      size={26}
                      weight="duotone"
                      className="text-slate-900"
                    />
                  </div>
                  <p className="font-sans text-sm font-bold leading-snug text-slate-900 sm:text-base">
                    {certificate}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 text-center" delay={0.15}>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Ana sayfaya dön
            </Link>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
