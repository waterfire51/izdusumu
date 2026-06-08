import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadToGitHub } from "@/lib/github-upload";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { error: "Geçerli bir video dosyası seçin" },
      { status: 400 }
    );
  }

  if (!file.type.startsWith("video/")) {
    return NextResponse.json(
      { error: "Sadece video dosyaları yüklenebilir" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadToGitHub(buffer, file.name, "videos");
    return NextResponse.json({ ok: true, url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Yükleme başarısız";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
