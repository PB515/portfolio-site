import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const AREAS = [
  { href: "/admin/projects", label: "Projects", note: "Create, edit, publish" },
  { href: "/admin/field-notes", label: "Field Notes", note: "Write & publish notes" },
  { href: "/admin/categories", label: "Categories", note: "Per kind: create / delete" },
  { href: "/admin/resume", label: "Résumé", note: "Upload / replace the PDF" },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login"); // defense in depth (proxy also guards)

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Manage your content — changes go live without a deploy.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {AREAS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-hover"
          >
            <span className="font-medium text-foreground">{a.label}</span>
            <span className="mt-1 block text-sm text-muted">{a.note}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
