"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CaretLeft,
  CaretRight,
  Code,
  GlobeHemisphereWest,
  Lightbulb,
  MathOperations,
  MusicNotes,
  PencilLine,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { popularClassTopics } from "@/lib/data";

const NAV_PURPLE = "#8A4FFF";
const PAGINATION_ACTIVE = "#22c55e";
const AUTOPLAY_MS = 4500;
const OVERFLOW_EPS = 15;

const iconMap = {
  code: Code,
  math: MathOperations,
  music: MusicNotes,
  writing: PencilLine,
  lang: GlobeHemisphereWest,
} as const;

export default function HomeTopicsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pauseAutoplayRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [metrics, setMetrics] = useState({ trackW: 0, viewW: 0 });

  const count = popularClassTopics.length;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const first = track.querySelector<HTMLElement>("[data-slide]");
    if (!first) return;

    const gap = 24;
    const cardW = first.offsetWidth;
    const s = cardW + gap;
    const viewW = viewport.clientWidth;
    const trackW = track.scrollWidth;

    const overflow = trackW - viewW;
    const visibleFit = Math.max(1, Math.floor((viewW + gap) / s));
    const maxFromCount = Math.max(0, count - visibleFit);
    const maxFromOverflow =
      overflow <= OVERFLOW_EPS
        ? 0
        : Math.min(count - 1, Math.ceil(overflow / s));

    const maxIdx = Math.max(maxFromCount, maxFromOverflow);

    setStep(s);
    setMaxIndex(maxIdx);
    setMetrics({ trackW, viewW });
  }, [count]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(() => measure());
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const clampedIndex = Math.min(index, maxIndex);
  const effectiveIndex = clampedIndex;

  const maxTranslate =
    metrics.trackW > 0 && metrics.viewW > 0
      ? Math.max(0, metrics.trackW - metrics.viewW)
      : 0;

  const translateX =
    maxIndex === 0
      ? 0
      : effectiveIndex >= maxIndex
        ? -maxTranslate
        : -effectiveIndex * step;

  const go = (dir: -1 | 1) => {
    if (maxIndex === 0) return;
    setIndex((i) => Math.max(0, Math.min(maxIndex, i + dir)));
  };

  const goTo = (i: number) => {
    if (maxIndex === 0) return;
    setIndex(Math.max(0, Math.min(maxIndex, i)));
  };

  useEffect(() => {
    if (maxIndex === 0) return;
    const tick = () => {
      if (pauseAutoplayRef.current) return;
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    };
    const id = window.setInterval(tick, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [maxIndex]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const pause = () => {
      pauseAutoplayRef.current = true;
    };
    const resume = () => {
      pauseAutoplayRef.current = false;
    };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="page-section relative overflow-x-hidden bg-white"
    >
      <Container className="relative z-10">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            <Lightbulb
              size={22}
              weight="duotone"
              className="text-amber-500"
            />
            Kategori
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Öne çıkan sınıf konuları
          </h2>
          <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
            Her yaşta büyüme ve keşif ön plandadır; oyunla öğrenen çocuklar için
            çeşitli etkinlik alanları sunuyoruz.
          </p>
        </FadeIn>

        <FadeIn className="relative mt-14" delay={0.05}>
          <div className="relative isolate flex items-stretch gap-2 sm:gap-4">
            <button
              type="button"
              aria-label="Önceki"
              disabled={maxIndex === 0 || effectiveIndex <= 0}
              onClick={() => go(-1)}
              className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black text-white shadow-[3px_3px_0_#0f172a] transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-35 sm:h-11 sm:w-11"
              style={{ backgroundColor: NAV_PURPLE }}
            >
              <CaretLeft size={22} weight="bold" />
            </button>

            <div
              ref={viewportRef}
              className={clsx(
                "relative flex min-w-0 flex-1 overflow-visible py-4",
                maxIndex === 0 && "justify-center"
              )}
            >
              <motion.div
                ref={trackRef}
                className="flex gap-6"
                animate={{ x: translateX }}
                transition={{ type: "spring", stiffness: 260, damping: 34 }}
              >
                {popularClassTopics.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div
                      key={item.label}
                      data-slide
                      className="flex w-[min(11.25rem,calc(100vw-7.5rem))] shrink-0 flex-col items-center gap-5 sm:w-[11.25rem]"
                    >
                      <div
                        className="flex h-40 w-40 items-center justify-center rounded-full border border-black shadow-[4px_4px_0_#0f172a] sm:h-44 sm:w-44"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon
                          className="text-white"
                          size={72}
                          weight="duotone"
                          aria-hidden
                        />
                      </div>
                      <div
                        className="w-full max-w-[11.25rem] rounded-full border border-black px-5 py-2.5 text-center text-sm font-semibold text-white shadow-[3px_3px_0_#0f172a]"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <button
              type="button"
              aria-label="Sonraki"
              disabled={maxIndex === 0 || effectiveIndex >= maxIndex}
              onClick={() => go(1)}
              className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black text-white shadow-[3px_3px_0_#0f172a] transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-35 sm:h-11 sm:w-11"
              style={{ backgroundColor: NAV_PURPLE }}
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </div>

          <div
            className="mt-10 flex justify-center gap-2"
            role="tablist"
            aria-label="Slayt göstergesi"
          >
            {popularClassTopics.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === effectiveIndex}
                aria-label={`Konu ${i + 1}`}
                onClick={() => goTo(i)}
                className={clsx(
                  "h-1 rounded-full transition-all duration-300",
                  i === effectiveIndex
                    ? "w-10"
                    : "w-8 bg-slate-200 hover:bg-slate-300"
                )}
                style={
                  i === effectiveIndex
                    ? { backgroundColor: PAGINATION_ACTIVE }
                    : undefined
                }
              />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
