import Link from "next/link";
import {
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;

export default function Footer2() {
  return (
    <footer className="mt-auto border-t-2 border-black bg-amber-50/50">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-10">
          <div>
            <Logo footer />
            <p className="font-display mt-4 max-w-sm text-sm leading-relaxed text-slate-700">
              Çocukların güvenle keşfettiği, velilerin huzurla desteklediği
              modern ve renkli bir eğitim yuvası.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {social.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-full border-2 border-black bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-[3px_3px_0_#0f172a] transition hover:-translate-y-0.5 hover:bg-amber-100"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex items-center justify-center rounded-full border-4 border-black px-6 py-2.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Ön kayıt / İletişim
            </Link>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-[0.15em] text-slate-800">
              Menü
            </h3>
            <ul className="mt-4 space-y-2 font-display text-sm font-semibold text-slate-800">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block border-b-2 border-transparent transition hover:border-[#8A4FFF] hover:text-[#8A4FFF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/duyurular"
                  className="inline-block border-b-2 border-transparent transition hover:border-[#8A4FFF] hover:text-[#8A4FFF]"
                >
                  Duyurular
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-[0.15em] text-slate-800">
              İletişim
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-800">
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#0f172a]"
                  aria-hidden
                >
                  <MapPin size={18} weight="duotone" className="text-fuchsia-600" />
                </span>
                <span className="font-display leading-snug">
                  Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1, Niğde
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#0f172a]"
                  aria-hidden
                >
                  <Phone size={18} weight="duotone" className="text-fuchsia-600" />
                </span>
                <a
                  href="tel:+905525310051"
                  className="font-display font-bold hover:text-[#8A4FFF]"
                >
                  +90 552 531 00 51
                </a>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#0f172a]"
                  aria-hidden
                >
                  <EnvelopeSimple
                    size={18}
                    weight="duotone"
                    className="text-fuchsia-600"
                  />
                </span>
                <a
                  href="mailto:iletisim@izdusumuanaokulu.com"
                  className="font-display break-all font-semibold hover:text-[#8A4FFF]"
                >
                  iletisim@izdusumuanaokulu.com
                </a>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white shadow-[2px_2px_0_#0f172a]"
                  aria-hidden
                >
                  <Clock size={18} weight="duotone" className="text-fuchsia-600" />
                </span>
                <span className="font-display font-medium">
                  Hafta içi 08:30 - 17:30
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="border-t-2 border-black px-4 py-4 text-center text-xs font-semibold text-white sm:text-sm"
        style={{ backgroundColor: PURPLE }}
      >
        <p>© 2026 Özel İzdüşümü Anaokulu. Tüm hakları saklıdır.</p>
        <p className="mt-2 text-white/90">
          Web sitesi{" "}
          <a
            href="https://bayabireklam.com"
            rel="noopener noreferrer"
            target="_blank"
            className="font-bold text-white underline decoration-2 underline-offset-2 transition hover:text-[#FFD600]"
          >
            Bayabireklam
          </a>{" "}
          tarafından hazırlanmıştır.
        </p>
      </div>
    </footer>
  );
}
