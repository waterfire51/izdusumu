import Image from "next/image";
import Link from "next/link";
import {
  Lightbulb,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { teachers } from "@/lib/data";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

const missionText =
  "İz Düşümü Anaokulu olarak misyonumuz; çocukların bireysel farklılıklarını gözeterek her birine değer vermek, merak duygularını canlı tutarak öğrenmeye istekli bireyler olmalarını sağlamak ve akademik bilginin yanında değerler eğitimini de ön planda tutmaktır. Güvenli bir öğrenim ortamı oluşturarak çocukların özgüvenlerini geliştirmeyi, oyun yoluyla öğrenmeyi merkeze alarak eğlenceli ve kalıcı öğrenmeler sunmayı hedefliyoruz. Çocuklarda sorumluluk bilinci ve öz disiplin alışkanlığı kazandırmayı, sosyal becerilerini ve iletişim yeteneklerini desteklemeyi önemsiyoruz. Doğa sevgisi ve çevre bilinci kazandırarak; sanat, müzik ve spor gibi alanlarda yeteneklerini keşfetmelerine rehberlik ediyoruz. Milli ve manevi değerlerimizi içselleştirmelerini sağlarken problem çözme ve eleştirel düşünme becerilerini geliştirmeyi amaçlıyoruz. Ailelerimizle iş birliği içerisinde çocuklarımızın gelişimini destekleyen güçlü bir köprü kuruyor, temiz, düzenli ve sağlıklı yaşam bilincini kazandırıyoruz. Teknolojiyi doğru ve bilinçli kullanmayı öğretirken çocuklarımızda hayat boyu öğrenme sevgisi oluşturmayı temel görevimiz olarak görüyoruz.";

const visionText =
  "Vizyonumuz; çocukların gelecekte özgüvenli, üretken ve sorumluluk sahibi bireyler olmalarını sağlamak, hayal güçlerini geliştiren ve özgün fikirler üretebilen bireyler olarak yetişmelerine katkı sunmaktır. Topluma faydalı, manevi değerlerine bağlı, güçlü iletişim kurabilen ve empati sahibi nesiller yetiştirmeyi hedefliyoruz. Doğayı, insanı ve tüm canlıları seven bilinçli bireyler olmalarını desteklerken öğrenmeyi sadece okulda değil hayat boyu sürdürebilecekleri bir alışkanlık haline getirmeyi amaçlıyoruz. Geleceğin bilim insanları, sanatçıları, liderleri ve girişimcileri olabilecek bireyler yetiştirmeyi; çocukların kendi potansiyellerini fark edip en iyi şekilde değerlendirebilmelerini ve karşılaşacakları sorunlara yaratıcı çözümler üretebilmelerini önemsiyoruz. Milli kültürünü bilen ve evrensel değerlere açık bireyler yetiştirerek sağlıklı, mutlu ve huzurlu bir yaşam sürecine katkı sunmayı hedefliyoruz. Her öğrencinin ilgi ve yeteneğine uygun alanlarda başarılı olmasına rehberlik ederek değişen dünyaya uyum sağlayabilen yenilikçi bireyler yetiştiren, geleceğin liderlerini, öğretmenlerini, bilim insanlarını ve sanatçılarını geliştiren öncü bir eğitim kurumu olmayı amaçlıyoruz.";

const educationModelText =
  "Özel İz Düşümü Anaokulu olarak Geleceği Çocuklukla İnşa Ediyoruz anlayışıyla, okulumuzda uygulanan İnşa Erken Çocukluk Programı ile çocuklarımızın merak eden, üreten ve sorumluluk alan bireyler olarak yetişmesini hedefleyen bütüncül bir eğitim modeli sunuyoruz. Daha fazla çocukluk, daha iyi bir gelecek ilkesiyle eğitimi sınıf duvarlarının dışına taşıyarak hayatın merkezine yerleştiriyoruz. Eğitimde fark oluşturan yaklaşımlarımız kapsamında bütüncül gelişimi esas alıyor; 8 kök değer ve 160 günlük özgün içerikle zenginleştirilmiş müfredatımızda erken okuryazarlıktan matematik becerilerine kadar her alanı disiplinler arası bir bağla işliyoruz. Öğrenme sürecini doğa, oyun ve günlük yaşam rutinleriyle harmanlayarak duvarsız eğitim ve oyun anlayışıyla çocukların keşfetme ve düşünme becerilerini destekliyoruz. Değerler ve maneviyat alanında sevgi temelli yaklaşımla ve Kur'an-ı Kerim modülleriyle çocuklarımızın iç dünyasına ve anlam arayışlarına pedagojik bir derinlikle rehberlik ediyoruz. Akademik ve sosyal destek kapsamında ise İnşa Akademi'nin sunduğu profesyonel gelişim programları ve düzenli aile buluşmaları ile okul-aile-öğretmen üçgeninde güçlü bir gelişim ekosistemi kuruyoruz. Böylece çocuklarımızı sadece ilkokula değil; kendine güvenen, değerlerine bağlı ve dünyaya duyarlı bireyler olarak hayata hazırlıyoruz.";

const storyText =
  "Her çocuğun dünyaya bıraktığı bir iz olduğuna inanıyoruz. İz Düşümü Anaokulu, 2019 yılında çocukların sadece akademik olarak değil; sevgi temelli ve güçlü bir karakterle yetişmesi gerektiği düşüncesiyle kurulmuştur. Eğitim anlayışımızın temelinde, her çocuğun kendine özgü bir gelişim yolculuğu olduğu gerçeği yer alır. Kurulduğumuz günden bu yana amacımız; çocuklarımızın kendilerini güvende hissedecekleri, mutlu olacakları ve potansiyellerini özgürce ortaya koyabilecekleri bir ortam sunmaktır. Bu doğrultuda benimsediğimiz çift kanatlı eğitim modeli ile çocuklarımızın hem akademik gelişimini hem de manevi ve ahlaki değerlerini birlikte destekleyen dengeli bir eğitim yaklaşımı sunuyoruz. Bizim için anaokulu; yalnızca eğitim verilen bir kurum değil, çocukların ilk deneyimlerini yaşadığı, paylaşmayı öğrendiği, özgüven kazandığı ve hayata hazırlandığı, çocuğun kişilik ve karakterinin temellerinin atıldığı özel ve hayatının en önemli yaşam alanıdır. İz Düşümü Anaokulu olarak hedefimiz; merak eden, öğrenmeyi seven, özgüvenli ve değerlerine bağlı bireyler yetiştirmektir. Çocuklarımızın yüzündeki mutluluk ve velilerimizin bize duyduğu güven, en büyük motivasyonumuzdur. Bizler biliyoruz ki geleceğe bırakılan en güzel iz, iyi yetişmiş bir çocuktur.";

const teacherAccent = ["#8A4FFF", "#f97316", "#6366f1", "#22c55e"] as const;

export const metadata = {
  title: "Kurumsal | Özel İzdüşümü Anaokulu",
  description: "Hakkımızda, eğitim yaklaşımımız ve öğretmen kadromuz.",
};

export default function CorporatePage() {
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
              Kurumsal
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Sevgi, güven ve modern eğitim yaklaşımı
            </h1>
            <p className="font-sans mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
              Çocukların merakını destekleyen, ailelerle güçlü bağlar kuran bir
              okul öncesi deneyimi sunuyoruz.
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
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <Lightbulb
                size={22}
                weight="duotone"
                className="text-amber-500"
              />
              Hakkımızda
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Misyonumuz, vizyonumuz ve eğitim anlayışımız
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Çocukların çok yönlü gelişimini destekleyen, değer odaklı ve
              bütüncül bir eğitim yaklaşımı benimsiyoruz.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <article className="h-full rounded-2xl border-2 border-black bg-orange-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-7">
                <h3 className="font-sans text-2xl font-bold">Misyonumuz</h3>
                <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
                  {missionText}
                </p>
              </article>
            </FadeIn>
            <FadeIn delay={0.06}>
              <article className="h-full rounded-2xl border-2 border-black bg-[#A855F7] p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-7">
                <h3 className="font-sans text-2xl font-bold">Vizyonumuz</h3>
                <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
                  {visionText}
                </p>
              </article>
            </FadeIn>
          </div>

          <FadeIn className="mt-6">
            <article className="rounded-2xl border-2 border-black bg-emerald-500 p-6 text-white shadow-[6px_6px_0_#0f172a] sm:p-7">
              <h3 className="font-sans text-2xl font-bold">Eğitim Anlayışımız</h3>
              <p className="font-display mt-4 text-sm leading-relaxed text-white/95 sm:text-base">
                {educationModelText}
              </p>
            </article>
          </FadeIn>

          <FadeIn className="mt-6">
            <article className="relative overflow-hidden rounded-2xl border-2 border-black bg-amber-50 p-6 shadow-[6px_6px_0_#0f172a] sm:p-7">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border-4 border-black bg-[#FFD600]/80" />
              <div className="relative">
                <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-700">
                  Hikayemiz
                </p>
                <h3 className="mt-2 font-sans text-2xl font-bold text-slate-900">
                  2019&apos;dan bugüne sevgiyle büyüyen bir yolculuk
                </h3>
                <p className="font-display mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {storyText}
                </p>
              </div>
            </article>
          </FadeIn>
        </Container>
      </section>

      <section
        className="relative overflow-x-hidden py-10 sm:py-12"
        style={{ backgroundColor: "#fce7f3" }}
      >
        <div
          className="relative -mt-8 w-full select-none sm:-mt-10 md:-mt-12"
          aria-hidden
        >
          <div className="relative mx-auto w-full aspect-[3840/532] max-h-24 sm:max-h-28 md:max-h-32">
            <Image
              src="/banner-bg-2.png"
              alt=""
              fill
              className="object-cover object-bottom"
              sizes="100vw"
            />
          </div>
        </div>

        <Container className="relative z-10 pt-4">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <UsersThree
                size={22}
                weight="duotone"
                className="text-fuchsia-600"
              />
              Öğretmen Kadrosu
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Alanında uzman, sevgi dolu ekip
            </h2>
            <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
              Çocukların gelişimini destekleyen güçlü bir rehberlik ve eğitim
              kadrosu.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher, index) => (
              <FadeIn
                key={teacher.name}
                delay={index * 0.05}
                className="flex h-full flex-col rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a]"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-black text-xl font-bold text-white shadow-[3px_3px_0_#0f172a]"
                  style={{
                    backgroundColor: teacherAccent[index % teacherAccent.length],
                  }}
                  aria-hidden
                >
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 font-sans text-lg font-bold text-slate-900">
                  {teacher.name}
                </h3>
                <p className="mt-1 font-sans text-sm font-semibold text-fuchsia-700">
                  {teacher.role}
                </p>
                <p className="font-display mt-3 text-sm leading-relaxed text-slate-600">
                  {teacher.description}
                </p>
              </FadeIn>
            ))}
          </div>
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
