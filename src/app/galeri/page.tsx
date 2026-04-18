import Image from "next/image";
import Link from "next/link";
import {
  CaretRight,
  ImageSquare,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryItems } from "@/lib/data";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

export const metadata = {
  title: "Galeri | Özel İzdüşümü Anaokulu",
  description: "Etkinliklerden ve günlük yaşamdan kareler.",
};

export default function GalleryPage() {
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
              <ImageSquare
                size={22}
                weight="duotone"
                className="text-[#FFD600]"
              />
              Galeri
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Keşif dolu anlardan seçmeler
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Etkinlikler, atölyeler ve özel günlerden renkli kareler. Bir görsele
              tıklayarak büyütebilirsiniz.
            </p>
            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Bize ulaşın
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
              Fotoğraf albümü
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Okul yaşamımızdan
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Sınıf içi etkinlikler, bahçe oyunları ve sanat anlarından derlenen
              albümümüz.
            </p>
          </FadeIn>

          <FadeIn className="mt-12" delay={0.05}>
            <GalleryGrid items={galleryItems} />
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
