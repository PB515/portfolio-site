"use client";

import { useMemo, useState } from "react";

export type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

// Searchable + scrollable contact-message inbox (admin only), with delete.
export function MessageList({
  leads,
  deleteAction,
}: {
  leads: Lead[];
  deleteAction: (formData: FormData) => void | Promise<void>;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return leads;
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(needle) ||
        l.email.toLowerCase().includes(needle) ||
        l.message.toLowerCase().includes(needle),
    );
  }, [leads, q]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, or message…"
          aria-label="Search messages"
          className="w-full max-w-sm rounded-md border border-border bg-background/30 px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
        <span className="text-xs text-muted">
          Showing {filtered.length} of {leads.length}
        </span>
      </div>

      <ul className="mt-5 max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        {filtered.map((l) => (
          <li key={l.id} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-foreground">{l.name}</span>
              <span className="flex items-center gap-3">
                <span className="text-xs text-muted">
                  {new Date(l.created_at).toLocaleString()}
                </span>
                <form
                  action={deleteAction}
                  onSubmit={(e) => {
                    if (!confirm("Delete this message? This can't be undone.")) e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={l.id} />
                  <button
                    type="submit"
                    className="text-xs text-muted transition-colors hover:text-error"
                    aria-label={`Delete message from ${l.name}`}
                  >
                    Delete
                  </button>
                </form>
              </span>
            </div>
            <a
              href={`mailto:${l.email}`}
              className="text-sm text-primary hover:text-primary-hover"
            >
              {l.email}
            </a>
            <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{l.message}</p>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
            No messages match your search.
          </li>
        )}
      </ul>
    </div>
  );
}
