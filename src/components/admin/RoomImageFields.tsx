"use client";

import { useRef, useState } from "react";
import { CloudArrowUp, Image as ImageIcon, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { uploadMediaWithProgress } from "@/lib/client-media-upload";

type UploadState = "idle" | "uploading" | "success" | "error";

function ImagePreview({
  url,
  alt,
  onRemove,
  className,
}: {
  url: string;
  alt: string;
  onRemove?: () => void;
  className?: string;
}) {
  return (
    <div className={clsx("group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} className="h-full w-full object-cover" />
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-1.5 top-1.5 rounded-md bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
          aria-label="Kaldır"
        >
          <X size={14} weight="bold" />
        </button>
      ) : null}
    </div>
  );
}

export function AdminImageUpload({
  label,
  hint,
  imageUrl,
  onImageUrlChange,
  aspectClass = "aspect-[5/4]",
}: {
  label: string;
  hint?: string;
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  aspectClass?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Lütfen bir görsel seçin");
      setState("error");
      return;
    }

    setState("uploading");
    setProgress(0);
    setMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const result = await uploadMediaWithProgress(
        formData,
        "/api/admin/upload-image",
        setProgress
      );
      onImageUrlChange(result.url);
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setState("success");
      setMessage("Görsel yüklendi!");
      setTimeout(() => {
        setState("idle");
        setProgress(0);
      }, 2000);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Yükleme başarısız");
      setProgress(0);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}

      <div className={clsx("mx-auto w-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-slate-50", aspectClass)}>
        {imageUrl ? (
          <ImagePreview url={imageUrl} alt={label} className="h-full w-full" />
        ) : (
          <div className="flex h-full min-h-[8rem] flex-col items-center justify-center gap-2 text-slate-400">
            <ImageIcon size={32} weight="duotone" />
            <p className="text-xs">Henüz görsel yok</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={state === "uploading"}
        className="hidden"
        onChange={(e) => {
          setSelectedFile(e.target.files?.[0] ?? null);
          setState("idle");
          setMessage("");
          setProgress(0);
        }}
        id={`upload-${label.replace(/\s/g, "-")}`}
      />

      <label
        htmlFor={`upload-${label.replace(/\s/g, "-")}`}
        className={clsx(
          "flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-4 text-xs transition",
          state === "uploading"
            ? "cursor-not-allowed border-slate-200 opacity-60"
            : "border-slate-300 hover:border-[#3c50e0] hover:bg-blue-50/30"
        )}
      >
        <CloudArrowUp size={18} weight="duotone" />
        {selectedFile ? selectedFile.name : "Görsel seç"}
      </label>

      {selectedFile ? (
        <button
          type="button"
          onClick={handleUpload}
          disabled={state === "uploading"}
          className="w-full rounded-lg bg-[#3c50e0] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2f3fbb] disabled:opacity-50"
        >
          {state === "uploading" ? "Yükleniyor..." : "Yükle"}
        </button>
      ) : null}

      {(state === "uploading" || progress > 0) && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Yükleniyor...</span>
            <span className="text-[#3c50e0]">%{progress}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#3c50e0] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {message ? (
        <p
          className={clsx(
            "text-xs font-medium",
            state === "error" ? "text-red-600" : "text-emerald-600"
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

export function RoomCoverUpload({
  imageUrl,
  onImageUrlChange,
}: {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
}) {
  return (
    <AdminImageUpload
      label="Kapak fotoğrafı"
      hint="Liste sayfasında kart üstünde görünür"
      imageUrl={imageUrl}
      onImageUrlChange={onImageUrlChange}
    />
  );
}

export function RoomGalleryUpload({
  images,
  onChange,
}: {
  images: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");

  async function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length === 0) return;

    setState("uploading");
    setProgress(0);
    setMessage("");

    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        const base = Math.round((i / files.length) * 100);
        const result = await uploadMediaWithProgress(
          formData,
          "/api/admin/upload-image",
          (pct) => {
            const slice = 100 / files.length;
            setProgress(Math.min(99, Math.round(base + (pct / 100) * slice)));
          }
        );
        newUrls.push(result.url);
      }
      onChange([...images, ...newUrls]);
      setState("success");
      setMessage(`${newUrls.length} fotoğraf eklendi`);
      if (inputRef.current) inputRef.current.value = "";
      setTimeout(() => {
        setState("idle");
        setProgress(0);
        setMessage("");
      }, 2000);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Yükleme başarısız");
      if (newUrls.length > 0) onChange([...images, ...newUrls]);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Galeri fotoğrafları
        </p>
        <p className="text-xs text-slate-400">
          Detay sayfasında yatay galeri olarak gösterilir
        </p>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((url, index) => (
            <ImagePreview
              key={`${url}-${index}`}
              url={url}
              alt={`Galeri ${index + 1}`}
              className="aspect-square"
              onRemove={() => onChange(images.filter((_, i) => i !== index))}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-xs text-slate-500">
          Henüz galeri fotoğrafı yok
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={state === "uploading"}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        id="room-gallery-input"
      />

      <label
        htmlFor="room-gallery-input"
        className={clsx(
          "flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-3 text-xs font-semibold transition",
          state === "uploading"
            ? "cursor-not-allowed border-slate-200 text-slate-400"
            : "border-slate-300 text-slate-600 hover:border-[#3c50e0] hover:text-[#3c50e0]"
        )}
      >
        <CloudArrowUp size={18} weight="duotone" />
        {state === "uploading" ? "Yükleniyor..." : "Fotoğraf ekle"}
      </label>

      {state === "uploading" && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Görseller yükleniyor...</span>
            <span className="text-[#3c50e0]">%{progress}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#3c50e0] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {message ? (
        <p
          className={clsx(
            "text-xs font-medium",
            state === "error" ? "text-red-600" : "text-emerald-600"
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
