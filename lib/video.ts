// Turn a YouTube/Vimeo URL into its embed URL (or null if not a known video host).
// We build the embed URL from a parsed video ID — we never inject raw user HTML.
export function videoEmbedUrl(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "");

  // YouTube
  if (host === "youtu.be") {
    const id = u.pathname.slice(1);
    return /^[\w-]+$/.test(id) ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    const v = u.searchParams.get("v");
    if (v && /^[\w-]+$/.test(v)) return `https://www.youtube.com/embed/${v}`;
    const m = u.pathname.match(/\/(embed|shorts|v)\/([\w-]+)/);
    if (m) return `https://www.youtube.com/embed/${m[2]}`;
    return null;
  }

  // Vimeo
  if (host === "vimeo.com") {
    const id = u.pathname.split("/").filter(Boolean)[0];
    return /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
  }
  if (host === "player.vimeo.com") return u.href;

  return null;
}
