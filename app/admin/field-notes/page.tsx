import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminItemList, type AdminItem } from "@/components/AdminItemList";

type Row = {
  id: string;
  title: string;
  status: string;
  is_featured: boolean | null;
  category: { name: string; slug: string } | { name: string; slug: string }[] | null;
};

export default async function AdminFieldNotesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("field_notes")
    .select("id,title,status,is_featured,category:categories(name,slug)")
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as Row[];

  const { data: catData } = await supabase
    .from("categories")
    .select("name,slug")
    .eq("kind", "field_note")
    .order("name");
  const categories = (catData ?? []) as { name: string; slug: string }[];

  const items: AdminItem[] = rows.map((r) => {
    const c = Array.isArray(r.category) ? r.category[0] : r.category;
    return {
      id: r.id,
      title: r.title,
      status: r.status,
      is_featured: !!r.is_featured,
      categoryName: c?.name ?? null,
      categorySlug: c?.slug ?? null,
    };
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Field Notes</h1>
        <Link
          href="/admin/field-notes/new"
          className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
        >
          New note
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          No notes yet. Write your first one.
        </p>
      ) : (
        <AdminItemList
          items={items}
          categories={categories}
          basePath="/admin/field-notes"
          noun="note"
        />
      )}
    </main>
  );
}
