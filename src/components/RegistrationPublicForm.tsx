"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { submitRegistrationForm } from "@/lib/admin-actions";
import type { RegistrationFieldConfig } from "@/lib/registration-form-fields";

const inputClass =
  "mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black";

export default function RegistrationPublicForm({
  slug,
  fields,
}: {
  slug: string;
  fields: RegistrationFieldConfig[];
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("slug", slug);

    const result = await submitRegistrationForm(formData);
    setPending(false);

    if (!result.ok) {
      setError(result.error ?? "Gönderim başarısız");
      return;
    }

    setSuccess(true);
    e.currentTarget.reset();
  }

  if (success) {
    return (
      <div className="rounded-2xl border-4 border-black bg-white p-8 text-center shadow-[6px_6px_0_#0f172a]">
        <CheckCircle
          size={56}
          weight="duotone"
          className="mx-auto text-[#22c55e]"
        />
        <h2 className="font-display mt-4 text-2xl font-bold text-slate-900">
          Başvurunuz alındı!
        </h2>
        <p className="font-sans mt-2 text-slate-600">
          En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 rounded-full border-2 border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:border-black"
        >
          Yeni başvuru gönder
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border-4 border-black bg-white p-6 shadow-[6px_6px_0_#0f172a] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label className="font-sans text-sm font-bold text-slate-800">
              {field.label}
              {field.required ? (
                <span className="text-red-500"> *</span>
              ) : null}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.key}
                rows={3}
                required={field.required}
                className={inputClass}
              />
            ) : (
              <input
                type={field.type}
                name={field.key}
                required={field.required}
                className={inputClass}
                {...(field.type === "number"
                  ? { min: 1, max: 12, inputMode: "numeric" as const }
                  : {})}
              />
            )}
          </div>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="font-sans mt-6 w-full rounded-full border-4 border-black px-8 py-3.5 text-sm font-bold text-slate-900 shadow-[4px_4px_0_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-60 sm:w-auto"
        style={{ backgroundColor: "#FFD600" }}
      >
        {pending ? "Gönderiliyor..." : "Başvuruyu Gönder"}
      </button>
    </form>
  );
}
