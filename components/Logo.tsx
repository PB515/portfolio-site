import Link from "next/link";

// Uses the uploaded mark (navy + copper). It suits Canopy as-is; on Root it's
// lightened to near-white via CSS (.logo-mark filter in globals.css) for contrast.
// The wordmark is live text (token-coloured → adapts to both perspectives).
export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="Purven Bhavsar — home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-mark.png"
        alt=""
        className="logo-mark h-9 w-9 shrink-0 transition-transform duration-200 group-hover:scale-105"
      />
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
