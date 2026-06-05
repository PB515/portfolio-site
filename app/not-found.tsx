import Link from "next/link";
import { Motif } from "@/components/Motif";

export default function NotFound() {
  return (
    <main className="relative isolate mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center overflow-hidden px-6 py-24">
      <Motif className="right-[-2rem] top-1/2 -z-10 h-80 w-auto -translate-y-1/2 opacity-[0.18]" />
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
