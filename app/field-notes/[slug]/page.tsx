export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Field Note</h1>
      <p className="mt-4 font-mono text-sm text-muted">slug: {slug}</p>
      <p className="mt-4 text-muted">
        Phase 0 placeholder — one published note from the DB (Phase 4).
      </p>
    </main>
  );
}
