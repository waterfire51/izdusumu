"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ChartBar,
  FilmStrip,
  House,
  Info,
  Megaphone,
  Chalkboard,
  ChalkboardTeacher,
  ChatCircleDots,
  ClipboardText,
  GraduationCap,
  ImageSquare,
  NewspaperClipping,
  Phone,
  SignOut,
  UsersThree,
} from "@phosphor-icons/react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: ChartBar },
  { href: "/admin/analytics", label: "Analitik", icon: ChartBar },
  { href: "/admin/hero", label: "Tanıtım Filmi", icon: FilmStrip },
  { href: "/admin/home-about", label: "Neden Biz", icon: ChatCircleDots },
  { href: "/admin/about", label: "Hakkımızda", icon: Info },
  { href: "/admin/teachers", label: "Öğretmen Kadrosu", icon: ChalkboardTeacher },
  { href: "/admin/education", label: "Eğitim Programı", icon: GraduationCap },
  { href: "/admin/testimonials", label: "Veli Yorumları", icon: UsersThree },
  { href: "/admin/rooms", label: "Sınıflarımız", icon: Chalkboard },
  { href: "/admin/gallery", label: "Galeri", icon: ImageSquare },
  { href: "/admin/announcements", label: "Duyurular", icon: Megaphone },
  { href: "/admin/blog", label: "Blog & Basın", icon: NewspaperClipping },
  { href: "/admin/forms", label: "Kayıt Formları", icon: ClipboardText },
  { href: "/admin/contact", label: "İletişim Bilgileri", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1c2434] text-white">
      <div className="border-b border-white/10 px-4 py-5">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo-footer.png"
            alt="Özel İzdüşümü Anaokulu"
            width={120}
            height={40}
            className="h-9 w-auto shrink-0 object-contain object-left"
            priority
          />
          <div className="min-w-0 leading-tight text-white">
            <p className="truncate text-sm font-bold">İz Düşümü</p>
            <p className="truncate text-xs font-medium text-white/80">
              Yönetim Paneli
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="space-y-1">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-[#3c50e0] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon size={20} weight={active ? "fill" : "regular"} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          target="_blank"
          className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <House size={18} />
          Siteyi Görüntüle
        </Link>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-white/10"
          >
            <SignOut size={18} />
            Çıkış Yap
          </button>
        </form>
      </div>
    </aside>
  );
}
