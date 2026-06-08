"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ClipboardText,
  Copy,
  Eye,
  Link as LinkIcon,
  PencilSimple,
  Plus,
  Trash,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import {
  AdminCard,
  FormField,
  TextArea,
  TextInput,
} from "@/components/admin/AdminForm";
import {
  deleteRegistrationForm,
  saveRegistrationForm,
} from "@/lib/admin-actions";
import {
  parseFormFields,
  REGISTRATION_FIELD_TEMPLATES,
  type RegistrationFieldConfig,
} from "@/lib/registration-form-fields";

type FormRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  fields: unknown;
  published: boolean;
  createdAt: Date;
  _count: { submissions: number };
};

type ModalState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; form: FormRow };

type FieldSelection = Record<string, { selected: boolean; required: boolean }>;

function initSelection(fields?: RegistrationFieldConfig[]): FieldSelection {
  const sel: FieldSelection = {};
  for (const t of REGISTRATION_FIELD_TEMPLATES) {
    const existing = fields?.find((f) => f.key === t.key);
    sel[t.key] = {
      selected: !!existing,
      required: existing?.required ?? false,
    };
  }
  return sel;
}

function FormModal({
  state,
  onClose,
  onSaved,
}: {
  state: ModalState;
  onClose: () => void;
  onSaved: (slug?: string) => void;
}) {
  const open = state.mode !== "closed";
  const form = state.mode === "edit" ? state.form : null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [selection, setSelection] = useState<FieldSelection>(() =>
    initSelection()
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdLink, setCreatedLink] = useState<string | null>(null);

  useEffect(() => {
    if (state.mode === "edit") {
      setTitle(state.form.title);
      setDescription(state.form.description);
      setPublished(state.form.published);
      setSelection(initSelection(parseFormFields(state.form.fields)));
    } else if (state.mode === "create") {
      setTitle("");
      setDescription("");
      setPublished(true);
      setSelection(initSelection());
    }
    setError(null);
    setCreatedLink(null);
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

  function toggleField(key: string) {
    setSelection((prev) => ({
      ...prev,
      [key]: {
        selected: !prev[key]?.selected,
        required: prev[key]?.required ?? false,
      },
    }));
  }

  function toggleRequired(key: string) {
    setSelection((prev) => ({
      ...prev,
      [key]: {
        selected: prev[key]?.selected ?? false,
        required: !prev[key]?.required,
      },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData();
    if (form) formData.set("id", form.id);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("published", published ? "on" : "off");

    for (const [key, val] of Object.entries(selection)) {
      if (val.selected) {
        formData.append("field_keys", key);
        if (val.required) formData.set(`field_required_${key}`, "on");
      }
    }

    const result = await saveRegistrationForm(formData);
    setPending(false);

    if (!result.ok) {
      setError(result.error ?? "Kayıt başarısız");
      return;
    }

    if (state.mode === "create" && result.slug) {
      const url = `${window.location.origin}/kayit/${result.slug}`;
      setCreatedLink(url);
      onSaved(result.slug);
    } else {
      onSaved();
      onClose();
    }
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
            {state.mode === "create" ? "Yeni Kayıt Formu" : "Formu Düzenle"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {createdLink ? (
          <div className="space-y-4 p-6">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-800">Form oluşturuldu!</p>
              <p className="mt-1 text-sm text-green-700">
                Aşağıdaki linki velilerle paylaşabilirsiniz:
              </p>
              <div className="mt-3 flex items-center gap-2">
                <code className="flex-1 truncate rounded-lg bg-white px-3 py-2 text-sm text-slate-800">
                  {createdLink}
                </code>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(createdLink)}
                  className="flex items-center gap-1.5 rounded-lg bg-[#3c50e0] px-3 py-2 text-sm font-semibold text-white hover:bg-[#2f3fbb]"
                >
                  <Copy size={16} />
                  Kopyala
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Tamam
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <FormField label="Form Başlığı">
              <TextInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: 2026-2027 Kayıt Formu"
                required
              />
            </FormField>

            <FormField label="Açıklama">
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Form hakkında kısa bir açıklama..."
              />
            </FormField>

            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">
                İstenilen Bilgiler
              </p>
              <div className="space-y-2 rounded-lg border border-slate-200 p-3">
                {REGISTRATION_FIELD_TEMPLATES.map((t) => {
                  const sel = selection[t.key];
                  return (
                    <div
                      key={t.key}
                      className={clsx(
                        "flex items-center justify-between rounded-lg px-3 py-2 transition",
                        sel?.selected ? "bg-[#3c50e0]/5" : "hover:bg-slate-50"
                      )}
                    >
                      <label className="flex flex-1 cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={sel?.selected ?? false}
                          onChange={() => toggleField(t.key)}
                          className="h-4 w-4 rounded border-slate-300 text-[#3c50e0]"
                        />
                        <span className="text-sm font-medium text-slate-800">
                          {t.label}
                        </span>
                      </label>
                      {sel?.selected ? (
                        <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-500">
                          <input
                            type="checkbox"
                            checked={sel.required}
                            onChange={() => toggleRequired(t.key)}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-[#3c50e0]"
                          />
                          Zorunlu
                        </label>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#3c50e0]"
              />
              <span className="text-sm font-medium text-slate-700">
                Yayında (link aktif)
              </span>
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
                {pending
                  ? "Kaydediliyor..."
                  : state.mode === "create"
                    ? "Formu Oluştur"
                    : "Kaydet"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/kayit/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-[#3c50e0] hover:text-[#3c50e0]"
    >
      <Copy size={14} />
      {copied ? "Kopyalandı!" : "Linki Kopyala"}
    </button>
  );
}

export default function RegistrationFormsAdminPanel({
  forms: initialForms,
}: {
  forms: FormRow[];
}) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" formunu silmek istediğinize emin misiniz?`)) {
      return;
    }
    setDeleting(id);
    await deleteRegistrationForm(id);
    setDeleting(null);
    router.refresh();
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Kayıt formları oluşturun, paylaşılabilir link alın ve başvuruları
          form bazında görüntüleyin.
        </p>
        <button
          type="button"
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2f3fbb]"
        >
          <Plus size={18} weight="bold" />
          Yeni Form
        </button>
      </div>

      {initialForms.length === 0 ? (
        <AdminCard className="text-center">
          <ClipboardText
            size={48}
            className="mx-auto text-slate-300"
            weight="duotone"
          />
          <p className="mt-4 font-semibold text-slate-700">
            Henüz kayıt formu yok
          </p>
          <p className="mt-1 text-sm text-slate-500">
            İlk formunuzu oluşturmak için &quot;Yeni Form&quot; butonuna
            tıklayın.
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {initialForms.map((form) => {
            const fields = parseFormFields(form.fields);
            return (
              <AdminCard key={form.id} className="!p-0 overflow-hidden">
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {form.title}
                      </h3>
                      <span
                        className={clsx(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          form.published
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {form.published ? "Yayında" : "Taslak"}
                      </span>
                    </div>
                    {form.description ? (
                      <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                        {form.description}
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <LinkIcon size={14} />
                        /kayit/{form.slug}
                      </span>
                      <span>·</span>
                      <span>{fields.length} alan</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-semibold text-[#3c50e0]">
                        <UsersThree size={14} />
                        {form._count.submissions} başvuru
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <CopyLinkButton slug={form.slug} />
                    <Link
                      href={`/kayit/${form.slug}`}
                      target="_blank"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-[#3c50e0] hover:text-[#3c50e0]"
                    >
                      <Eye size={14} />
                      Önizle
                    </Link>
                    <Link
                      href={`/admin/forms/${form.id}`}
                      className="flex items-center gap-1.5 rounded-lg bg-[#3c50e0]/10 px-3 py-1.5 text-xs font-semibold text-[#3c50e0] hover:bg-[#3c50e0]/20"
                    >
                      <UsersThree size={14} />
                      Başvurular
                    </Link>
                    <button
                      type="button"
                      onClick={() => setModal({ mode: "edit", form })}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#3c50e0]"
                      title="Düzenle"
                    >
                      <PencilSimple size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(form.id, form.title)}
                      disabled={deleting === form.id}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      title="Sil"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}

      <FormModal
        state={modal}
        onClose={() => setModal({ mode: "closed" })}
        onSaved={() => router.refresh()}
      />
    </>
  );
}
