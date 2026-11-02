import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";

const SITE = "https://portfolio-site-psi-ruddy.vercel.app";

// Build per request. With `revalidate` the sitemap stayed frozen at its build
// snapshot, so projects/notes published from the admin never appeared until a
// redeploy. One small DB query per crawl is cheap.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient();
  const [{ data: projects }, { data: notes }] = await Promise.all([
    supabase.from("projects").select("slug,updated_at,published_at").eq("status", "published"),
    supabase.from("field_notes").select("slug,updated_at,published_at").eq("status", "published"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/portfolio",
    "/field-notes",
    "/contact",
    "/privacy",
  ].map((p) => ({ url: `${SITE}${p}` })); // no lastModified: "now" on every request would be misleading

  const dt = (a?: string | null, b?: string | null) =>
    new Date(a ?? b ?? new Date().toISOString());

  const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${SITE}/portfolio/${p.slug}`,
    lastModified: dt(p.updated_at, p.published_at),
  }));

  const noteRoutes: MetadataRoute.Sitemap = (notes ?? []).map((n) => ({
    url: `${SITE}/field-notes/${n.slug}`,
    lastModified: dt(n.updated_at, n.published_at),
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
