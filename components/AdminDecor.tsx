// Admin chrome — very faint left-edge hint (lg+ only, fixed). Keeps the dashboard
// functional with a whisper of brand. Root = circuit ladder; Canopy = sparse branch
// placeholder until canopy/admin-base.svg exists. Token-bound, theme-swap.
export function AdminDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 -z-10 hidden w-40 overflow-hidden opacity-[0.05] lg:block"
    >
      {/* ROOT — circuit ladder */}
      <svg
        className="decor-root absolute left-0 top-0 h-full w-auto text-primary"
        viewBox="0 0 160 600"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 18V78H42" />
          <path d="M18 146V214H54" />
          <path d="M18 284V332H46" />
          <path d="M18 404V472H58" />
          <path d="M18 534V582H40" />
          <path d="M42 78V98H68" />
          <path d="M54 214V194H76" />
          <path d="M46 332V352H70" />
          <path d="M58 472V452H82" />
        </g>
        <g fill="currentColor">
          <circle cx="42" cy="78" r="2.8" />
          <circle cx="54" cy="214" r="2.8" />
          <circle cx="46" cy="332" r="2.8" />
          <circle cx="58" cy="472" r="2.8" />
          <circle cx="40" cy="582" r="2.8" />
        </g>
      </svg>

      {/* CANOPY — sparse branch placeholder */}
      <svg
        className="decor-canopy absolute left-0 top-0 h-full w-auto text-muted"
        viewBox="0 0 160 600"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 18C22 52 24 86 24 120C24 156 22 192 22 228C22 266 24 304 24 342C24 380 22 418 22 456C22 494 24 532 26 582" />
          <path d="M24 96C32 91 39 84 44 76C49 68 53 60 55 50" />
          <path d="M23 208C31 204 39 197 45 189C51 181 55 172 58 162" />
          <path d="M24 330C33 326 41 320 47 312C53 304 58 295 61 285" />
          <path d="M23 462C31 458 38 452 44 444C49 437 53 429 56 420" />
          <path d="M25 548C33 544 40 538 45 531C50 524 54 516 56 507" />
          <path d="M24 144C30 148 35 154 38 160" />
          <path d="M24 388C30 392 35 398 39 405" />
        </g>
        <g fill="currentColor">
          <path d="M44 76C51 70 59 69 66 72C60 78 52 80 44 76Z" />
          <path d="M58 162C65 156 73 155 80 158C74 164 66 166 58 162Z" />
          <path d="M61 285C68 279 76 278 83 281C77 287 69 289 61 285Z" />
          <path d="M56 420C63 414 71 413 78 416C72 422 64 424 56 420Z" />
          <path d="M56 507C63 501 71 500 78 503C72 509 64 511 56 507Z" />
          <path d="M38 160C31 154 29 146 31 138C38 144 41 152 38 160Z" />
          <path d="M39 405C32 399 30 391 32 383C39 389 42 397 39 405Z" />
        </g>
      </svg>
    </div>
  );
}
