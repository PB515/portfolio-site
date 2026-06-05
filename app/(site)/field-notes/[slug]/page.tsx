import Link from "next/link";
import { notFound } from "next/navigation";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";
import { Markdown } from "@/components/Markdown";
import { JsonLd } from "@/components/JsonLd";
import { FeaturedStrip, type StripItem } from "@/components/FeaturedStrip";
import { Motif } from "@/components/Motif";

export const revalidate = 60;

type Note = {
  title: string;
  excerpt: string | null;
  body: string;
  cover_path: string | null;
  published_at: string | null;
};

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

async function getNote(slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("field_notes")
    .select("title,excerpt,body,cover_path,published_at")
    .eq("slug", decodeSlug(slug))
    .eq("status", "published")
    .maybeSingle();
  return data as Note | null;
}

async function getMoreNotes(excludeSlug: string): Promise<StripItem[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("field_notes")
    .select("title,slug,excerpt,cover_path")
    .eq("status", "published")
    .eq("is_featured", true)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(3);
  return ((data ?? []) as { title: string; slug: string; excerpt: string | null; cover_path: string | null }[]).map(
    (n) => ({ title: n.title, slug: n.slug, blurb: n.excerpt, cover: publicAsset("covers", n.cover_path) }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = await getNote(slug);
  if (!n) return { title: "Field Note" };
  const cover = publicAsset("covers", n.cover_path);
  const images = [cover ?? "/og/og-default.png"];
  return {
    title: n.title,
    description: n.excerpt ?? undefined,
    openGraph: { title: n.title, description: n.excerpt ?? undefined, type: "article", images },
    twitter: { card: "summary_large_image", title: n.title, description: n.excerpt ?? undefined, images },
  };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = await getNote(slug);
  if (!n) notFound();

  const more = await getMoreNotes(decodeSlug(slug));
  const cover = publicAsset("covers", n.cover_path);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: n.title,
    description: n.excerpt ?? undefined,
    datePublished: n.published_at ?? undefined,
    image: cover ?? undefined,
    author: { "@type": "Person", name: "Purven Bhavsar" },
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-16">
      <JsonLd data={article} />
      <Link href="/field-notes" className="text-sm text-muted hover:text-foreground">
        ← Field Notes
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {n.title}
      </h1>
      {n.published_at && (
        <p className="mt-3 text-sm text-muted">
          {new Date(n.published_at).toLocaleDateString()}
        </p>
      )}
      {n.excerpt && <p className="mt-4 text-lg text-muted">{n.excerpt}</p>}

      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" className="mt-8 aspect-[1200/630] w-full rounded-xl border border-border object-cover" />
      )}

      <article className="mt-10">
        <Markdown>{n.body}</Markdown>
      </article>

      <FeaturedStrip heading="More field notes" items={more} basePath="/field-notes" />

      <div className="relative isolate mt-14 overflow-hidden rounded-2xl border border-border bg-surface p-7">
        <Motif className="-bottom-8 -right-8 -z-10 h-36 w-auto opacity-[0.15]" />
        <p className="text-xl font-medium tracking-tight text-foreground">
          Enjoyed this? Let&apos;s talk.
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
