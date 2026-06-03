// About-page accent — 240×240 timeline motif (low intensity), an edge accent for
// the About intro. Root = circuit timeline w/ milestone nodes; Canopy = branch
// timeline placeholder until canopy/about-accent.svg exists. Token-bound, theme-swap.
export function AboutDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
      {/* ROOT — circuit timeline */}
      <svg
        className="decor-root h-full w-full text-primary"
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 18C24 42 24 66 26 90C28 116 30 140 30 164C30 187 28 207 24 222" />
          <path d="M24 54H58V40H84" />
          <path d="M26 96H64V80H98" />
          <path d="M29 146H72V128H108" />
          <path d="M30 196H82V178H118" />
          <path d="M24 222H74V206H126" />
          <path d="M126 222H164V206H204" />
          <path d="M18 206C28 198 36 188 42 176" />
          <path d="M24 222C36 214 46 204 54 192" />
          <path d="M54 192C62 196 70 202 76 210" />
          <path d="M54 192C64 188 74 182 82 174" />
          <path d="M164 206H188" />
        </g>
        <g fill="currentColor">
          <circle cx="58" cy="54" r="3.2" />
          <circle cx="64" cy="96" r="3.2" />
          <circle cx="72" cy="146" r="3.2" />
          <circle cx="82" cy="196" r="3.2" />
          <circle cx="126" cy="222" r="3.2" />
          <circle cx="118" cy="178" r="3.2" />
          <circle cx="164" cy="206" r="3.2" />
          <circle cx="204" cy="206" r="3.2" />
          <circle cx="82" cy="174" r="3.2" />
        </g>
      </svg>

      {/* CANOPY — branch timeline placeholder */}
      <svg
        className="decor-canopy h-full w-full text-muted"
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 222C28 198 30 171 32 144C34 114 42 86 56 60C69 38 89 23 116 16" />
          <path d="M34 156C46 149 57 140 66 129C75 118 82 105 86 91" />
          <path d="M42 106C54 100 65 91 74 81C84 70 91 57 95 43" />
          <path d="M58 58C69 58 80 55 89 49C98 44 106 36 112 26" />
          <path d="M31 190C40 184 48 176 55 167" />
          <path d="M24 32H44" />
          <path d="M122 16H142" />
        </g>
        <g fill="currentColor">
          <path d="M86 91C94 84 103 82 112 85C105 92 96 94 86 91Z" />
          <path d="M95 43C103 36 112 34 121 37C114 44 105 46 95 43Z" />
          <path d="M112 26C120 19 129 17 138 20C131 27 122 29 112 26Z" />
          <path d="M55 167C63 160 72 158 81 161C74 168 65 170 55 167Z" />
          <path d="M58 58C50 51 48 42 50 33C58 39 61 48 58 58Z" />
        </g>
      </svg>
    </div>
  );
}
