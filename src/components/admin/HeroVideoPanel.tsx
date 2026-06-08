"use client";

import { useRef, useState } from "react";
import { CloudArrowUp, FilmStrip, Play } from "@phosphor-icons/react";
import clsx from "clsx";

type UploadState = "idle" | "uploading" | "success" | "error";

export default function HeroVideoPanel({
  initialVideoUrl,
}: {
  initialVideoUrl: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
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
      const result = await uploadWithProgress(formData, setProgress);
      setVideoUrl(result.url);
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setState("success");
      setMessage("Video başarıyla yüklendi ve kaydedildi!");
      setTimeout(() => {
        setState("idle");
        setProgress(0);
      }, 2500);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Yükleme başarısız");
      setProgress(0);
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
        <FilmStrip size={20} weight="duotone" className="text-[#3c50e0]" />
        Tanıtım Filmi
      </h3>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sol: Mevcut video önizleme */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Mevcut Tanıtım Filmi
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
            {videoUrl ? (
              <video
                key={videoUrl}
                className="aspect-video w-full"
                controls
                playsInline
                preload="metadata"
                poster=""
              >
                <source src={videoUrl} type="video/mp4" />
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-2 text-slate-400">
                <Play size={40} weight="duotone" />
                <p className="text-sm">Henüz video yüklenmemiş</p>
              </div>
            )}
          </div>
        </div>

        {/* Sağ: Video yükleme */}
        <div className="flex flex-col justify-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Yeni Video Yükle
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={state === "uploading"}
            className="hidden"
            id="hero-video-input"
          />

          <label
            htmlFor="hero-video-input"
            className={clsx(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition",
              state === "uploading"
                ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
                : "border-slate-300 bg-slate-50 hover:border-[#3c50e0] hover:bg-blue-50/40"
            )}
          >
            <CloudArrowUp
              size={36}
              weight="duotone"
              className={selectedFile ? "text-[#3c50e0]" : "text-slate-400"}
            />
            {selectedFile ? (
              <>
                <p className="text-center text-sm font-semibold text-slate-800">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </>
            ) : (
              <>
                <p className="text-center text-sm font-semibold text-slate-700">
                  Video dosyası seçmek için tıklayın
                </p>
                <p className="text-center text-xs text-slate-500">
                  MP4, WebM, MOV — GitHub deposuna yüklenir
                </p>
              </>
            )}
          </label>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || state === "uploading"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3c50e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2f3fbb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CloudArrowUp size={18} weight="bold" />
            {state === "uploading" ? "Yükleniyor..." : "Videoyu Yükle"}
          </button>

          {/* İlerleme çubuğu */}
          {(state === "uploading" || progress > 0) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>
                  {progress < 90
                    ? "Sunucuya gönderiliyor..."
                    : progress < 100
                      ? "GitHub'a kaydediliyor..."
                      : "Tamamlandı!"}
                </span>
                <span className="text-[#3c50e0]">%{progress}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#3c50e0] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {message ? (
            <p
              className={clsx(
                "text-sm font-medium",
                state === "error" ? "text-red-600" : "text-emerald-600"
              )}
            >
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function uploadWithProgress(
  formData: FormData,
  onProgress: (pct: number) => void
): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && e.total > 0) {
        const clientPct = Math.round((e.loaded / e.total) * 88);
        onProgress(clientPct);
      }
    });

    xhr.upload.addEventListener("load", () => {
      onProgress(90);
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText) as {
            ok?: boolean;
            url?: string;
            error?: string;
          };
          if (data.ok && data.url) {
            onProgress(100);
            resolve({ url: data.url });
          } else {
            reject(new Error(data.error ?? "Yükleme başarısız"));
          }
        } catch {
          reject(new Error("Sunucu yanıtı okunamadı"));
        }
      } else {
        try {
          const data = JSON.parse(xhr.responseText) as { error?: string };
          reject(new Error(data.error ?? `Hata: ${xhr.status}`));
        } catch {
          reject(new Error(`Yükleme hatası (${xhr.status})`));
        }
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Bağlantı hatası"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Yükleme iptal edildi"));
    });

    xhr.open("POST", "/api/admin/upload-video");
    xhr.send(formData);
  });
}
