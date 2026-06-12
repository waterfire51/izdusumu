import Link from "next/link";
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import Logo from "./Logo";

type FooterColumn = {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/kurumsal" },
      { label: "Yönetim", href: "/kurumsal/yonetim" },
      { label: "Tüzük", href: "/kurumsal/tuzuk" },
      { label: "Projelerimiz", href: "/kurumsal/projelerimiz" },
    ],
  },
  {
    title: "Faaliyetlerimiz",
    links: [
      { label: "Eğitim Hizmetleri", href: "/faaliyetlerimiz/egitim-hizmetlerimiz" },
      { label: "Kurban Hizmetleri", href: "/faaliyetlerimiz/kurban-hizmetlerimiz" },
      { label: "Sosyal Hizmetler", href: "/faaliyetlerimiz/sosyal-hizmetlerimiz" },
      { label: "İnsani Yardım", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz" },
    ],
  },
  {
    title: "Sosyal Medya",
    links: [
      { label: "Facebook", href: "https://facebook.com", external: true },
      { label: "Instagram", href: "https://instagram.com", external: true },
      { label: "YouTube", href: "https://youtube.com", external: true },
    ],
  },
  {
    title: "Programlarımız",
    links: [
      { label: "Video Galeri", href: "/galeri/video" },
      { label: "Foto Galeri", href: "/galeri" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
];

type SiteSettings = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  footerTagline?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
};

export default function Footer2({ settings }: { settings?: SiteSettings }) {
  const address =
    settings?.address ??
    "Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1, Niğde";
  const phone = settings?.phone ?? "+90 552 531 00 51";
  const email = settings?.email ?? "iletisim@izdusumuanaokulu.com";
  const whatsapp = `https://wa.me/${phone.replace(/\D/g, "")}`;

  return (
    <footer className="mt-auto bg-[#eef4fb] text-slate-700">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo footer />
          <Link
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm font-bold text-slate-800 transition hover:text-[#b21f55]"
          >
            WhatsApp Kanalımıza Katılın. Tüm gelişmelerden haberdar olun!
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#25d366] text-white">
              <WhatsappLogo size={20} weight="fill" />
            </span>
          </Link>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1.45fr_repeat(4,1fr)]">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">İletişim Kanallarımız</h3>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              <li className="flex gap-3">
                <MapPin size={18} weight="duotone" className="mt-0.5 shrink-0 text-[#3f84c3]" />
                <span>{address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} weight="duotone" className="mt-0.5 shrink-0 text-[#3f84c3]" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-[#b21f55]">
                  {phone}
                </a>
              </li>
              <li className="flex gap-3">
                <EnvelopeSimple size={18} weight="duotone" className="mt-0.5 shrink-0 text-[#3f84c3]" />
                <a href={`mailto:${email}`} className="break-all hover:text-[#b21f55]">
                  {email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3 text-slate-500">
              {[
                { icon: FacebookLogo, href: settings?.facebook ?? "https://facebook.com", label: "Facebook" },
                { icon: InstagramLogo, href: settings?.instagram ?? "https://instagram.com", label: "Instagram" },
                { icon: YoutubeLogo, href: settings?.youtube ?? "https://youtube.com", label: "YouTube" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="transition hover:text-[#b21f55]"
                  >
                    <Icon size={18} weight="fill" />
                  </Link>
                );
              })}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-extrabold text-slate-800">{column.title}</h3>
              <ul className="mt-5 space-y-2 text-sm font-medium">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="transition hover:text-[#b21f55]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs font-semibold text-slate-500">
        <p>Copyright © 2026 - Her hakkı saklıdır.</p>
        <p className="mt-2">
          Web sitesi{" "}
          <a
            href="https://bayabireklam.com"
            rel="noopener noreferrer"
            target="_blank"
            className="font-bold text-slate-700 transition hover:text-[#b21f55]"
          >
            Bayabireklam
          </a>{" "}
          tarafından hazırlanmıştır.
        </p>
      </div>
    </footer>
  );
}
