import NextImage from "next/image";
import Link from "next/link";
import {
  Bell,
  CalendarBlank,
  CaretRight,
  ClipboardText,
  FileText,
  ForkKnife,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { parentMenu } from "@/lib/data";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

export const metadata = {
  title: "Veli Menüsü | Özel İzdüşümü Anaokulu",
  description: "Duyurular, yemek listeleri ve etkinlik takvimi.",
};

export default function ParentsPage() {
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
              Veli menüsü
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Duyurular, yemek listesi ve etkinlik takvimi
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Veli bilgilendirmeleri, örnek yemek planı ve yaklaşan etkinlikler
              tek ekranda. Resmi belgeler için okul iletişim hattını
              kullanabilirsiniz.
            </p>
            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Okula ulaşın
              <CaretRight size={18} weight="bold" />
            </Link>
          </FadeIn>
        </Container>

        <div className="pointer-events-none relative z-[1] w-full select-none">
          <div className="relative mx-auto w-full max-w-[100vw] aspect-[3840/468]">
            <NextImage
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
              Güncel bilgiler
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Veliler için özet
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Aşağıdaki bilgiler örnektir; güncel duyurular için yönetimle
              iletişime geçin.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <FadeIn delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#0f172a]">
                <div
                  className="flex items-center gap-3 border-b-2 border-black px-5 py-4 text-white"
                  style={{ backgroundColor: "#f97316" }}
                >
                  <Bell size={26} weight="duotone" className="shrink-0" />
                  <h3 className="font-sans text-lg font-bold">Duyurular</h3>
                </div>
                <ul className="font-display space-y-3 p-5 text-sm leading-relaxed text-slate-700">
                  {parentMenu.announcements.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#0f172a]">
                <div
                  className="flex items-center gap-3 border-b-2 border-black px-5 py-4 text-white"
                  style={{ backgroundColor: "#22c55e" }}
                >
                  <ForkKnife size={26} weight="duotone" className="shrink-0" />
                  <h3 className="font-sans text-lg font-bold">Yemek listesi</h3>
                </div>
                <ul className="font-display space-y-3 p-5 text-sm leading-relaxed text-slate-700">
                  {parentMenu.meals.map((meal) => (
                    <li key={meal.day}>
                      <span className="font-bold text-slate-900">
                        {meal.day}:
                      </span>{" "}
                      {meal.menu}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#0f172a]">
                <div
                  className="flex items-center gap-3 border-b-2 border-black px-5 py-4 text-white"
                  style={{ backgroundColor: "#6366f1" }}
                >
                  <CalendarBlank
                    size={26}
                    weight="duotone"
                    className="shrink-0"
                  />
                  <h3 className="font-sans text-lg font-bold">
                    Etkinlik takvimi
                  </h3>
                </div>
                <ul className="font-display space-y-3 p-5 text-sm leading-relaxed text-slate-700">
                  {parentMenu.events.map((event) => (
                    <li key={event.title}>
                      <span className="font-bold text-slate-900">
                        {event.date}:
                      </span>{" "}
                      {event.title}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <FadeIn delay={0.05}>
              <div className="h-full rounded-2xl border-2 border-black bg-amber-50/90 shadow-[6px_6px_0_#0f172a]">
                <div className="flex items-center gap-3 border-b-2 border-black bg-[#FFD600] px-5 py-4">
                  <FileText
                    size={26}
                    weight="duotone"
                    className="shrink-0 text-slate-900"
                  />
                  <h3 className="font-sans text-lg font-bold text-slate-900">
                    Doküman paylaşımı
                  </h3>
                </div>
                <ul className="font-display space-y-3 p-5 text-sm text-slate-800">
                  {parentMenu.documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-2">
                      <span className="mt-0.5 text-base" aria-hidden>
                        📄
                      </span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-black p-6 shadow-[6px_6px_0_#0f172a] sm:p-7" style={{ backgroundColor: "#fce7f3" }}>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-800">
                    Gelecek özellik
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-bold text-slate-900">
                    Veli giriş paneli
                  </h3>
                  <p className="font-display mt-3 text-sm leading-relaxed text-slate-700">
                    Çok yakında kişiselleştirilmiş giriş ekranı ve bildirim
                    seçenekleriyle hizmetinizde olacak.
                  </p>
                </div>
                <Link
                  href="/iletisim"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border-4 border-black px-5 py-3 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
                  style={{ backgroundColor: YELLOW }}
                >
                  Bilgi alın
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-12 text-center" delay={0.15}>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Ana sayfaya dön
              <CaretRight size={18} weight="bold" />
            </Link>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
