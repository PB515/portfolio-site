import Image from "next/image";

type Variant = "glow" | "grid" | "rings";

const BACKDROP: Record<Variant, string> = {
  glow: "portrait-glow",
  grid: "portrait-grid",
  rings: "portrait-rings",
};

// A framed cut-out portrait with its own copper decoration — a custom backdrop
// (glow / grid / rings) behind the transparent photo, a warm copper glow, and a
// double copper inner-frame for a richer look. Wrap in a sizing parent
// (e.g. `mx-auto w-full max-w-lg`); this fills it at a 4:5 ratio.
export function Portrait({
  src,
  alt,
  variant = "glow",
  art,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  variant?: Variant;
  /** Optional copper-line artwork (PNG) layered behind the cut-out. Generated
   *  art often sits on solid black — `mix-blend-screen` drops the black so only
   *  the copper shows; on light Canopy it fades out gracefully (no black box). */
  art?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="group relative isolate aspect-[4/5] w-full overflow-hidden rounded-3xl border-2 border-primary bg-surface shadow-[var(--shadow-hover)]">
      {/* Warm copper wash (color depth). When custom art is supplied the art is
          the pattern, so we keep just the soft glow here; otherwise the CSS variant. */}
      <div
        className={`absolute inset-0 -z-20 ${art ? "portrait-glow" : BACKDROP[variant]}`}
        aria-hidden="true"
      />
      {art && (
        <Image
          src={art}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 90vw, 560px"
          className="pointer-events-none -z-10 select-none object-cover opacity-60 mix-blend-screen"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {/* Double inner frame — thin offset copper line for depth. */}
      <div
        className="pointer-events-none absolute inset-2.5 rounded-[1.15rem] border border-primary/25"
        aria-hidden="true"
      />
    </div>
  );
}
