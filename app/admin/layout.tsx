import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Admin is private: never indexed. Auth gating is in proxy.ts (redirect logged-out);
// each page also re-checks getUser() (defense in depth).
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/field-notes", label: "Field Notes" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/resume", label: "Résumé" },
];

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-full">
      {/* Bar shows only when authenticated (not on /admin/login). */}
      {user && (
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
            <nav className="flex flex-wrap items-center gap-5 text-sm">
              <span className="font-semibold tracking-tight">Admin</span>
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden text-muted sm:inline">{user.email}</span>
              <Link
                href="/"
                className="text-muted transition-colors hover:text-foreground"
              >
                View site ↗
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-md border border-border px-3 py-1.5 transition-colors hover:border-border-hover"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
