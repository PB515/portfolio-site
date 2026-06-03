"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

// Scroll-reveal wrapper: adds `.is-visible` when the element enters the viewport,
// driving the CSS fade-up in globals.css. Reveals once, then disconnects.
// `delay` (ms) staggers siblings. Reduced-motion users never see the hidden state
// (the .reveal rules are gated behind prefers-reduced-motion: no-preference).
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
