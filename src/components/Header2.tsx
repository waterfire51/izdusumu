"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Logo from "./Logo";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";
const navLinks = [
  { label: "Sınıflarımız", href: "/dersliklerimiz" },
  { label: "Galeri", href: "/galeri" },
  { label: "Duyurular", href: "/duyurular" },
  { label: "İletişim", href: "/iletisim" },
];

const aboutLinks = [
  { label: "Hakkımızda", href: "/kurumsal" },
  { label: "Eğitim Programımız", href: "/egitim-programimiz" },
  { label: "Veli Yorumlarımız", href: "/veli-yorumlarimiz" },
];

export default function Header2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white/95 shadow-[0_4px_0_0_rgba(15,23,42,0.06)] backdrop-blur-md">
      <div
        className="h-1 w-full"
        style={{ backgroundColor: PURPLE }}
        aria-hidden
      />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5 lg:px-10 lg:py-4">
        <Logo />
        <nav className="hidden items-center gap-1 text-sm font-bold text-slate-800 lg:flex">
          <Link
            href="/"
            className="rounded-full px-3 py-2 font-bold text-slate-800 transition hover:bg-amber-50"
          >
            <span className="border-b-2 border-transparent pb-0.5 transition hover:border-[#8A4FFF] hover:text-[#8A4FFF]">
              Ana Sayfa
            </span>
          </Link>
          <div className="group relative">
            <Link
              href="/kurumsal"
              className="rounded-full px-3 py-2 font-bold text-slate-800 transition hover:bg-amber-50"
            >
              <span className="border-b-2 border-transparent pb-0.5 transition group-hover:border-[#8A4FFF] group-hover:text-[#8A4FFF]">
                Hakkımızda
              </span>
            </Link>
            <div className="invisible absolute left-0 top-full z-20 min-w-56 pt-7 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="translate-y-2 rounded-2xl border-2 border-black bg-white p-2 shadow-[4px_4px_0_#0f172a] transition group-hover:translate-y-0 group-focus-within:translate-y-0">
              {aboutLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-800 transition hover:bg-amber-50 hover:text-[#8A4FFF]"
                >
                  {link.label}
                </Link>
              ))}
              </div>
            </div>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 font-bold text-slate-800 transition hover:bg-amber-50"
            >
              <span className="border-b-2 border-transparent pb-0.5 transition hover:border-[#8A4FFF] hover:text-[#8A4FFF]">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/iletisim"
            className="rounded-full border-4 border-black px-5 py-2 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            style={{ backgroundColor: YELLOW }}
          >
            Randevu Al
          </Link>
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white text-lg font-bold text-slate-900 shadow-[3px_3px_0_#0f172a] transition hover:brightness-95 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <div
        className={clsx(
          "border-t-2 border-black bg-amber-50/95 px-6 pb-6 pt-4 backdrop-blur-sm lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-2 text-sm font-bold text-slate-900">
          <Link
            href="/"
            className="rounded-xl border-2 border-black bg-white px-4 py-3 shadow-[3px_3px_0_#0f172a] transition hover:bg-amber-100"
            onClick={() => setOpen(false)}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/kurumsal"
            className="rounded-xl border-2 border-black bg-white px-4 py-3 shadow-[3px_3px_0_#0f172a] transition hover:bg-amber-100"
            onClick={() => setOpen(false)}
          >
            Hakkımızda
          </Link>
          {aboutLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="ml-4 rounded-xl border-2 border-black bg-white px-4 py-3 shadow-[3px_3px_0_#0f172a] transition hover:bg-amber-100"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border-2 border-black bg-white px-4 py-3 shadow-[3px_3px_0_#0f172a] transition hover:bg-amber-100"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className="mt-2 rounded-full border-4 border-black px-5 py-3 text-center text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a]"
            style={{ backgroundColor: YELLOW }}
            onClick={() => setOpen(false)}
          >
            Randevu Al
          </Link>
        </div>
      </div>
    </header>
  );
}
