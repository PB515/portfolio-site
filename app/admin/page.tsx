import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const AREAS = [
  { href: "/admin/projects", label: "Projects", note: "Create, edit, publish" },
  { href: "/admin/field-notes", label: "Field Notes", note: "Write & publish notes" },
  { href: "/admin/categories", label: "Categories", note: "Per kind: create / delete" },
  { href: "/admin/resume", label: "Resume", note: "Upload / replace the PDF" },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already guards /admin, but verify here too (defense in depth).
  if (!user) redirect("/admin/login");

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-surface"
          >
            Log out
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {AREAS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
          >
            <span className="font-medium">{a.label}</span>
            <span className="mt-1 block text-sm text-muted">{a.note}</span>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted">
        Phase 1 — editors arrive in Phase 3. Auth + access rules are live.
      </p>
    </main>
  );
}
