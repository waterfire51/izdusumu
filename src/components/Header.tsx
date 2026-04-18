"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-sky-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/iletisim"
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sky-600"
          >
            Ön Kayıt
          </Link>
        </div>
        <button
          type="button"
          className="flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-600 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Menüyü aç"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      <div
        className={clsx(
          "border-t border-sky-100 bg-white px-6 pb-6 pt-4 lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-4 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-sky-600"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className="rounded-full bg-sky-500 px-5 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-sky-600"
          >
            Ön Kayıt
          </Link>
        </div>
      </div>
    </header>
  );
}
