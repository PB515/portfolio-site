import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Row = { id: string; title: string; status: string; sort_order: number };

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("projects")
    .select("id,title,status,sort_order")
    .order("sort_order")
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as Row[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
        >
          New project
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          No projects yet. Create your first one.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {rows.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/projects/${p.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-background/30"
              >
                <span className="font-medium text-foreground">{p.title}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.status === "published"
                      ? "bg-primary/15 text-primary"
                      : "border border-border text-muted"
                  }`}
                >
                  {p.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
