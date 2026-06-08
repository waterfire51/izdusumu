"use client";

import { useState } from "react";

export default function DeleteButton({
  action,
  label = "Sil",
}: {
  action: () => Promise<{ ok: boolean; error?: string }>;
  label?: string;
}) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    setPending(true);
    await action();
    setPending(false);
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? "..." : label}
    </button>
  );
}
