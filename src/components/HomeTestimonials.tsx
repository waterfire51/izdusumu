"use client";

import { useCallback, useEffect, useState } from "react";
import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import { testimonials } from "@/lib/data";

type TestimonialItem = {
  name: string;
  role?: string | null;
  quote?: string | null;
  rating?: number | null;
};

type HomeTestimonialsProps = {
  backgroundColor?: "pink" | "white";
  showTopWave?: boolean;
  items?: TestimonialItem[];
};

export default function HomeTestimonials({
  backgroundColor = "white",
  items,
}: HomeTestimonialsProps) {
  const list = items ?? testimonials;
  const [index, setIndex] = useState(0);
  const n = Math.max(list.length, 1);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  useEffect(() => {
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [next]);

  if (list.length === 0) return null;

  const item = list[index] ?? list[0];
  const rating = item.rating ?? 5;

  return (
    <section
      className="bg-white py-14 text-center md:py-16"
      style={{ backgroundColor: backgroundColor === "white" ? "#ffffff" : "#f8fbff" }}
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        <h2 className="text-2xl font-bold text-[#8f2548]">Veli Yorumları</h2>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Önceki yorum"
            onClick={prev}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#b21f55] hover:text-[#b21f55] sm:flex"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          <article className="min-h-44 flex-1">
            <div className="flex justify-center gap-1 text-[#b21f55]">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={22} weight={i < rating ? "fill" : "regular"} />
              ))}
            </div>
            <p className="mt-5 text-lg font-bold text-slate-800">{item.name}</p>
            <p className="text-sm font-semibold text-slate-500">{item.role}</p>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600">
              {item.quote}
            </p>
          </article>

          <button
            type="button"
            aria-label="Sonraki yorum"
            onClick={next}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#b21f55] hover:text-[#b21f55] sm:flex"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {list.map((entry, i) => (
            <button
              type="button"
              key={`${entry.name}-${i}`}
              aria-label={`Yorum ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="h-2.5 w-2.5 rounded-full border border-[#b21f55] transition"
              style={{ backgroundColor: i === index ? "#b21f55" : "#ffffff" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
