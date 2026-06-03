// Portfolio page accent — very faint corner frame (ticks at the content edges).
// Stretched to the container (preserveAspectRatio="none") with non-scaling strokes
// so the ticks land at the page corners and stay crisp. Token-bound, theme-swap.
export function PortfolioDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
      {/* ROOT — circuit corner brackets */}
      <svg className="decor-root decor-stretch h-full w-full text-primary" viewBox="0 0 240 240" preserveAspectRatio="none" fill="none">
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 34H46V52H68" />
          <path d="M18 86H42" />
          <path d="M34 18V44" />
          <path d="M222 34H194V52H172" />
          <path d="M222 86H198" />
          <path d="M206 18V44" />
          <path d="M18 206H46V188H68" />
          <path d="M18 154H42" />
          <path d="M34 222V196" />
          <path d="M222 206H194V188H172" />
          <path d="M222 154H198" />
          <path d="M206 222V196" />
        </g>
        <g fill="currentColor">
          <circle cx="68" cy="52" r="2.8" />
          <circle cx="172" cy="188" r="2.8" />
        </g>
      </svg>

      {/* CANOPY — leaf corners */}
      <svg className="decor-canopy decor-stretch h-full w-full text-muted" viewBox="0 0 240 240" preserveAspectRatio="none" fill="none">
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 40C30 38 40 34 48 28" />
          <path d="M28 20C34 28 42 34 52 38" />
          <path d="M20 188C30 186 39 181 46 174" />
          <path d="M28 220C34 211 40 202 48 195" />
          <path d="M220 52C211 48 202 42 195 34" />
          <path d="M188 20C190 30 195 39 202 46" />
          <path d="M220 200C210 198 200 194 192 188" />
          <path d="M188 220C194 212 202 206 212 202" />
        </g>
        <g fill="currentColor">
          <path d="M48 28C54 22 61 20 68 22C63 28 56 31 48 28Z" />
          <path d="M46 174C52 168 59 166 66 168C61 174 54 177 46 174Z" />
          <path d="M195 34C188 28 185 21 186 14C193 19 197 26 195 34Z" />
          <path d="M192 188C185 182 182 175 183 168C190 173 194 180 192 188Z" />
        </g>
      </svg>
    </div>
  );
}
