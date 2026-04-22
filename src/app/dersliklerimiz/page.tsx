import Image from "next/image";
import Link from "next/link";
import {
  CaretRight,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { rooms } from "@/lib/data";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

const roomAccent = [
  "#9333ea",
  "#6366f1",
  "#f97316",
  "#22c55e",
  "#db2777",
  "#0ea5e9",
] as const;

export const metadata = {
  title: "Dersliklerimiz | Özel İzdüşümü Anaokulu",
  description: "Okulumuzdaki tüm derslik ve atölye alanlarını keşfedin.",
};

export default function RoomsPage() {
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
              Derslikler
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Öğrenme ve etkinlik alanlarımız
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Sinema salonundan atölyelere, oyun alanlarından spor salonuna kadar
              tüm alanlarımızı yakından inceleyin.
            </p>
            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Ön kayıt / İletişim
              <CaretRight size={18} weight="bold" />
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
              Sınıflarımız
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Dersliklerimiz
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Eğitim ve gelişimi destekleyen sınıf, atölye ve oyun alanlarımız.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, index) => {
              const color = roomAccent[index % roomAccent.length];
              return (
                <FadeIn key={room.slug} delay={index * 0.06}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#0f172a]">
                    <div className="relative aspect-[5/4] w-full shrink-0">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div
                      className="flex flex-1 flex-col px-4 pb-4 pt-4 text-white sm:px-5 sm:pb-5 sm:pt-5"
                      style={{ backgroundColor: color }}
                    >
                      <h3 className="font-sans mt-3 text-left text-lg font-bold leading-snug sm:text-xl">
                        {room.name}
                      </h3>
                      <p className="font-display mt-3 text-sm leading-relaxed text-white/95">
                        {room.description}
                      </p>
                      <div className="mt-4 border-t border-white/25 pt-4">
                        <Link
                          href={`/dersliklerimiz/${room.slug}`}
                          className="inline-flex items-center gap-1 font-sans text-sm font-bold text-white underline decoration-2 underline-offset-2 hover:text-white/90"
                        >
                          Detayları incele
                          <CaretRight size={16} weight="bold" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
