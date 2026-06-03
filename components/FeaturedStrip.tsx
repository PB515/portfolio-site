import Link from "next/link";

export type StripItem = {
  title: string;
  slug: string;
  blurb: string | null;
  cover: string | null;
};

// Compact "more work / more notes" strip for the bottom of a detail page.
// Smaller than the home featured grid (16:9 thumb, one-line text). Renders nothing
// when there are no items.
export function FeaturedStrip({
  heading,
  items,
  basePath,
}: {
  heading: string;
  items: StripItem[];
  basePath: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{heading}</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <li key={it.slug}>
            <Link
              href={`${basePath}/${it.slug}`}
              className="group lift block overflow-hidden rounded-xl border border-border bg-surface hover:border-border-hover"
            >
              {it.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.cover}
                  alt=""
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              )}
              <div className="p-3">
                <h3 className="line-clamp-1 text-sm font-medium text-foreground group-hover:text-primary">
                  {it.title}
                </h3>
                {it.blurb && <p className="mt-0.5 line-clamp-1 text-xs text-muted">{it.blurb}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
