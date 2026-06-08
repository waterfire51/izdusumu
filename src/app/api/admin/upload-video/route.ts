import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadToGitHub } from "@/lib/github-upload";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Geçerli bir video dosyası seçin" }, { status: 400 });
  }

  if (!file.type.startsWith("video/")) {
    return NextResponse.json({ error: "Sadece video dosyaları yüklenebilir" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadToGitHub(buffer, file.name, "videos");

    const existing = await prisma.heroSection.findUnique({
      where: { id: "default" },
    });

    if (existing) {
      await prisma.heroSection.update({
        where: { id: "default" },
        data: { videoUrl: url },
      });
    } else {
      await prisma.heroSection.create({
        data: {
          id: "default",
          headline: "İz Düşümü Anaokulu'nda Güzel Dokunuşlar",
          headlineHighlight1: "İz Düşümü Anaokulu",
          headlineHighlight2: "İz Bırakır",
          subtitle:
            "Her gün yeni keşifler ve gelişim fırsatları sunan sıcak bir topluluğa hoş geldiniz.",
          videoUrl: url,
          ctaText: "2-6 Yaş Arası Çocuklarımız İçin",
          ctaHref: "/dersliklerimiz",
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/hero");

    return NextResponse.json({ ok: true, url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Yükleme başarısız";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
