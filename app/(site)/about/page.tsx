import Link from "next/link";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Portrait } from "@/components/Portrait";
import { AboutDecor } from "@/components/AboutDecor";
import { Motif } from "@/components/Motif";

export const revalidate = 60;

export const metadata = {
  title: "About",
  description:
    "Purven Bhavsar — from opening up old CPUs as a kid to building AI automation and studying infrastructure. Learning complex systems and making them practical.",
};

const SKILLS_TODAY = [
  "AI Automation",
  "n8n Workflows",
  "SEO & YouTube SEO",
  "Web Development",
  "WordPress",
];

const SKILLS_FUTURE = [
  "Systems Thinking",
  "Infrastructure Development",
  "Large-Scale Systems",
  "Economic Growth",
  "Technology & Society",
];

const VALUES = ["Learning", "Curiosity", "Innovation", "Growth", "Economic Development"];

const JOURNEY: { when: string; text: string }[] = [
  {
    when: "As a kid",
    text: "Fascinated by how computers, TVs, and electronics worked — I opened up old CPUs and devices just to see inside.",
  },
  {
    when: "School labs",
    text: "That curiosity grew in the school computer labs, where I spent as much time as I could.",
  },
  {
    when: "The HTML moment",
    text: "A teacher introduced HTML and website creation. Building my first webpage made me decide to become a Computer Engineer.",
  },
  {
    when: "Today",
    text: "I build practical AI automation, web technologies, and digital systems.",
  },
  {
    when: "Next",
    text: "An MBA in Infrastructure Development (2026) — heading toward large-scale systems, infrastructure, and economic growth.",
  },
];

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <Reveal>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

export default async function AboutPage() {
  const supabase = createPublicClient();
  const { data: resume } = await supabase
    .from("resume")
    .select("file_path")
    .eq("is_current", true)
    .maybeSingle();
  const resumeUrl = publicAsset("resume", resume?.file_path ?? null);

  return (
    <>
      {/* Intro */}
      <section className="relative isolate mx-auto grid max-w-4xl items-center gap-8 overflow-hidden px-6 pt-20 pb-6 sm:grid-cols-[1.3fr_1fr]">
        <AboutDecor className="-left-8 bottom-0 -z-10 h-60 w-60 opacity-[0.10]" />
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            About
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            I learn complex systems quickly — and turn them into practical,
            working solutions.
          </h1>
        </Reveal>
        <Reveal delay={120} className="mx-auto w-full max-w-[360px]">
          <Portrait
            src="/images/purven-about.png"
            alt="Purven Bhavsar"
            variant="grid"
            art="/brand/portrait-about.png"
            sizes="(max-width: 640px) 75vw, 320px"
          />
        </Reveal>
      </section>

      {/* Story (from the brief, first person) */}
      <Section eyebrow="The story" title="How I got here">
        <ol className="relative ml-1 border-l border-border">
          {JOURNEY.map((m) => (
            <li key={m.when} className="relative pb-7 pl-6 last:pb-0">
              <span className="absolute -left-[6px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-[var(--background)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                {m.when}
              </p>
              <p className="mt-1 text-base text-muted">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Philosophy */}
      <Section eyebrow="Philosophy" title="How I think about systems">
        <p>
          I enjoy understanding how systems work — whether it&apos;s a computer, an
          AI workflow, a business process, or large-scale infrastructure. I&apos;m
          naturally drawn toward understanding complexity and making it
          practical.
        </p>
        <p>
          My goal isn&apos;t only to learn technology, but to understand how systems
          create opportunities, solve problems, and contribute to long-term
          growth.
        </p>
        <ul className="flex flex-wrap gap-2 pt-2">
          {VALUES.map((v) => (
            <li
              key={v}
              className="cursor-default rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-border-hover hover:text-primary"
            >
              {v}
            </li>
          ))}
        </ul>
      </Section>

      {/* Skills arc */}
      <Section eyebrow="Skills" title="An arc, not a list">
        <p className="text-base">
          What I build today points toward where I&apos;m going: practical
          AI/automation now, systems and infrastructure at scale next.
        </p>
        <div className="grid gap-6 pt-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Icon name="ai-automation" className="h-5 w-5 text-primary" />
              Today — building
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SKILLS_TODAY.map((s) => (
                <li
                  key={s}
                  className="cursor-default rounded-full bg-background/40 px-3 py-1 text-sm text-muted ring-1 ring-border transition-colors hover:text-primary hover:ring-border-hover"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Icon name="growth-seo" className="h-5 w-5 text-primary" />
              Heading toward — at scale
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SKILLS_FUTURE.map((s) => (
                <li
                  key={s}
                  className="cursor-default rounded-full bg-background/40 px-3 py-1 text-sm text-muted ring-1 ring-border transition-colors hover:text-primary hover:ring-border-hover"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Education (real, from the brief) */}
      <Section eyebrow="Education" title="Where I studied">
        <ul className="space-y-5 text-base">
          <li>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="font-medium text-foreground">
                MBA, Infrastructure Development
              </p>
              <p className="text-sm text-muted">2026 – Present</p>
            </div>
            <p className="text-muted">Adani University</p>
          </li>
          <li>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="font-medium text-foreground">
                B.E., Computer Engineering
              </p>
              <p className="text-sm text-muted">2021 – 2025</p>
            </div>
            <p className="text-muted">
              Gandhinagar Institute of Technology · Gujarat Technological
              University
            </p>
            <p className="mt-0.5 text-sm text-muted">6.93 CGPA</p>
          </li>
        </ul>
      </Section>

      {/* Experience (real) */}
      <Section eyebrow="Experience" title="What I've been building">
        <ul className="space-y-6 text-base">
          <li>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="font-medium text-foreground">Junior Developer</p>
              <p className="text-sm text-muted">Jun 2025 – Jun 2026</p>
            </div>
            <p className="text-muted">
              <a
                href="https://rapidsolutions.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover"
              >
                Rapid Solutions
              </a>{" "}
              · Web Development, AI Automation &amp; Digital Marketing
            </p>
            <p className="mt-2 text-base">
              Built and shipped client websites, set up AI/automation workflows, and
              handled SEO — turning practical requirements into working solutions.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Web Development", "AI Automation", "SEO"].map((s) => (
                <li
                  key={s}
                  className="cursor-default rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-border-hover hover:text-primary"
                >
                  {s}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted">
          The{" "}
          <Link href="/portfolio" className="text-primary hover:text-primary-hover">
            portfolio
          </Link>{" "}
          shows the work itself.
        </p>
      </Section>

      {/* Resume + connect */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <Reveal className="relative isolate flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
          <Motif className="-bottom-8 -right-8 -z-10 h-36 w-auto opacity-[0.06]" />
          <div>
            <p className="text-lg font-medium tracking-tight">Resume</p>
            <p className="mt-1 text-sm text-muted">
              {resumeUrl
                ? "Download my resume, or reach out to connect."
                : "A downloadable resume is coming soon — reach out and I'll share it."}
            </p>
          </div>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-cta px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
            >
              Download resume
            </a>
          ) : (
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-cta px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
            >
              Get in touch
            </Link>
          )}
        </Reveal>
      </section>
    </>
  );
}
