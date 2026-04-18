"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type GalleryItem = {
  src: string;
  alt: string;
  category: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            className="group mb-6 w-full break-inside-avoid overflow-hidden rounded-2xl border-2 border-black bg-white text-left shadow-[6px_6px_0_#0f172a] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#0f172a]"
            onClick={() => setActive(item)}
          >
            <div className="relative w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                width={520}
                height={360}
                className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t-2 border-black bg-amber-50 px-4 py-3 text-sm">
              <span className="font-bold text-slate-900">{item.category}</span>
              <span className="shrink-0 font-semibold text-fuchsia-700 underline decoration-2 underline-offset-2">
                Büyüt
              </span>
            </div>
          </button>
        ))}
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6 transition",
          active ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setActive(null)}
        role="presentation"
      >
        {active ? (
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-black bg-white p-3 shadow-[8px_8px_0_#0f172a] sm:p-4"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 rounded-full border-2 border-black bg-[#FFD600] px-4 py-1.5 text-sm font-bold text-slate-900 shadow-[3px_3px_0_#0f172a] transition hover:brightness-95"
              onClick={() => setActive(null)}
            >
              Kapat
            </button>
            <Image
              src={active.src}
              alt={active.alt}
              width={1200}
              height={800}
              className="h-full w-full rounded-xl object-cover"
            />
            <p className="mt-3 text-center text-sm font-semibold text-slate-800">
              {active.category}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
