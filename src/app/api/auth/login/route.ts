import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return NextResponse.json(
      { error: "Kullanıcı adı ve şifre gerekli" },
      { status: 400 }
    );
  }

  const user = await prisma.adminUser.findUnique({
    where: { username: username.trim() },
  });
  if (!user || !(await verifyPassword(password, user.password))) {
    return NextResponse.json(
      { error: "Geçersiz kullanıcı adı veya şifre" },
      { status: 401 }
    );
  }

  await createSession(user.id, user.username);
  return NextResponse.json({ ok: true });
}
