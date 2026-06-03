import Link from "next/link";

// Wordmark-only logo: refined type + a single copper accent (the period).
// All token-coloured, so it adapts to Root/Canopy automatically. No image asset.
export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex flex-col leading-none"
      aria-label="Purven Bhavsar — home"
    >
      <span className="text-base font-semibold tracking-tight text-foreground">
        Purven Bhavsar<span className="text-primary">.</span>
      </span>
      <span className="mt-1.5 text-[0.6rem] uppercase tracking-[0.28em] text-muted">
        Engineer · Automate · Grow
      </span>
    </Link>
  );
}
