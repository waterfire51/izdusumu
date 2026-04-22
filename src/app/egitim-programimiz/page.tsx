import {
  BookOpenText,
  Lightbulb,
  PuzzlePiece,
  Student,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";

const PURPLE = "#8A4FFF";

export const metadata = {
  title: "Eğitim Programımız | Özel İzdüşümü Anaokulu",
  description:
    "Çift kanatlı eğitim anlayışımız, branş derslerimiz ve İnşa Erken Çocukluk Programı yaklaşımımız.",
};

export default function EducationProgramPage() {
  return (
    <div>
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
          <FadeIn className="rounded-2xl border-2 border-black bg-orange-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-8">
            <p className="font-display text-sm leading-relaxed text-white/95 sm:text-base">
              İz Düşümü Anaokulunda eğitim modelimiz; çocuklarımızın akademik,
              sosyal ve manevi gelişimini bir bütün olarak ele alan çift kanatlı
              eğitim anlayışına dayanmaktadır.
            </p>
            <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
              Bu modelde; çocuklarımızın zihinsel gelişimini destekleyen akademik
              çalışmalar ile sevgi, saygı, paylaşma ve sorumluluk gibi değerleri
              kazandıran manevi eğitim birlikte yürütülür. Oyun temelli öğrenme
              yaklaşımı ile çocuklarımız öğrenirken keyif alır, keşfeder ve kalıcı
              beceriler kazanır.
            </p>
            <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
              Günlük ve haftalık planlarla desteklenen eğitim programımız; her
              çocuğun bireysel gelişim hızına uygun olarak uygulanır ve düzenli
              olarak takip edilir. Amacımız; özgüvenli, mutlu, öğrenmeyi seven ve
              değerlerine bağlı bireyler yetiştirmektir.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <FadeIn className="rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#FFD600] text-slate-900">
                  <Student size={24} weight="duotone" />
                </div>
                <h2 className="font-sans text-xl font-bold text-slate-900">
                  Branş Dersleri
                </h2>
              </div>
              <p className="font-display mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                İngilizce, değerler eğitimi ve gelişim odaklı destekleyici
                branşlarla çocuklarımızın çok yönlü gelişimini destekliyoruz.
              </p>
            </FadeIn>

            <FadeIn
              delay={0.06}
              className="rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#A855F7] text-white">
                  <PuzzlePiece size={24} weight="duotone" />
                </div>
                <h2 className="font-sans text-xl font-bold text-slate-900">
                  Kullanılan Eğitim Sistemi
                </h2>
              </div>
              <p className="font-display mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                Maarif Modeliyle Birlikte İnşa Erken Çocukluk Eğitim Programı
                uygulanmaktadır.
              </p>
            </FadeIn>
          </div>

          <FadeIn
            delay={0.12}
            className="mt-8 rounded-2xl border-2 border-black bg-emerald-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <BookOpenText size={24} weight="duotone" className="text-white" />
              <h2 className="font-sans text-2xl font-bold">
                İnşa Erken Çocukluk Eğitim Programı
              </h2>
            </div>
            <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
              İnşa, okul öncesi çocuklara hizmet veren okullar için destek
              sağlayan kapsamlı bir eğitim, danışmanlık ve müfredat sistemidir.
              İnşa Erken Çocukluk Programı, bir ders planı ya da kitap seti
              olmaktan öte; kurumların ve öğretmenlerin gelişimini merkeze alan,
              çocuk dostu, insana ve doğaya saygılı, yaşam boyu öğrenmeyi savunan
              bütüncül bir okul öncesi yaklaşımıdır.
            </p>
            <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
              Programın merkezinde akademik çıktılar kadar değerler, kimlik
              inşası ve yaşam becerileri yer alır. Bu yolculuk sonunda çocukların
              Kendini Yöneten, Kendine Güvenen, Üretken, Aktif Katılan, Etkili
              Öğrenen, Değerlerine Bağlı, Ekolojik ve Sosyal Bilinçli bireyler
              olarak gelişmeleri hedeflenir ve bu hedef İnşa Kimliği olarak
              tanımlanır.
            </p>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
