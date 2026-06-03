// Theme-aware, edge-weighted line-art decor — the "system" from the SVG decor
// plan, hand-authored so it stays token-true and weightless (no asset files).
//   Root  → copper circuit traces + nodes  (var(--primary))
//   Canopy→ sage branch + leaves           (var(--muted))
// CSS in globals.css swaps which one shows per data-theme. Non-interactive,
// static (no animation), meant for low opacity behind content.
//
// Usage: place inside a `relative isolate overflow-hidden` parent and position
// via className, e.g. <Decor className="-left-20 -top-8 h-72 w-72 -z-10 opacity-[0.12]" />.
export function Decor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
      {/* ROOT — circuit corner */}
      <svg
        className="decor-root h-full w-full text-primary"
        viewBox="0 0 240 240"
        fill="none"
      >
        <g
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 36 H70 L92 58 H150" />
          <path d="M0 92 H40 L62 114 H120 L140 134" />
          <path d="M0 150 H60 L78 168" />
          <path d="M36 0 V52 L58 74" />
          <path d="M104 0 V40 L128 64 V120" />
          <path d="M170 0 V60 L150 80" />
          <path d="M150 58 V108" />
        </g>
        <g fill="currentColor">
          <circle cx="150" cy="58" r="4" />
          <circle cx="120" cy="114" r="4" />
          <circle cx="140" cy="134" r="3.5" />
          <circle cx="78" cy="168" r="4" />
          <circle cx="58" cy="74" r="3.5" />
          <circle cx="128" cy="120" r="4" />
          <circle cx="150" cy="80" r="3.5" />
        </g>
      </svg>

      {/* CANOPY — branch + leaves */}
      <svg
        className="decor-canopy h-full w-full text-muted"
        viewBox="0 0 240 240"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M10 230 C70 190 96 150 120 96 C132 70 150 44 196 20" />
          <path d="M86 150 C110 140 128 142 150 120" />
          <path d="M120 96 C140 92 156 96 172 80" />
          <path d="M104 124 C92 110 88 96 92 78" />
        </g>
        <g fill="currentColor">
          <path d="M150 120 c14 -10 30 -8 34 6 c-16 6 -28 4 -34 -6 z" />
          <path d="M172 80 c12 -12 28 -12 34 0 c-14 10 -26 10 -34 0 z" />
          <path d="M92 78 c-12 -10 -12 -26 0 -34 c10 14 10 26 0 34 z" />
        </g>
        {/* rare copper accent (Canopy spec) */}
        <circle cx="196" cy="20" r="4" className="text-primary" fill="currentColor" />
      </svg>
    </div>
  );
}
