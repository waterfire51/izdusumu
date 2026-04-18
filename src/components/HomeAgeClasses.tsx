"use client";

import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  CloudSun,
  Eyeglasses,
  Lightbulb,
  PuzzlePiece,
  Sparkle,
  TextAa,
} from "@phosphor-icons/react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { ageClasses } from "@/lib/data";

type ParallaxProps = {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  depthX: number;
  depthY: number;
  rotate?: number;
  className?: string;
  children: React.ReactNode;
};

function ParallaxNode({
  springX,
  springY,
  depthX,
  depthY,
  rotate = 0,
  className,
  children,
}: ParallaxProps) {
  const x = useTransform(springX, (v) => v * depthX * 22);
  const y = useTransform(springY, (v) => v * depthY * 20);
  const rot = useTransform(springX, (v) => v * rotate * 10);
  return (
    <motion.div className={className} style={{ x, y, rotate: rot }}>
      {children}
    </motion.div>
  );
}

function useParallaxFactors(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = (i + 1) * 8.431 + 0.22 + i * 1.7;
      const dx = 0.4 + (Math.sin(t * 9.2) * 0.5 + 0.5) * 0.9;
      const dy = 0.4 + (Math.cos(t * 11.4) * 0.5 + 0.5) * 0.9;
      const r = (Math.sin(t * 4.2) * 0.5 + 0.5) * 0.6 - 0.3;
      return { dx, dy, r };
    });
  }, [count]);
}

function CardSparkles({
  springX,
  springY,
  cardIndex,
}: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  cardIndex: number;
}) {
  const f = useParallaxFactors(4);
  const spots = [
    "right-3 top-4",
    "right-10 top-3",
    "right-6 top-11",
    "right-14 top-8",
  ];
  return spots.map((pos, i) => {
    const k = 0.55 + cardIndex * 0.12;
    return (
      <ParallaxNode
        key={i}
        springX={springX}
        springY={springY}
        depthX={f[i].dx * k}
        depthY={f[i].dy * k}
        rotate={f[i].r}
        className={`pointer-events-none absolute ${pos} text-white`}
      >
        <Sparkle className="h-3.5 w-3.5 sm:h-4 sm:w-4" weight="fill" />
      </ParallaxNode>
    );
  });
}

const iconMap = {
  eyeglasses: Eyeglasses,
  playground: CloudSun,
  abc: TextAa,
  puzzle: PuzzlePiece,
} as const;

export default function HomeAgeClasses() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 32, damping: 22, mass: 0.45 });
  const springY = useSpring(my, { stiffness: 32, damping: 22, mass: 0.45 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section className="page-section relative overflow-hidden bg-white">
      <Container className="relative z-10 space-y-12">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            <Lightbulb
              size={22}
              weight="duotone"
              className="text-amber-500"
            />
            Yaş grupları
          </div>
          <h2 className="mt-4 font-sans text-3xl font-bold text-slate-900 sm:text-4xl">
            Her yaş için uygun sınıflar
          </h2>
          <p className="font-display mt-3 text-base text-slate-600 sm:text-lg">
            Bebeklikten okula hazırlığa kadar her dönemde büyüme ve keşif ön
            plandadır.
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ageClasses.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <FadeIn key={item.title} delay={index * 0.06}>
                <div
                  className="relative flex h-full flex-col rounded-3xl border-[3px] border-black p-6 pt-14 text-left text-white shadow-[6px_6px_0_#0f172a]"
                  style={{ backgroundColor: item.color }}
                >
                  <CardSparkles
                    springX={springX}
                    springY={springY}
                    cardIndex={index}
                  />
                  <div className="mb-4">
                    <Icon
                      className="text-white"
                      size={48}
                      weight="duotone"
                      aria-hidden
                    />
                  </div>
                  <h3 className="font-sans text-xl font-bold">{item.title}</h3>
                  <p className="font-display mt-1 text-sm text-white/90">
                    {item.ageLabel}
                  </p>
                  <p className="font-display mt-4 text-sm leading-relaxed text-white/95">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
