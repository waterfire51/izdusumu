export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  content: string[];
};

export const educationBlogPosts: BlogPost[] = [
  {
    slug: "oyun-temelli-ogrenme-neden-kalicidir",
    title: "Oyun temelli öğrenme neden kalıcıdır?",
    summary:
      "Okul öncesinde oyunla öğrenmenin bilişsel ve sosyal gelişime katkılarını anlatan rehber yazı.",
    date: "14 Nisan 2026",
    content: [
      "Oyun, okul öncesi dönemde çocuğun dünyayı anlamlandırdığı en güçlü öğrenme aracıdır. Çocuklar oyun sırasında merak eder, dener, hata yapar ve yeniden dener.",
      "Bu süreç, bilgiyi pasif biçimde almak yerine aktif olarak üretmesini sağlar. Bu nedenle oyunla edinilen bilgiler daha kalıcı hale gelir.",
      "İz Düşümü Anaokulu'nda uyguladığımız etkinliklerde çocukların sosyal etkileşim, problem çözme ve iletişim becerilerini birlikte destekliyoruz.",
      "Akademik kazanımları günlük oyun rutinleriyle birleştirerek çocukların öğrenmeyi keyifli bir deneyim olarak görmesine katkı sunuyoruz.",
    ],
  },
  {
    slug: "evde-rutin-olustururken-dikkat-edilmesi-gerekenler",
    title: "Evde rutin oluştururken dikkat edilmesi gerekenler",
    summary:
      "Ailelerin günlük planı çocuk gelişimine uygun şekilde düzenlemesi için pratik öneriler.",
    date: "10 Nisan 2026",
    content: [
      "Çocuklar için öngörülebilir günlük akışlar güven duygusunu artırır. Uyanma, yemek, oyun ve uyku saatlerinin belli bir sırada ilerlemesi gelişimi destekler.",
      "Rutin planlarken çocuğun yaşına ve dikkat süresine uygun kısa ve anlaşılır adımlar belirlemek önemlidir.",
      "Ev içinde küçük sorumluluklar vermek (oyuncak toplama, masa hazırlığına yardım etme gibi) özgüven ve aidiyet duygusunu güçlendirir.",
      "Aile içi tutarlı iletişim ve olumlu geri bildirim, rutinin sürdürülebilir olmasını kolaylaştırır.",
    ],
  },
];

