import {
  BookOpenText,
  Lightbulb,
  PuzzlePiece,
  Student,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { getEducationProgramSections } from "@/lib/content";
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PURPLE = "#8A4FFF";

const iconMap = {
  student: Student,
  puzzle: PuzzlePiece,
  book: BookOpenText,
} as const;

function EducationIcon({
  icon,
  fallback: Fallback,
  className,
}: {
  icon: string | null | undefined;
  fallback: typeof Student;
  className?: string;
}) {
  const Icon =
    icon && icon in iconMap
      ? iconMap[icon as keyof typeof iconMap]
      : Fallback;
  return <Icon size={24} weight="duotone" className={className} />;
}

function ContentParagraphs({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (
        <p
          key={i}
          className={`font-display ${className}${i > 0 ? " mt-4" : ""}`}
        >
          {p}
        </p>
      ))}
    </>
  );
}

export const metadata = pageMetadata({
  title: "Niğde Çift Kanatlı Okul Öncesi Eğitim Programı",
  description:
    "Niğde çift kanatlı eğitim ve okul öncesi eğitim programımız: branş dersleri, oyun temelli öğrenme ve İnşa Erken Çocukluk Programı ile Niğde anaokulu standartlarında kaliteli eğitim.",
  path: "/egitim-programimiz",
  keywords: [
    "Niğde çift kanatlı eğitim",
    "Niğde okul öncesi eğitim programı",
  ],
});

export default async function EducationProgramPage() {
  const sections = await getEducationProgramSections();
  const byKey = Object.fromEntries(sections.map((s) => [s.key, s]));

  const intro = byKey.intro;
  const branch = byKey.branch_lessons;
  const system = byKey.education_system;
  const insa = byKey.insa_program;

  return (
    <div>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Eğitim Programı", path: "/egitim-programimiz" },
        ])}
      />
      <section
        className="relative overflow-hidden py-14 sm:py-18"
        style={{ backgroundColor: PURPLE }}
      >
        <Container className="relative z-10">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
              <Lightbulb
                size={22}
                weight="duotone"
                className="text-[#FFD600]"
              />
              Eğitim Programımız
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Eğitim Modelimiz
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="page-section bg-white">
        <Container>
          {intro ? (
            <FadeIn className="rounded-2xl border-2 border-black bg-orange-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-8">
              <ContentParagraphs
                text={intro.content}
                className="text-sm leading-relaxed text-white/95 sm:text-base"
              />
            </FadeIn>
          ) : null}

          {(branch || system) && (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {branch ? (
                <FadeIn className="rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#FFD600] text-slate-900">
                      <EducationIcon icon={branch.icon} fallback={Student} />
                    </div>
                    <h2 className="font-sans text-xl font-bold text-slate-900">
                      {branch.title}
                    </h2>
                  </div>
                  <p className="font-display mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {branch.content}
                  </p>
                </FadeIn>
              ) : null}

              {system ? (
                <FadeIn
                  delay={0.06}
                  className="rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#A855F7] text-white">
                      <EducationIcon icon={system.icon} fallback={PuzzlePiece} />
                    </div>
                    <h2 className="font-sans text-xl font-bold text-slate-900">
                      {system.title}
                    </h2>
                  </div>
                  <p className="font-display mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {system.content}
                  </p>
                </FadeIn>
              ) : null}
            </div>
          )}

          {insa ? (
            <FadeIn
              delay={0.12}
              className="mt-8 rounded-2xl border-2 border-black bg-emerald-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-8"
            >
              <div className="flex items-center gap-3">
                <EducationIcon
                  icon={insa.icon}
                  fallback={BookOpenText}
                  className="text-white"
                />
                <h2 className="font-sans text-2xl font-bold">{insa.title}</h2>
              </div>
              <ContentParagraphs
                text={insa.content}
                className="text-sm leading-relaxed text-white/95 sm:text-base"
              />
            </FadeIn>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
