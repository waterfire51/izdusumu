"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Eye,
  FileText,
  NewspaperClipping,
  PencilSimple,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { AdminCard, FormField, TextArea, TextInput } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/RoomImageFields";
import {
  deleteBlogPost,
  deletePressPost,
  saveBlogPost,
  savePressPost,
} from "@/lib/admin-actions";

type Tab = "blog" | "press";

type BlogItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  content: string[];
  date: Date;
  published: boolean;
};

type PressItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  source: string;
  content: string[];
  date: Date;
  published: boolean;
};

type ModalState =
  | { mode: "closed" }
  | { mode: "create"; tab: Tab }
  | { mode: "edit"; tab: Tab; item: BlogItem | PressItem };

const TABS: { id: Tab; label: string; icon: typeof NewspaperClipping }[] = [
  { id: "blog", label: "Eğitim Yazıları", icon: NewspaperClipping },
  { id: "press", label: "Basında Biz", icon: FileText },
];

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(d));
}

function toInputDate(d: Date) {
  return new Date(d).toISOString().slice(0, 10);
}

function truncate(text: string, len = 100) {
  return text.length > len ? `${text.slice(0, len)}…` : text;
}

function PostModal({
  state,
  onClose,
  onSaved,
}: {
  state: ModalState;
  onClose: () => void;
  onSaved: () => void;
}) {
  const open = state.mode !== "closed";
  const tab =
    state.mode === "edit"
      ? state.tab
      : state.mode === "create"
        ? state.tab
        : "blog";
  const item = state.mode === "edit" ? state.item : null;

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.mode === "edit") {
      const p = state.item;
      setTitle(p.title);
      setSummary(p.summary);
      setDate(toInputDate(p.date));
      setContent(p.content.join("\n"));
      setPublished(p.published);
      setSource(state.tab === "press" ? (p as PressItem).source : "");
      setImageUrl(
        state.tab === "blog" ? ((p as BlogItem).imageUrl ?? "") : ""
      );
    } else if (state.mode === "create") {
      setTitle("");
      setSummary("");
      setSource("");
      setDate(new Date().toISOString().slice(0, 10));
      setContent("");
      setImageUrl("");
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
    setPending(true);
    setError(null);

    const formData = new FormData();
    if (item) formData.set("id", item.id);
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("date", date);
    formData.set("content", content);
    formData.set("published", published ? "on" : "off");

    let result;
    if (tab === "blog") {
      formData.set("imageUrl", imageUrl);
      result = await saveBlogPost(formData);
    } else {
      formData.set("source", source);
      result = await savePressPost(formData);
    }

    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Kayıt başarısız");
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-label="Kapat"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {state.mode === "create"
              ? tab === "blog"
                ? "Yeni Blog Yazısı"
                : "Yeni Basın Haberi"
              : tab === "blog"
                ? "Blog Yazısını Düzenle"
                : "Basın Haberini Düzenle"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <FormField label="Başlık">
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Özet">
            <TextArea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              required
            />
          </FormField>

          {tab === "blog" ? (
            <AdminImageUpload
              label="Kapak Görseli"
              hint="İsteğe bağlı — görselli blog yazıları için"
              imageUrl={imageUrl}
              onImageUrlChange={setImageUrl}
              aspectClass="aspect-[16/9]"
            />
          ) : null}

          {tab === "press" ? (
            <FormField label="Kaynak">
              <TextInput
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Örn: Niğde Yerel Haber"
                required
              />
            </FormField>
          ) : null}

          <FormField label="Tarih">
            <TextInput
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </FormField>

          <FormField
            label="İçerik"
            hint="Her paragrafı ayrı satıra yazın"
          >
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
            />
          </FormField>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#3c50e0]"
            />
            <span className="text-sm font-medium text-slate-700">Yayında</span>
          </label>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-[#3c50e0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2f3fbb] disabled:opacity-60"
            >
              {pending ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BlogPressAdminPanel({
  blogPosts,
  pressPosts,
}: {
  blogPosts: BlogItem[];
  pressPosts: PressItem[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("blog");
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, title: string, type: Tab) {
    if (!confirm(`"${title}" silinsin mi?`)) return;
    setDeleting(id);
    if (type === "blog") await deleteBlogPost(id);
    else await deletePressPost(id);
    setDeleting(null);
    router.refresh();
  }

  const items = tab === "blog" ? blogPosts : pressPosts;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-lg border border-slate-200 bg-white p-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            const count = t.id === "blog" ? blogPosts.length : pressPosts.length;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={clsx(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-[#3c50e0] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon size={18} weight={active ? "fill" : "regular"} />
                {t.label}
                <span
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-xs",
                    active ? "bg-white/20" : "bg-slate-100"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setModal({ mode: "create", tab })}
          className="flex items-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2f3fbb]"
        >
          <Plus size={18} weight="bold" />
          {tab === "blog" ? "Yeni Yazı" : "Yeni Haber"}
        </button>
      </div>

      {items.length === 0 ? (
        <AdminCard className="text-center">
          <p className="font-semibold text-slate-700">
            {tab === "blog" ? "Henüz blog yazısı yok" : "Henüz basın haberi yok"}
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <AdminCard key={item.id} className="!p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {tab === "blog" && (item as BlogItem).imageUrl ? (
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(item as BlogItem).imageUrl!}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        item.published
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {item.published ? "Yayında" : "Taslak"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(item.date)}
                    {tab === "press" ? ` · ${(item as PressItem).source}` : null}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {truncate(item.summary)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={
                      tab === "blog"
                        ? `/duyurular/blog/${item.slug}`
                        : `/duyurular/basinda-biz/${item.slug}`
                    }
                    target="_blank"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#3c50e0]"
                    title="Önizle"
                  >
                    <Eye size={18} />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      setModal({ mode: "edit", tab, item })
                    }
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#3c50e0]"
                    title="Düzenle"
                  >
                    <PencilSimple size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title, tab)}
                    disabled={deleting === item.id}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    title="Sil"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      <PostModal
        state={modal}
        onClose={() => setModal({ mode: "closed" })}
        onSaved={() => router.refresh()}
      />
    </>
  );
}
