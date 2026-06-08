"use client";

import { useState } from "react";
import clsx from "clsx";

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#3c50e0] focus:ring-2 focus:ring-[#3c50e0]/20",
        props.className
      )}
    />
  );
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#3c50e0] focus:ring-2 focus:ring-[#3c50e0]/20",
        props.className
      )}
    />
  );
}

export function SubmitButton({
  children,
  pending,
}: {
  children: React.ReactNode;
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[#3c50e0] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f3fbb] disabled:opacity-60"
    >
      {pending ? "Kaydediliyor..." : children}
    </button>
  );
}

export function SaveForm({
  action,
  children,
  successMessage = "Kaydedildi!",
}: {
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  children: React.ReactNode;
  successMessage?: string;
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const result = await action(formData);
    setPending(false);
    if (result.ok) {
      setMessage({ type: "ok", text: successMessage });
    } else {
      setMessage({ type: "err", text: result.error ?? "Bir hata oluştu" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {children}
      <div className="flex items-center gap-4">
        <SubmitButton pending={pending}>Kaydet</SubmitButton>
        {message ? (
          <p
            className={clsx(
              "text-sm font-medium",
              message.type === "ok" ? "text-emerald-600" : "text-red-600"
            )}
          >
            {message.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export function FileUploadField({
  name,
  accept,
  currentUrl,
  label,
}: {
  name: string;
  accept?: string;
  currentUrl?: string | null;
  label: string;
}) {
  return (
    <FormField
      label={label}
      hint="Dosya GitHub izdusumu_assets deposuna yüklenir"
    >
      {currentUrl ? (
        <p className="mb-2 truncate text-xs text-slate-500">
          Mevcut: {currentUrl}
        </p>
      ) : null}
      <input
        type="file"
        name={name}
        accept={accept}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#3c50e0] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#2f3fbb]"
      />
    </FormField>
  );
}
