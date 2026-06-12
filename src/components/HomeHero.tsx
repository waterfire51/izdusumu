"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export type HeroContent = {
  headline: string;
  headlineHighlight1: string;
  headlineHighlight2: string;
  subtitle: string;
  videoUrl: string;
  ctaText: string;
  ctaHref: string;
};

const slides = [
  {
    bg: "#3f84c3",
    eyebrow: "Kaliteli eğitim, güvenli gelecek",
    title: "Karakterli Bir Nesil İçin İzdüşümü",
    text: "Eğitim, kültür ve sosyal faaliyetleri aynı çatı altında buluşturan güçlü bir okul deneyimi.",
  },
  {
    bg: "#b21f55",
    eyebrow: "Çocuklarımız için",
    title: "Sevgiyle büyüyen, değerleriyle güçlenen nesiller",
    text: "Okul, kurs, etkinlik ve aile iletişimini sade, sıcak ve kurumsal bir yaklaşımla yürütüyoruz.",
  },
  {
    bg: "#2b9f91",
    eyebrow: "Faaliyetlerimiz",
    title: "Eğitimden sosyal hizmetlere uzanan kapsamlı yapı",
    text: "Her yaş ve ihtiyaç için düzenli, takip edilebilir ve insan odaklı hizmetler sunuyoruz.",
  },
];

export default function HomeHero({ content }: { content?: HeroContent }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const previous = () => setIndex((current) => (current - 1 + slides.length) % slides.length);
  const next = () => setIndex((current) => (current + 1) % slides.length);

  return (
    <section
      className="relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: slide.bg }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <Image src="/shape/03.svg" alt="" width={100} height={130} className="absolute left-[8%] top-10 h-20 w-16 rotate-[-12deg]" />
        <Image src="/shape/01.svg" alt="" width={120} height={100} className="absolute bottom-8 left-[43%] hidden h-20 w-24 md:block" />
        <Image src="/shape/02.svg" alt="" width={108} height={82} className="absolute right-[12%] top-16 h-16 w-20 rotate-12" />
      </div>
      <div className="mx-auto grid min-h-[470px] w-full max-w-6xl items-center gap-8 px-6 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-8">
        <div className="relative z-10 text-center text-white lg:text-left">
          <p className="font-ananda text-lg font-semibold italic tracking-wide text-white/90 md:text-2xl">
            {slide.eyebrow}
          </p>
          <h1 className="font-ananda mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            {content?.headline || slide.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-relaxed text-white/90 lg:mx-0">
            {content?.subtitle || slide.text}
          </p>
          <Link
            href={content?.ctaHref || "/iletisim"}
            className="mt-7 inline-flex rounded-sm bg-white px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#b21f55] shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5"
          >
            {content?.ctaText || "Detaylı Bilgi"}
          </Link>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-xl items-end justify-center">
          <div className="relative aspect-[1.15/1] w-full">
            <Image
              src="/01.png"
              alt="Öğrencilerimiz"
              fill
              priority
              sizes="(max-width: 1024px) 85vw, 560px"
              className="object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={previous}
        className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 md:flex"
        aria-label="Önceki slide"
      >
        <CaretLeft size={22} weight="bold" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 md:flex"
        aria-label="Sonraki slide"
      >
        <CaretRight size={22} weight="bold" />
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((item, itemIndex) => (
          <button
            key={item.bg}
            type="button"
            onClick={() => setIndex(itemIndex)}
            className="h-2.5 w-2.5 rounded-full border border-white/80 transition"
            style={{ backgroundColor: itemIndex === index ? "#ffffff" : "transparent" }}
            aria-label={`${itemIndex + 1}. slide`}
            aria-current={itemIndex === index}
          />
        ))}
      </div>
    </section>
  );
}
