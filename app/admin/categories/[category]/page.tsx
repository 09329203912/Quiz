import { notFound } from "next/navigation";
import { getCategoryById, categories } from "@/data/categories";
import { AdminCategoryQuestions } from "@/components/admin/AdminCategoryQuestions";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export default async function AdminCategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) notFound();

  return <AdminCategoryQuestions category={category} />;
}
