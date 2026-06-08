import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { SITE_URL } from "@/lib/site-url";

export async function POST(request: Request) {
  await destroySession();
  const base = SITE_URL || new URL(request.url).origin;
  return NextResponse.redirect(new URL("/admin/login", base));
}
