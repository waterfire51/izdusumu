import AdminLayout from "@/components/admin/AdminLayout";
import RegistrationFormsAdminPanel from "@/components/admin/RegistrationFormsAdminPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminFormsPage() {
  const forms = await prisma.registrationForm.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { submissions: true } } },
  });

  return (
    <AdminLayout
      title="Kayıt Formları"
      description="Kayıt formları oluşturun ve başvuruları yönetin"
    >
      <RegistrationFormsAdminPanel forms={forms} />
    </AdminLayout>
  );
}
