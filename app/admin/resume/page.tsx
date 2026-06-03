import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

const MAX_PDF = 10 * 1024 * 1024; // 10 MB

function back(message: string): never {
  redirect(`/admin/resume?error=${encodeURIComponent(message)}`);
}

async function uploadResume(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return back("Choose a PDF to upload.");
  if (file.type !== "application/pdf") return back("Résumé must be a PDF.");
  if (file.size > MAX_PDF) return back("PDF must be under 10 MB.");

  const path = `cv-${Date.now()}.pdf`;
  const { error: upErr } = await supabase.storage
    .from("resume")
    .upload(path, file, { contentType: "application/pdf", upsert: true });
  if (upErr) return back(`Upload failed: ${upErr.message}`);

  // Make this the current résumé (unset previous, then insert).
  await supabase.from("resume").update({ is_current: false }).eq("is_current", true);
  const { error: insErr } = await supabase
    .from("resume")
    .insert({ file_path: path, original_name: file.name, is_current: true });
  if (insErr) return back(insErr.message);

  revalidatePath("/admin/resume");
  redirect("/admin/resume");
}

export default async function AdminResumePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await requireAdmin();
  const { error: errorMsg } = await searchParams;

  const { data: current } = await supabase
    .from("resume")
    .select("file_path,original_name,uploaded_at")
    .eq("is_current", true)
    .maybeSingle();

  const currentUrl = current?.file_path
    ? supabase.storage.from("resume").getPublicUrl(current.file_path).data.publicUrl
    : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Résumé</h1>
      <p className="mt-2 text-sm text-muted">
        Upload a PDF. The public résumé link updates automatically to the latest one.
      </p>

      {errorMsg && (
        <p role="alert" className="mt-5 rounded-md border border-error/40 px-3 py-2 text-sm text-error">
          {errorMsg}
        </p>
      )}

      <div className="mt-8 rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Current
        </p>
        {currentUrl ? (
          <p className="mt-3 text-sm">
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover">
              {current?.original_name ?? "résumé.pdf"}
            </a>{" "}
            <span className="text-muted">
              · uploaded {current?.uploaded_at ? new Date(current.uploaded_at).toLocaleDateString() : ""}
            </span>
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">No résumé uploaded yet.</p>
        )}
      </div>

      <form action={uploadResume} className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Upload new résumé — PDF, under 10 MB</span>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            required
            className="mt-1 text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-on-primary hover:file:bg-primary-hover"
          />
        </label>
        <button type="submit" className="self-start rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover">
          Upload &amp; set as current
        </button>
      </form>
    </main>
  );
}
