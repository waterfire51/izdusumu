import AdminLayout from "@/components/admin/AdminLayout";
import EducationAdminForm from "@/components/admin/EducationAdminForm";
import { getEducationProgramSections } from "@/lib/content";

export default async function AdminEducationPage() {
  const sections = await getEducationProgramSections();

  return (
    <AdminLayout
      title="Eğitim Programı"
      description="Eğitim modelimiz sayfası — 4 bölüm"
    >
      <EducationAdminForm
        sections={sections.map((s) => ({
          id: s.id,
          key: s.key,
          title: s.title,
          content: s.content,
          icon: s.icon,
        }))}
      />
    </AdminLayout>
  );
}
