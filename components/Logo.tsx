import Link from "next/link";

// Interim vector mark — a stylized tree (canopy) + roots in a ring.
// Drawn in code (vector, theme-aware via currentColor), swappable for a final logo later.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" strokeOpacity="0.3" />
      <path d="M24 13v22" />
      {/* canopy */}
      <path d="M24 17c-3.2-3-7-3-9.2-1M24 17c3.2-3 7-3 9.2-1" />
      <path d="M24 21.5c-2.6-2.4-5.8-2.4-7.6-0.8M24 21.5c2.6-2.4 5.8-2.4 7.6-0.8" />
      {/* roots */}
      <path d="M24 35c-2.4 2.6-5.6 3.4-8.4 3.6M24 35c2.4 2.6 5.6 3.4 8.4 3.6" />
      <path d="M24 35c-0.8 3-2.6 5-4.6 6.2M24 35c0.8 3 2.6 5 4.6 6.2" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="Purven Bhavsar — home"
    >
      <LogoMark className="h-9 w-9 shrink-0 text-primary transition-transform duration-200 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-[0.18em] text-foreground">
          PURVEN BHAVSAR
        </span>
        <span className="mt-1 text-[0.6rem] tracking-[0.28em] text-muted">
          ENGINEER · AUTOMATE · GROW
        </span>
      </span>
    </Link>
  );
}
