// Background motif — the uploaded full-bleed art, one per perspective (docs/04a §9).
// decor-root.png (circuit/roots) shows in Root; decor-canopy.png (leaves) in Canopy.
// Fixed + cover, behind all content. Show/hide per [data-theme] in globals.css.
export function SiteDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      <div
        className="decor-root absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/ui/decor-root.png)" }}
      />
      <div
        className="decor-canopy absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/ui/decor-canopy.png)" }}
      />
    </div>
  );
}
