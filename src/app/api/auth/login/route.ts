import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json(
      { error: "E-posta ve şifre gerekli" },
      { status: 400 }
    );
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return NextResponse.json(
      { error: "Geçersiz e-posta veya şifre" },
      { status: 401 }
    );
  }

  await createSession(user.id, user.email);
  return NextResponse.json({ ok: true });
}
