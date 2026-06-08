"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImageSquare, PencilSimple, Plus, Trash, X } from "@phosphor-icons/react";
import { AdminCard, FormField, TextInput } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/RoomImageFields";
import { deleteGalleryItem, saveGalleryItem } from "@/lib/admin-actions";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
  sortOrder: number;
  published: boolean;
};

type ModalState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; item: GalleryItem };

const CATEGORY_SUGGESTIONS = [
  "Açık Hava",
  "Sanat",
  "Drama",
  "Sınıf",
  "Atölye",
  "Etkinlik",
];

function GalleryModal({
  state,
  itemCount,
  onClose,
  onSaved,
}: {
  state: ModalState;
  itemCount: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const open = state.mode !== "closed";
  const item = state.mode === "edit" ? state.item : null;

  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.mode === "edit") {
      setSrc(state.item.src);
      setAlt(state.item.alt);
      setCategory(state.item.category);
      setPublished(state.item.published);
    } else if (state.mode === "create") {
      setSrc("");
      setAlt("");
      setCategory("");
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!src) {
      setError("Görsel gerekli — önce yükleyin");
      return;
    }

    setPending(true);
    setError(null);

    const formData = new FormData();
    if (item) formData.set("id", item.id);
    formData.set("src", src);
    formData.set("alt", alt);
    formData.set("category", category);
    formData.set("published", published ? "on" : "off");
    formData.set("sortOrder", String(item?.sortOrder ?? itemCount));

    const result = await saveGalleryItem(formData);
    setPending(false);

    if (!result.ok) {
      setError(("error" in result ? result.error : null) ?? "Kayıt başarısız");
      return;
    }
    onSaved();
    onClose();
  }

  async function handleDelete() {
    if (!item || !confirm("Bu galeri görselini silmek istediğinize emin misiniz?")) {
      return;
    }
    setPending(true);
    await deleteGalleryItem(item.id);
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
        className="relative z-10 flex max-h-[min(92vh,38rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-bold text-slate-900">
            {state.mode === "create" ? "Yeni Görsel Ekle" : "Görseli Düzenle"}
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
            <AdminImageUpload
              label="Görsel"
              hint="Galeride gösterilecek fotoğraf"
              imageUrl={src}
              onImageUrlChange={setSrc}
              aspectClass="aspect-[4/3]"
            />

            <FormField label="Açıklama (alt)">
              <TextInput
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Açık hava etkinliği"
                required
              />
            </FormField>

            <FormField label="Kategori">
              <TextInput
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Açık Hava"
                list="gallery-categories"
                required
              />
              <datalist id="gallery-categories">
                {CATEGORY_SUGGESTIONS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </FormField>

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

export default function GalleryAdminPanel({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  return (
    <>
      <AdminCard>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Galeri Görselleri</h3>
            <p className="text-xs text-slate-500">{items.length} görsel kayıtlı</p>
          </div>
          <button
            type="button"
            onClick={() => setModal({ mode: "create" })}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f3fbb]"
          >
            <Plus size={18} weight="bold" />
            Yeni Görsel Ekle
          </button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <ImageSquare
              size={40}
              weight="duotone"
              className="mx-auto text-slate-300"
            />
            <p className="mt-3 text-sm text-slate-500">Henüz galeri görseli yok.</p>
            <button
              type="button"
              onClick={() => setModal({ mode: "create" })}
              className="mt-3 text-sm font-semibold text-[#3c50e0] hover:underline"
            >
              İlk görseli ekle
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                  />
                  {!item.published ? (
                    <span className="absolute left-2 top-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                      Taslak
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {item.category}
                    </p>
                    <p className="truncate text-xs text-slate-500">{item.alt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModal({ mode: "edit", item })}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <PencilSimple size={14} />
                    Düzenle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <GalleryModal
        state={modal}
        itemCount={items.length}
        onClose={() => setModal({ mode: "closed" })}
        onSaved={() => router.refresh()}
      />
    </>
  );
}
