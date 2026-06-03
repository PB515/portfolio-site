import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icon";
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

// Each tile links to the Portfolio filtered by this category (slug must match a
// category created in admin, kind=project).
const CATEGORIES: { icon: IconName; label: string; slug: string }[] = [
  { icon: "ai-automation", label: "AI Automation", slug: "ai-automation" },
  { icon: "case-studies", label: "Case Studies", slug: "case-studies" },
  { icon: "web-frontend", label: "Web & Frontend", slug: "web-frontend" },
  { icon: "growth-seo", label: "Growth & SEO", slug: "growth-seo" },
  { icon: "learning-research", label: "Learning & Research", slug: "learning-research" },
  { icon: "writing-explaining", label: "Writing & Explaining", slug: "writing-explaining" },
];

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createPublicClient();
  const { data: featuredData } = await supabase
    .from("projects")
    .select("title,slug,summary,cover_path")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("sort_order")
    .limit(3);
  const featured = (featuredData ?? []) as {
    title: string;
    slug: string;
    summary: string;
    cover_path: string | null;
  }[];

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

        <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl border-2 border-primary bg-surface shadow-[var(--shadow-md)] sm:max-w-xl">
          <Image
            src="/images/purven-hero.png"
            alt="Purven Bhavsar"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 560px"
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Featured work — projects flagged is_featured in admin. */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Featured work
            </h2>
            <Link href="/portfolio" className="text-sm text-primary hover:text-primary-hover">
              All projects →
            </Link>
          </div>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {featured.map((p) => {
              const cover = publicAsset("covers", p.cover_path);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover"
                  >
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt="" className="aspect-[1200/630] w-full object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-foreground group-hover:text-primary">
                        {p.title}
                      </h3>
                      {p.summary && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted">{p.summary}</p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Browse by area — clickable category tiles → Portfolio filtered. */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Browse my work by area
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/portfolio?category=${c.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-border-hover"
              >
                <Icon name={c.icon} className="h-6 w-6 shrink-0 text-primary" />
                <span className="text-sm text-foreground group-hover:text-primary">
                  {c.label}
                </span>
              </Link>
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
