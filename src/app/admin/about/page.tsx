import AdminLayout from "@/components/admin/AdminLayout";
import AboutAdminForm from "@/components/admin/AboutAdminForm";
import { getAboutPage } from "@/lib/content";

export default async function AdminAboutPage() {
  const page = await getAboutPage();

  return (
    <AdminLayout
      title="Hakkımızda"
      description="Kurumsal sayfa — hero, misyon, vizyon ve hikaye"
    >
      <AboutAdminForm page={page} />
    </AdminLayout>
  );
}
