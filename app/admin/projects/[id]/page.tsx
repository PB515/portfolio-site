import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";
import { MarkdownBodyField } from "@/components/MarkdownBodyField";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

const MAX_COVER = 5 * 1024 * 1024; // 5 MB

async function saveProject(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const isNew = !id || id === "new";
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return back(id, "Title is required.");

  const slug = slugify(String(formData.get("slug") ?? "").trim() || title);
  const status = String(formData.get("status") ?? "draft");
  const stack = String(formData.get("stack") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const payload: Record<string, unknown> = {
    title,
    slug,
    summary: String(formData.get("summary") ?? "").trim(),
    body: String(formData.get("body") ?? ""),
    category_id: String(formData.get("category_id") ?? "") || null,
    role: String(formData.get("role") ?? "").trim() || null,
    stack,
    outcome: String(formData.get("outcome") ?? "").trim() || null,
    external_url: String(formData.get("external_url") ?? "").trim() || null,
    status,
    is_featured: formData.get("is_featured") === "on",
    updated_at: new Date().toISOString(),
  };

  // Cover upload (optional)
  const cover = formData.get("cover") as File | null;
  if (cover && cover.size > 0) {
    if (!cover.type.startsWith("image/")) return back(id, "Cover must be an image.");
    if (cover.size > MAX_COVER) return back(id, "Cover must be under 5 MB.");
    const ext = (cover.name.split(".").pop() || "png").toLowerCase();
    const path = `projects/${slug}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("covers")
      .upload(path, cover, { contentType: cover.type, upsert: true });
    if (upErr) return back(id, `Cover upload failed: ${upErr.message}`);
    payload.cover_path = path;
  }

  if (status === "published") payload.published_at = new Date().toISOString();

  // Hard cap: at most 6 featured projects.
  if (payload.is_featured === true) {
    let countQ = supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("is_featured", true);
    if (!isNew) countQ = countQ.neq("id", id);
    const { count } = await countQ;
    if ((count ?? 0) >= 6) {
      return back(id, "You can feature at most 6 projects — unfeature one first.");
    }
  }

  let err;
  if (isNew) {
    ({ error: err } = await supabase.from("projects").insert(payload));
  } else {
    ({ error: err } = await supabase.from("projects").update(payload).eq("id", id));
  }
  if (err) return back(id, err.message);

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
  redirect("/admin/projects");
}

function back(id: string, message: string): never {
  redirect(`/admin/projects/${id || "new"}?error=${encodeURIComponent(message)}`);
}

async function deleteProject(formData: FormData) {
  "use server";
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id && id !== "new") {
    await supabase.from("projects").delete().eq("id", id);
    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
  }
  redirect("/admin/projects");
}

const field =
  "rounded-md border border-border bg-background/30 px-3 py-2 text-foreground outline-none focus:border-primary";

export default async function ProjectEditorPage({
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
    .eq("kind", "project")
    .order("name");

  type Project = {
    id: string; title: string; slug: string; summary: string; body: string | null;
    category_id: string | null; cover_path: string | null; role: string | null;
    stack: string[] | null; outcome: string | null; external_url: string | null; status: string;
    is_featured: boolean | null;
  };
  let p: Partial<Project> = { status: "draft", stack: [] };
  if (!isNew) {
    const { data } = await supabase.from("projects").select("*").eq("id", id).single();
    if (!data) redirect("/admin/projects");
    p = data as Project;
  }

  const coverUrl = p.cover_path
    ? supabase.storage.from("covers").getPublicUrl(p.cover_path).data.publicUrl
    : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <Link href="/admin/projects" className="text-sm text-muted hover:text-foreground">
        ← Projects
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {isNew ? "New project" : "Edit project"}
      </h1>

      {errorMsg && (
        <p role="alert" className="mt-5 rounded-md border border-error/40 px-3 py-2 text-sm text-error">
          {errorMsg}
        </p>
      )}

      <form action={saveProject} className="mt-8 flex flex-col gap-5">
        <input type="hidden" name="id" value={id} />

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Title *</span>
          <input name="title" defaultValue={p.title ?? ""} required className={field} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Slug (auto from title if blank)</span>
          <input name="slug" defaultValue={p.slug ?? ""} placeholder="my-project" className={field} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Summary (one line, shown on cards)</span>
          <input name="summary" defaultValue={p.summary ?? ""} className={field} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Body (Markdown)</span>
          <MarkdownBodyField name="body" defaultValue={p.body ?? ""} rows={12} />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Category</span>
            <select name="category_id" defaultValue={p.category_id ?? ""} className={field}>
              <option value="">— none —</option>
              {(cats ?? []).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Status</span>
            <select name="status" defaultValue={p.status ?? "draft"} className={field}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Role</span>
            <input name="role" defaultValue={p.role ?? ""} className={field} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Stack (comma-separated)</span>
            <input name="stack" defaultValue={(p.stack ?? []).join(", ")} placeholder="n8n, OpenAI" className={field} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Outcome</span>
            <input name="outcome" defaultValue={p.outcome ?? ""} className={field} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">External link</span>
            <input name="external_url" defaultValue={p.external_url ?? ""} placeholder="https://…" className={field} />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={!!p.is_featured}
            className="h-4 w-4 accent-[var(--primary)]"
          />
          <span className="text-muted">Feature on the home page</span>
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
          <Link href="/admin/projects" className="text-sm text-muted hover:text-foreground">
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && (
        <form action={deleteProject} className="mt-10 border-t border-border pt-6">
          <input type="hidden" name="id" value={id} />
          <button type="submit" className="text-sm text-muted transition-colors hover:text-error">
            Delete this project
          </button>
        </form>
      )}
    </main>
  );
}
