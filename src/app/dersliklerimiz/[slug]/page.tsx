import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { rooms } from "@/lib/data";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const room = rooms.find((item) => item.slug === params.slug);
  if (!room) return {};

  return {
    title: `${room.name} | Özel İzdüşümü Anaokulu`,
    description: room.description,
  };
}

export default function RoomDetailPage({ params }: PageProps) {
  const room = rooms.find((item) => item.slug === params.slug);
  if (!room) notFound();

  return (
    <div className="space-y-16 pb-20">
      <section className="page-section">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Derslik Detayı"
            title={room.name}
            description={room.description}
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Image
                src={room.image}
                alt={room.name}
                width={720}
                height={460}
                className="h-72 w-full rounded-3xl object-cover shadow-lg"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {room.highlights.map((highlight) => (
                  <FadeIn key={highlight} className="card">
                    <p className="text-sm font-semibold text-slate-900">
                      {highlight}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
            <FadeIn className="card space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
                Eğitim yaklaşımı
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                {room.ageRange} yaş grubu
              </h3>
              <p className="text-sm text-slate-600">{room.approach}</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Günlük gelişim gözlemleri</li>
                <li>• Atölye, müzik ve spor aktiviteleri</li>
                <li>• Aile katılımlı özel etkinlikler</li>
              </ul>
              <Link
                href="/iletisim"
                className="rounded-full bg-sky-500 px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-sky-600"
              >
                Ön kayıt için iletişime geçin
              </Link>
            </FadeIn>
          </div>
          <Link
            href="/dersliklerimiz"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            ← Tüm dersliklere dön
          </Link>
        </Container>
      </section>
    </div>
  );
}
