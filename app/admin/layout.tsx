import type { Metadata } from "next";

// Admin is private: never indexed, never in the public sitemap.
// Auth gating (redirect logged-out → /admin/login) is added in Phase 1.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-full">{children}</div>;
}
