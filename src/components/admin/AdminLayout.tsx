import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <AdminSidebar />
      <div className="ml-64 min-h-screen">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          {title ? (
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              {description ? (
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              ) : null}
            </div>
          ) : null}
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
