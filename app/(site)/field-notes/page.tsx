import Link from "next/link";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";

export const metadata = {
  title: "Field Notes",
  description:
    "Notes on what Purven Bhavsar is learning and thinking about — AI, automation, systems, and growth.",
};

type Note = {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_path: string | null;
  published_at: string | null;
};
type Cat = { id: string; name: string; slug: string };

const chip = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm transition-colors ${
    active
      ? "border-primary bg-primary text-on-primary"
      : "border-border text-muted hover:border-border-hover hover:text-foreground"
  }`;

function NoteCard({ n }: { n: Note }) {
  const cover = publicAsset("covers", n.cover_path);
  return (
    <Link
      href={`/field-notes/${n.slug}`}
      className="group flex items-center gap-5 py-6 transition-colors"
    >
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" className="hidden h-20 w-32 shrink-0 rounded-lg border border-border object-cover sm:block" />
      )}
      <div>
        <h2 className="font-medium text-foreground group-hover:text-primary">{n.title}</h2>
        {n.excerpt && <p className="mt-1 text-sm text-muted">{n.excerpt}</p>}
        {n.published_at && (
          <p className="mt-1 text-xs text-muted">
            {new Date(n.published_at).toLocaleDateString()}
          </p>
        )}
      </div>
    </Link>
  );
}

export default async function FieldNotesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = createPublicClient();

  const { data: catData } = await supabase
    .from("categories")
    .select("id,name,slug")
    .eq("kind", "field_note")
    .order("name");
  const categories = (catData ?? []) as Cat[];
  const selected = category
    ? (categories.find((c) => c.slug === category) ?? null)
    : null;

  // Featured (only shown on the unfiltered view)
  let featured: Note[] = [];
  if (!selected) {
    const { data: f } = await supabase
      .from("field_notes")
      .select("title,slug,excerpt,cover_path,published_at")
      .eq("status", "published")
      .eq("is_featured", true)
      .order("published_at", { ascending: false })
      .limit(5);
    featured = (f ?? []) as Note[];
  }

  let q = supabase
    .from("field_notes")
    .select("title,slug,excerpt,cover_path,published_at")
    .eq("status", "published");
  if (selected) q = q.eq("category_id", selected.id);
  const { data } = await q.order("published_at", { ascending: false });
  const notes = (data ?? []) as Note[];

  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Field Notes
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Notes on what I&apos;m learning
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Short writing on AI, automation, systems, and the road toward
        infrastructure and growth.
      </p>

      {/* Featured row (unfiltered view only) */}
      {featured.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Featured
          </h2>
          <ul className="mt-4 grid gap-6 sm:grid-cols-3">
            {featured.map((n) => {
              const cover = publicAsset("covers", n.cover_path);
              return (
                <li key={n.slug}>
                  <Link
                    href={`/field-notes/${n.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover"
                  >
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt="" className="aspect-[1200/630] w-full object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-foreground group-hover:text-primary">
                        {n.title}
                      </h3>
                      {n.excerpt && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted">{n.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          <Link href="/field-notes" className={chip(!selected)}>
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/field-notes?category=${c.slug}`}
              className={chip(selected?.slug === c.slug)}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {notes.length === 0 ? (
        selected ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
            No notes in <span className="text-foreground">{selected.name}</span> yet.{" "}
            <Link href="/field-notes" className="text-primary hover:text-primary-hover">
              View all
            </Link>
          </p>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="text-lg font-medium text-foreground">Writing soon.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              I&apos;m putting together my first field notes. Check back shortly — or
              connect and I&apos;ll let you know when they&apos;re up.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
              >
                Get in touch
              </Link>
            </div>
          </div>
        )
      ) : (
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {notes.map((n) => (
            <li key={n.slug}>
              <NoteCard n={n} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
