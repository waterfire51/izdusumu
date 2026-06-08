import AdminLayout from "@/components/admin/AdminLayout";
import HomeAboutAdminForm from "@/components/admin/HomeAboutAdminForm";
import { getHomeAbout } from "@/lib/content";

export default async function AdminHomeAboutPage() {
  const data = await getHomeAbout();

  return (
    <AdminLayout
      title="Neden Biz"
      description="Anasayfadaki Neden Biz bölümü — başlık, kartlar ve taahhüt"
    >
      <HomeAboutAdminForm data={data} />
    </AdminLayout>
  );
}
