"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Baby,
  Clock,
  Heart,
  Lightbulb,
  Star,
} from "@phosphor-icons/react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { classroomShowcase } from "@/lib/data";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) {
          return (
            <Star
              key={i}
              size={18}
              weight="fill"
              className="text-[#FFD600]"
            />
          );
        }
        if (rating >= i - 0.5) {
          return (
            <Star
              key={i}
              size={18}
              weight="duotone"
              className="text-[#FFD600]"
            />
          );
        }
        return (
          <Star
            key={i}
            size={18}
            weight="regular"
            className="text-white/45"
          />
        );
      })}
    </div>
  );
}

export default function HomeClassroomsCarousel() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFav = (key: string) => {
    setFavorites((f) => ({ ...f, [key]: !f[key] }));
  };

  return (
    <section className="page-section relative bg-white">
      <Container className="relative z-10">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            <Lightbulb
              size={22}
              weight="duotone"
              className="text-amber-500"
            />
            Derslikler
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Dersliklerimiz
          </h2>
          <p className="font-sans mt-3 text-base text-slate-600 sm:text-lg">
            Her alan çocukların oyun, sanat ve keşifle büyümesi için özel olarak
            düşünüldü. Yaş gruplarına uygun atölye ve sınıflarımızı keşfedin.
          </p>
        </FadeIn>

        <FadeIn className="mt-12 w-full md:mt-14" delay={0.05}>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {classroomShowcase.map((room, i) => {
              const favKey = `${room.slug}-${i}`;
              const fav = favorites[favKey];
              return (
                <div
                  key={favKey}
                  className="flex w-full flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#0f172a]"
                >
                  <div className="relative aspect-[5/4] w-full shrink-0">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                    <button
                      type="button"
                      aria-label={
                        fav ? "Favoriden çıkar" : "Favorilere ekle"
                      }
                      aria-pressed={fav}
                      onClick={() => toggleFav(favKey)}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black/20 shadow-md transition hover:scale-105"
                      style={{
                        backgroundColor: room.color,
                        color: "white",
                      }}
                    >
                      <Heart
                        size={22}
                        weight={fav ? "fill" : "regular"}
                      />
                    </button>
                  </div>

                  <div
                    className="flex flex-1 flex-col px-4 pb-4 pt-4 text-white sm:px-5 sm:pb-5"
                    style={{ backgroundColor: room.color }}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs font-medium text-white/95">
                      <span className="inline-flex items-center gap-1.5">
                        <Baby size={18} weight="duotone" />
                        {room.ageRange}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={18} weight="duotone" />
                        {room.duration}
                      </span>
                    </div>

                    <h3 className="font-sans mt-3 text-left text-lg font-bold leading-snug sm:text-xl">
                      {room.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <StarRow rating={room.rating} />
                      <span className="font-sans text-sm text-white/90">
                        {room.rating.toFixed(1)} ({room.reviewCount})
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/25 pt-4">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white/40">
                          <Image
                            src={room.teacherImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="truncate font-sans text-sm font-semibold">
                          {room.teacherName}
                        </span>
                      </div>
                      <Link
                        href={`/dersliklerimiz/${room.slug}`}
                        className="shrink-0 font-sans text-sm font-bold text-white underline decoration-2 underline-offset-2 hover:text-white/90"
                      >
                        İncele
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
