export const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/kurumsal" },
  { label: "Sınıflarımız", href: "/dersliklerimiz" },
  { label: "Galeri", href: "/galeri" },
  { label: "Duyurular", href: "/duyurular" },
  { label: "İletişim", href: "/iletisim" },
];

export const ageClasses = [
  {
    title: "2 Yaş",
    ageLabel: "( 2 yaş )",
    description:
      "2 yaş oyun temelli motor becerisi ile biliçsel alan",
    color: "#A855F7",
    icon: "eyeglasses" as const,
  },
  {
    title: "3–4 Yaş",
    ageLabel: "( 3 – 4 yaş )",
    description:
      "3-4 özbakım beceerisiile ince motor çalışması ile biliçsel alan",
    color: "#f97316",
    icon: "playground" as const,
  },
  {
    title: "4–5 Yaş",
    ageLabel: "( 4 – 5 yaş )",
    description:
      "4-5 öz denetim farkındalığı kendini tanıma ve keşfeden çocuk",
    color: "#db2777",
    icon: "abc" as const,
  },
  {
    title: "5–6 Yaş",
    ageLabel: "( 5 – 6 yaş )",
    description:
      "5-6 bireysel kinlikte üreten alan ve uygulayan çocuk",
    color: "#22c55e",
    icon: "puzzle" as const,
  },
];

export const popularClassTopics = [
  {
    label: "Kodlama",
    color: "#A855F7",
    icon: "code" as const,
  },
  {
    label: "Matematik",
    color: "#22c55e",
    icon: "math" as const,
  },
  {
    label: "Müzik",
    color: "#c4a574",
    icon: "music" as const,
  },
  {
    label: "Yazı",
    color: "#f97316",
    icon: "writing" as const,
  },
  {
    label: "Dil",
    color: "#818cf8",
    icon: "lang" as const,
  },
];

export const testimonials = [
  {
    name: "Elif Demir",
    role: "Anne",
    quote:
      "Çocuğumuzu emanet ettiğimiz bu kurumda hem güven hem de sıcaklık hissediyoruz. Günlük paylaşımlar ve öğretmen ilgisi harika.",
    rating: 5,
  },
  {
    name: "Mehmet Kaya",
    role: "Baba",
    quote:
      "Bahçe ve sınıf ortamı çok düzenli. Oyunla öğrenme yaklaşımı çocuğumuzun gelişimine çok şey kattı.",
    rating: 5,
  },
  {
    name: "Selin Aydın",
    role: "Anne",
    quote:
      "Veli iletişimi şeffaf; sorularımıza hızlı dönüş alıyoruz. Kesinlikle tavsiye ederim.",
    rating: 4,
  },
];

export const programs = [
  {
    title: "Erken Yaş Gelişim Atölyesi",
    description:
      "Oyun temelli etkinliklerle motor beceriler, dil ve sosyal gelişimi destekliyoruz.",
    icon: "🧸",
  },
  {
    title: "Bilim ve Keşif Köşesi",
    description:
      "Minik bilim insanları için güvenli deneyler ve merak uyandıran etkinlikler.",
    icon: "🔬",
  },
  {
    title: "Sanat ve Yaratıcılık",
    description:
      "Renk, doku ve ritimlerle çocukların kendini ifade etmesini sağlıyoruz.",
    icon: "🎨",
  },
];

/** Ana sayfa derslik carousel kartları (başlıklar / görseller; slug detay sayfasına gider) */
export const classroomShowcase = [
  {
    slug: "mavi-yildizlar",
    title: "Tiyatro Sınıfımız",
    ageRange: "3–6 yaş",
    duration: "50 dk",
    rating: 4.8,
    reviewCount: 42,
    teacherName: "Zeynep Yılmaz",
    teacherImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    color: "#f97316",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "gumus-kelebekler",
    title: "Oyun Sınıfımız",
    ageRange: "2–5 yaş",
    duration: "45 dk",
    rating: 4.9,
    reviewCount: 56,
    teacherName: "Elif Karaca",
    teacherImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    color: "#9333ea",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "gunes-cicekleri",
    title: "Sanat Atölyemiz",
    ageRange: "4–6 yaş",
    duration: "50 dk",
    rating: 4.7,
    reviewCount: 38,
    teacherName: "Mert Aydın",
    teacherImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    color: "#6366f1",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "gumus-kelebekler",
    title: "Müzik & Ritim",
    ageRange: "3–6 yaş",
    duration: "40 dk",
    rating: 4.6,
    reviewCount: 31,
    teacherName: "Seda Güneş",
    teacherImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    color: "#22c55e",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=900&auto=format&fit=crop",
  },
];

export const rooms = [
  {
    slug: "sinema-salonumuz",
    name: "Sinema Salonumuz",
    description:
      "Çocuklarımızın eğitsel film gösterimleri, belgesel izleme saatleri ve toplu etkinlik deneyimleri için hazırlanan keyifli alan.",
    image:
      "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "cocuk-kutuphanesi",
    name: "Çocuk Kütüphanesi",
    description:
      "Erken okuryazarlığı destekleyen, hikaye saatleri ve sessiz okuma etkinlikleriyle zenginleştirilmiş sıcak bir okuma köşesi.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "drama-atolyesi",
    name: "Drama Atölyesi",
    description:
      "Çocukların duygu ifade becerilerini, özgüvenlerini ve hayal güçlerini geliştiren canlandırma ve rol çalışmaları için tasarlandı.",
    image:
      "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564429097439-e4003827afc0?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "muzik-atolyesi",
    name: "Müzik Atölyesi",
    description:
      "Ritim, ses ve hareket odaklı etkinliklerle çocukların işitsel farkındalık ve yaratıcılık becerilerini destekleyen müzik alanı.",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "resim-atolyesi",
    name: "Resim Atölyesi",
    description:
      "Renk, doku ve farklı tekniklerle çocukların özgün üretimler yaptığı, hayal dünyalarını görsele dönüştürdüğü sanat ortamı.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502136969935-8d8eef54d77d?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "akil-ve-zeka-oyunlari-atolyesi",
    name: "Akıl ve Zeka Oyunları Atölyesi",
    description:
      "Dikkat, odaklanma, strateji kurma ve problem çözme becerilerini destekleyen eğitsel oyunlarla donatılmış atölye.",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606503153255-59d8b8b5b72c?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "ingilizce-sinifimiz",
    name: "İngilizce Sınıfımız",
    description:
      "Oyunlaştırılmış etkinlikler, şarkılar ve etkileşimli materyallerle yabancı dil farkındalığını erken yaşta destekleyen sınıf.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "spor-salonumuz",
    name: "Spor Salonumuz",
    description:
      "Büyük kas gelişimini destekleyen fiziksel aktiviteler, denge-koordinasyon çalışmaları ve hareket oyunları için planlanan kapalı alan.",
    image:
      "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "acik-oyun-alanimiz",
    name: "Açık Oyun Alanımız",
    description:
      "Doğayla temas eden etkinlikler, serbest oyun saatleri ve sosyal etkileşimi artıran açık hava aktiviteleri için güvenli bahçe alanı.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "kapali-oyun-alanimiz",
    name: "Kapalı Oyun Alanımız",
    description:
      "Hava koşullarından bağımsız şekilde hareket, denge ve grup oyunlarının sürdürülebildiği güvenli ve eğlenceli iç mekan oyun alanı.",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?q=80&w=1400&auto=format&fit=crop",
    ],
  },
];

export const teachers = [
  {
    name: "Elif Karaca",
    role: "Okul Müdürü",
    description: "15 yıllık okul öncesi eğitim tecrübesi ve liderlik vizyonu.",
  },
  {
    name: "Zeynep Yılmaz",
    role: "Rehberlik Uzmanı",
    description: "Çocuk ve aile danışmanlığı, gelişim takibi ve destek programları.",
  },
  {
    name: "Mert Aydın",
    role: "Sanat Eğitmeni",
    description: "Yaratıcı drama ve sanat atölyeleri ile çocukların ifade gücünü artırır.",
  },
  {
    name: "Seda Güneş",
    role: "İngilizce Öğretmeni",
    description: "Oyunlaştırılmış içeriklerle erken yaşta yabancı dil farkındalığı.",
  },
];

export const certificates = [
  "MEB onaylı okul öncesi eğitim programı",
  "ISO 9001 kalite yönetimi uygulamaları",
  "Güvenli okul sertifikası",
  "İlk yardım ve acil müdahale eğitimleri",
];

export const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop",
    alt: "Açık hava etkinliği",
    category: "Açık Hava",
  },
  {
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    alt: "Sanat çalışması",
    category: "Sanat",
  },
  {
    src: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?q=80&w=1200&auto=format&fit=crop",
    alt: "Drama etkinliği",
    category: "Drama",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    alt: "Grup çalışması",
    category: "Sınıf",
  },
  {
    src: "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?q=80&w=1200&auto=format&fit=crop",
    alt: "Bahçe oyunları",
    category: "Açık Hava",
  },
  {
    src: "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?q=80&w=1200&auto=format&fit=crop",
    alt: "Atölye çalışması",
    category: "Atölye",
  },
];

export const parentMenu = {
  announcements: [
    "Nisan ayı veli toplantısı 18 Nisan Cuma günü yapılacaktır.",
    "23 Nisan gösterisi için kostüm provaları başladı.",
    "Kış dönemi sağlık taraması planı güncellendi.",
  ],
  meals: [
    { day: "Pazartesi", menu: "Sebzeli makarna, yoğurt, meyve" },
    { day: "Salı", menu: "Mercimek çorbası, köfte, salata" },
    { day: "Çarşamba", menu: "Tavuklu pilav, ayran, mevsim meyvesi" },
  ],
  events: [
    { date: "15 Nisan", title: "Bahçe şenliği" },
    { date: "22 Nisan", title: "Bilim günü etkinliği" },
    { date: "30 Nisan", title: "Aile katılım atölyesi" },
  ],
  documents: [
    "Veli bilgilendirme formu",
    "Etkinlik izin belgesi",
    "Aylık gelişim raporu",
  ],
};

export const faqItems = [
  {
    question: "Okul saatleri nelerdir?",
    answer: "Hafta içi 08:30 - 17:30 saatleri arasında tam gün hizmet veriyoruz.",
  },
  {
    question: "Günlük bilgilendirme yapılıyor mu?",
    answer:
      "Her gün dijital bilgilendirme notu ve haftalık etkinlik raporu paylaşıyoruz.",
  },
  {
    question: "Ön kayıt için gerekli belgeler nelerdir?",
    answer:
      "Kimlik fotokopisi, sağlık beyanı ve ön kayıt formu yeterlidir.",
  },
];
