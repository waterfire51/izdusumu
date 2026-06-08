import type { Metadata } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";

export const SEO = {
  siteName: "Özel İzdüşümü Anaokulu",
  brandShort: "İzdüşümü Anaokulu",
  locality: "Niğde",
  region: "Niğde",
  country: "TR",
  geo: {
    latitude: 37.95495419638933,
    longitude: 34.67797850001159,
  },
  address: {
    streetAddress: "Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1",
    addressLocality: "Niğde",
    addressRegion: "Niğde",
    postalCode: "51100",
    addressCountry: "TR",
  },
  keywords: [
    "Niğde anaokulu",
    "Niğde okul öncesi eğitim",
    "Niğde çift kanatlı eğitim",
    "Niğde özel anaokulu",
    "Niğde kreş",
    "Niğde anaokulu kayıt",
    "Niğde okul öncesi",
    "İzdüşümü Anaokulu",
    "özel anaokulu Niğde",
  ],
  defaultDescription:
    "Niğde'nin güvenilir özel anaokulu İzdüşümü; çift kanatlı okul öncesi eğitim, deneyimli öğretmen kadrosu ve güvenli eğitim ortamıyla 2-6 yaş çocuklarınız için yanınızda.",
  defaultOgImage: "/logo-footer.png",
} as const;

export const HOME_FAQ = [
  {
    question: "Niğde'de özel anaokulu arayan aileler neden İzdüşümü'yü tercih ediyor?",
    answer:
      "Özel İzdüşümü Anaokulu, Niğde'de çift kanatlı eğitim anlayışı, deneyimli öğretmen kadrosu, güvenli kampüs ortamı ve veli ile şeffaf iletişim modeliyle öne çıkar. 15 kişilik sınıflarla her çocuğa bireysel ilgi sunuyoruz.",
  },
  {
    question: "İzdüşümü Anaokulu'nda çift kanatlı eğitim nasıl uygulanıyor?",
    answer:
      "Niğde İzdüşümü Anaokulu'nda çift kanatlı eğitim; akademik gelişim ile sosyal-duygusal, sanat, hareket ve değerler eğitimini dengeli biçimde bir arada sunan program anlayışıdır. Oyun temelli öğrenme günlük rutinin merkezindedir.",
  },
  {
    question: "Okulunuz hangi yaş gruplarına hizmet veriyor?",
    answer:
      "Niğde okul öncesi eğitim programımız 2-6 yaş arası çocuklara yöneliktir. Yaş gruplarına uygun sınıf düzenleri ve gelişim odaklı etkinliklerle her dönem planlı ilerliyoruz.",
  },
  {
    question: "Niğde İzdüşümü Anaokulu kayıt süreci nasıl işliyor?",
    answer:
      "Kayıt için iletişim sayfamızdan görüşme talebi oluşturabilir veya telefon ve WhatsApp hattımızdan okulumuzla doğrudan iletişime geçebilirsiniz. Ailelerimize okul tanıtımı ve kayıt adımlarında rehberlik ediyoruz.",
  },
  {
    question: "Niğde anaokulu seçerken nelere dikkat etmeliyim?",
    answer:
      "Niğde anaokulu tercihinde öğretmen kadrosu, sınıf mevcudu, güvenlik, eğitim programının çocuğunuza uygunluğu ve okul-aile iletişimi önemlidir. İzdüşümü Anaokulu'nda tüm bu kriterleri şeffaf biçimde paylaşıyoruz.",
  },
] as const;

type SiteContact = {
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
};

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  absoluteTitle?: boolean;
};

export function defaultSiteMetadata(): Metadata {
  return pageMetadata({
    title: "Niğde Anaokulu | Özel İzdüşümü Anaokulu - Çift Kanatlı Okul Öncesi Eğitim",
    description: SEO.defaultDescription,
    path: "/",
    absoluteTitle: true,
  });
}

export function pageMetadata(opts: PageSeoOptions): Metadata {
  const url = opts.path ? absoluteUrl(opts.path) : SITE_URL;
  const keywords = [...new Set([...SEO.keywords, ...(opts.keywords ?? [])])];
  const ogImage = absoluteUrl(opts.ogImage ?? SEO.defaultOgImage);

  const title = opts.absoluteTitle
    ? { absolute: opts.title }
    : opts.title;

  return {
    title,
    description: opts.description,
    keywords: [...keywords],
    alternates: { canonical: url },
    openGraph: {
      title: typeof title === "string" ? title : opts.title,
      description: opts.description,
      url,
      siteName: SEO.siteName,
      locale: "tr_TR",
      type: "website",
      images: [{ url: ogImage, alt: SEO.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "string" ? title : opts.title,
      description: opts.description,
      images: [ogImage],
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
  };
}

export function buildPreschoolJsonLd(settings: SiteContact) {
  const sameAs = [settings.instagram, settings.facebook, settings.youtube].filter(
    Boolean
  ) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "Preschool",
    "@id": `${SITE_URL}/#preschool`,
    name: SEO.siteName,
    alternateName: [SEO.brandShort, "Niğde İzdüşümü Anaokulu", "Niğde Anaokulu"],
    description: SEO.defaultDescription,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    image: absoluteUrl(SEO.defaultOgImage),
    logo: absoluteUrl(SEO.defaultOgImage),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO.address.streetAddress,
      addressLocality: SEO.address.addressLocality,
      addressRegion: SEO.address.addressRegion,
      postalCode: SEO.address.postalCode,
      addressCountry: SEO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SEO.geo.latitude,
      longitude: SEO.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: SEO.locality,
      containedInPlace: { "@type": "AdministrativeArea", name: "Niğde" },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:30",
      },
    ],
    keywords: SEO.keywords.join(", "),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SEO.siteName,
    alternateName: SEO.brandShort,
    url: SITE_URL,
    description: SEO.defaultDescription,
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#preschool` },
  };
}

export function buildOrganizationJsonLd(settings: SiteContact) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SEO.siteName,
    url: SITE_URL,
    logo: absoluteUrl(SEO.defaultOgImage),
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO.address.streetAddress,
      addressLocality: SEO.address.addressLocality,
      addressRegion: SEO.address.addressRegion,
      postalCode: SEO.address.postalCode,
      addressCountry: SEO.address.addressCountry,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(
  faqs: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: { "@type": "Organization", name: SEO.siteName },
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SEO.defaultOgImage),
      },
    },
    ...(opts.imageUrl ? { image: opts.imageUrl } : {}),
  };
}
