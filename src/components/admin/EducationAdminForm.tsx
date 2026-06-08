"use client";

import {
  FormField,
  SaveForm,
  TextArea,
  TextInput,
} from "@/components/admin/AdminForm";
import { saveEducationProgram } from "@/lib/admin-actions";

const SECTION_SLOTS = [
  { key: "intro", label: "Giriş metni (turuncu kart)" },
  { key: "branch_lessons", label: "Branş dersleri" },
  { key: "education_system", label: "Kullanılan eğitim sistemi" },
  { key: "insa_program", label: "İnşa erken çocukluk programı" },
] as const;

const ICON_OPTIONS = [
  { value: "none", label: "İkon yok" },
  { value: "student", label: "Öğrenci" },
  { value: "puzzle", label: "Puzzle" },
  { value: "book", label: "Kitap" },
] as const;

type SectionData = {
  id?: string;
  key: string;
  title: string | null;
  content: string;
  icon: string | null;
};

export default function EducationAdminForm({
  sections,
}: {
  sections: SectionData[];
}) {
  const byKey = Object.fromEntries(sections.map((s) => [s.key, s]));

  return (
    <SaveForm
      action={saveEducationProgram}
      successMessage="Eğitim programı kaydedildi!"
    >
      <div className="space-y-6">
        {SECTION_SLOTS.map((slot, index) => {
          const section = byKey[slot.key];
          const iconValue = section?.icon ?? "none";

          return (
            <div
              key={slot.key}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                {slot.label}
              </p>

              {section?.id ? (
                <input type="hidden" name={`section_${index}_id`} value={section.id} />
              ) : null}
              <input type="hidden" name={`section_${index}_key`} value={slot.key} />

              <div className="mb-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <FormField label="Başlık">
                  <TextInput
                    name={`section_${index}_title`}
                    defaultValue={section?.title ?? ""}
                    placeholder={slot.key === "intro" ? "Giriş bölümünde gösterilmez" : ""}
                  />
                </FormField>
                <FormField label="İkon">
                  <select
                    name={`section_${index}_icon`}
                    defaultValue={iconValue}
                    className="w-full min-w-[10rem] rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#3c50e0] focus:ring-2 focus:ring-[#3c50e0]/20"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="İçerik">
                <TextArea
                  name={`section_${index}_content`}
                  rows={slot.key === "intro" || slot.key === "insa_program" ? 6 : 4}
                  defaultValue={section?.content ?? ""}
                  required
                />
              </FormField>
            </div>
          );
        })}
      </div>
    </SaveForm>
  );
}
