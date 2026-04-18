import NextImage from "next/image";
import Link from "next/link";
import {
  CaretRight,
  EnvelopeSimple,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";
const GREEN = "#22c55e";

const inputClass =
  "mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black";

export const metadata = {
  title: "İletişim | Özel İzdüşümü Anaokulu",
  description: "İletişim formu ve ön kayıt başvurusu.",
};

export default function ContactPage() {
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
              <EnvelopeSimple
                size={22}
                weight="duotone"
                className="text-[#FFD600]"
              />
              İletişim
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Sorularınız için yanınızdayız
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Okulumuzu ziyaret etmek veya ön kayıt başvurusu oluşturmak için
              formu doldurun ya da doğrudan arayın.
            </p>
            <a
              href="tel:+905525310051"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Hemen ara
              <CaretRight size={18} weight="bold" />
            </a>
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

      <section
        id="formlar"
        className="page-section relative z-10 -mt-1 bg-white"
      >
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <Lightbulb
                size={22}
                weight="duotone"
                className="text-amber-500"
              />
              Başvuru
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Mesaj veya ön kayıt
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              İki ayrı formdan birini kullanabilirsiniz; en kısa sürede size
              dönüş yaparız.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <FadeIn delay={0.05}>
              <div className="h-full rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-8">
                <h3 className="font-sans text-xl font-bold text-slate-900">
                  İletişim formu
                </h3>
                <p className="font-display mt-1 text-sm text-slate-600">
                  Genel soru ve görüşleriniz için.
                </p>
                <form className="mt-6 space-y-4 text-sm">
                  <div>
                    <label className="font-semibold text-slate-900">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Adınız Soyadınız"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-900">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+90 5xx xxx xx xx"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-900">
                      Mesaj
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Size nasıl yardımcı olabiliriz?"
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full border-4 border-black px-6 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
                    style={{ backgroundColor: YELLOW }}
                  >
                    Mesajı gönder
                  </button>
                </form>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="h-full rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-8">
                <h3 className="font-sans text-xl font-bold text-slate-900">
                  Ön kayıt formu
                </h3>
                <p className="font-display mt-1 text-sm text-slate-600">
                  Çocuğunuz için ön bilgi talebi.
                </p>
                <form className="mt-6 space-y-4 text-sm">
                  <div>
                    <label className="font-semibold text-slate-900">
                      Çocuk adı
                    </label>
                    <input
                      type="text"
                      name="childName"
                      placeholder="Çocuk adı soyadı"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-900">Yaş</label>
                    <input
                      type="text"
                      name="age"
                      placeholder="Örn: 4 yaş"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-900">
                      Veli e-posta
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      placeholder="email@ornek.com"
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full border-4 border-black px-6 py-3.5 font-sans text-sm font-bold text-white shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
                    style={{ backgroundColor: GREEN }}
                  >
                    Ön kayıt oluştur
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Adres",
                description:
                  "Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1, Niğde",
                color: "#6366f1",
              },
              {
                title: "Telefon",
                description: "+90 552 531 00 51",
                href: "tel:+905525310051",
                color: "#f97316",
              },
              {
                title: "E-posta",
                description: "iletisim@izdusumuanaokulu.com",
                href: "mailto:iletisim@izdusumuanaokulu.com",
                color: "#A855F7",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <div
                  className="flex h-full flex-col rounded-2xl border-2 border-black p-6 text-white shadow-[6px_6px_0_#0f172a]"
                  style={{ backgroundColor: item.color }}
                >
                  <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-white/90">
                    {item.title}
                  </h4>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-display mt-3 text-sm font-semibold leading-relaxed text-white underline decoration-2 underline-offset-2 hover:text-white/90"
                    >
                      {item.description}
                    </a>
                  ) : (
                    <p className="font-display mt-3 text-sm leading-relaxed text-white/95">
                      {item.description}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 overflow-hidden rounded-2xl border-2 border-black shadow-[6px_6px_0_#0f172a]">
            <iframe
              title="İzdüşümü Anaokulu harita"
              src="https://maps.google.com/maps?q=37.95495419638933,34.67797850001159&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="h-56 w-full sm:h-72"
              loading="lazy"
            />
          </FadeIn>

          <FadeIn className="mt-10 text-center" delay={0.1}>
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
