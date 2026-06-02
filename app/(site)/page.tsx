import Link from "next/link";

const SKILLS = [
  "AI Automation",
  "n8n Workflows",
  "SEO",
  "Web Development",
  "Systems Thinking",
];

export default function HomePage() {
  return (
    <>
      {/* Hero — identity first (doc 02/04). Copper used only on the eyebrow + accent. */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          AI Automation · Systems Thinking
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          I learn complex systems quickly — and turn them into{" "}
          <span className="text-primary">practical, working solutions.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Today I build practical AI automation, SEO, and web systems. I&apos;m
          heading toward systems, infrastructure, and economic growth — an MBA
          in Infrastructure Development begins in 2026.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
          >
            Let&apos;s connect
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-hover"
          >
            View my work
          </Link>
        </div>
      </section>

      {/* What I work with — real skills as evidence (no invented metrics). */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          What I work with
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {SKILLS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Story teaser → About */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-2xl rounded-xl border border-border bg-surface p-7 shadow-[var(--shadow-sm)]">
          <p className="text-lg leading-relaxed text-foreground">
            It started with opening up old CPUs and electronics as a kid, became
            a first webpage in a school lab, and grew into AI automation and the
            systems behind it.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-block text-sm font-medium text-primary hover:text-primary-hover"
          >
            Read the full story →
          </Link>
        </div>
      </section>

      {/* Connect band */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-medium tracking-tight">
            Curious about my work, or want to connect?
          </p>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
