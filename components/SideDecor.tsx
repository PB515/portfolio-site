// Fixed gutter decoration — fills the empty left/right margins on large screens
// only (lg+). The strip width is computed from the content column (64rem) so the
// art lives in the TRUE gutter and never sits behind text. Theme-aware (Root =
// circuit vine, Canopy = branch vine), recolored via tokens, static, behind all
// content (-z-10). Mobile/tablet-narrow: no gutter → nothing shows.

function RootVine({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 600"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 592C14 570 20 550 30 530C40 509 46 487 46 458C46 428 40 402 34 374C27 340 28 307 36 277C45 245 55 214 54 176C53 136 40 98 31 64C25 42 22 24 22 10" />
        <path d="M24 590C30 567 39 544 52 521C64 499 70 473 68 444C66 412 55 384 51 353C47 319 52 285 64 252C73 225 81 196 80 164C79 131 69 101 62 76" />
        <path d="M0 540C11 532 20 523 28 512" />
        <path d="M0 468C13 458 24 447 33 432C39 422 42 411 43 400" />
        <path d="M18 306C10 291 7 274 8 256C9 239 15 223 24 210" />
        <path d="M51 356C58 344 66 333 78 324" />
        <path d="M30 520H58V500" />
        <path d="M37 430H70" />
        <path d="M52 346H78V328" />
        <path d="M62 252H88" />
        <path d="M74 178H100V160" />
        <path d="M27 104H58V86" />
      </g>
      <g fill="currentColor">
        <circle cx="28" cy="512" r="2.8" />
        <circle cx="43" cy="400" r="2.8" />
        <circle cx="24" cy="210" r="2.8" />
        <circle cx="78" cy="324" r="2.8" />
        <circle cx="58" cy="500" r="2.8" />
        <circle cx="70" cy="430" r="2.8" />
        <circle cx="78" cy="328" r="2.8" />
        <circle cx="88" cy="252" r="2.8" />
        <circle cx="100" cy="160" r="2.8" />
        <circle cx="58" cy="86" r="2.8" />
      </g>
    </svg>
  );
}

function CanopyVine({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 600"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 592C20 565 24 536 32 507C40 477 49 448 52 414C56 376 52 340 46 303C40 266 39 230 45 195C52 156 64 122 70 86C74 61 75 35 73 10" />
        <path d="M33 520C43 503 54 486 68 472C79 461 89 450 96 436" />
        <path d="M29 438C39 426 48 413 55 398C62 383 66 367 68 350" />
        <path d="M40 339C49 328 59 318 72 310C83 303 92 293 98 281" />
        <path d="M47 244C57 232 67 220 74 206C80 194 83 181 85 168" />
        <path d="M58 154C66 145 75 137 86 131" />
        <path d="M24 566C30 553 38 541 48 531" />
        <path d="M66 471C63 459 60 450 55 441" />
        <path d="M61 304C59 292 55 282 49 273" />
        <path d="M78 208C76 197 73 188 68 179" />
      </g>
      <g fill="currentColor">
        <path d="M96 436C101 428 108 425 115 427C111 434 104 439 96 436Z" />
        <path d="M72 472C79 465 87 463 95 466C89 472 81 475 72 472Z" />
        <path d="M55 398C61 390 68 387 76 389C71 396 64 400 55 398Z" />
        <path d="M72 310C79 303 87 301 95 304C89 310 81 313 72 310Z" />
        <path d="M74 206C81 198 89 196 97 199C91 206 83 209 74 206Z" />
        <path d="M86 131C93 124 101 122 109 125C103 131 95 134 86 131Z" />
        <path d="M48 531C41 523 39 515 41 507C48 512 51 520 48 531Z" />
        <path d="M55 441C48 434 45 426 46 418C53 423 57 431 55 441Z" />
        <path d="M49 273C42 266 39 258 40 250C47 255 51 263 49 273Z" />
        <path d="M68 179C61 172 58 164 59 156C66 161 70 169 68 179Z" />
      </g>
    </svg>
  );
}

export function SideDecor() {
  const gutter = "w-[max(0px,calc((100vw-64rem)/2))]";
  const root = "decor-root absolute top-0 h-full w-auto text-primary opacity-[0.22]";
  const canopy = "decor-canopy absolute top-0 h-full w-auto text-muted opacity-[0.18]";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block"
    >
      {/* Left gutter */}
      <div className={`absolute inset-y-0 left-0 overflow-hidden ${gutter}`}>
        <RootVine className={`${root} left-0`} />
        <CanopyVine className={`${canopy} left-0`} />
      </div>
      {/* Right gutter — mirrored */}
      <div className={`absolute inset-y-0 right-0 -scale-x-100 overflow-hidden ${gutter}`}>
        <RootVine className={`${root} left-0`} />
        <CanopyVine className={`${canopy} left-0`} />
      </div>
    </div>
  );
}
