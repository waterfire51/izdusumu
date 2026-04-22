export type PressPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  content: string[];
};

export const pressPosts: PressPost[] = [
  {
    slug: "bahar-senligi-yerel-basinda",
    title: "İz Düşümü Anaokulu'nda bahar şenliği yerel basında",
    summary:
      "Bahar şenliğimizin çocuk gelişimine katkıları ve etkinlik detayları yerel haberlerde paylaşıldı.",
    date: "12 Nisan 2026",
    source: "Niğde Yerel Haber",
    content: [
      "Bahar şenliğimizde çocuklarımız doğa temalı oyunlar, sanat atölyeleri ve sahne etkinlikleriyle keyifli bir gün geçirdi.",
      "Etkinlikte aile katılımı, sosyal etkileşim ve birlikte üretme kültürü ön plana çıkarıldı.",
      "Yerel basın, okul-aile iş birliğiyle yürüttüğümüz bu modeli örnek uygulama olarak değerlendirdi.",
    ],
  },
  {
    slug: "degerler-egitimi-paneli-katilimi",
    title: "Erken çocuklukta değerler eğitimi paneline katılım",
    summary:
      "Okulumuz, erken çocukluk döneminde değerler eğitimi yaklaşımını uzman panelinde paylaştı.",
    date: "08 Nisan 2026",
    source: "Eğitim Gündemi",
    content: [
      "Panelde sevgi temelli iletişim, günlük rutinde değer aktarımı ve oyunlaştırılmış öğrenme örnekleri sunuldu.",
      "Öğretmenlerimizin sınıf içi uygulamaları katılımcılarla paylaşılırken aile katılımının önemi vurgulandı.",
      "Program sonunda kurumlar arası iyi uygulama paylaşımı için ortak çalışma önerileri geliştirildi.",
    ],
  },
  {
    slug: "duvarsiz-egitim-roportaji",
    title: "Duvarsız eğitim yaklaşımımız üzerine röportaj",
    summary:
      "Duvarsız eğitim anlayışımız ve saha uygulamalarımız üzerine kapsamlı bir röportaj yayınlandı.",
    date: "03 Nisan 2026",
    source: "Çocuk ve Eğitim Dergisi",
    content: [
      "Röportajda öğrenmeyi sınıf duvarlarının dışına taşıyan etkinlik planlamalarımızdan örnekler paylaşıldı.",
      "Doğa, sanat ve hareket temelli etkinliklerin çocukların problem çözme becerilerine katkısı değerlendirildi.",
      "Kurumsal hedefimiz olarak çocukların merak eden, üreten ve sosyal açıdan duyarlı bireyler olarak yetişmesi vurgulandı.",
    ],
  },
];

