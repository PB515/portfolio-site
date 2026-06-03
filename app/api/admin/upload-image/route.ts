import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Admin-only: upload a body image to Storage, return its public URL so the editor
// can insert Markdown `![](url)`. Uses the logged-in session (RLS: admin write).
const MAX = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file || file.size === 0) return NextResponse.json({ error: "No file." }, { status: 400 });
  if (!file.type.startsWith("image/"))
    return NextResponse.json({ error: "Must be an image." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Image must be under 5 MB." }, { status: 400 });

  const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `body/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;

  const { error } = await supabase.storage
    .from("covers")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const url = supabase.storage.from("covers").getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ url });
}
