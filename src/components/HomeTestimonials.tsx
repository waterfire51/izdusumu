"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  CaretLeft,
  CaretRight,
  Heart,
  Lightbulb,
  Star,
} from "@phosphor-icons/react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { testimonials } from "@/lib/data";

const PINK_BG = "#fce7f3";
const CARD_PURPLE = "#9333ea";
const NAV_PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";
const WHITE_BG = "#ffffff";

function TestimonialsTopWave() {
  return (
    <div className="relative z-0 -mt-px w-full select-none" aria-hidden>
      <div className="relative w-full aspect-[3840/532]">
        <Image
          src="/banner-bg-2.png"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          priority={false}
        />
      </div>
    </div>
  );
}

function CardDecor() {
  return (
    <>
      <svg
        className="pointer-events-none absolute left-4 top-4 h-8 w-14 text-[#FFD600] md:left-6 md:top-6"
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M4 28 C20 8 36 36 52 16 S72 4 76 20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute right-5 top-5 flex gap-1 md:right-8 md:top-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-white/90"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-6 left-5 flex gap-1 md:bottom-8 md:left-8">
        <Heart className="h-5 w-5 text-sky-300" weight="fill" />
        <Heart className="h-5 w-5 text-fuchsia-300" weight="fill" />
        <Heart className="h-5 w-5 text-amber-200" weight="fill" />
      </div>
    </>
  );
}

type HomeTestimonialsProps = {
  backgroundColor?: "pink" | "white";
  showTopWave?: boolean;
};

export default function HomeTestimonials({
  backgroundColor = "pink",
  showTopWave = true,
}: HomeTestimonialsProps) {
  const [index, setIndex] = useState(0);
  const n = testimonials.length;

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

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const item = testimonials[index];

  return (
    <section
      className="relative isolate overflow-x-hidden pb-24 pt-0 md:pb-28"
      style={{ backgroundColor: backgroundColor === "white" ? WHITE_BG : PINK_BG }}
    >
      {showTopWave ? <TestimonialsTopWave /> : null}

      <Container className="relative z-20">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            <Lightbulb
              size={22}
              weight="duotone"
              className="text-amber-500"
            />
            Veli yorumları
          </div>
          <h2 className="font-sans mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Velilerimiz ne diyor?
          </h2>
          <p className="font-display mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
            Öğrencilerimizin mutluluğu ve gelişimi yaptığımız her işin merkezinde.
            Sadece bizim sözümüze değil, ailelerimizin deneyimine de kulak verin.
          </p>
        </FadeIn>

        <FadeIn className="relative mx-auto mt-12 max-w-4xl md:mt-16" delay={0.06}>
          <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              aria-label="Önceki yorum"
              onClick={prev}
              className="order-2 flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border-2 border-black text-white shadow-[3px_3px_0_#0f172a] transition hover:brightness-110 sm:order-1"
              style={{ backgroundColor: NAV_PURPLE }}
            >
              <CaretLeft size={22} weight="bold" />
            </button>

            <div className="relative order-1 min-w-0 flex-1 sm:order-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.name + index}
                  role="article"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="relative overflow-hidden rounded-3xl border-2 border-black px-8 py-10 text-center text-white shadow-[6px_6px_0_#0f172a] md:px-12 md:py-12"
                  style={{ backgroundColor: CARD_PURPLE }}
                >
                  <CardDecor />
                  <div className="relative z-[1] mx-auto max-w-xl">
                    <p className="font-sans text-lg font-bold md:text-xl">
                      {item.name}
                    </p>
                    <p className="font-display mt-1 text-sm text-white/85">
                      {item.role}
                    </p>
                    <p className="font-display mt-6 text-base leading-relaxed text-white/95 md:text-lg">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div
                      className="mt-6 flex justify-center gap-0.5"
                      aria-label={`${item.rating} üzerinden 5 yıldız`}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={26}
                          weight={i < item.rating ? "fill" : "regular"}
                          className={
                            i < item.rating
                              ? "text-[#FFD600]"
                              : "text-white/50"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Sonraki yorum"
              onClick={next}
              className="order-3 flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border-2 border-black text-white shadow-[3px_3px_0_#0f172a] transition hover:brightness-110"
              style={{ backgroundColor: NAV_PURPLE }}
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Yorum ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className="h-2 w-2 rounded-full border border-black/30 transition sm:h-2.5 sm:w-2.5"
                style={{
                  backgroundColor: i === index ? NAV_PURPLE : "rgba(255,255,255,0.7)",
                }}
              />
            ))}
          </div>
        </FadeIn>

        <button
          type="button"
          onClick={scrollTop}
          aria-label="Sayfanın başına dön"
          className="absolute bottom-6 right-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white shadow-[3px_3px_0_#0f172a] transition hover:bg-slate-50 md:bottom-8 md:right-8"
        >
          <ArrowUp size={22} weight="bold" style={{ color: YELLOW }} />
        </button>
      </Container>
    </section>
  );
}
