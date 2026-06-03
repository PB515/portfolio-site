import Link from "next/link";

export const metadata = {
  title: "Portfolio",
  description:
    "Projects, experiments, and learning by Purven Bhavsar — AI automation, SEO, and web.",
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-20 pb-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Portfolio
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects, experiments &amp; learning
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        AI automation, SEO, and web — the work that turns complex systems into
        practical, working solutions.
      </p>

      {/* Honest empty-state (real projects are added live via admin — Phase 3/4) */}
      <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-lg font-medium text-foreground">
          Projects are being added soon.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          I&apos;m curating a few real projects to show here properly. In the
          meantime, you can see my code on GitHub or reach out.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/PB515"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-hover"
          >
            View GitHub
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
