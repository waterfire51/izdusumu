import type { Metadata } from "next";
import { Inter, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import Header2 from "@/components/Header2";
import Footer2 from "@/components/Footer2";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "Özel İzdüşümü Anaokulu",
  description:
    "Modern, güven veren ve çocuk dostu bir okul öncesi eğitim deneyimi.",
  metadataBase: new URL("https://izdusumuanaokulu.com"),
  openGraph: {
    title: "Özel İzdüşümü Anaokulu",
    description:
      "Çocukların keşfettiği, velilerin güvenle tercih ettiği anaokulu.",
    type: "website",
    locale: "tr_TR",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${nunito.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full bg-white text-slate-900">
        <Header2 />
        <main className="flex-1">{children}</main>
        <Footer2 />
        <WhatsAppButton />
      </body>
    </html>
  );
}
