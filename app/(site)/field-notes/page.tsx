import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FieldNotesDecor } from "@/components/FieldNotesDecor";
import { EditorialList, type EditorialItem } from "@/components/EditorialList";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";

export const metadata = {
  title: "Field Notes",
  description:
    "Notes on what Purven Bhavsar is learning and thinking about: AI, automation, systems, and growth.",
};

type Note = {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_path: string | null;
  published_at: string | null;
  category: { name: string } | { name: string }[] | null;
};
type Cat = { id: string; name: string; slug: string };

const chip = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm transition-colors ${
    active
      ? "border-primary bg-cta text-on-primary"
      : "border-border text-muted hover:border-border-hover hover:text-foreground"
  }`;

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;

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

  let q = supabase
    .from("field_notes")
    .select("title,slug,excerpt,cover_path,published_at,category:categories(name)")
    .eq("status", "published");
  if (selected) q = q.eq("category_id", selected.id);
  const { data } = await q.order("published_at", { ascending: false });
  const notes = (data ?? []) as Note[];

  const items: EditorialItem[] = notes.map((n) => {
    const c = Array.isArray(n.category) ? n.category[0] : n.category;
    const meta = [fmtDate(n.published_at), c?.name ?? null].filter(Boolean).join(" · ") || null;
    return {
      title: n.title,
      href: `/field-notes/${n.slug}`,
      meta,
      excerpt: n.excerpt,
      cover: publicAsset("covers", n.cover_path),
    };
  });

  return (
    <main className="relative isolate mx-auto max-w-5xl overflow-hidden px-6 pt-20 pb-16">
      <FieldNotesDecor className="inset-0 -z-10 opacity-[0.06]" />
      <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Field Notes
      </Reveal>
      <Reveal as="h1" delay={80} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Notes on what I&apos;m learning
      </Reveal>
      <Reveal as="p" delay={160} className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Short writing on AI, automation, systems, and the road toward
        infrastructure and growth.
      </Reveal>

      {categories.length > 0 && (
        <Reveal className="mt-8 flex flex-wrap gap-2">
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
        </Reveal>
      )}

      {notes.length === 0 ? (
        selected ? (
          <Reveal as="p" className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
            No notes in <span className="text-foreground">{selected.name}</span> yet.{" "}
            <Link href="/field-notes" className="text-primary hover:text-primary-hover">
              View all
            </Link>
          </Reveal>
        ) : (
          <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="text-lg font-medium text-foreground">Writing soon.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              I&apos;m putting together my first field notes. Check back soon, or
              connect and I&apos;ll let you know when they&apos;re up.
            </p>
            <div className="mt-6 flex justify-center">
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
