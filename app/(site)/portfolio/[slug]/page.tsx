import Link from "next/link";
import { notFound } from "next/navigation";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";
import { Markdown } from "@/components/Markdown";
import { FeaturedStrip, type StripItem } from "@/components/FeaturedStrip";
import { Motif } from "@/components/Motif";

export const revalidate = 60;

type Project = {
  title: string;
  summary: string;
  body: string | null;
  cover_path: string | null;
  role: string | null;
  stack: string[] | null;
  outcome: string | null;
  external_url: string | null;
};

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

async function getProject(slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("projects")
    .select("title,summary,body,cover_path,role,stack,outcome,external_url")
    .eq("slug", decodeSlug(slug))
    .eq("status", "published")
    .maybeSingle();
  return data as Project | null;
}

async function getMoreProjects(excludeSlug: string): Promise<StripItem[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("projects")
    .select("title,slug,summary,cover_path")
    .eq("status", "published")
    .eq("is_featured", true)
    .neq("slug", excludeSlug)
    .order("sort_order")
    .limit(3);
  return ((data ?? []) as { title: string; slug: string; summary: string; cover_path: string | null }[]).map(
    (p) => ({ title: p.title, slug: p.slug, blurb: p.summary, cover: publicAsset("covers", p.cover_path) }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return { title: "Project" };
  const cover = publicAsset("covers", p.cover_path);
  const images = [cover ?? "/og/og-default.png"];
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, type: "article", images },
    twitter: { card: "summary_large_image", title: p.title, description: p.summary, images },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();

  const more = await getMoreProjects(decodeSlug(slug));
  const cover = publicAsset("covers", p.cover_path);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-16">
      <Link href="/portfolio" className="text-sm text-muted hover:text-foreground">
        ← Portfolio
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {p.title}
      </h1>
      {p.summary && <p className="mt-3 text-lg text-muted">{p.summary}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
        {p.role && (
          <span>
            Role: <span className="text-foreground">{p.role}</span>
          </span>
        )}
        {p.external_url && (
          <a href={p.external_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover">
            Visit ↗
          </a>
        )}
      </div>

      {p.stack && p.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
      )}

      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" className="mt-8 aspect-[1200/630] w-full rounded-xl border border-border object-cover" />
      )}

      {p.body && (
        <div className="mt-10">
          <Markdown>{p.body}</Markdown>
        </div>
      )}

      {p.outcome && (
        <div className="mt-10 rounded-xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Outcome
          </p>
          <p className="mt-2 text-foreground">{p.outcome}</p>
        </div>
      )}

      <FeaturedStrip heading="More work" items={more} basePath="/portfolio" />

      <div className="relative isolate mt-14 overflow-hidden rounded-2xl border border-border bg-surface p-7">
        <Motif className="-bottom-8 -right-8 -z-10 h-36 w-auto opacity-[0.15]" />
        <p className="text-xl font-medium tracking-tight text-foreground">
          Want to talk about work like this?
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full bg-cta px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
        >
          Get in touch →
        </Link>
      </div>
    </main>
  );
}
