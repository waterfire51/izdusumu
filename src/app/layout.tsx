import type { Metadata } from "next";
import { Inter, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import Header2 from "@/components/Header2";
import Footer2 from "@/components/Footer2";
import WhatsAppButton from "@/components/WhatsAppButton";
import VisitTracker from "@/components/VisitTracker";
import GlobalSeoJsonLd from "@/components/seo/GlobalSeoJsonLd";
import { getSiteSettings } from "@/lib/content";
import { defaultSiteMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-secondary",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...defaultSiteMetadata(),
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Niğde Anaokulu | Özel İzdüşümü Anaokulu - Çift Kanatlı Okul Öncesi Eğitim",
    template: "%s | Özel İzdüşümü Anaokulu",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, h] = await Promise.all([getSiteSettings(), headers()]);
  const pathname = h.get("x-url")?.split("?")[0] ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang="tr"
      className={`${inter.variable} ${nunito.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className={isAdmin ? "min-h-full bg-[#f1f5f9]" : "min-h-full bg-white text-slate-900"}
      >
        {!isAdmin ? <GlobalSeoJsonLd settings={settings} /> : null}
        {!isAdmin ? <VisitTracker /> : null}
        {!isAdmin ? <Header2 /> : null}
        <main className="flex-1">{children}</main>
        {!isAdmin ? <Footer2 settings={settings} /> : null}
        {!isAdmin ? <WhatsAppButton whatsapp={settings.whatsapp} /> : null}
      </body>
    </html>
  );
}
