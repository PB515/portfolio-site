"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type AdminItem = {
  id: string;
  title: string;
  status: string;
  is_featured?: boolean;
  categorySlug: string | null;
  categoryName: string | null;
};

type Cat = { slug: string; name: string };

const chip = (active: boolean) =>
  `rounded-full border px-3 py-1 text-xs transition-colors ${
    active
      ? "border-primary bg-cta text-on-primary"
      : "border-border text-muted hover:border-border-hover hover:text-foreground"
  }`;

function StatusBadge({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
        published ? "bg-primary/15 text-primary" : "border border-border text-muted"
      }`}
    >
      {status}
    </span>
  );
}

// Searchable, category-filterable, scrollable admin list for Projects / Field Notes.
// Filters client-side (volumes are small) so it's instant.
export function AdminItemList({
  items,
  categories,
  basePath,
  noun,
}: {
  items: AdminItem[];
  categories: Cat[];
  basePath: string;
  noun: string;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => {
      if (cat && i.categorySlug !== cat) return false;
      if (needle && !i.title.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [items, q, cat]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${noun}s by title…`}
          aria-label={`Search ${noun}s`}
          className="w-full max-w-xs rounded-md border border-border bg-background/30 px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
        <span className="text-xs text-muted">
          Showing {filtered.length} of {items.length}
        </span>
      </div>

      {categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => setCat(null)} className={chip(!cat)}>
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCat(c.slug)}
              className={chip(cat === c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-5 max-h-[60vh] divide-y divide-border overflow-y-auto rounded-xl border border-border bg-surface">
        {filtered.map((i) => (
          <li key={i.id}>
            <Link
              href={`${basePath}/${i.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-background/30"
            >
              <span className="flex items-center gap-2 font-medium text-foreground">
                {i.title}
                {i.is_featured && (
                  <span className="text-primary" title="Featured" aria-label="Featured">
                    ★
                  </span>
                )}
              </span>
              <span className="flex shrink-0 items-center gap-3">
                {i.categoryName && (
                  <span className="hidden text-xs text-muted sm:inline">{i.categoryName}</span>
                )}
                <StatusBadge status={i.status} />
              </span>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-5 py-10 text-center text-sm text-muted">
            No {noun}s match your search.
          </li>
        )}
      </ul>
    </div>
  );
}
