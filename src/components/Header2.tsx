"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  CaretDown,
  FacebookLogo,
  InstagramLogo,
  MagnifyingGlass,
  Phone,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Logo from "./Logo";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Kurumsal",
    href: "/kurumsal",
    children: [
      { label: "Hakkımızda", href: "/kurumsal" },
      { label: "Yönetim", href: "/kurumsal/yonetim" },
      { label: "Tüzük", href: "/kurumsal/tuzuk" },
      { label: "Projelerimiz", href: "/kurumsal/projelerimiz" },
    ],
  },
  {
    label: "Faaliyetlerimiz",
    href: "/faaliyetlerimiz",
    children: [
      {
        label: "Eğitim Hizmetlerimiz",
        href: "/faaliyetlerimiz/egitim-hizmetlerimiz",
        children: [
          { label: "Okul 1", href: "/faaliyetlerimiz/egitim-hizmetlerimiz/okul-1" },
          { label: "Okul 2", href: "/faaliyetlerimiz/egitim-hizmetlerimiz/okul-2" },
          { label: "Okul 3", href: "/faaliyetlerimiz/egitim-hizmetlerimiz/okul-3" },
        ],
      },
      {
        label: "Kurban Hizmetlerimiz",
        href: "/faaliyetlerimiz/kurban-hizmetlerimiz",
        children: [
          {
            label: "Yurtdışı Adak Kurban Bağışı",
            href: "/faaliyetlerimiz/kurban-hizmetlerimiz/yurtdisi-adak-kurban-bagisi",
          },
          {
            label: "Yurtiçi Adak Kurban Bağışı",
            href: "/faaliyetlerimiz/kurban-hizmetlerimiz/yurtici-adak-kurban-bagisi",
          },
          {
            label: "Kurbanla İlgili Fıkhi Bilgiler",
            href: "/faaliyetlerimiz/kurban-hizmetlerimiz/fikhi-bilgiler",
          },
        ],
      },
      {
        label: "Sosyal Hizmetlerimiz",
        href: "/faaliyetlerimiz/sosyal-hizmetlerimiz",
        children: [
          { label: "Gezi ve Etkinlikler", href: "/faaliyetlerimiz/sosyal-hizmetlerimiz/gezi-ve-etkinlikler" },
          { label: "Kültürel Faaliyetler", href: "/faaliyetlerimiz/sosyal-hizmetlerimiz/kulturel-faaliyetler" },
          { label: "Uluslararası Sempozyumlar", href: "/faaliyetlerimiz/sosyal-hizmetlerimiz/uluslararasi-sempozyumlar" },
          { label: "Hayır Pazarları", href: "/faaliyetlerimiz/sosyal-hizmetlerimiz/hayir-pazarlari" },
        ],
      },
      {
        label: "İnsani Yardım Hizmetlerimiz",
        href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz",
        children: [
          { label: "HÜDAYİ İNSANİ YARDIM BİRİMİ", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/hudayi" },
          { label: "AŞEVİ HİZMETLERİ", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/asevi" },
          { label: "RAMAZAN KUMANYASI VE İFTAR SOFRALARI", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/ramazan" },
          { label: "ERZAK VE GIDA YARDIMLARI", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/erzak-gida" },
          { label: "AYNİ VE NAKDİ YARDIMLAR", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/ayni-nakdi" },
          { label: "SU KUYUSU HİZMETLERİ", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/su-kuyusu" },
          { label: "CAMİ, MESCİT, OKUL, YURT VE YETİMHANE İNŞAATLARI", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/insaatlar" },
          { label: "SAĞLIK HİZMETLERİ", href: "/faaliyetlerimiz/insani-yardim-hizmetlerimiz/saglik" },
        ],
      },
    ],
  },
  {
    label: "Medya",
    href: "/galeri",
    children: [
      { label: "Video Galeri", href: "/galeri/video" },
      { label: "Foto Galeri", href: "/galeri" },
      { label: "Basında NİGEDER", href: "/duyurular/basinda-biz" },
    ],
  },
  {
    label: "Birimler",
    href: "/birimler",
    children: [
      { label: "Gençlik Merkezleri", href: "/birimler/genclik-merkezleri" },
      { label: "Kuran Kursları", href: "/birimler/kuran-kurslari" },
    ],
  },
  { label: "İletişim", href: "/iletisim" },
];

function DesktopMenuItem({ item }: { item: MenuItem }) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <div className="group relative">
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 px-2 py-7 text-[13px] font-bold text-slate-800 transition hover:text-[#b21f55]"
      >
        {item.label}
        {hasChildren ? <CaretDown size={12} weight="bold" /> : null}
      </Link>
      {hasChildren ? (
        <div className="invisible absolute left-0 top-full z-30 min-w-64 -translate-y-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="rounded-sm border border-slate-100 bg-white py-2 shadow-xl shadow-slate-900/10">
            {item.children?.map((child) => (
              <div key={child.href} className="group/sub relative">
                <Link
                  href={child.href}
                  className="flex items-center justify-between gap-4 px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:bg-[#f8f1f4] hover:text-[#b21f55]"
                >
                  <span>{child.label}</span>
                  {child.children?.length ? <CaretDown className="-rotate-90" size={12} weight="bold" /> : null}
                </Link>
                {child.children?.length ? (
                  <div className="invisible absolute left-full top-0 min-w-72 -translate-x-2 opacity-0 transition group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:translate-x-0 group-focus-within/sub:opacity-100">
                    <div className="rounded-sm border border-slate-100 bg-white py-2 shadow-xl shadow-slate-900/10">
                      {child.children.map((grandChild) => (
                        <Link
                          key={grandChild.href}
                          href={grandChild.href}
                          className="block px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:bg-[#f8f1f4] hover:text-[#b21f55]"
                        >
                          {grandChild.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileMenuItem({
  item,
  onNavigate,
  depth = 0,
}: {
  item: MenuItem;
  onNavigate: () => void;
  depth?: number;
}) {
  return (
    <div>
      <Link
        href={item.href}
        className={clsx(
          "block rounded-lg px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-[#f8f1f4] hover:text-[#b21f55]",
          depth === 1 && "ml-4 font-semibold",
          depth === 2 && "ml-8 text-xs font-semibold"
        )}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
      {item.children?.map((child) => (
        <MobileMenuItem
          key={child.href}
          item={child}
          onNavigate={onNavigate}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export default function Header2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm shadow-slate-900/5">
      <div className="border-b border-slate-100 bg-[#f7f9fd] text-[12px] font-semibold text-slate-600">
        <div className="mx-auto flex min-h-9 w-full max-w-6xl items-center justify-between gap-4 px-6 lg:px-10">
          <a href="tel:+905525310051" className="hidden items-center gap-1.5 transition hover:text-[#b21f55] sm:flex">
            <Phone size={14} weight="fill" />
            0 552 531 00 51
          </a>
          <p className="font-ananda mx-auto text-center text-[13px] font-semibold text-slate-700">
            Kaliteli eğitim, güçlü gelecek.
          </p>
          <div className="hidden items-center gap-3 text-slate-500 sm:flex">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition hover:text-[#b21f55]">
              <FacebookLogo size={14} weight="fill" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition hover:text-[#b21f55]">
              <TwitterLogo size={14} weight="fill" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:text-[#b21f55]">
              <InstagramLogo size={14} weight="fill" />
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition hover:text-[#b21f55]">
              <YoutubeLogo size={14} weight="fill" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 lg:px-10">
        <Logo className="py-4" />
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Ana menü">
          {menuItems.map((item) => (
            <DesktopMenuItem key={item.href} item={item} />
          ))}
        </nav>
        <div className="hidden items-center justify-end lg:flex">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-[#f8f1f4] hover:text-[#b21f55]"
            aria-label="Arama"
          >
            <MagnifyingGlass size={18} weight="bold" />
          </button>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-bold text-slate-900 shadow-sm transition hover:bg-slate-50 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <div
        className={clsx(
          "border-t border-slate-100 bg-white px-6 pb-6 pt-4 shadow-lg lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <MobileMenuItem
              key={item.href}
              item={item}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
