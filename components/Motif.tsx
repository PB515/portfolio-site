// Decorative copper circuit-tree watermark — adds faint brand depth BEHIND
// content (great behind the transparent cut-out photos). Non-interactive and
// aria-hidden. Place inside a parent that has `relative isolate overflow-hidden`;
// give the Motif a negative z (e.g. -z-10) so it sits above the parent's
// background but below the real content. Caller controls size/position/opacity.
export function Motif({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-mark.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute select-none ${className}`}
    />
  );
}
