"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  CalendarBlank,
  ForkKnife,
  MegaphoneSimple,
  PencilSimple,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { AdminCard, FormField, TextArea, TextInput } from "@/components/admin/AdminForm";
import {
  deleteAnnouncement,
  deleteEvent,
  deleteMealMenu,
  saveAnnouncement,
  saveEvent,
  saveMealMenu,
} from "@/lib/admin-actions";

type Tab = "announcement" | "meal" | "event";

type AnnouncementItem = {
  id: string;
  text: string;
  published: boolean;
  sortOrder: number;
};

type MealItem = {
  id: string;
  day: string;
  menu: string;
  sortOrder: number;
};

type EventItem = {
  id: string;
  date: string;
  title: string;
  sortOrder: number;
};

type ModalState =
  | { mode: "closed" }
  | { mode: "create"; tab: Tab }
  | { mode: "edit"; tab: Tab; item: AnnouncementItem | MealItem | EventItem };

const TABS: { id: Tab; label: string; icon: typeof Bell }[] = [
  { id: "announcement", label: "Duyurular", icon: MegaphoneSimple },
  { id: "meal", label: "Yemek Menüsü", icon: ForkKnife },
  { id: "event", label: "Etkinlikler", icon: CalendarBlank },
];

const ADD_LABELS: Record<Tab, string> = {
  announcement: "Yeni Duyuru",
  meal: "Yeni Menü",
  event: "Yeni Etkinlik",
};

function truncate(text: string, len = 100) {
  return text.length > len ? `${text.slice(0, len)}…` : text;
}

function ItemModal({
  state,
  counts,
  onClose,
  onSaved,
}: {
  state: ModalState;
  counts: Record<Tab, number>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const open = state.mode !== "closed";
  const tab = state.mode === "edit" ? state.tab : state.mode === "create" ? state.tab : "announcement";
  const item = state.mode === "edit" ? state.item : null;

  const [text, setText] = useState("");
  const [published, setPublished] = useState(true);
  const [day, setDay] = useState("");
  const [menu, setMenu] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.mode === "edit") {
      if (state.tab === "announcement") {
        const a = state.item as AnnouncementItem;
        setText(a.text);
        setPublished(a.published);
      } else if (state.tab === "meal") {
        const m = state.item as MealItem;
        setDay(m.day);
        setMenu(m.menu);
      } else {
        const e = state.item as EventItem;
        setDate(e.date);
        setTitle(e.title);
      }
    } else if (state.mode === "create") {
      setText("");
      setPublished(true);
      setDay("");
      setMenu("");
      setDate("");
      setTitle("");
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

  const modalTitle =
    state.mode === "create"
      ? `${ADD_LABELS[tab]} Ekle`
      : tab === "announcement"
        ? "Duyuruyu Düzenle"
        : tab === "meal"
          ? "Menüyü Düzenle"
          : "Etkinliği Düzenle";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData();
    if (item) formData.set("id", item.id);

    const sortOrder =
      item && "sortOrder" in item ? item.sortOrder : counts[tab];

    let result: { ok: boolean; error?: string };

    if (tab === "announcement") {
      formData.set("text", text);
      formData.set("published", published ? "on" : "off");
      formData.set("sortOrder", String(sortOrder));
      result = await saveAnnouncement(formData);
    } else if (tab === "meal") {
      formData.set("day", day);
      formData.set("menu", menu);
      formData.set("sortOrder", String(sortOrder));
      result = await saveMealMenu(formData);
    } else {
      formData.set("date", date);
      formData.set("title", title);
      formData.set("sortOrder", String(sortOrder));
      result = await saveEvent(formData);
    }

    setPending(false);

    if (!result.ok) {
      setError(("error" in result ? result.error : null) ?? "Kayıt başarısız");
      return;
    }
    onSaved();
    onClose();
  }

  async function handleDelete() {
    if (!item) return;
    const label =
      tab === "announcement"
        ? truncate((item as AnnouncementItem).text, 40)
        : tab === "meal"
          ? (item as MealItem).day
          : (item as EventItem).title;

    if (!confirm(`"${label}" kaydını silmek istediğinize emin misiniz?`)) return;

    setPending(true);
    if (tab === "announcement") await deleteAnnouncement(item.id);
    else if (tab === "meal") await deleteMealMenu(item.id);
    else await deleteEvent(item.id);
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
        className="relative z-10 flex max-h-[min(90vh,32rem)] w-full max-w-[min(100%,24rem)] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-sm"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-bold text-slate-900">{modalTitle}</h3>
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
            {tab === "announcement" ? (
              <>
                <FormField label="Duyuru metni">
                  <TextArea
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </FormField>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  Yayında
                </label>
              </>
            ) : null}

            {tab === "meal" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Gün">
                  <TextInput
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="Pazartesi"
                    required
                  />
                </FormField>
                <FormField label="Menü">
                  <TextInput
                    value={menu}
                    onChange={(e) => setMenu(e.target.value)}
                    placeholder="Çorba, pilav..."
                    required
                  />
                </FormField>
              </div>
            ) : null}

            {tab === "event" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Tarih">
                  <TextInput
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="15 Nisan"
                    required
                  />
                </FormField>
                <FormField label="Etkinlik">
                  <TextInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </FormField>
              </div>
            ) : null}

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

export default function AnnouncementsAdminPanel({
  announcements,
  meals,
  events,
}: {
  announcements: AnnouncementItem[];
  meals: MealItem[];
  events: EventItem[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("announcement");
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  const counts: Record<Tab, number> = {
    announcement: announcements.length,
    meal: meals.length,
    event: events.length,
  };

  const emptyMessages: Record<Tab, string> = {
    announcement: "Henüz duyuru yok.",
    meal: "Henüz menü kaydı yok.",
    event: "Henüz etkinlik yok.",
  };

  return (
    <>
      <AdminCard>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap rounded-lg border border-slate-200 bg-slate-50 p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={clsx(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm",
                  tab === id
                    ? "bg-white text-[#3c50e0] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <Icon size={16} />
                {label}
                <span className="ml-0.5 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                  {counts[id]}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setModal({ mode: "create", tab })}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f3fbb]"
          >
            <Plus size={18} weight="bold" />
            {ADD_LABELS[tab]} Ekle
          </button>
        </div>

        {tab === "announcement" && (
          <ItemList
            empty={announcements.length === 0}
            emptyMessage={emptyMessages.announcement}
            onAdd={() => setModal({ mode: "create", tab: "announcement" })}
          >
            {announcements.map((item) => (
              <ListRow
                key={item.id}
                primary={truncate(item.text)}
                secondary={item.published ? undefined : "Taslak"}
                onEdit={() =>
                  setModal({ mode: "edit", tab: "announcement", item })
                }
              />
            ))}
          </ItemList>
        )}

        {tab === "meal" && (
          <ItemList
            empty={meals.length === 0}
            emptyMessage={emptyMessages.meal}
            onAdd={() => setModal({ mode: "create", tab: "meal" })}
          >
            {meals.map((item) => (
              <ListRow
                key={item.id}
                primary={item.day}
                secondary={item.menu}
                onEdit={() => setModal({ mode: "edit", tab: "meal", item })}
              />
            ))}
          </ItemList>
        )}

        {tab === "event" && (
          <ItemList
            empty={events.length === 0}
            emptyMessage={emptyMessages.event}
            onAdd={() => setModal({ mode: "create", tab: "event" })}
          >
            {events.map((item) => (
              <ListRow
                key={item.id}
                primary={item.title}
                secondary={item.date}
                onEdit={() => setModal({ mode: "edit", tab: "event", item })}
              />
            ))}
          </ItemList>
        )}
      </AdminCard>

      <ItemModal
        state={modal}
        counts={counts}
        onClose={() => setModal({ mode: "closed" })}
        onSaved={() => router.refresh()}
      />
    </>
  );
}

function ItemList({
  children,
  empty,
  emptyMessage,
  onAdd,
}: {
  children: React.ReactNode;
  empty: boolean;
  emptyMessage: string;
  onAdd: () => void;
}) {
  if (empty) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
        <Bell size={36} weight="duotone" className="mx-auto text-slate-300" />
        <p className="mt-3 text-sm text-slate-500">{emptyMessage}</p>
        <button
          type="button"
          onClick={onAdd}
          className="mt-3 text-sm font-semibold text-[#3c50e0] hover:underline"
        >
          İlk kaydı ekle
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      {children}
    </div>
  );
}

function ListRow({
  primary,
  secondary,
  onEdit,
}: {
  primary: string;
  secondary?: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50/80">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">{primary}</p>
        {secondary ? (
          <p
            className={clsx(
              "mt-0.5",
              secondary === "Taslak"
                ? "text-[10px] font-bold uppercase tracking-wide text-amber-700"
                : "text-sm text-slate-500"
            )}
          >
            {secondary}
          </p>
        ) : null}
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
