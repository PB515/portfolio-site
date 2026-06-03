import type { CSSProperties } from "react";

export type IconName =
  | "github"
  | "linkedin"
  | "email"
  | "ai-automation"
  | "systems-thinking"
  | "frontend-engineering"
  | "growth-marketing"
  | "learning-research"
  | "writing-explaining";

// Renders a PNG icon as a mask tinted to `currentColor`, so it recolors with the
// surrounding text colour (token-based → adapts to Root/Canopy automatically).
// Control colour + size via className, e.g. <Icon name="github" className="h-5 w-5 text-muted" />.
export function Icon({ name, className }: { name: IconName; className?: string }) {
  const url = `url(/ui/icon-${name}.png)`;
  const style: CSSProperties = {
    display: "inline-block",
    backgroundColor: "currentColor",
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
  return <span aria-hidden="true" className={className} style={style} />;
}
