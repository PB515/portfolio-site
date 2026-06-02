// Faint, decorative, theme-aware background motif (docs/04a §9: one asset, recolors per theme).
// Root = copper circuit + roots (Builder). Canopy = sage leaves + branches (Thinking).
// Purely decorative: aria-hidden, pointer-events-none, fixed behind content, low opacity,
// concentrated at the edges so the reading column stays clean. No animation (calm + perf).
export function SiteDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* ── ROOT: circuit traces + roots (copper) ── */}
      <svg
        className="decor-root absolute inset-0 h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.25"
      >
        <g strokeOpacity="0.14">
          {/* top-left circuit fan */}
          <path d="M0 90 H150 V160 H260 M150 90 V40" />
          <path d="M0 200 H90 V300 H210 V250 H320" />
          <path d="M70 0 V120 H180" />
          {/* bottom-right circuit fan */}
          <path d="M1200 760 H1040 V690 H940 M1040 760 V820" />
          <path d="M1200 640 H1110 V560 H980 V610 H880" />
          <path d="M1130 900 V790 H1010" />
          {/* roots descending bottom-center-left */}
          <path d="M180 900 C200 820 150 780 210 700 C250 650 200 600 240 540" />
          <path d="M210 700 C170 690 140 720 110 700" />
          <path d="M240 540 C280 540 300 510 330 520" />
        </g>
        <g fill="var(--primary)" fillOpacity="0.18" stroke="none">
          <circle cx="150" cy="90" r="3.5" />
          <circle cx="260" cy="160" r="3.5" />
          <circle cx="320" cy="250" r="3.5" />
          <circle cx="1040" cy="760" r="3.5" />
          <circle cx="880" cy="610" r="3.5" />
          <circle cx="180" cy="120" r="3.5" />
        </g>
      </svg>

      {/* ── CANOPY: branches + leaves (sage, with rare copper) ── */}
      <svg
        className="decor-canopy absolute inset-0 h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* branches */}
        <g stroke="var(--muted)" strokeOpacity="0.22" strokeWidth="1.25" strokeLinecap="round">
          <path d="M1200 120 C1060 150 980 90 860 150 C760 200 720 140 620 180" />
          <path d="M980 110 C950 70 920 60 900 30" />
          <path d="M0 760 C140 740 200 800 320 760 C420 726 470 780 560 750" />
          <path d="M210 786 C230 826 250 836 268 866" />
        </g>
        {/* leaves (sage) */}
        <g fill="var(--muted)" fillOpacity="0.16">
          <ellipse cx="900" cy="30" rx="9" ry="16" transform="rotate(28 900 30)" />
          <ellipse cx="858" cy="150" rx="9" ry="16" transform="rotate(-18 858 150)" />
          <ellipse cx="760" cy="200" rx="9" ry="16" transform="rotate(20 760 200)" />
          <ellipse cx="620" cy="180" rx="9" ry="16" transform="rotate(-10 620 180)" />
          <ellipse cx="268" cy="866" rx="9" ry="16" transform="rotate(24 268 866)" />
          <ellipse cx="320" cy="760" rx="9" ry="16" transform="rotate(-22 320 760)" />
          <ellipse cx="560" cy="750" rx="9" ry="16" transform="rotate(14 560 750)" />
        </g>
        {/* a couple of copper leaves — the rare accent */}
        <g fill="var(--primary)" fillOpacity="0.16">
          <ellipse cx="980" cy="110" rx="8" ry="14" transform="rotate(-30 980 110)" />
          <ellipse cx="210" cy="786" rx="8" ry="14" transform="rotate(30 210 786)" />
        </g>
      </svg>
    </div>
  );
}
