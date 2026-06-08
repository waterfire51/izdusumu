import AdminLayout from "@/components/admin/AdminLayout";
import RoomsAdminPanel from "@/components/admin/RoomsAdminPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <AdminLayout
      title="Sınıflarımız"
      description="Derslik ve atölye yönetimi"
    >
      <RoomsAdminPanel rooms={rooms} />
    </AdminLayout>
  );
}
