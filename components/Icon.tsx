import type { ReactNode } from "react";

export type IconName =
  | "github"
  | "linkedin"
  | "email"
  | "ai-automation"
  | "case-studies"
  | "web-frontend"
  | "growth-seo"
  | "learning-research"
  | "writing-explaining";

// Inline SVG icons — currentColor, so they adapt to Root/Canopy via text colour.
// Size + colour via className, e.g. <Icon name="github" className="h-5 w-5 text-primary" />.
const line = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PATHS: Record<IconName, ReactNode> = {
  github: (
    <path
      fill="currentColor"
      d="M12 2A10 10 0 0 0 8.84 21.5c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.5h3.1V21H3.4V8.5Zm5.06 0h2.97v1.71h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-3.1V8.5Z"
    />
  ),
  email: (
    <g {...line}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </g>
  ),
  "ai-automation": (
    <g {...line}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9.5 2v3M14.5 2v3M9.5 19v3M14.5 19v3M2 9.5h3M2 14.5h3M19 9.5h3M19 14.5h3" />
    </g>
  ),
  "case-studies": (
    <g {...line}>
      <path d="M6 3h8l4 4v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v4h4" />
      <circle cx="10.5" cy="11.5" r="2" />
      <path d="m12.5 13.5 2 2" />
    </g>
  ),
  "web-frontend": (
    <g {...line}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />
    </g>
  ),
  "growth-seo": (
    <g {...line}>
      <path d="M4 19h16M7 15l3-4 3 3 4-6" />
      <path d="M17 8h2v2" />
    </g>
  ),
  "learning-research": (
    <g {...line}>
      <path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2V5Z" />
    </g>
  ),
  "writing-explaining": (
    <g {...line}>
      <path d="M14 4l6 6M3 21l1.4-5L15 5.4 18.6 9 8 19.6 3 21Z" />
    </g>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      {PATHS[name]}
    </svg>
  );
}
