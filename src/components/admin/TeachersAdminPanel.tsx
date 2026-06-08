"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PencilSimple, Plus, Trash, X } from "@phosphor-icons/react";
import clsx from "clsx";
import {
  AdminCard,
  FormField,
  TextArea,
  TextInput,
} from "@/components/admin/AdminForm";
import { deleteTeacher, saveTeacher } from "@/lib/admin-actions";

type Teacher = {
  id: string;
  name: string;
  role: string;
  description: string;
  sortOrder: number;
};

type ModalState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; teacher: Teacher };

const TEACHER_COLORS = ["#8A4FFF", "#f97316", "#6366f1", "#22c55e"];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function TeacherModal({
  state,
  teacherCount,
  onClose,
  onSaved,
}: {
  state: ModalState;
  teacherCount: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const open = state.mode !== "closed";
  const teacher = state.mode === "edit" ? state.teacher : null;

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (state.mode === "edit") {
      setName(state.teacher.name);
      setRole(state.teacher.role);
      setDescription(state.teacher.description);
    } else if (state.mode === "create") {
      setName("");
      setRole("");
      setDescription("");
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
    setPending(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await saveTeacher(formData);
    setPending(false);
    if (result.ok) {
      onSaved();
      onClose();
    } else {
      setError(result.error ?? "Kayıt başarısız");
    }
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
        className="relative z-10 flex w-full max-w-[min(100%,22rem)] max-h-[min(90vh,28rem)] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-w-sm"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-bold text-slate-900">
            {state.mode === "create" ? "Yeni Öğretmen" : "Öğretmeni Düzenle"}
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
          <div className="space-y-3 p-4">
            {teacher ? <input type="hidden" name="id" value={teacher.id} /> : null}
            <input
              type="hidden"
              name="sortOrder"
              value={teacher?.sortOrder ?? teacherCount}
            />

            <FormField label="Ad Soyad">
              <TextInput
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elif Karaca"
                required
              />
            </FormField>
            <FormField label="Görev / Unvan">
              <TextInput
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Okul Müdürü"
                required
              />
            </FormField>
            <FormField label="Kısa Tanıtım">
              <TextArea
                name="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deneyim ve uzmanlık alanı..."
                required
              />
            </FormField>

            {error ? (
              <p className="text-xs font-medium text-red-600">{error}</p>
            ) : null}
          </div>

          <div className="mt-auto flex shrink-0 justify-end gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white sm:text-sm sm:px-4 sm:py-2"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-[#3c50e0] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#2f3fbb] disabled:opacity-60 sm:text-sm sm:px-5 sm:py-2"
            >
              {pending ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TeachersAdminPanel({
  teachers,
}: {
  teachers: Teacher[];
}) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" öğretmenini silmek istediğinize emin misiniz?`)) {
      return;
    }
    setDeletingId(id);
    await deleteTeacher(id);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <div>
      <AdminCard>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Öğretmen Listesi
            </h3>
            <p className="text-xs text-slate-500">
              {teachers.length} öğretmen kayıtlı
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModal({ mode: "create" })}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f3fbb]"
          >
            <Plus size={18} weight="bold" />
            Yeni Öğretmen
          </button>
        </div>

        {teachers.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <p className="text-sm text-slate-500">Henüz öğretmen eklenmemiş.</p>
            <button
              type="button"
              onClick={() => setModal({ mode: "create" })}
              className="mt-3 text-sm font-semibold text-[#3c50e0] hover:underline"
            >
              İlk öğretmeni ekle
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Öğretmen</th>
                  <th className="px-4 py-3">Görev</th>
                  <th className="px-4 py-3">Tanıtım</th>
                  <th className="px-4 py-3 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teachers.map((teacher, index) => (
                  <tr
                    key={teacher.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-slate-900 text-xs font-bold text-white"
                          style={{
                            backgroundColor:
                              TEACHER_COLORS[index % TEACHER_COLORS.length],
                          }}
                        >
                          {initials(teacher.name)}
                        </div>
                        <span className="font-semibold text-slate-900">
                          {teacher.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{teacher.role}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-slate-500">
                      {teacher.description}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setModal({ mode: "edit", teacher })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          <PencilSimple size={14} />
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(teacher.id, teacher.name)}
                          disabled={deletingId === teacher.id}
                          className={clsx(
                            "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold",
                            "border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60"
                          )}
                        >
                          <Trash size={14} />
                          {deletingId === teacher.id ? "..." : "Sil"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      <TeacherModal
        state={modal}
        teacherCount={teachers.length}
        onClose={() => setModal({ mode: "closed" })}
        onSaved={() => router.refresh()}
      />
    </div>
  );
}
