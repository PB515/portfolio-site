import Link from "next/link";
import Image from "next/image";
import { Icon, type IconName } from "@/components/Icon";
import { FooterDecor } from "@/components/FooterDecor";

const CONNECT: { href: string; label: string; icon: IconName }[] = [
  { href: "https://www.linkedin.com/in/purvenbhavsar", label: "LinkedIn", icon: "linkedin" },
  { href: "https://github.com/PB515", label: "GitHub", icon: "github" },
  { href: "mailto:bhavsarpurven515@gmail.com", label: "Email", icon: "email" },
];

const NAV = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate mt-24 overflow-hidden border-t border-border">
      <FooterDecor className="inset-x-0 bottom-0 -z-10 w-full opacity-[0.09]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0"
            />
            <p className="text-xl font-semibold tracking-[0.1em] text-foreground">
              PURVEN BHAVSAR
            </p>
          </div>
          <p className="mt-4 text-sm text-muted">
            Learning complex systems and turning them into practical, working
            solutions.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <span className="text-muted">Let&apos;s connect</span>
          {CONNECT.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
            >
              <Icon name={c.icon} className="h-4 w-4" />
              {c.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 text-xs text-muted">
          <span>© {year} Purven Bhavsar</span>
          <Link href="/admin" className="transition-colors hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
