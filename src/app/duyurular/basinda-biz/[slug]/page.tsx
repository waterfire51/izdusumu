import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeft, FileText } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { pressPosts } from "@/lib/press";

type PressDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return pressPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PressDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = pressPosts.find((item) => item.slug === slug);
  if (!post) {
    return { title: "Yazı bulunamadı | Özel İzdüşümü Anaokulu" };
  }
  return {
    title: `${post.title} | Basında Biz`,
    description: post.summary,
  };
}

export default async function PressDetailPage({ params }: PressDetailPageProps) {
  const { slug } = await params;
  const post = pressPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="page-section bg-white">
      <Container>
        <FadeIn className="mx-auto max-w-3xl">
          <Link
            href="/duyurular"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 font-sans text-sm font-bold text-slate-900 shadow-[3px_3px_0_#0f172a] transition hover:bg-amber-50"
          >
            <CaretLeft size={16} weight="bold" />
            Duyurulara dön
          </Link>

          <article className="mt-6 rounded-2xl border-2 border-black bg-amber-50 p-6 shadow-[6px_6px_0_#0f172a] sm:p-8">
            <div className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-700">
              <FileText size={18} weight="duotone" />
              Basında Biz
            </div>
            <p className="mt-4 font-sans text-xs font-bold uppercase tracking-wide text-slate-500">
              {post.date} - {post.source}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="font-display mt-4 text-base leading-relaxed text-slate-700">
              {post.summary}
            </p>

            <div className="mt-8 space-y-4">
              {post.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-display text-base leading-relaxed text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </FadeIn>
      </Container>
    </section>
  );
}

