"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const MAX = 10 * 1024 * 1024; // 10 MB (Storage handles it; no Vercel function limit)

// Uploads the file DIRECTLY from the browser to Supabase Storage (using the admin
// session), then calls a tiny server action to save just the path. This avoids
// Vercel's ~4.5 MB serverless request-body limit that breaks server-side uploads.
export function HomeImageUploader({
  currentAlt,
  onSave,
}: {
  currentAlt: string;
  onSave: (path: string, alt: string) => Promise<void>;
}) {
  const router = useRouter();
  const [alt, setAlt] = useState(currentAlt);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("file") as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) return setErr("Choose an image to upload.");
    if (!file.type.startsWith("image/")) return setErr("File must be an image.");
    if (file.size > MAX) return setErr("Image must be under 10 MB.");

    setBusy(true);
    setErr(null);
    setOk(false);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `site/home-story-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("covers")
        .upload(path, file, { contentType: file.type, upsert: true });
      if (upErr) throw new Error(upErr.message);
      await onSave(path, alt.trim());
      setOk(true);
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
      {err && <p role="alert" className="text-sm text-error">{err}</p>}
      {ok && <p className="text-sm text-success">Saved — it&apos;s live on the home page.</p>}

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Upload image</span>
        <span className="text-xs text-muted">
          Landscape <strong className="font-medium text-foreground">3:2</strong> — about{" "}
          <strong className="font-medium text-foreground">1600×1067px</strong> (min 1200×800) ·
          JPG / PNG / WebP · under 10 MB. A candid &ldquo;builder at work&rdquo; shot fits best.
        </span>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          disabled={busy}
          className="mt-1 text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-cta file:px-4 file:py-2 file:text-sm file:font-medium file:text-on-primary hover:file:bg-cta-hover"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Alt text (accessibility / SEO)</span>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Purven Bhavsar working at his desk"
          className="rounded-md border border-border bg-background/30 px-3 py-2 text-foreground outline-none focus:border-primary"
        />
      </label>

      <button
        type="submit"
        disabled={busy}
        className="self-start rounded-full bg-cta px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover disabled:opacity-60"
      >
        {busy ? "Uploading…" : "Upload & set as home image"}
      </button>
    </form>
  );
}
