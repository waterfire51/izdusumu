import AdminLayout from "@/components/admin/AdminLayout";
import BlogPressAdminPanel from "@/components/admin/BlogPressAdminPanel";
import { prisma } from "@/lib/prisma";

export default async function AdminBlogPage() {
  const [blogPosts, pressPosts] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { date: "desc" } }),
    prisma.pressPost.findMany({ orderBy: { date: "desc" } }),
  ]);

  return (
    <AdminLayout
      title="Blog & Basında Biz"
      description="Eğitim yazıları ve basın haberlerini yönetin"
    >
      <BlogPressAdminPanel blogPosts={blogPosts} pressPosts={pressPosts} />
    </AdminLayout>
  );
}
