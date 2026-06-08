export function uploadVideoWithProgress(
  formData: FormData,
  endpoint: string,
  onProgress: (pct: number) => void
): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && e.total > 0) {
        onProgress(Math.round((e.loaded / e.total) * 88));
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

    xhr.addEventListener("error", () => reject(new Error("Bağlantı hatası")));
    xhr.addEventListener("abort", () => reject(new Error("Yükleme iptal edildi")));

    xhr.open("POST", endpoint);
    xhr.send(formData);
  });
}
