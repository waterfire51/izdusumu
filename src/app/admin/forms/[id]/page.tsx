import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import RegistrationSubmissionsPanel from "@/components/admin/RegistrationSubmissionsPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminFormSubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const form = await prisma.registrationForm.findUnique({
    where: { id },
    include: {
      submissions: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!form) notFound();

  return (
    <AdminLayout
      title="Form Başvuruları"
      description={form.title}
    >
      <RegistrationSubmissionsPanel
        form={{
          id: form.id,
          slug: form.slug,
          title: form.title,
          description: form.description,
          fields: form.fields,
        }}
        submissions={form.submissions}
      />
    </AdminLayout>
  );
}
