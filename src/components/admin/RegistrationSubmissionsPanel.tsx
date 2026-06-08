"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Copy, Trash } from "@phosphor-icons/react";
import { AdminCard } from "@/components/admin/AdminForm";
import { deleteRegistrationSubmission } from "@/lib/admin-actions";
import {
  parseFormFields,
  type RegistrationFieldConfig,
} from "@/lib/registration-form-fields";
import { absoluteUrl } from "@/lib/site-url";

type Submission = {
  id: string;
  data: unknown;
  createdAt: Date;
};

type FormInfo = {
  id: string;
  slug: string;
  title: string;
  description: string;
  fields: unknown;
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(d));
}

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = absoluteUrl(`/kayit/${slug}`);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-[#3c50e0] hover:text-[#3c50e0]"
    >
      <Copy size={14} />
      {copied ? "Kopyalandı!" : "Form Linki"}
    </button>
  );
}

export default function RegistrationSubmissionsPanel({
  form,
  submissions,
}: {
  form: FormInfo;
  submissions: Submission[];
}) {
  const router = useRouter();
  const fields = parseFormFields(form.fields);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Bu başvuruyu silmek istediğinize emin misiniz?")) return;
    setDeleting(id);
    await deleteRegistrationSubmission(id);
    setDeleting(null);
    router.refresh();
  }

  function getValue(data: Record<string, string>, field: RegistrationFieldConfig) {
    return data[field.key] ?? "—";
  }

  return (
    <div>
      <Link
        href="/admin/forms"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3c50e0] hover:underline"
      >
        <ArrowLeft size={16} />
        Tüm formlar
      </Link>

      <AdminCard className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{form.title}</h2>
            {form.description ? (
              <p className="mt-1 text-sm text-slate-500">{form.description}</p>
            ) : null}
            <p className="mt-2 text-xs text-slate-400">
              /kayit/{form.slug} · {submissions.length} başvuru
            </p>
          </div>
          <div className="flex gap-2">
            <CopyLinkButton slug={form.slug} />
            <Link
              href={absoluteUrl(`/kayit/${form.slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-[#3c50e0] hover:text-[#3c50e0]"
            >
              Formu Görüntüle
            </Link>
          </div>
        </div>
      </AdminCard>

      {submissions.length === 0 ? (
        <AdminCard className="text-center">
          <p className="font-semibold text-slate-700">Henüz başvuru yok</p>
          <p className="mt-1 text-sm text-slate-500">
            Form linkini paylaştığınızda başvurular burada listelenecek.
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub, index) => {
            const data = (sub.data as Record<string, string>) ?? {};
            return (
              <AdminCard key={sub.id}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3c50e0]">
                      Başvuru #{submissions.length - index}
                    </span>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {formatDate(sub.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(sub.id)}
                    disabled={deleting === sub.id}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    title="Sil"
                  >
                    <Trash size={18} />
                  </button>
                </div>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.key}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {field.label}
                      </dt>
                      <dd className="mt-0.5 text-sm text-slate-800 whitespace-pre-wrap">
                        {getValue(data, field)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
