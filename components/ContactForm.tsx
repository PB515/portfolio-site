"use client";

import { useState } from "react";

const EMAIL = "bhavsarpurven515@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      company: fd.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please email me directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-border bg-surface p-6 text-sm">
        <p className="font-medium text-foreground">Thanks, your message is on its way.</p>
        <p className="mt-2 text-muted">
          I&apos;ll get back to you soon. You can also reach me at{" "}
          <a href={`mailto:${EMAIL}`} className="text-primary hover:text-primary-hover">
            {EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — hidden from humans; bots that fill it are dropped server-side. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Name</span>
        <input
          type="text"
          name="name"
          required
          maxLength={120}
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
          maxLength={200}
          className="rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="resize-y rounded-md border border-border bg-surface px-3 py-2 text-foreground outline-none transition-colors focus:border-primary"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 self-start rounded-full bg-cta px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-muted">
        By sending, you agree your message is stored so I can reply. See the{" "}
        <a href="/privacy" className="underline hover:text-foreground">privacy policy</a>.
      </p>
    </form>
  );
}
