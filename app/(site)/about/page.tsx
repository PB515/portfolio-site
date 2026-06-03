import Link from "next/link";
import Image from "next/image";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";

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
      <section className="mx-auto grid max-w-3xl items-center gap-8 px-6 pt-20 pb-6 sm:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            About
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            I learn complex systems quickly — and turn them into practical,
            working solutions.
          </h1>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-sm)]">
          <Image
            src="/images/purven-about.jpeg"
            alt="Purven Bhavsar"
            fill
            sizes="(max-width: 640px) 50vw, 200px"
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Story (from the brief, first person) */}
      <Section eyebrow="The story" title="How I got here">
        <p>
          I became interested in technology as a child. I was fascinated by how
          computers, televisions, and electronics worked, and I often opened up
          old CPUs and devices just to understand what was happening inside.
        </p>
        <p>
          That curiosity grew in school computer labs. The turning point came
          when a teacher introduced HTML and website creation — building my
          first webpage made me realise I wanted to become a Computer Engineer.
        </p>
        <p>
          Today I work with AI automation, web technologies, and digital
          systems. My long-term interests reach beyond software into large-scale
          systems, infrastructure, and economic development — which is why I&apos;m
          pursuing an MBA in Infrastructure Development.
        </p>
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
              className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
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
            <p className="text-sm font-semibold text-foreground">
              Today — building
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SKILLS_TODAY.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-background/40 px-3 py-1 text-sm text-muted ring-1 ring-border"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-foreground">
              Heading toward — at scale
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SKILLS_FUTURE.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-background/40 px-3 py-1 text-sm text-muted ring-1 ring-border"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Education (real, from the brief) */}
      <Section eyebrow="Education" title="Education">
        <ul className="space-y-4 text-base">
          <li>
            <p className="font-medium text-foreground">
              MBA, Infrastructure Development
            </p>
            <p className="text-muted">Adani University · beginning 2026</p>
          </li>
          <li>
            <p className="font-medium text-foreground">
              B.E., Computer Engineering
            </p>
            <p className="text-muted">
              Gandhinagar Institute of Technology · Gujarat Technological
              University
            </p>
          </li>
        </ul>
      </Section>

      {/* Experience — included now, content TBD (decision B2) */}
      <Section eyebrow="Experience" title="Experience">
        <p className="text-base">
          Over a year of hands-on work building AI automation, SEO, and web
          projects. A detailed experience timeline is on the way — in the
          meantime, the{" "}
          <Link href="/portfolio" className="text-primary hover:text-primary-hover">
            portfolio
          </Link>{" "}
          shows the work itself.
        </p>
      </Section>

      {/* Résumé + connect */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-medium tracking-tight">Résumé</p>
            <p className="mt-1 text-sm text-muted">
              {resumeUrl
                ? "Download my résumé, or reach out to connect."
                : "A downloadable résumé is coming soon — reach out and I'll share it."}
            </p>
          </div>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
            >
              Download résumé
            </a>
          ) : (
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
            >
              Get in touch
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
