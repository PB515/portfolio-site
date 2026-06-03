import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders Markdown (with GFM: tables, lists, links) using theme tokens.
// Safe by default: react-markdown does not render raw HTML unless explicitly enabled.
const components: Components = {
  h1: ({ node, ...p }) => <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground" {...p} />,
  h2: ({ node, ...p }) => <h2 className="mt-8 text-xl font-semibold tracking-tight text-foreground" {...p} />,
  h3: ({ node, ...p }) => <h3 className="mt-6 text-lg font-semibold text-foreground" {...p} />,
  p: ({ node, ...p }) => <p className="text-muted" {...p} />,
  a: ({ node, ...p }) => (
    <a className="text-primary underline underline-offset-2 hover:text-primary-hover" target="_blank" rel="noopener noreferrer" {...p} />
  ),
  ul: ({ node, ...p }) => <ul className="list-disc space-y-1 pl-6 text-muted" {...p} />,
  ol: ({ node, ...p }) => <ol className="list-decimal space-y-1 pl-6 text-muted" {...p} />,
  blockquote: ({ node, ...p }) => <blockquote className="border-l-2 border-primary pl-4 italic text-muted" {...p} />,
  code: ({ node, ...p }) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-foreground" {...p} />,
  hr: () => <hr className="border-border" />,
  img: ({ node, ...p }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="rounded-lg border border-border" {...p} />
  ),
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-4 leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
