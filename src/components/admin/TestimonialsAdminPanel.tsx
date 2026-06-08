"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChatCircleDots,
  FilmStrip,
  PencilSimple,
  Plus,
  Star,
  Trash,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { AdminCard, FormField, TextArea, TextInput } from "@/components/admin/AdminForm";
import TestimonialVideoUpload from "@/components/admin/TestimonialVideoUpload";
import { deleteTestimonial, saveTestimonial } from "@/lib/admin-actions";

type TestimonialItem = {
  id: string;
  type: string;
  name: string;
  role: string | null;
  quote: string | null;
  rating: number | null;
  videoUrl: string | null;
  title: string | null;
  sortOrder: number;
  published: boolean;
};

type Tab = "text" | "video";

type ModalState =
  | { mode: "closed" }
  | { mode: "create"; defaultType?: Tab }
  | { mode: "edit"; item: TestimonialItem };

function truncate(text: string, len = 80) {
  return text.length > len ? `${text.slice(0, len)}…` : text;
}

function TestimonialModal({
  state,
  textCount,
  videoCount,
  onClose,
  onSaved,
}: {
  state: ModalState;
  textCount: number;
  videoCount: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const open = state.mode !== "closed";
  const item = state.mode === "edit" ? state.item : null;

  const [type, setType] = useState<Tab>("text");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState("5");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.mode === "edit") {
      const t = state.item;
      setType(t.type === "video" ? "video" : "text");
      setName(t.name);
      setRole(t.role ?? "");
      setQuote(t.quote ?? "");
      setRating(String(t.rating ?? 5));
      setTitle(t.title ?? "");
      setVideoUrl(t.videoUrl ?? "");
      setPublished(t.published);
    } else if (state.mode === "create") {
      setType(state.defaultType ?? "text");
      setName("");
      setRole("");
      setQuote("");
      setRating("5");
      setTitle("");
      setVideoUrl("");
      setPublished(true);
    }
    setError(null);
  }, [state]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (type === "video" && !videoUrl) {
      setError("Lütfen önce videoyu yükleyin");
      return;
    }

    setPending(true);
    setError(null);

    const formData = new FormData();
    if (item) formData.set("id", item.id);
    formData.set("type", type);
    formData.set("name", name);
    formData.set("published", published ? "on" : "off");
    formData.set(
      "sortOrder",
      String(item?.sortOrder ?? (type === "text" ? textCount : videoCount))
    );

    if (type === "text") {
      formData.set("role", role);
      formData.set("quote", quote);
      formData.set("rating", rating);
    } else {
      formData.set("title", title);
      formData.set("videoUrl", videoUrl);
    }

    const result = await saveTestimonial(formData);
    setPending(false);

    if (!result.ok) {
      setError(("error" in result ? result.error : null) ?? "Kayıt başarısız");
      return;
    }
    onSaved();
    onClose();
  }

  async function handleDelete() {
    if (!item || !confirm(`"${item.name}" yorumunu silmek istediğinize emin misiniz?`)) {
      return;
    }
    setPending(true);
    await deleteTestimonial(item.id);
    setPending(false);
    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Kapat"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[min(90vh,36rem)] w-full max-w-[min(100%,28rem)] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-md"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-bold text-slate-900">
            {state.mode === "create" ? "Yeni Yorum Ekle" : "Yorumu Düzenle"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <div className="space-y-4 p-4">
            {state.mode === "create" ? (
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setType("text")}
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition sm:text-sm",
                    type === "text"
                      ? "bg-white text-[#3c50e0] shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <ChatCircleDots size={16} />
                  Yazılı
                </button>
                <button
                  type="button"
                  onClick={() => setType("video")}
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition sm:text-sm",
                    type === "video"
                      ? "bg-white text-[#3c50e0] shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <FilmStrip size={16} />
                  Videolu
                </button>
              </div>
            ) : (
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {type === "video" ? "Videolu yorum" : "Yazılı yorum"}
              </p>
            )}

            <FormField label="İsim">
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Veli adı"
                required
              />
            </FormField>

            {type === "text" ? (
              <>
                <FormField label="Rol">
                  <TextInput
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Anne / Baba"
                  />
                </FormField>
                <FormField label="Yorum">
                  <TextArea
                    rows={4}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    required
                  />
                </FormField>
                <FormField label="Puan (1-5)">
                  <TextInput
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </FormField>
              </>
            ) : (
              <>
                <FormField label="Başlık">
                  <TextInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Veli Görüşü 01"
                  />
                </FormField>
                <TestimonialVideoUpload
                  videoUrl={videoUrl}
                  onVideoUrlChange={setVideoUrl}
                />
              </>
            )}

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              Yayında
            </label>

            {error ? (
              <p className="text-xs font-medium text-red-600">{error}</p>
            ) : null}
          </div>

          <div className="mt-auto flex shrink-0 items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3">
            {item ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                <Trash size={14} />
                Sil
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white sm:px-4 sm:py-2 sm:text-sm"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={pending}
                className="rounded-lg bg-[#3c50e0] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#2f3fbb] disabled:opacity-60 sm:px-5 sm:py-2 sm:text-sm"
              >
                {pending ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function TestimonialRow({
  item,
  onEdit,
}: {
  item: TestimonialItem;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50/80">
      {item.type === "video" && item.videoUrl ? (
        <div className="hidden h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-900 sm:block">
          <video
            src={item.videoUrl}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-slate-900">{item.name}</p>
          {!item.published ? (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
              Taslak
            </span>
          ) : null}
        </div>
        {item.type === "text" ? (
          <>
            {item.role ? (
              <p className="text-xs text-slate-500">{item.role}</p>
            ) : null}
            {item.quote ? (
              <p className="mt-1 text-sm text-slate-600">
                {truncate(item.quote)}
              </p>
            ) : null}
            {item.rating ? (
              <div className="mt-1 flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={12} weight="fill" />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-xs text-slate-500">{item.title ?? "Video yorum"}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
      >
        <PencilSimple size={14} />
        Düzenle
      </button>
    </div>
  );
}

export default function TestimonialsAdminPanel({
  items,
}: {
  items: TestimonialItem[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("text");
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  const textItems = items.filter((i) => i.type === "text");
  const videoItems = items.filter((i) => i.type === "video");
  const activeItems = tab === "text" ? textItems : videoItems;

  return (
    <>
      <AdminCard>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setTab("text")}
              className={clsx(
                "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition",
                tab === "text"
                  ? "bg-white text-[#3c50e0] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <ChatCircleDots size={18} />
              Yazılı Yorumlar
              <span className="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                {textItems.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTab("video")}
              className={clsx(
                "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition",
                tab === "video"
                  ? "bg-white text-[#3c50e0] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <FilmStrip size={18} />
              Videolu Yorumlar
              <span className="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                {videoItems.length}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setModal({ mode: "create", defaultType: tab })}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f3fbb]"
          >
            <Plus size={18} weight="bold" />
            Yeni Yorum Ekle
          </button>
        </div>

        {activeItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <p className="text-sm text-slate-500">
              {tab === "text"
                ? "Henüz yazılı yorum yok."
                : "Henüz videolu yorum yok."}
            </p>
            <button
              type="button"
              onClick={() => setModal({ mode: "create", defaultType: tab })}
              className="mt-3 text-sm font-semibold text-[#3c50e0] hover:underline"
            >
              İlk yorumu ekle
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200">
            {activeItems.map((item) => (
              <TestimonialRow
                key={item.id}
                item={item}
                onEdit={() => setModal({ mode: "edit", item })}
              />
            ))}
          </div>
        )}
      </AdminCard>

      <TestimonialModal
        state={modal}
        textCount={textItems.length}
        videoCount={videoItems.length}
        onClose={() => setModal({ mode: "closed" })}
        onSaved={() => router.refresh()}
      />
    </>
  );
}
