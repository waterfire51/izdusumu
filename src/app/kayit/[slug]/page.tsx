import Image from "next/image";
import { notFound } from "next/navigation";
import { ClipboardText } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import RegistrationPublicForm from "@/components/RegistrationPublicForm";
import { getRegistrationFormBySlug } from "@/lib/content";

const PURPLE = "#8A4FFF";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = await getRegistrationFormBySlug(slug);
  if (!form) return { title: "Form Bulunamadı" };
  return {
    title: `${form.title} | Özel İzdüşümü Anaokulu`,
    description: form.description || "Kayıt formu",
  };
}

export default async function RegistrationFormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = await getRegistrationFormBySlug(slug);

  if (!form) notFound();

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
              <ClipboardText
                size={22}
                weight="duotone"
                className="text-[#FFD600]"
              />
              Kayıt Formu
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {form.title}
            </h1>
            {form.description ? (
              <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
                {form.description}
              </p>
            ) : null}
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

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <FadeIn className="mx-auto max-w-2xl">
            <RegistrationPublicForm slug={form.slug} fields={form.fields} />
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
