"use client";

import { useEffect, useState } from "react";

type Perspective = "root" | "canopy";

// The brand "Perspective" switch — Root 🌱 (Builder) / Canopy 🌿 (Thinking).
// NOT a dark/light toggle. Writes data-theme + persists to localStorage.
export function PerspectiveToggle() {
  const [theme, setTheme] = useState<Perspective>("root");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Perspective) ||
      "root";
    setTheme(current);
  }, []);

  function choose(next: Perspective) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("perspective", next);
    } catch {
      /* private mode — fine, just won't persist */
    }
    setTheme(next);
  }

  const base =
    "rounded-full px-3 py-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div
      role="group"
      aria-label="Perspective"
      className="inline-flex items-center rounded-full border border-border p-0.5 text-xs font-medium"
    >
      <button
        type="button"
        aria-pressed={theme === "root"}
        onClick={() => choose("root")}
        className={`${base} ${theme === "root" ? "bg-primary text-on-primary" : "text-muted hover:text-foreground"}`}
      >
        🌱 Root
      </button>
      <button
        type="button"
        aria-pressed={theme === "canopy"}
        onClick={() => choose("canopy")}
        className={`${base} ${theme === "canopy" ? "bg-primary text-on-primary" : "text-muted hover:text-foreground"}`}
      >
        🌿 Canopy
      </button>
    </div>
  );
}
