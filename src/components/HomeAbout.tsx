"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Lightbulb, Star } from "@phosphor-icons/react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";

const YELLOW = "#FFD600";
const GREEN = "#22c55e";
const PURPLE_BOX = "#A855F7";
const ORANGE_ACCENT = "#fb923c";
const WHY_US_CARDS = [
  { text: "Deneyimli öğretmen kadrosu", color: GREEN },
  { text: "Güvenli okul ortamı", color: "#0ea5e9" },
  { text: "Aile ortamında ev sıcaklığı", color: "#f97316" },
  {
    text: "Kalabalık olmayan sınıf mevcutları (15 kişilik sınıflar)",
    color: "#e11d48",
  },
];

type ParallaxLayerProps = {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  depthX: number;
  depthY: number;
  rotate?: number;
  className?: string;
  children: React.ReactNode;
};

function ParallaxLayer({
  springX,
  springY,
  depthX,
  depthY,
  rotate = 0,
  className,
  children,
}: ParallaxLayerProps) {
  const x = useTransform(springX, (v) => v * depthX * 34);
  const y = useTransform(springY, (v) => v * depthY * 30);
  const rot = useTransform(springX, (v) => v * rotate * 12);
  return (
    <motion.div className={className} style={{ x, y, rotate: rot }}>
      {children}
    </motion.div>
  );
}

function useParallaxFactors(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = (i + 1) * 7.891 + 0.51;
      const dx = 0.5 + (Math.sin(t * 10.2) * 0.5 + 0.5) * 0.75;
      const dy = 0.5 + (Math.cos(t * 9.1) * 0.5 + 0.5) * 0.75;
      const r = (Math.sin(t * 3.7) * 0.5 + 0.5) * 0.7 - 0.35;
      return { dx, dy, r };
    });
  }, [count]);
}

function DoodleSquiggle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 52C28 20 52 68 72 36s32-8 40 16"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleSpiral({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M32 8c12 0 20 10 18 22-2 14-18 20-28 12-12-10-8-28 6-34 18-8 36 6 38 26 2 22-16 38-36 36"
        stroke={ORANGE_ACCENT}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleDots({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="14" r="4" fill="#ef4444" />
      <circle cx="28" cy="22" r="3.5" fill="#ef4444" />
      <circle cx="44" cy="12" r="4" fill="#ef4444" />
      <circle cx="58" cy="24" r="3" fill="#ef4444" />
      <circle cx="74" cy="16" r="3.5" fill="#ef4444" />
      <circle cx="88" cy="20" r="4" fill="#ef4444" />
    </svg>
  );
}

export default function HomeAbout() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 26, damping: 19, mass: 0.5 });
  const springY = useSpring(my, { stiffness: 26, damping: 19, mass: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  const f = useParallaxFactors(6);

  const blobRadius =
    "63% 37% 54% 46% / 55% 48% 52% 45%" as const;

  return (
    <section className="page-section relative overflow-hidden bg-white">
      <ParallaxLayer
        springX={springX}
        springY={springY}
        depthX={f[0].dx}
        depthY={f[0].dy}
        rotate={f[0].r}
        className="pointer-events-none absolute left-[4%] top-[8%] z-0 sm:left-[8%]"
      >
        <div className="relative">
          <DoodleSquiggle className="h-14 w-24 sm:h-20 sm:w-32" />
          <Star
            className="absolute -right-1 top-0 h-5 w-5 text-[#FFD600]"
            weight="fill"
          />
          <Star
            className="absolute bottom-0 left-8 h-4 w-4 text-[#FFD600]"
            weight="fill"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        springX={springX}
        springY={springY}
        depthX={f[1].dx}
        depthY={f[1].dy}
        rotate={f[1].r}
        className="pointer-events-none absolute left-1/2 top-[6%] z-0 -translate-x-1/2"
      >
        <DoodleDots className="h-8 w-24 opacity-90 sm:h-10 sm:w-28" />
      </ParallaxLayer>

      <ParallaxLayer
        springX={springX}
        springY={springY}
        depthX={f[2].dx}
        depthY={f[2].dy}
        rotate={f[2].r}
        className="pointer-events-none absolute bottom-[18%] left-[6%] z-0 sm:bottom-[22%]"
      >
        <DoodleSpiral className="h-16 w-16 sm:h-20 sm:w-20" />
      </ParallaxLayer>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <FadeIn className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <ParallaxLayer
              springX={springX}
              springY={springY}
              depthX={f[3].dx}
              depthY={f[3].dy}
              className="pointer-events-none absolute -left-1 top-[12%] z-10 h-14 w-20 rounded-full border-[3px] border-black bg-orange-400 sm:h-16 sm:w-24"
            >
              <span aria-hidden className="block h-full w-full" />
            </ParallaxLayer>

            <ParallaxLayer
              springX={springX}
              springY={springY}
              depthX={f[4].dx}
              depthY={f[4].dy}
              className="pointer-events-none absolute -right-2 bottom-[28%] z-10 h-12 w-16 sm:bottom-[30%] sm:h-14 sm:w-20"
            >
              <div
                className="h-full w-full rounded-full border-[3px] border-black"
                style={{ backgroundColor: PURPLE_BOX }}
              />
            </ParallaxLayer>

            <ParallaxLayer
              springX={springX}
              springY={springY}
              depthX={f[5].dx}
              depthY={f[5].dy}
              className="pointer-events-none absolute -bottom-1 left-[18%] z-10 h-11 w-28 rounded-full border-[3px] border-black sm:h-12 sm:w-32"
            >
              <div
                className="h-full w-full rounded-full"
                style={{ backgroundColor: GREEN }}
              />
            </ParallaxLayer>

            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden border-4 border-black bg-slate-100 shadow-[6px_8px_0_#0f172a]"
              style={{ borderRadius: blobRadius }}
            >
              <Image
                src="/02.png"
                alt="Sınıfımızda öğrenen bir çocuk"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 42vw"
                priority
              />
            </div>
          </FadeIn>

          <FadeIn className="space-y-8" delay={0.06}>
            <div className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
              <Lightbulb
                size={22}
                weight="duotone"
                className="text-amber-500"
              />
              Neden Biz
            </div>

            <h2 className="font-sans text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              İzdüşümü Anaokulu&apos;nda farkımızı keşfedin
            </h2>

            <p className="font-display max-w-xl text-lg leading-relaxed text-slate-600">
              Her çocuğun kendine özgü ritimde büyümesine inanıyoruz. Güvenli
              ortamımızda oyun, sanat ve keşifle desteklenen bir eğitim anlayışıyla
              velilerimizin yanındayız.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {WHY_US_CARDS.map((item) => (
                <div
                  key={item.text}
                  className="rounded-2xl border-4 border-black px-4 py-3 text-white shadow-[4px_4px_0_#0f172a]"
                  style={{ backgroundColor: item.color }}
                >
                  <p className="font-sans text-sm font-bold leading-relaxed sm:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div
                className="flex gap-4 rounded-2xl border-4 border-black p-5 text-white shadow-[4px_4px_0_#0f172a]"
                style={{ backgroundColor: PURPLE_BOX }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 border-white/40 bg-black/10 p-2 sm:h-16 sm:w-16">
                  <Image
                    src="/icon/tahut.svg"
                    alt=""
                    width={52}
                    height={52}
                    className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                  />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-bold">Taahhüdümüz</h3>
                  <p className="font-display mt-1 text-sm leading-relaxed text-white/95">
                    Şeffaf iletişim, güvenli fiziki ortam ve alanında uzman
                    ekibimizle kaliteli eğitimi sürdürülebilir kılmak.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/kurumsal"
              className="inline-flex items-center justify-center rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              style={{ backgroundColor: YELLOW }}
            >
              Daha fazlası
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
