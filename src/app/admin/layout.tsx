import "./admin.css";

export const metadata = {
  title: "Yönetim Paneli | İzdüşümü",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
