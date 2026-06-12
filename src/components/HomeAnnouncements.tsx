import Link from "next/link";
import { MegaphoneSimple } from "@phosphor-icons/react/dist/ssr";

type HomeAnnouncementsProps = {
  items: string[];
};

const fallbackItems = [
  "Model Roketimiz Göklerde",
  "İzdüşümü Derneği İlk Genel Kurulu Duyurusu",
  "Yaz Okulu Kayıtlarımız Başladı",
];

export default function HomeAnnouncements({ items }: HomeAnnouncementsProps) {
  const list = (items.length > 0 ? items : fallbackItems).slice(0, 3);

  return (
    <section className="bg-white py-14">
      <div className="mx-auto w-full max-w-4xl px-6 text-center">
        <h2 className="text-2xl font-bold text-[#8f2548]">Duyurular</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {list.map((item, index) => (
            <Link
              key={item}
              href="/duyurular"
              className={
                index === 1
                  ? "flex min-h-40 flex-col items-center justify-center bg-[#b21f55] p-6 text-white shadow-md transition hover:-translate-y-1"
                  : "flex min-h-40 flex-col items-center justify-center border border-slate-100 bg-[#f8fbff] p-6 text-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              }
            >
              <MegaphoneSimple
                size={34}
                weight="duotone"
                className={index === 1 ? "mb-4 text-white/90" : "mb-4 text-[#3f84c3]"}
              />
              <span className="text-lg font-semibold leading-snug">{item}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/duyurular"
          className="mt-8 inline-flex rounded-sm border border-slate-300 px-6 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-700 shadow-sm transition hover:border-[#b21f55] hover:text-[#b21f55]"
        >
          Tüm Programlarımız
        </Link>
      </div>
    </section>
  );
}
