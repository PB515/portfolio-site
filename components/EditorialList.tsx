import Link from "next/link";
import { Reveal } from "./Reveal";

export type EditorialItem = {
  title: string;
  href: string;
  meta: string | null; // e.g. "Automation · n8n, OpenAI · 2025" or "Jun 2026 · Technology"
  excerpt?: string | null; // optional second line (field notes)
  cover: string | null;
};

// Type-forward editorial index: big title + meta line, with a thumbnail that
// enlarges on hover and an arrow that slides in. Reads like a curated index, not
// a blog-card grid.
export function EditorialList({ items }: { items: EditorialItem[] }) {
  return (
    <ul className="mt-8 border-t border-border">
      {items.map((it, i) => (
        <Reveal as="li" key={it.href} delay={i * 50} className="border-b border-border">
          <Link
            href={it.href}
            className="group flex items-center justify-between gap-6 py-7"
          >
            <div className="min-w-0">
              <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                <span className="truncate">{it.title}</span>
                <span className="shrink-0 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </h2>
              {it.meta && <p className="mt-1.5 text-sm text-muted">{it.meta}</p>}
              {it.excerpt && (
                <p className="mt-1 line-clamp-1 text-sm text-muted/80">{it.excerpt}</p>
              )}
            </div>
            {it.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <span className="hidden h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-border sm:block md:h-20 md:w-36">
                <img
                  src={it.cover}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </span>
            )}
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
