import AdminLayout from "@/components/admin/AdminLayout";
import TestimonialsAdminPanel from "@/components/admin/TestimonialsAdminPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminLayout
      title="Veli Yorumları"
      description="Yazılı ve videolu veli yorumları"
    >
      <TestimonialsAdminPanel items={items} />
    </AdminLayout>
  );
}
