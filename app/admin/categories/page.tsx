import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

type Category = { id: string; name: string; slug: string; kind: string };

const KINDS = [
  { value: "project", label: "Project" },
  { value: "field_note", label: "Field Note" },
];

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

async function createCategory(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const kind = String(formData.get("kind") ?? "");
  if (!name || !["project", "field_note"].includes(kind)) {
    redirect("/admin/categories?error=" + encodeURIComponent("Name and kind are required."));
  }
  const { error } = await supabase
    .from("categories")
    .insert({ name, slug: slugify(name), kind });
  if (error) {
    redirect("/admin/categories?error=" + encodeURIComponent(error.message));
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

async function deleteCategory(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await supabase.from("categories").delete().eq("id", id);
    revalidatePath("/admin/categories");
  }
  redirect("/admin/categories");
}

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await requireAdmin();
  const { error: errorMsg } = await searchParams;

  const { data } = await supabase
    .from("categories")
    .select("id,name,slug,kind")
    .order("kind")
    .order("name");
  const categories = (data ?? []) as Category[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
      <p className="mt-2 text-sm text-muted">
        Group projects and field notes. Deleting a category leaves its items
        un-categorized (never deletes content).
      </p>

      {errorMsg && (
        <p role="alert" className="mt-6 rounded-md border border-error/40 px-3 py-2 text-sm text-error">
          {errorMsg}
        </p>
      )}

      {/* Create */}
      <form
        action={createCategory}
        className="mt-8 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-surface p-5"
      >
        <label className="flex flex-1 flex-col gap-1 text-sm">
          <span className="text-muted">Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. AI Automation"
            className="rounded-md border border-border bg-background/30 px-3 py-2 text-foreground outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">For</span>
          <select
            name="kind"
            className="rounded-md border border-border bg-background/30 px-3 py-2 text-foreground outline-none focus:border-primary"
          >
            {KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
        >
          Add category
        </button>
      </form>

      {/* Lists per kind */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {KINDS.map((k) => {
          const items = categories.filter((c) => c.kind === k.value);
          return (
            <div key={k.value}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {k.label}
              </h2>
              {items.length === 0 ? (
                <p className="mt-3 text-sm text-muted">None yet.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {items.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-sm"
                    >
                      <span className="text-foreground">{c.name}</span>
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={c.id} />
                        <button
                          type="submit"
                          className="text-muted transition-colors hover:text-error"
                          aria-label={`Delete ${c.name}`}
                        >
                          Delete
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
