import Link from "next/link";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";

export const metadata = {
  title: "Field Notes",
  description:
    "Notes on what Purven Bhavsar is learning and thinking about — AI, automation, systems, and growth.",
};

export const revalidate = 60;

type Note = {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_path: string | null;
  published_at: string | null;
};

export default async function FieldNotesPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("field_notes")
    .select("title,slug,excerpt,cover_path,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
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

      {notes.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
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
      ) : (
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {notes.map((n) => {
            const cover = publicAsset("covers", n.cover_path);
            return (
              <li key={n.slug}>
                <Link
                  href={`/field-notes/${n.slug}`}
                  className="group flex items-center gap-5 py-6 transition-colors"
                >
                  {cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt="" className="hidden h-20 w-32 shrink-0 rounded-lg border border-border object-cover sm:block" />
                  )}
                  <div>
                    <h2 className="font-medium text-foreground group-hover:text-primary">
                      {n.title}
                    </h2>
                    {n.excerpt && (
                      <p className="mt-1 text-sm text-muted">{n.excerpt}</p>
                    )}
                    {n.published_at && (
                      <p className="mt-1 text-xs text-muted">
                        {new Date(n.published_at).toLocaleDateString()}
                      </p>
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
