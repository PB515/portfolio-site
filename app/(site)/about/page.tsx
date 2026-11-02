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
    "Engineer and MBA student at Adani University, learning how India makes, moves and predicts its power.",
};

const SKILLS_BRING = [
  "Python",
  "Next.js & TypeScript",
  "SQL & Supabase",
  "AI Automation (n8n)",
  "Data Analysis",
  "Building tools real people use",
];

const SKILLS_EXPLORING = [
  "Nuclear Power",
  "Energy Storage & Gravity Batteries",
  "Electricity Demand Forecasting",
  "Power Transmission",
  "Energy Markets & Policy",
];

const JOURNEY: { when: string; text: string }[] = [
  {
    when: "Early years",
    text: "Fascinated by how things worked, I spent my early years taking apart old CPUs and writing my first lines of HTML.",
  },
  {
    when: "2021 – 2025",
    text: "Earned my B.E. in Computer Engineering, which taught me to break big problems into systems.",
  },
  {
    when: "2025 – 2026",
    text: "Worked as a Junior Developer at Rapid Solutions, building client websites, setting up AI automation and running SEO. It taught me to turn real client needs into things that work.",
  },
  {
    when: "August 2026",
    text: "Started my MBA in Infrastructure Management at Adani University. In my first semester I built Solar Sahay, a rooftop solar calculator, as part of a Design Thinking group project.",
  },
  {
    when: "Next",
    text: "Learning how India makes, moves and predicts its power, starting with an electricity demand forecasting project.",
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
            Engineer by training, heading into energy.
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

      {/* Why energy */}
      <Section title="Why energy">
        <p>
          Electricity is so ordinary that most of us never think about it. I
          do. I&apos;m amazed by how it&apos;s made, how it travels from a power
          plant to a home, and how the grid keeps supply and demand in balance
          all the time. That&apos;s the field I want to build a career in.
        </p>
        <p>
          The parts that pull me in most are nuclear power, energy storage such
          as gravity batteries, and how a country predicts how much electricity
          it will need. Forecasting is where my engineering and data skills fit
          best.
        </p>
      </Section>

      {/* Skills */}
      <Section eyebrow="Skills" title="What I bring, and what I'm exploring">
        <p className="text-base">
          My engineering and data skills are what I bring to energy. The energy
          side I&apos;m learning now, ahead of my energy electives in semester 3.
        </p>
        <div className="grid gap-6 pt-2 sm:grid-cols-2">
          <div className="relative isolate overflow-hidden rounded-xl border border-border bg-surface p-5">
            <Motif className="-bottom-6 -right-6 -z-10 h-28 w-auto opacity-[0.15]" />
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Icon name="ai-automation" className="h-5 w-5 text-primary" />
              What I bring
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SKILLS_BRING.map((s) => (
                <li
                  key={s}
                  className="cursor-default rounded-full bg-background/40 px-3 py-1 text-sm text-muted ring-1 ring-border transition-colors hover:text-primary hover:ring-border-hover"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative isolate overflow-hidden rounded-xl border border-border bg-surface p-5">
            <Motif className="-bottom-6 -right-6 -z-10 h-28 w-auto opacity-[0.15]" />
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Icon name="growth-seo" className="h-5 w-5 text-primary" />
              What I&apos;m exploring
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SKILLS_EXPLORING.map((s) => (
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
                MBA, Infrastructure Management
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
              Built and shipped client websites, set up AI and automation
              workflows, and ran SEO. Mostly it meant turning real client
              requirements into things that actually worked.
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
          <Motif className="-bottom-8 -right-8 -z-10 h-36 w-auto opacity-[0.15]" />
          <div>
            <p className="text-lg font-medium tracking-tight">Resume</p>
            <p className="mt-1 text-sm text-muted">
              {resumeUrl
                ? "Download my resume, or reach out to connect."
                : "A downloadable resume is coming soon. Reach out and I'll share it."}
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
