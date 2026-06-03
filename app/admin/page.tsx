import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login"); // defense in depth (proxy also guards)

  const countOf = (table: string, filters: [string, unknown][] = []) => {
    let q = supabase.from(table).select("id", { count: "exact", head: true });
    for (const [col, val] of filters) q = q.eq(col, val);
    return q;
  };

  const [proj, projPub, notes, notesPub, cats, featProj, featNote, leads, recentRes, resumeRes] =
    await Promise.all([
      countOf("projects"),
      countOf("projects", [["status", "published"]]),
      countOf("field_notes"),
      countOf("field_notes", [["status", "published"]]),
      countOf("categories"),
      countOf("projects", [["is_featured", true]]),
      countOf("field_notes", [["is_featured", true]]),
      countOf("leads"),
      supabase
        .from("leads")
        .select("id,name,email,created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("resume")
        .select("original_name,uploaded_at")
        .eq("is_current", true)
        .maybeSingle(),
    ]);

  const n = (r: { count: number | null }) => r.count ?? 0;
  const recent = (recentRes.data ?? []) as {
    id: string;
    name: string;
    email: string;
    created_at: string;
  }[];
  const resume = resumeRes.data as { original_name: string | null; uploaded_at: string } | null;

  const stats = [
    { label: "Projects", value: n(proj), sub: `${n(projPub)} published`, href: "/admin/projects" },
    { label: "Field Notes", value: n(notes), sub: `${n(notesPub)} published`, href: "/admin/field-notes" },
    { label: "Categories", value: n(cats), sub: "project + note", href: "/admin/categories" },
    { label: "Messages", value: n(leads), sub: "contact inbox", href: "/admin/messages" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Welcome back{user.email ? `, ${user.email.split("@")[0]}` : ""} — changes go live without a deploy.
      </p>

      {/* Stat cards */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="lift rounded-xl border border-border bg-surface p-5 hover:border-border-hover"
          >
            <span className="text-3xl font-semibold tracking-tight text-foreground">{s.value}</span>
            <span className="mt-1 block text-sm font-medium text-foreground">{s.label}</span>
            <span className="mt-0.5 block text-xs text-muted">{s.sub}</span>
          </Link>
        ))}
      </div>

      {/* Featured usage + quick actions */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4">
        <p className="text-sm text-muted">
          Featured —{" "}
          <span className="font-medium text-foreground">{n(featProj)}/5</span> projects ·{" "}
          <span className="font-medium text-foreground">{n(featNote)}/5</span> notes
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/projects/new"
            className="rounded-full bg-cta px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
          >
            + New project
          </Link>
          <Link
            href="/admin/field-notes/new"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-hover"
          >
            + New note
          </Link>
        </div>
      </div>

      {/* Recent messages + resume */}
      <div className="mt-8 grid gap-6 sm:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Recent messages
            </h2>
            <Link href="/admin/messages" className="text-xs text-primary hover:text-primary-hover">
              View all →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No messages yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {recent.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-foreground">{l.name}</span>
                    <span className="block truncate text-xs text-muted">{l.email}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted">
                    {new Date(l.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Resume</h2>
          {resume ? (
            <p className="mt-4 text-sm text-foreground">
              {resume.original_name ?? "resume.pdf"}
              <span className="mt-1 block text-xs text-muted">
                uploaded {new Date(resume.uploaded_at).toLocaleDateString()}
              </span>
            </p>
          ) : (
            <p className="mt-4 text-sm text-muted">No resume uploaded yet.</p>
          )}
          <Link
            href="/admin/resume"
            className="mt-4 inline-block text-sm text-primary hover:text-primary-hover"
          >
            Manage resume →
          </Link>
        </section>
      </div>
    </main>
  );
}
