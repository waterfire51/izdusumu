"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Chalkboard, PencilSimple, Plus, Trash, X } from "@phosphor-icons/react";
import { AdminCard, FormField, TextArea, TextInput } from "@/components/admin/AdminForm";
import { RoomCoverUpload, RoomGalleryUpload } from "@/components/admin/RoomImageFields";
import { deleteRoom, saveRoom } from "@/lib/admin-actions";

type RoomItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  sortOrder: number;
  published: boolean;
};

type ModalState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; room: RoomItem };

function truncate(text: string, len = 90) {
  return text.length > len ? `${text.slice(0, len)}…` : text;
}

function RoomModal({
  state,
  roomCount,
  onClose,
  onSaved,
}: {
  state: ModalState;
  roomCount: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const open = state.mode !== "closed";
  const room = state.mode === "edit" ? state.room : null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [published, setPublished] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.mode === "edit") {
      const r = state.room;
      setName(r.name);
      setDescription(r.description);
      setCoverImage(r.image);
      setGalleryImages(r.images?.length ? r.images : r.image ? [r.image] : []);
      setPublished(r.published);
    } else if (state.mode === "create") {
      setName("");
      setDescription("");
      setCoverImage("");
      setGalleryImages([]);
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
    if (!coverImage) {
      setError("Kapak fotoğrafı gerekli — önce yükleyin");
      return;
    }

    setPending(true);
    setError(null);

    const formData = new FormData();
    if (room) {
      formData.set("id", room.id);
      formData.set("slug", room.slug);
    }
    formData.set("name", name);
    formData.set("description", description);
    formData.set("image", coverImage);
    formData.set("images", JSON.stringify(galleryImages));
    formData.set("published", published ? "on" : "off");
    formData.set("sortOrder", String(room?.sortOrder ?? roomCount));

    const result = await saveRoom(formData);
    setPending(false);

    if (!result.ok) {
      setError(("error" in result ? result.error : null) ?? "Kayıt başarısız");
      return;
    }
    onSaved();
    onClose();
  }

  async function handleDelete() {
    if (!room || !confirm(`"${room.name}" sınıfını silmek istediğinize emin misiniz?`)) {
      return;
    }
    setPending(true);
    await deleteRoom(room.id);
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
        className="relative z-10 flex max-h-[min(92vh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-bold text-slate-900">
            {state.mode === "create" ? "Yeni Sınıf Ekle" : "Sınıfı Düzenle"}
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
          <div className="space-y-5 p-4">
            <FormField label="Sınıf adı">
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sinema Salonumuz"
                required
              />
            </FormField>

            <FormField label="Açıklama">
              <TextArea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </FormField>

            <RoomCoverUpload imageUrl={coverImage} onImageUrlChange={setCoverImage} />

            <RoomGalleryUpload images={galleryImages} onChange={setGalleryImages} />

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
            {room ? (
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

export default function RoomsAdminPanel({ rooms }: { rooms: RoomItem[] }) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  return (
    <>
      <AdminCard>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Sınıf Listesi</h3>
            <p className="text-xs text-slate-500">{rooms.length} sınıf kayıtlı</p>
          </div>
          <button
            type="button"
            onClick={() => setModal({ mode: "create" })}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f3fbb]"
          >
            <Plus size={18} weight="bold" />
            Yeni Sınıf Ekle
          </button>
        </div>

        {rooms.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <Chalkboard
              size={40}
              weight="duotone"
              className="mx-auto text-slate-300"
            />
            <p className="mt-3 text-sm text-slate-500">Henüz sınıf eklenmemiş.</p>
            <button
              type="button"
              onClick={() => setModal({ mode: "create" })}
              className="mt-3 text-sm font-semibold text-[#3c50e0] hover:underline"
            >
              İlk sınıfı ekle
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50/80"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  {room.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300">
                      <Chalkboard size={24} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{room.name}</p>
                    {!room.published ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                        Taslak
                      </span>
                    ) : null}
                    <span className="text-[10px] text-slate-400">
                      {room.images?.length ?? 0} galeri fotoğrafı
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {truncate(room.description)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModal({ mode: "edit", room })}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <PencilSimple size={14} />
                  Düzenle
                </button>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <RoomModal
        state={modal}
        roomCount={rooms.length}
        onClose={() => setModal({ mode: "closed" })}
        onSaved={() => router.refresh()}
      />
    </>
  );
}
