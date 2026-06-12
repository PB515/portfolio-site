"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const MAX = 20 * 1024 * 1024; // 20 MB

// Uploads a per-project report PDF directly browser→Storage (admin session), then
// saves the path via a server action. Direct upload avoids Vercel's ~4.5 MB
// function body limit (case-study PDFs can be large).
export function ProjectReportUploader({
  projectId,
  currentUrl,
  onSave,
  onRemove,
}: {
  projectId: string;
  currentUrl: string | null;
  onSave: (path: string) => Promise<void>;
  onRemove: () => Promise<void>;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf") return setErr("Report must be a PDF.");
    if (file.size > MAX) return setErr("PDF must be under 20 MB.");
    setBusy(true);
    setErr(null);
    try {
      const supabase = createClient();
      const path = `reports/${projectId}-${Date.now()}.pdf`;
      const { error } = await supabase.storage
        .from("covers")
        .upload(path, file, { contentType: "application/pdf", upsert: true });
      if (error) throw new Error(error.message);
      await onSave(path);
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Remove the detailed report from this project?")) return;
    setBusy(true);
    setErr(null);
    try {
      await onRemove();
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to remove.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-border bg-surface p-5">
      <p className="text-sm font-medium text-foreground">Detailed report (PDF)</p>
      <p className="mt-1 text-xs text-muted">
        Adds a &ldquo;Read the detailed report&rdquo; button to the project page (opens in a
        new tab). PDF, under 20 MB.
      </p>
      {currentUrl && (
        <p className="mt-3 text-sm">
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover"
          >
            Current report ↗
          </a>
          {" · "}
          <button
            type="button"
            onClick={remove}
            disabled={busy}
            className="text-muted transition-colors hover:text-error disabled:opacity-60"
          >
            Remove
          </button>
        </p>
      )}
      {err && <p className="mt-2 text-xs text-error">{err}</p>}
      <label className="mt-3 inline-block cursor-pointer rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-border-hover">
        {busy ? "Uploading…" : currentUrl ? "Replace report" : "Upload report"}
        <input type="file" accept="application/pdf" onChange={onPick} disabled={busy} className="hidden" />
      </label>
    </div>
  );
}
