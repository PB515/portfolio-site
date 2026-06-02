import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <Link href="/" className="mt-6 text-primary hover:text-primary-hover">
        ← Back home
      </Link>
    </main>
  );
}
