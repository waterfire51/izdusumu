"use client";

import { useRef, useState } from "react";
import { CloudArrowUp, Play } from "@phosphor-icons/react";
import clsx from "clsx";
import { uploadVideoWithProgress } from "@/lib/client-video-upload";

type UploadState = "idle" | "uploading" | "success" | "error";

export default function TestimonialVideoUpload({
  videoUrl,
  onVideoUrlChange,
}: {
  videoUrl: string;
  onVideoUrlChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setState("idle");
    setMessage("");
    setProgress(0);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Lütfen bir video dosyası seçin");
      setState("error");
      return;
    }

    setState("uploading");
    setProgress(0);
    setMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const result = await uploadVideoWithProgress(
        formData,
        "/api/admin/upload-testimonial-video",
        setProgress
      );
      onVideoUrlChange(result.url);
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setState("success");
      setMessage("Video yüklendi!");
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
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Video önizleme
      </p>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
        {videoUrl ? (
          <video
            key={videoUrl}
            className="aspect-video w-full"
            controls
            playsInline
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center gap-2 text-slate-400">
            <Play size={32} weight="duotone" />
            <p className="text-xs">Henüz video yok</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        disabled={state === "uploading"}
        className="hidden"
        id="testimonial-video-input"
      />

      <label
        htmlFor="testimonial-video-input"
        className={clsx(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 transition",
          state === "uploading"
            ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
            : "border-slate-300 bg-slate-50 hover:border-[#3c50e0] hover:bg-blue-50/40"
        )}
      >
        <CloudArrowUp
          size={28}
          weight="duotone"
          className={selectedFile ? "text-[#3c50e0]" : "text-slate-400"}
        />
        {selectedFile ? (
          <>
            <p className="text-center text-xs font-semibold text-slate-800">
              {selectedFile.name}
            </p>
            <p className="text-xs text-slate-500">
              {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
            </p>
          </>
        ) : (
          <p className="text-center text-xs font-semibold text-slate-600">
            Video seçmek için tıklayın
          </p>
        )}
      </label>

      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile || state === "uploading"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3c50e0] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2f3fbb] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
      >
        <CloudArrowUp size={16} weight="bold" />
        {state === "uploading" ? "Yükleniyor..." : "Videoyu Yükle"}
      </button>

      {(state === "uploading" || progress > 0) && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>
              {progress < 90
                ? "Gönderiliyor..."
                : progress < 100
                  ? "Kaydediliyor..."
                  : "Tamamlandı!"}
            </span>
            <span className="text-[#3c50e0]">%{progress}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#3c50e0] transition-all duration-300"
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
