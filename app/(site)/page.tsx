import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icon";

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Purven Bhavsar",
  url: "https://portfolio-site-psi-ruddy.vercel.app",
  description:
    "Learns complex systems quickly and turns them into practical, working solutions.",
  knowsAbout: [
    "AI Automation",
    "Workflow Automation",
    "SEO",
    "Web Development",
    "Systems Thinking",
    "Infrastructure Development",
  ],
  sameAs: [
    "https://github.com/PB515",
    "https://www.linkedin.com/in/purvenbhavsar",
  ],
};

const CAPABILITIES: { icon: IconName; label: string }[] = [
  { icon: "ai-automation", label: "AI Automation" },
  { icon: "systems-thinking", label: "Systems Thinking" },
  { icon: "frontend-engineering", label: "Web & Frontend" },
  { icon: "growth-marketing", label: "Growth & SEO" },
  { icon: "learning-research", label: "Learning & Research" },
  { icon: "writing-explaining", label: "Writing & Explaining" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={PERSON} />
      {/* Hero — identity first (doc 02/04) + portrait. Copper only on eyebrow + accent. */}
      <section className="mx-auto grid max-w-5xl items-center gap-8 px-6 pt-16 pb-12 sm:pt-24 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            AI Automation · Systems Thinking
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            I learn complex systems quickly — and turn them into{" "}
            <span className="text-primary">practical, working solutions.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
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
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[34rem] md:max-w-lg">
          <Image
            src="/images/purven-hero.png"
            alt="Purven Bhavsar"
            fill
            priority
            sizes="(max-width: 768px) 85vw, 520px"
            className="object-contain object-bottom"
          />
        </div>
      </section>

      {/* What I work with — capability icons (real skills, no invented metrics). */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          What I work with
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <Icon name={c.icon} className="h-6 w-6 shrink-0 text-primary" />
              <span className="text-sm text-foreground">{c.label}</span>
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
