import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
        <div className="space-y-4">
          <Logo footer />
          <p className="text-sm text-slate-600">
            Çocukların güvenle keşfettiği, velilerin huzurla desteklediği modern
            ve renkli bir eğitim yuvası.
          </p>
          <div className="flex gap-3 text-sm font-medium text-slate-600">
            <Link href="https://instagram.com" className="hover:text-sky-600">
              Instagram
            </Link>
            <Link href="https://facebook.com" className="hover:text-sky-600">
              Facebook
            </Link>
            <Link href="https://youtube.com" className="hover:text-sky-600">
              YouTube
            </Link>
          </div>
        </div>
        <div className="space-y-2 text-sm text-slate-600">
          <h3 className="text-base font-semibold text-slate-900">İletişim</h3>
          <p>
            Selçuk Mahallesi, Sabancı Bulvarı Caddesi No: 40/1, Niğde
          </p>
          <p>+90 552 531 00 51</p>
          <p>iletisim@izdusumuanaokulu.com</p>
          <p>Hafta içi 08:30 - 17:30</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Harita</h3>
          <div className="overflow-hidden rounded-2xl border border-sky-100 shadow-sm">
            <iframe
              title="İzdüşümü Anaokulu Harita"
              src="https://maps.google.com/maps?q=37.95495419638933,34.67797850001159&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="h-48 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-sky-100 py-4 text-center text-xs text-slate-500">
        © 2026 Özel İzdüşümü Anaokulu. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
