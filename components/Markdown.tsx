import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "./CodeBlock";
import { videoEmbedUrl } from "@/lib/video";

// Renders Markdown (with GFM: tables, lists, links) using theme tokens.
// Safe by default: react-markdown does not render raw HTML unless explicitly enabled.
// Extras: fenced code → styled CodeBlock w/ copy; a lone YouTube/Vimeo URL → embed.
const components: Components = {
  h1: ({ node, ...p }) => <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground" {...p} />,
  h2: ({ node, ...p }) => <h2 className="mt-8 text-xl font-semibold tracking-tight text-foreground" {...p} />,
  h3: ({ node, ...p }) => <h3 className="mt-6 text-lg font-semibold text-foreground" {...p} />,
  p: ({ node, children, ...p }) => {
    // If the paragraph is just a single YouTube/Vimeo link/URL, embed it.
    const only =
      node?.children && node.children.length === 1 ? node.children[0] : null;
    let url: string | null = null;
    if (only) {
      if (only.type === "element" && only.tagName === "a" && typeof only.properties?.href === "string") {
        url = only.properties.href;
      } else if (only.type === "text") {
        url = only.value;
      }
    }
    const embed = url ? videoEmbedUrl(url) : null;
    if (embed) {
      return (
        <span className="my-4 block aspect-video w-full overflow-hidden rounded-lg border border-border">
          <iframe
            src={embed}
            title="Embedded video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </span>
      );
    }
    return <p className="text-muted" {...p}>{children}</p>;
  },
  a: ({ node, ...p }) => (
    <a className="text-primary underline underline-offset-2 hover:text-primary-hover" target="_blank" rel="noopener noreferrer" {...p} />
  ),
  ul: ({ node, ...p }) => <ul className="list-disc space-y-1 pl-6 text-muted" {...p} />,
  ol: ({ node, ...p }) => <ol className="list-decimal space-y-1 pl-6 text-muted" {...p} />,
  blockquote: ({ node, ...p }) => <blockquote className="border-l-2 border-primary pl-4 italic text-muted" {...p} />,
  pre: ({ node, children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ node, className, children, ...p }) => {
    const text = String(children ?? "");
    const isBlock = (className?.includes("language-") ?? false) || text.includes("\n");
    if (isBlock) {
      return (
        <code className={`font-mono ${className ?? ""}`} {...p}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-foreground" {...p}>
        {children}
      </code>
    );
  },
  hr: () => <hr className="border-border" />,
  img: ({ node, ...p }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="my-4 rounded-lg border border-border" {...p} />
  ),
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-4 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
