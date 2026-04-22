import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CaretLeft,
  CaretRight,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { rooms } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);
  if (!room) return {};

  return {
    title: `${room.name} | Özel İzdüşümü Anaokulu`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);
  if (!room) notFound();

  const gallery = room.images?.length ? room.images : [room.image];

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
              <Lightbulb size={22} weight="duotone" className="text-[#FFD600]" />
              Derslik Detayı
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {room.name}
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Bu alana ait görselleri inceleyebilir, açıklama bölümünden detaylı
              bilgiye ulaşabilirsiniz.
            </p>
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
              Derslik Galerisi
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              {room.name} sınıfından kareler
            </h2>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {gallery.map((image, index) => (
                <div
                  key={`${room.slug}-${index}`}
                  className="relative h-64 w-[88vw] min-w-[88vw] overflow-hidden rounded-2xl border-2 border-black bg-slate-100 shadow-[6px_6px_0_#0f172a] sm:h-72 sm:w-[70vw] sm:min-w-[70vw] lg:h-80 lg:w-[520px] lg:min-w-[520px]"
                >
                  <Image
                    src={image}
                    alt={`${room.name} görsel ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 520px"
                  />
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <FadeIn delay={0.05}>
              <article className="rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-8">
                <h3 className="font-sans text-2xl font-bold text-slate-900">
                  Sınıf Açıklaması
                </h3>
                <p className="font-display mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {room.description}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <article className="flex h-full flex-col justify-between rounded-2xl border-2 border-black bg-fuchsia-50 p-6 shadow-[6px_6px_0_#0f172a] sm:p-7">
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-700">
                    Alan Bilgisi
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-slate-900">
                    {room.name}
                  </h3>
                  <p className="font-display mt-4 text-sm leading-relaxed text-slate-700">
                    Her derslik ve atölye alanımız, çocukların güvenli ve keyifli
                    şekilde öğrenme deneyimi yaşaması için düzenli olarak
                    güncellenir.
                  </p>
                </div>
                <Link
                  href="/iletisim"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-4 border-black px-6 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  style={{ backgroundColor: YELLOW }}
                >
                  Ön kayıt / İletişim
                  <CaretRight size={18} weight="bold" />
                </Link>
              </article>
            </FadeIn>
          </div>

          <FadeIn className="mt-10 text-center" delay={0.15}>
            <Link
              href="/dersliklerimiz"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2.5 font-sans text-sm font-bold text-slate-900 shadow-[3px_3px_0_#0f172a] transition hover:bg-amber-50"
            >
              <CaretLeft size={16} weight="bold" />
              Tüm dersliklere dön
            </Link>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
