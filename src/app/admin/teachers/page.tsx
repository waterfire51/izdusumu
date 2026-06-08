import AdminLayout from "@/components/admin/AdminLayout";
import TeachersAdminPanel from "@/components/admin/TeachersAdminPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminTeachersPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminLayout
      title="Öğretmen Kadrosu"
      description="Öğretmen listesi — ekleme ve düzenleme modal ile yapılır"
    >
      <TeachersAdminPanel teachers={teachers} />
    </AdminLayout>
  );
}
