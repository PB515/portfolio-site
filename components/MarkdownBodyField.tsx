"use client";

import { useRef, useState } from "react";
import { Markdown } from "./Markdown";

const FIELD =
  "w-full resize-y rounded-md border border-border bg-background/30 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-primary";

const tab = (active: boolean) =>
  `rounded px-3 py-1 transition-colors ${
    active ? "bg-cta text-on-primary" : "text-muted hover:text-foreground"
  }`;

const KBD = "rounded bg-background/40 px-1 font-mono text-foreground";

// Markdown body textarea + "Upload image" + a live Write/Preview toggle.
// Preview renders with the SAME <Markdown> used on the published page (images,
// highlighted code, embedded video). Submits via the form (name="body").
export function MarkdownBodyField({
  name,
  defaultValue = "",
  rows = 12,
  required = false,
}: {
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function insertAtCursor(snippet: string) {
    const el = ref.current;
    if (!el) {
      setValue((v) => v + snippet);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = value.slice(0, start) + snippet + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    });
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed.");
      const alt = file.name.replace(/\.[^.]+$/, "");
      insertAtCursor(`\n\n![${alt}](${json.url})\n\n`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-md border border-border p-0.5 text-xs font-medium">
          <button type="button" onClick={() => setMode("write")} className={tab(mode === "write")}>
            Write
          </button>
          <button type="button" onClick={() => setMode("preview")} className={tab(mode === "preview")}>
            Preview
          </button>
        </div>
        {mode === "write" && (
          <label className="cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border-hover">
            {busy ? "Uploading…" : "Upload image"}
            <input type="file" accept="image/*" onChange={onPick} disabled={busy} className="hidden" />
          </label>
        )}
        <span className="text-xs text-muted">
          YouTube/Vimeo link on its own line embeds · ```lang for code
        </span>
      </div>

      <details className="mb-3 rounded-md border border-border bg-surface/50 text-xs">
        <summary className="cursor-pointer select-none px-3 py-2 text-muted transition-colors hover:text-foreground">
          Formatting help
        </summary>
        <div className="space-y-2 border-t border-border px-3 py-3 text-muted">
          <p>
            <code className={KBD}>{"```js … ```"}</code> — code block. Use the{" "}
            <span className="text-foreground">backtick key</span> (top-left, below Esc); the
            language (<code className={KBD}>js</code>, <code className={KBD}>python</code>,
            <code className={KBD}>sql</code>…) turns on colors. Leave a blank line before it.
          </p>
          <p>
            <code className={KBD}>{"`code`"}</code> — inline code ·{" "}
            <code className={KBD}>{"![alt](url)"}</code> — image (or use “Upload image” above)
          </p>
          <p>
            Paste a{" "}
            <span className="text-foreground">YouTube/Vimeo link on its own line</span> (blank
            line above &amp; below) → embedded player.
          </p>
          <p>
            <code className={KBD}>{"# Heading"}</code> ·{" "}
            <code className={KBD}>{"**bold**"}</code> ·{" "}
            <code className={KBD}>{"*italic*"}</code> ·{" "}
            <code className={KBD}>{"- list"}</code> ·{" "}
            <code className={KBD}>{"1. numbered"}</code> ·{" "}
            <code className={KBD}>{"[text](url)"}</code> ·{" "}
            <code className={KBD}>{"> quote"}</code>
          </p>
          <p className="text-foreground">Tip: write here, then hit Preview to check before publishing.</p>
        </div>
      </details>

      {err && <p className="mb-2 text-xs text-error">{err}</p>}

      {/* Textarea stays mounted (hidden in preview) so it always submits with the form. */}
      <textarea
        ref={ref}
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={mode === "preview" ? "hidden" : FIELD}
      />

      {mode === "preview" && (
        <div className="min-h-[12rem] rounded-md border border-border bg-surface p-4">
          {value.trim() ? (
            <Markdown>{value}</Markdown>
          ) : (
            <p className="text-sm text-muted">Nothing to preview yet — write something in the Write tab.</p>
          )}
        </div>
      )}
    </div>
  );
}
