import Image from "next/image";
import Link from "next/link";
import { Lightbulb, UsersThree } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { getAboutPage } from "@/lib/content";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

export const metadata = {
  title: "Kurumsal | Özel İzdüşümü Anaokulu",
  description: "Hakkımızda, misyonumuz, vizyonumuz ve eğitim anlayışımız.",
};

export default async function CorporatePage() {
  const page = await getAboutPage();

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
              {page.heroBadgeLabel}
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {page.heroTitle}
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              {page.heroSubtitle}
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
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <article className="h-full rounded-2xl border-2 border-black bg-orange-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-7">
                <h3 className="font-sans text-2xl font-bold">Misyonumuz</h3>
                <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
                  {page.missionText}
                </p>
              </article>
            </FadeIn>
            <FadeIn delay={0.06}>
              <article className="h-full rounded-2xl border-2 border-black bg-[#A855F7] p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-7">
                <h3 className="font-sans text-2xl font-bold">Vizyonumuz</h3>
                <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
                  {page.visionText}
                </p>
              </article>
            </FadeIn>
          </div>

          <FadeIn className="mt-6">
            <article className="rounded-2xl border-2 border-black bg-emerald-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-7">
              <h3 className="font-sans text-2xl font-bold">Eğitim Anlayışımız</h3>
              <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
                {page.educationModelText}
              </p>
            </article>
          </FadeIn>

          <FadeIn className="mt-6">
            <article className="relative overflow-hidden rounded-2xl border-2 border-black bg-amber-50 p-6 shadow-[6px_6px_0_#0f172a] sm:p-7">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border-4 border-black bg-[#FFD600]/80" />
              <div className="relative">
                <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-700">
                  {page.storyBadgeLabel}
                </p>
                <h3 className="mt-2 font-sans text-2xl font-bold text-slate-900">
                  {page.storyTitle}
                </h3>
                <p className="font-display mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {page.storyText}
                </p>
              </div>
            </article>
          </FadeIn>

          <FadeIn className="mt-8 text-center">
            <Link
              href="/ogretmen-kadromuz"
              className="inline-flex items-center gap-2 rounded-full border-4 border-black bg-fuchsia-100 px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              <UsersThree size={20} weight="duotone" className="text-fuchsia-600" />
              Öğretmen Kadromuzu Tanıyın
            </Link>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <Container>
          <FadeIn className="text-center" delay={0.05}>
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
