import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

const MAX_COVER = 5 * 1024 * 1024;

function back(id: string, message: string): never {
  redirect(`/admin/field-notes/${id || "new"}?error=${encodeURIComponent(message)}`);
}

async function saveNote(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const isNew = !id || id === "new";
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return back(id, "Title is required.");
  const body = String(formData.get("body") ?? "");
  if (!body.trim()) return back(id, "Body is required.");

  const slug = String(formData.get("slug") ?? "").trim() || slugify(title);
  const status = String(formData.get("status") ?? "draft");

  const payload: Record<string, unknown> = {
    title,
    slug,
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    body,
    category_id: String(formData.get("category_id") ?? "") || null,
    status,
    is_featured: formData.get("is_featured") === "on",
    updated_at: new Date().toISOString(),
  };

  const cover = formData.get("cover") as File | null;
  if (cover && cover.size > 0) {
    if (!cover.type.startsWith("image/")) return back(id, "Cover must be an image.");
    if (cover.size > MAX_COVER) return back(id, "Cover must be under 5 MB.");
    const ext = (cover.name.split(".").pop() || "png").toLowerCase();
    const path = `notes/${slug}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("covers")
      .upload(path, cover, { contentType: cover.type, upsert: true });
    if (upErr) return back(id, `Cover upload failed: ${upErr.message}`);
    payload.cover_path = path;
  }

  if (status === "published") payload.published_at = new Date().toISOString();

  // Hard cap: at most 5 featured notes.
  if (payload.is_featured === true) {
    let countQ = supabase
      .from("field_notes")
      .select("id", { count: "exact", head: true })
      .eq("is_featured", true);
    if (!isNew) countQ = countQ.neq("id", id);
    const { count } = await countQ;
    if ((count ?? 0) >= 5) {
      return back(id, "You can feature at most 5 notes — unfeature one first.");
    }
  }

  let err;
  if (isNew) {
    ({ error: err } = await supabase.from("field_notes").insert(payload));
  } else {
    ({ error: err } = await supabase.from("field_notes").update(payload).eq("id", id));
  }
  if (err) return back(id, err.message);

  revalidatePath("/admin/field-notes");
  revalidatePath("/field-notes");
  revalidatePath(`/field-notes/${slug}`);
  redirect("/admin/field-notes");
}

async function deleteNote(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id && id !== "new") {
    await supabase.from("field_notes").delete().eq("id", id);
    revalidatePath("/admin/field-notes");
    revalidatePath("/field-notes");
  }
  redirect("/admin/field-notes");
}

const field =
  "rounded-md border border-border bg-background/30 px-3 py-2 text-foreground outline-none focus:border-primary";

export default async function NoteEditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await requireAdmin();
  const { id } = await params;
  const { error: errorMsg } = await searchParams;
  const isNew = id === "new";

  const { data: cats } = await supabase
    .from("categories")
    .select("id,name")
    .eq("kind", "field_note")
    .order("name");

  type Note = {
    id: string; title: string; slug: string; excerpt: string | null; body: string;
    category_id: string | null; cover_path: string | null; status: string;
    is_featured: boolean | null;
  };
  let n: Partial<Note> = { status: "draft" };
  if (!isNew) {
    const { data } = await supabase.from("field_notes").select("*").eq("id", id).single();
    if (!data) redirect("/admin/field-notes");
    n = data as Note;
  }

  const coverUrl = n.cover_path
    ? supabase.storage.from("covers").getPublicUrl(n.cover_path).data.publicUrl
    : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <Link href="/admin/field-notes" className="text-sm text-muted hover:text-foreground">
        ← Field Notes
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {isNew ? "New field note" : "Edit field note"}
      </h1>

      {errorMsg && (
        <p role="alert" className="mt-5 rounded-md border border-error/40 px-3 py-2 text-sm text-error">
          {errorMsg}
        </p>
      )}

      <form action={saveNote} className="mt-8 flex flex-col gap-5">
        <input type="hidden" name="id" value={id} />

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Title *</span>
          <input name="title" defaultValue={n.title ?? ""} required className={field} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Slug (auto from title if blank)</span>
          <input name="slug" defaultValue={n.slug ?? ""} placeholder="my-note" className={field} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Excerpt (short summary)</span>
          <input name="excerpt" defaultValue={n.excerpt ?? ""} className={field} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Body (Markdown) *</span>
          <textarea name="body" defaultValue={n.body ?? ""} rows={14} required className={`${field} resize-y font-mono text-sm`} />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Category</span>
            <select name="category_id" defaultValue={n.category_id ?? ""} className={field}>
              <option value="">— none —</option>
              {(cats ?? []).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Status</span>
            <select name="status" defaultValue={n.status ?? "draft"} className={field}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={!!n.is_featured}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          <span className="text-muted">Feature this note</span>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Cover image (optional)</span>
          <span className="text-xs text-muted">
            Landscape works best — about <strong className="font-medium text-foreground">1200×630px</strong> (≈1.9:1) · JPG / PNG / WebP · under 5 MB
          </span>
          {coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverUrl} alt="" className="mt-1 mb-2 h-28 w-auto rounded-md border border-border object-cover" />
          )}
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="mt-1 text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-cta file:px-4 file:py-2 file:text-sm file:font-medium file:text-on-primary hover:file:bg-cta-hover"
          />
        </label>

        <div className="mt-2 flex items-center gap-3">
          <button type="submit" className="rounded-full bg-cta px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-cta-hover">
            Save
          </button>
          <Link href="/admin/field-notes" className="text-sm text-muted hover:text-foreground">
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && (
        <form action={deleteNote} className="mt-10 border-t border-border pt-6">
          <input type="hidden" name="id" value={id} />
          <button type="submit" className="text-sm text-muted transition-colors hover:text-error">
            Delete this note
          </button>
        </form>
      )}
    </main>
  );
}
