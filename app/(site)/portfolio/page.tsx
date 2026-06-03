import Link from "next/link";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";

export const metadata = {
  title: "Portfolio",
  description:
    "Projects, experiments, and learning by Purven Bhavsar — AI automation, SEO, and web.",
};

export const revalidate = 60; // ISR — rebuilds at most once a minute; admin publish revalidates instantly

type Project = {
  title: string;
  slug: string;
  summary: string;
  cover_path: string | null;
};

export default async function PortfolioPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("projects")
    .select("title,slug,summary,cover_path")
    .eq("status", "published")
    .order("sort_order")
    .order("published_at", { ascending: false });
  const projects = (data ?? []) as Project[];

  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Portfolio
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects, experiments &amp; learning
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        AI automation, SEO, and web — the work that turns complex systems into
        practical, working solutions.
      </p>

      {projects.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
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
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
            >
              Get in touch
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => {
            const cover = publicAsset("covers", p.cover_path);
            return (
              <li key={p.slug}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover"
                >
                  {cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt="" className="aspect-[1200/630] w-full object-cover" />
                  )}
                  <div className="p-5">
                    <h2 className="font-medium text-foreground group-hover:text-primary">
                      {p.title}
                    </h2>
                    {p.summary && (
                      <p className="mt-1.5 text-sm text-muted">{p.summary}</p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
