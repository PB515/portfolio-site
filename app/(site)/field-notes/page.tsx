import Link from "next/link";

export const metadata = {
  title: "Field Notes",
  description:
    "Notes on what Purven Bhavsar is learning and thinking about — AI, automation, systems, and growth.",
};

export default function FieldNotesPage() {
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

      {/* Honest empty-state (notes are published live via admin — Phase 3/4) */}
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
    </main>
  );
}
