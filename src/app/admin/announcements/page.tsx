import AdminLayout from "@/components/admin/AdminLayout";
import AnnouncementsAdminPanel from "@/components/admin/AnnouncementsAdminPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminAnnouncementsPage() {
  const [announcements, meals, events] = await Promise.all([
    prisma.announcement.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mealMenu.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.event.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <AdminLayout
      title="Duyurular"
      description="Duyurular, yemek menüsü ve etkinlik takvimi"
    >
      <AnnouncementsAdminPanel
        announcements={announcements}
        meals={meals}
        events={events}
      />
    </AdminLayout>
  );
}
