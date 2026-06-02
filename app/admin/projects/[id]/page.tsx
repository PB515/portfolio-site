export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">
        Admin · Edit project
      </h1>
      <p className="mt-4 font-mono text-sm text-muted">id: {id}</p>
      <p className="mt-4 text-muted">
        Phase 0 placeholder — editor (rich-text/Markdown, cover upload,
        category, draft/published) in Phase 3.
      </p>
    </main>
  );
}
