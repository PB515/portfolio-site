import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Row = { id: string; title: string; status: string };

export default async function AdminFieldNotesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("field_notes")
    .select("id,title,status")
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as Row[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Field Notes</h1>
        <Link
          href="/admin/field-notes/new"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
        >
          New note
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          No notes yet. Write your first one.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {rows.map((n) => (
            <li key={n.id}>
              <Link
                href={`/admin/field-notes/${n.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-background/30"
              >
                <span className="font-medium text-foreground">{n.title}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    n.status === "published"
                      ? "bg-primary/15 text-primary"
                      : "border border-border text-muted"
                  }`}
                >
                  {n.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
