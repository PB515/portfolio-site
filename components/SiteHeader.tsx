import Link from "next/link";
import { Logo } from "./Logo";
import { PerspectiveToggle } from "./PerspectiveToggle";
import { MobileNav } from "./MobileNav";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <Logo />

        <nav className="hidden items-center gap-7 text-base md:flex">
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

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <PerspectiveToggle />
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full bg-cta px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover sm:inline-block"
          >
            Let&apos;s Connect
          </Link>
          <MobileNav items={NAV} />
        </div>
      </div>
    </header>
  );
}
