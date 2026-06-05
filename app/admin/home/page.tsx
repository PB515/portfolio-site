import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { HomeImageUploader } from "@/components/HomeImageUploader";

export const metadata = { title: "Home Image" };

const KEY = "home_story";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

// Metadata-only server action — the file itself is uploaded browser→Storage
// directly (see HomeImageUploader), so this payload is tiny (no Vercel body limit).
async function saveHomeImage(path: string, alt: string) {
  "use server";
  const supabase = await requireAdmin();
  const { error } = await supabase.from("site_images").upsert({
    key: KEY,
    file_path: path,
    alt: alt || "Purven Bhavsar",
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/home");
  revalidatePath("/");
}

export default async function AdminHomeImagePage() {
  const supabase = await requireAdmin();

  const { data: current } = await supabase
    .from("site_images")
    .select("file_path,alt,updated_at")
    .eq("key", KEY)
    .maybeSingle();

  const currentUrl = current?.file_path
    ? supabase.storage.from("covers").getPublicUrl(current.file_path).data.publicUrl
    : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Home Image</h1>
      <p className="mt-2 text-sm text-muted">
        The photo beside the &ldquo;How I got here&rdquo; story on the home page. Updates
        live — no deploy. Until one is uploaded, the home page shows a clean branded panel.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Current</p>
        {currentUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUrl}
              alt={current?.alt ?? ""}
              className="mt-3 aspect-[3/2] w-full rounded-lg border border-border object-cover"
            />
            <p className="mt-2 text-xs text-muted">
              updated {current?.updated_at ? new Date(current.updated_at).toLocaleString() : ""}
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted">No home image uploaded yet.</p>
        )}
      </div>

      <HomeImageUploader currentAlt={current?.alt ?? ""} onSave={saveHomeImage} />
    </main>
  );
}
