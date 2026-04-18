"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

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
            Ön kayıt
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
            Ön kayıt
          </Link>
        </div>
      </div>
    </header>
  );
}
