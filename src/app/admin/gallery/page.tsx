import AdminLayout from "@/components/admin/AdminLayout";
import GalleryAdminPanel from "@/components/admin/GalleryAdminPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminLayout
      title="Galeri"
      description="Galeri sayfası fotoğrafları"
    >
      <GalleryAdminPanel items={items} />
    </AdminLayout>
  );
}
