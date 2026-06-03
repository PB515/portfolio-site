import Link from "next/link";
import Image from "next/image";

// Brand lockup: copper circuit-tree mark + wordmark. The mark is copper on a
// transparent PNG, so it reads on both Root (olive) and Canopy (cream) with no
// recolour. Wordmark stays token-coloured.
export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5"
      aria-label="Purven Bhavsar — home"
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority
        className="h-9 w-9 shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight text-foreground">
          Purven Bhavsar<span className="text-primary">.</span>
        </span>
        <span className="mt-1.5 text-[0.6rem] uppercase tracking-[0.28em] text-muted">
          Engineer · Automate · Grow
        </span>
      </span>
    </Link>
  );
}
