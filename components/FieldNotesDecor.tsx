// Field Notes page accent — tiny corner marks (TL + BR), reading-friendly.
// Stretched to the content edges with non-scaling strokes. Token-bound, theme-swap.
export function FieldNotesDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
      {/* ROOT — circuit corner marks */}
      <svg className="decor-root decor-stretch h-full w-full text-primary" viewBox="0 0 240 240" preserveAspectRatio="none" fill="none">
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 32H42V48H60" />
          <path d="M32 18V40" />
          <path d="M222 208H198V192H180" />
          <path d="M208 222V200" />
        </g>
        <g fill="currentColor">
          <circle cx="60" cy="48" r="2.8" />
          <circle cx="180" cy="192" r="2.8" />
        </g>
      </svg>

      {/* CANOPY — leaf corner marks */}
      <svg className="decor-canopy decor-stretch h-full w-full text-muted" viewBox="0 0 240 240" preserveAspectRatio="none" fill="none">
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 42C30 38 37 32 42 24" />
          <path d="M26 20C31 28 38 34 46 38" />
          <path d="M218 198C210 202 203 208 198 216" />
          <path d="M214 220C209 212 202 206 194 202" />
        </g>
        <g fill="currentColor">
          <path d="M42 24C48 19 55 18 61 20C56 25 49 27 42 24Z" />
          <path d="M198 216C192 221 185 222 179 220C184 215 191 213 198 216Z" />
        </g>
      </svg>
    </div>
  );
}
