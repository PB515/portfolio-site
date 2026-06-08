import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Motif } from "@/components/Motif";
import { Portrait } from "@/components/Portrait";
import { Decor } from "@/components/Decor";
import { HeroDecor } from "@/components/HeroDecor";
import { LowerDecor } from "@/components/LowerDecor";
import { createPublicClient, publicAsset } from "@/lib/supabase/public";

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

// The "Browse by area" tiles are built from the real admin categories (kind=project),
// so they always match what's in the CMS. Pick a brand icon by keyword in the slug.
function iconForCategory(slug: string): IconName {
  if (/(automation|system|^ai|-ai)/.test(slug)) return "ai-automation";
  if (/(seo|growth|market)/.test(slug)) return "growth-seo";
  if (/(web|front|infra)/.test(slug)) return "web-frontend";
  if (/(research|data|learn)/.test(slug)) return "learning-research";
  if (/(writ|explain|note|blog)/.test(slug)) return "writing-explaining";
  return "case-studies";
}

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createPublicClient();
  const { data: featuredData } = await supabase
    .from("projects")
    .select("title,slug,summary,cover_path")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("sort_order")
    .limit(5);
  const featured = (featuredData ?? []) as {
    title: string;
    slug: string;
    summary: string;
    cover_path: string | null;
  }[];

  const { data: featuredNotesData } = await supabase
    .from("field_notes")
    .select("title,slug,excerpt,cover_path")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(3);
  const featuredNotes = (featuredNotesData ?? []) as {
    title: string;
    slug: string;
    excerpt: string | null;
    cover_path: string | null;
  }[];

  // Home "story" photo — admin-uploaded (DB-backed); null until uploaded.
  const { data: storyImg } = await supabase
    .from("site_images")
    .select("file_path,alt")
    .eq("key", "home_story")
    .maybeSingle();
  const storyData = storyImg as { file_path: string; alt: string | null } | null;
  const storyUrl = publicAsset("covers", storyData?.file_path ?? null);
  const storyAlt = storyData?.alt ?? "Purven Bhavsar";

  // Project categories for the "Browse by area" tiles (match the admin CMS).
  const { data: catData } = await supabase
    .from("categories")
    .select("name,slug")
    .eq("kind", "project")
    .order("name");
  const categories = (catData ?? []) as { name: string; slug: string }[];

  return (
    <>
      <JsonLd data={PERSON} />
      {/* Hero — identity first (doc 02/04) + portrait. Copper only on eyebrow + accent. */}
      <section className="relative isolate mx-auto grid max-w-5xl items-center gap-8 overflow-hidden px-6 pt-16 pb-12 sm:pt-24 md:grid-cols-[1fr_1fr]">
        <HeroDecor className="inset-0 -z-10 opacity-[0.14]" />
        <div>
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            AI Automation · Systems Thinking
          </Reveal>
          <Reveal as="h1" delay={90} className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            I learn complex systems quickly — and turn them into{" "}
            <span className="text-primary">practical, working solutions.</span>
          </Reveal>
          <Reveal as="p" delay={180} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Today I build practical AI automation, SEO, and web systems. I&apos;m
            heading toward systems, infrastructure, and economic growth — an MBA
            in Infrastructure Development begins in 2026.
          </Reveal>
          <Reveal delay={270} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-cta px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
            >
              Let&apos;s connect
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-hover"
            >
              View my work
            </Link>
          </Reveal>
        </div>

        <Reveal delay={150} className="mx-auto w-full max-w-lg sm:max-w-xl">
          <Portrait
            src="/images/purven-hero.png"
            alt="Purven Bhavsar"
            variant="glow"
            art="/brand/portrait-hero.png"
            priority
            sizes="(max-width: 768px) 90vw, 560px"
          />
        </Reveal>
      </section>

      {/* Browse by area — tiles built from the real admin categories. */}
      {categories.length > 0 && (
        <section className="relative isolate mx-auto max-w-5xl overflow-hidden px-6 py-12">
          <Decor className="-right-20 top-1/2 -z-10 h-56 w-56 -translate-y-1/2 rotate-90 opacity-[0.07]" />
          <Reveal as="h2" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Browse my work by area
          </Reveal>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 60}>
                <Link
                  href={`/portfolio?category=${c.slug}`}
                  className="group lift flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 hover:border-border-hover"
                >
                  <Icon name={iconForCategory(c.slug)} className="h-6 w-6 shrink-0 text-primary" />
                  <span className="text-sm text-foreground group-hover:text-primary">
                    {c.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* Story teaser → About (+ image slot) */}
      <section className="mx-auto grid max-w-5xl items-center gap-8 px-6 py-12 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Link
            href="/about"
            className="group lift relative isolate block overflow-hidden rounded-xl border border-border bg-surface p-7 shadow-[var(--shadow-sm)] hover:border-border-hover"
          >
            <Motif className="-bottom-8 -right-8 -z-10 h-40 w-auto opacity-[0.15]" />
            <p className="text-lg leading-relaxed text-foreground">
              It started with opening up old CPUs and electronics as a kid, became
              a first webpage in a school lab, and grew into AI automation and the
              systems behind it.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary-hover">
              Read the full story
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </Reveal>

        {/* Story photo — admin-uploaded via /admin/home. Clean branded panel until set. */}
        {storyUrl ? (
          <Reveal delay={120} className="group relative overflow-hidden rounded-2xl border-2 border-primary bg-surface shadow-[var(--shadow-sm)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={storyUrl}
              alt={storyAlt}
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Reveal>
        ) : (
          <Reveal delay={120} className="relative isolate flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface">
            <Motif className="left-1/2 top-1/2 h-28 w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.16]" />
          </Reveal>
        )}
      </section>

      {/* Featured work — projects flagged is_featured in admin (above Connect). */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12">
          <Reveal className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Featured work
            </h2>
            <Link href="/portfolio" className="text-sm text-primary hover:text-primary-hover">
              All projects →
            </Link>
          </Reveal>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {featured.map((p, i) => {
              const cover = publicAsset("covers", p.cover_path);
              return (
                <Reveal as="li" key={p.slug} delay={i * 90}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group lift block overflow-hidden rounded-2xl border border-border bg-surface hover:border-border-hover"
                  >
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt="" className="aspect-[1200/630] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    )}
                    <div className="card-motif p-4">
                      <h3 className="font-medium text-foreground group-hover:text-primary">
                        {p.title}
                      </h3>
                      {p.summary && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted">{p.summary}</p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </section>
      )}

      {/* Featured field notes — below Featured work. */}
      {featuredNotes.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12">
          <Reveal className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Featured field notes
            </h2>
            <Link href="/field-notes" className="text-sm text-primary hover:text-primary-hover">
              All notes →
            </Link>
          </Reveal>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {featuredNotes.map((n, i) => {
              const cover = publicAsset("covers", n.cover_path);
              return (
                <Reveal as="li" key={n.slug} delay={i * 90}>
                  <Link
                    href={`/field-notes/${n.slug}`}
                    className="group lift block overflow-hidden rounded-2xl border border-border bg-surface hover:border-border-hover"
                  >
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt="" className="aspect-[1200/630] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    )}
                    <div className="card-motif p-4">
                      <h3 className="font-medium text-foreground group-hover:text-primary">
                        {n.title}
                      </h3>
                      {n.excerpt && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted">{n.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </section>
      )}

      {/* Connect band */}
      <section className="relative isolate mx-auto max-w-5xl overflow-hidden px-6 py-16">
        <LowerDecor className="inset-x-0 bottom-0 -z-10 w-full opacity-[0.10]" />
        <Reveal className="relative isolate flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-medium tracking-tight">
            Curious about my work, or want to connect?
          </p>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-cta px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </>
  );
}
