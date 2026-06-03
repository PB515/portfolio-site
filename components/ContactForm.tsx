"use client";

import { useState } from "react";

// Phase 2: form UI only (idle/validation states). The real submit — POST to a
// server route with honeypot + server-side validation + rate limiting, saving to
// `leads` + emailing — is wired in Phase 4 (docs 02/06/08). Until then, submitting
// shows an honest notice and points to direct email; nothing is silently lost.
const EMAIL = "bhavsarpurven515@gmail.com";

export function ContactForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true); // Phase 4 replaces this with the real POST.
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-xl border border-border bg-surface p-6 text-sm"
      >
        <p className="font-medium text-foreground">Thanks for reaching out.</p>
        <p className="mt-2 text-muted">
          The contact form isn&apos;t fully wired up yet — for now the fastest way
          to reach me is email:{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-primary hover:text-primary-hover"
          >
            {EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — hidden from humans; bots that fill it get rejected (Phase 4). */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Name</span>
        <input
          type="text"
          name="name"
          required
          className="rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="resize-y rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none transition-colors focus:border-primary"
        />
      </label>

      <button
        type="submit"
        className="mt-1 self-start rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
      >
        Send message
      </button>
    </form>
  );
}
