import Image from "next/image";
import {
  ChatCircleDots,
  PlayCircle,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import HomeTestimonials from "@/components/HomeTestimonials";

const PURPLE = "#8A4FFF";

const videoTestimonials = [
  {
    title: "Veli Görüşü 01",
    parent: "Elif Hanım",
    src: "/videos/hero-drone.mp4",
  },
  {
    title: "Veli Görüşü 02",
    parent: "Mehmet Bey",
    src: "/videos/hero-drone.mp4",
  },
  {
    title: "Veli Görüşü 03",
    parent: "Selin Hanım",
    src: "/videos/hero-drone.mp4",
  },
];

export const metadata = {
  title: "Veli Yorumlarımız | Özel İzdüşümü Anaokulu",
  description:
    "Velilerimizin yazılı ve videolu deneyimlerini bir arada inceleyin.",
};

export default function ParentTestimonialsPage() {
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
              <ChatCircleDots
                size={22}
                weight="duotone"
                className="text-[#FFD600]"
              />
              Veli Yorumlarımız
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Velilerimiz ne diyor?
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Ailelerimizin deneyimleriyle okul iklimimizi daha yakından tanıyın.
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

      <HomeTestimonials backgroundColor="white" showTopWave={false} />

      <section className="page-section bg-white">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <ChatCircleDots
                size={22}
                weight="duotone"
                className="text-fuchsia-600"
              />
              Videolu Veli Yorumları
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Ailelerimizden video mesajlar
            </h2>
            <p className="font-display mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
              Velilerimizin deneyimlerini kısa videolarla izleyebilir, okul
              ortamımız hakkında doğrudan geri bildirim alabilirsiniz.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videoTestimonials.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <article className="overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[6px_6px_0_#0f172a]">
                  <div className="relative aspect-[9/16] bg-slate-900">
                    <video
                      controls
                      preload="metadata"
                      className="h-full w-full object-cover"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute right-3 top-3 rounded-full border-2 border-black bg-[#FFD600] p-1.5 text-slate-900 shadow-[2px_2px_0_#0f172a]">
                      <PlayCircle size={20} weight="fill" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-sans text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="font-display mt-1 text-sm text-slate-600">
                      {item.parent}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
