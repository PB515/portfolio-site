"use client";

import { useRef, useState, type ReactNode } from "react";

// Styled fenced code block with a copy button. Used as the `pre` renderer in
// Markdown.tsx. Theme-aware via tokens; horizontal scroll for long lines.
export function CodeBlock({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-border bg-surface-solid">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 z-10 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted opacity-0 transition-colors hover:text-foreground focus:opacity-100 group-hover:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        ref={ref}
        className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground"
      >
        {children}
      </pre>
    </div>
  );
}
