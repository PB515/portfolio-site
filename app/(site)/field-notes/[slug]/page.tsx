import Link from "next/link";
import { notFound } from "next/navigation";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";
import { Markdown } from "@/components/Markdown";

export const revalidate = 60;

type Note = {
  title: string;
  excerpt: string | null;
  body: string;
  cover_path: string | null;
  published_at: string | null;
};

async function getNote(slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("field_notes")
    .select("title,excerpt,body,cover_path,published_at")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data as Note | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = await getNote(slug);
  return n ? { title: n.title, description: n.excerpt ?? undefined } : { title: "Field Note" };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = await getNote(slug);
  if (!n) notFound();

  const cover = publicAsset("covers", n.cover_path);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-16">
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

      <div className="mt-12 border-t border-border pt-8">
        <Link href="/field-notes" className="text-sm font-medium text-primary hover:text-primary-hover">
          ← More field notes
        </Link>
      </div>
    </main>
  );
}
