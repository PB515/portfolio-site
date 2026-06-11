import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PortfolioDecor } from "@/components/PortfolioDecor";
import { EditorialList, type EditorialItem } from "@/components/EditorialList";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";

export const metadata = {
  title: "Portfolio",
  description:
    "Projects, experiments, and learning by Purven Bhavsar — AI automation, SEO, and web.",
};

type Project = {
  title: string;
  slug: string;
  summary: string;
  cover_path: string | null;
  role: string | null;
  stack: string[] | null;
  published_at: string | null;
};
type Cat = { id: string; name: string; slug: string };

const chip = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm transition-colors ${
    active
      ? "border-primary bg-cta text-on-primary"
      : "border-border text-muted hover:border-border-hover hover:text-foreground"
  }`;

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = createPublicClient();

  const { data: catData } = await supabase
    .from("categories")
    .select("id,name,slug")
    .eq("kind", "project")
    .order("name");
  const categories = (catData ?? []) as Cat[];
  const selected = category
    ? (categories.find((c) => c.slug === category) ?? null)
    : null;

  let q = supabase
    .from("projects")
    .select("title,slug,summary,cover_path,role,stack,published_at")
    .eq("status", "published");
  if (selected) q = q.eq("category_id", selected.id);
  const { data } = await q
    .order("sort_order")
    .order("published_at", { ascending: false });
  const projects = (data ?? []) as Project[];

  const items: EditorialItem[] = projects.map((p) => {
    const year = p.published_at ? new Date(p.published_at).getFullYear() : null;
    const stackStr = (p.stack ?? []).slice(0, 3).join(", ");
    const meta =
      [p.role, stackStr || null, year].filter(Boolean).join(" · ") || p.summary || null;
    return {
      title: p.title,
      href: `/portfolio/${p.slug}`,
      meta,
      cover: publicAsset("covers", p.cover_path),
    };
  });

  return (
    <main className="relative isolate mx-auto max-w-5xl overflow-hidden px-6 pt-20 pb-16">
      <PortfolioDecor className="inset-0 -z-10 opacity-[0.06]" />
      <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Portfolio
      </Reveal>
      <Reveal as="h1" delay={80} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects, experiments &amp; learning
      </Reveal>
      <Reveal as="p" delay={160} className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        AI automation, SEO, and web — the work that turns complex systems into
        practical, working solutions.
      </Reveal>

      {categories.length > 0 && (
        <Reveal className="mt-8 flex flex-wrap gap-2">
          <Link href="/portfolio" className={chip(!selected)}>
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/portfolio?category=${c.slug}`}
              className={chip(selected?.slug === c.slug)}
            >
              {c.name}
            </Link>
          ))}
        </Reveal>
      )}

      {projects.length === 0 ? (
        selected ? (
          <Reveal as="p" className="mt-12 rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
            No projects in <span className="text-foreground">{selected.name}</span> yet.{" "}
            <Link href="/portfolio" className="text-primary hover:text-primary-hover">
              View all
            </Link>
          </Reveal>
        ) : (
          <Reveal className="mt-12 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="text-lg font-medium text-foreground">
              Projects are being added soon.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              In the meantime, you can see my code on GitHub or reach out.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/PB515"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-hover"
              >
                View GitHub
              </a>
              <Link
                href="/contact"
                className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        )
      ) : (
        <EditorialList items={items} />
      )}
    </main>
  );
}
