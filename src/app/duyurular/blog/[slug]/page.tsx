import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeft, NewspaperClipping } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { getBlogPostBySlug } from "@/lib/content";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Yazı bulunamadı" };
  }
  return pageMetadata({
    title: `${post.title} - Niğde Okul Öncesi Eğitim Blog`,
    description: `${post.summary} Niğde anaokulu eğitim yazıları.`,
    path: `/duyurular/blog/${slug}`,
    ogImage: "imageUrl" in post && post.imageUrl ? post.imageUrl : undefined,
  });
}

function formatDate(date: Date | string) {
  if (date instanceof Date) {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return date;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const datePublished =
    post.date instanceof Date
      ? post.date.toISOString()
      : new Date().toISOString();

  return (
    <section className="page-section bg-white">
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Duyurular", path: "/duyurular" },
            { name: post.title, path: `/duyurular/blog/${slug}` },
          ]),
          buildArticleJsonLd({
            title: post.title,
            description: post.summary,
            path: `/duyurular/blog/${slug}`,
            datePublished,
            imageUrl: "imageUrl" in post ? post.imageUrl : null,
          }),
        ]}
      />
      <Container>
        <FadeIn className="mx-auto max-w-3xl">
          <Link
            href="/duyurular"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 font-sans text-sm font-bold text-slate-900 shadow-[3px_3px_0_#0f172a] transition hover:bg-amber-50"
          >
            <CaretLeft size={16} weight="bold" />
            Duyurulara dön
          </Link>

          <article className="mt-6 rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-8">
            <div className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-700">
              <NewspaperClipping size={18} weight="duotone" />
              Eğitim Yazıları
            </div>
            <p className="mt-4 font-sans text-xs font-bold uppercase tracking-wide text-slate-500">
              {formatDate(post.date)}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="font-display mt-4 text-base leading-relaxed text-slate-700">
              {post.summary}
            </p>

            {"imageUrl" in post && post.imageUrl ? (
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl border-2 border-black">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              </div>
            ) : null}

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
