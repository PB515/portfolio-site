import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Home Image" };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

const MAX = 5 * 1024 * 1024; // 5 MB
const KEY = "home_story";

function back(message: string): never {
  redirect(`/admin/home?error=${encodeURIComponent(message)}`);
}

async function uploadStoryImage(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return back("Choose an image to upload.");
  if (!file.type.startsWith("image/")) return back("File must be an image.");
  if (file.size > MAX) return back("Image must be under 5 MB.");

  const alt = String(formData.get("alt") ?? "").trim() || "Purven Bhavsar";
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `site/home-story-${Date.now()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("covers")
    .upload(path, file, { contentType: file.type, upsert: true });
  if (upErr) return back(`Upload failed: ${upErr.message}`);

  const { error } = await supabase
    .from("site_images")
    .upsert({ key: KEY, file_path: path, alt, updated_at: new Date().toISOString() });
  if (error) return back(error.message);

  revalidatePath("/admin/home");
  revalidatePath("/");
  redirect("/admin/home");
}

export default async function AdminHomeImagePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await requireAdmin();
  const { error: errorMsg } = await searchParams;

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

      {errorMsg && (
        <p role="alert" className="mt-5 rounded-md border border-error/40 px-3 py-2 text-sm text-error">
          {errorMsg}
        </p>
      )}

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

      <form action={uploadStoryImage} className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Upload image</span>
          <span className="text-xs text-muted">
            Landscape <strong className="font-medium text-foreground">3:2</strong> — about{" "}
            <strong className="font-medium text-foreground">1600×1067px</strong> (min 1200×800) ·
            JPG / PNG / WebP · under 5 MB. A candid &ldquo;builder at work&rdquo; shot fits best.
          </span>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="mt-1 text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-cta file:px-4 file:py-2 file:text-sm file:font-medium file:text-on-primary hover:file:bg-cta-hover"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Alt text (for accessibility / SEO)</span>
          <input
            type="text"
            name="alt"
            defaultValue={current?.alt ?? ""}
            placeholder="Purven Bhavsar working at his desk"
            className="rounded-md border border-border bg-background/30 px-3 py-2 text-foreground outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          className="self-start rounded-full bg-cta px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover"
        >
          Upload &amp; set as home image
        </button>
      </form>
    </main>
  );
}
