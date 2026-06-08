import Link from "next/link";
import { CaretRight, Question } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { HOME_FAQ } from "@/lib/seo";

const YELLOW = "#FFD600";

export default function HomeFaq() {
  return (
    <section className="page-section bg-slate-50">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
            <Question size={22} weight="duotone" className="text-fuchsia-600" />
            Sıkça sorulan sorular
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Niğde anaokulu hakkında merak edilenler
          </h2>
          <p className="font-sans mt-3 text-base text-slate-600">
            Niğde okul öncesi eğitim ve çift taraflı eğitim modelimiz hakkında
            velilerimizin en çok sorduğu konular.
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {HOME_FAQ.map((faq, index) => (
            <FadeIn key={faq.question} delay={index * 0.04}>
              <details className="group rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0_#0f172a]">
                <summary className="cursor-pointer list-none px-5 py-4 font-sans text-base font-bold text-slate-900 marker:content-none sm:px-6 sm:text-lg">
                  <span className="flex items-start justify-between gap-4">
                    {faq.question}
                    <CaretRight
                      size={20}
                      weight="bold"
                      className="mt-1 shrink-0 transition group-open:rotate-90"
                    />
                  </span>
                </summary>
                <div className="border-t-2 border-slate-100 px-5 pb-5 pt-4 sm:px-6">
                  <p className="font-display text-sm leading-relaxed text-slate-700 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-black px-8 py-3.5 font-sans text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            style={{ backgroundColor: YELLOW }}
          >
            Niğde anaokulu kayıt için iletişime geçin
            <CaretRight size={18} weight="bold" />
          </Link>
          <p className="font-sans mt-4 text-sm text-slate-500">
            Özel İzdüşümü Anaokulu · Niğde çift taraflı okul öncesi eğitim
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
