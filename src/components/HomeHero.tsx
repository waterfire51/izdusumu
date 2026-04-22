"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BookOpen,
  CaretRight,
  Heart,
  Lightbulb,
  PencilSimple,
  Play,
  Star,
} from "@phosphor-icons/react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";

const PURPLE = "#8A4FFF";
const YELLOW = "#FFD600";

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
  const x = useTransform(springX, (v) => v * depthX * 40);
  const y = useTransform(springY, (v) => v * depthY * 36);
  const rot = useTransform(springX, (v) => v * rotate * 14);
  return (
    <motion.div className={className} style={{ x, y, rotate: rot }}>
      {children}
    </motion.div>
  );
}

/** Deterministic “random” multipliers so SSR/hydration match. */
function useParallaxFactors(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = (i + 1) * 9.123 + 0.37;
      const dx = 0.45 + (Math.sin(t * 11.7) * 0.5 + 0.5) * 0.85;
      const dy = 0.45 + (Math.cos(t * 8.3) * 0.5 + 0.5) * 0.85;
      const r = (Math.sin(t * 4.1) * 0.5 + 0.5) * 0.8 - 0.4;
      return { dx, dy, r };
    });
  }, [count]);
}

export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogId = useId();
  const [videoOpen, setVideoOpen] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 28, damping: 20, mass: 0.55 });
  const springY = useSpring(my, { stiffness: 28, damping: 20, mass: 0.55 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  const factors = useParallaxFactors(7);

  /* Bulutta dikey parallax yok: fare yukarıda şerit yukarı kalkıp altta boşluk bırakıyordu */
  const bannerX = useTransform(springX, (v) => v * 12);
  const kidsX = useTransform(springX, (v) => v * -14);
  const kidsY = useTransform(springY, (v) => v * -11);

  const closeVideo = useCallback(() => {
    setVideoOpen(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }, []);

  const openVideo = useCallback(() => {
    setVideoOpen(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play().catch(() => {});
    });
  }, []);

  const doodles = useMemo(
    () => [
      {
        node: (
          <Star
            className="h-8 w-8 text-[#FFD600] opacity-90 drop-shadow-sm sm:h-10 sm:w-10"
            weight="fill"
            aria-hidden
          />
        ),
        className: "left-[6%] top-[18%]",
        ...factors[0],
      },
      {
        node: (
          <Star
            className="h-6 w-6 text-white/90 sm:h-8 sm:w-8"
            weight="fill"
            aria-hidden
          />
        ),
        className: "right-[10%] top-[22%]",
        ...factors[1],
      },
      {
        node: (
          <Lightbulb
            className="h-9 w-9 text-[#FFD600]/90 sm:h-11 sm:w-11"
            weight="duotone"
            aria-hidden
          />
        ),
        className: "left-[12%] bottom-[38%] sm:bottom-[42%]",
        ...factors[2],
      },
      {
        node: (
          <PencilSimple
            className="hidden h-10 w-10 text-white/85 md:block"
            weight="duotone"
            aria-hidden
          />
        ),
        className: "right-[18%] top-[38%]",
        ...factors[3],
      },
      {
        node: (
          <BookOpen
            className="h-9 w-9 text-[#FFD600]/85 sm:h-11 sm:w-11"
            weight="duotone"
            aria-hidden
          />
        ),
        className: "bottom-[32%] right-[8%]",
        ...factors[4],
      },
      {
        node: (
          <Heart
            className="h-6 w-6 text-white/70 sm:h-7 sm:w-7"
            weight="fill"
            aria-hidden
          />
        ),
        className: "left-[22%] top-[42%]",
        ...factors[5],
      },
      {
        node: (
          <Heart
            className="h-5 w-5 text-[#FFD600]/75"
            weight="fill"
            aria-hidden
          />
        ),
        className: "right-[28%] bottom-[48%]",
        ...factors[6],
      },
    ],
    [factors]
  );

  return (
    <section
      className="relative overflow-hidden pb-0"
      style={{
        backgroundColor: PURPLE,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    >
      {/* Çocuk görseli — bulut katmanının altında (z-[1] < bulut z-[2]) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center lg:justify-end">
        <div className="relative w-full max-w-6xl px-6 lg:px-10">
          <div className="flex justify-center lg:justify-end">
            <FadeIn
              className="relative w-full max-w-[min(100%,420px)] translate-y-2 lg:max-w-[min(100%,520px)] lg:translate-y-6 xl:max-w-[min(100%,560px)]"
              delay={0.08}
            >
              <motion.div
                className="relative w-full"
                style={{ x: kidsX, y: kidsY }}
              >
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md sm:aspect-[5/6] lg:mx-0 lg:max-w-none">
                  <Image
                    src="/01.png"
                    alt="Okul öncesi öğrencilerimiz"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                  />
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Alt bulut şeridi — görselin üstünde */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] w-full select-none"
        style={{ x: bannerX }}
        aria-hidden
      >
        <div className="relative w-full aspect-[3840/468]">
          <Image
            src="/banner-bg-1.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="100vw"
            priority
          />
        </div>
      </motion.div>

      {doodles.map((d, i) => (
        <ParallaxLayer
          key={i}
          springX={springX}
          springY={springY}
          depthX={d.dx}
          depthY={d.dy}
          rotate={d.r}
          className={`pointer-events-none absolute z-[5] ${d.className}`}
        >
          {d.node}
        </ParallaxLayer>
      ))}

      <Container className="relative z-10 grid min-h-[min(88vh,820px)] items-end gap-8 pb-4 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-6 lg:pt-6">
        <FadeIn className="max-lg:pb-[min(48vh,380px)] space-y-6 pb-8 lg:pb-24">
          <h1 className="font-hero text-[2.1rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
            {" "}
            <span style={{ color: YELLOW }} className="font-bold">
              İz Düşümü Anaokulu
            </span>
            &apos;nda Güzel Dokunuşlar  <span style={{ color: YELLOW }} className="font-bold">
              İz Bırakır
            </span>
          </h1>
          <p className="max-w-xl font-hero text-base font-medium leading-relaxed text-white/95 sm:text-lg">
            Her gün yeni keşifler ve gelişim fırsatları sunan sıcak bir topluluğa
            hoş geldiniz. Güvenli, neşeli ve öğrenmeye açık bir ortamda
            çocuklarınızın yanındayız.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dersliklerimiz"
              className="font-hero inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition hover:brightness-95 active:scale-[0.99]"
              style={{ backgroundColor: YELLOW }}
            >
              2-6 Yaş Arası Çocuklarımız İçin
              <CaretRight size={18} weight="bold" />
            </Link>
            <button
              type="button"
              className="font-hero group inline-flex items-center gap-3 rounded-full text-sm font-semibold text-white transition hover:opacity-95"
              onClick={openVideo}
              aria-haspopup="dialog"
              aria-expanded={videoOpen}
              aria-controls={dialogId}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-900 shadow-md transition group-hover:scale-105"
                style={{ backgroundColor: YELLOW, color: "#0f172a" }}
              >
                <Play size={22} weight="fill" className="ml-0.5" />
              </span>
              Tanıtım Filmi
            </button>
          </div>
        </FadeIn>

        {/* Masaüstünde görsel alanı — akışta boşluk (görsel absolute ile hizalanır) */}
        <div
          className="hidden min-h-[min(72vh,620px)] lg:block"
          aria-hidden
        />
      </Container>

      {videoOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          role="dialog"
          id={dialogId}
          aria-modal="true"
          aria-label="Tanıtım videosu"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Videoyu kapat"
            onClick={closeVideo}
          />
          <div className="relative z-[101] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow hover:bg-white"
              onClick={closeVideo}
            >
              Kapat
            </button>
            <video
              ref={videoRef}
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
            >
              <source src="/videos/hero-drone.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}
    </section>
  );
}
