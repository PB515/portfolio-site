import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

const RATE_MAX = 3; // max submissions…
const RATE_WINDOW_S = 600; // …per 10 minutes per IP

function hashIp(ip: string) {
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "salt";
  return crypto.createHash("sha256").update(ip + salt).digest("hex");
}

export async function POST(request: Request) {
  let data: unknown = null;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const b = (data ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill the hidden "company" field. Pretend success, drop silently.
  if (b.company) return NextResponse.json({ ok: true });

  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const message = String(b.message ?? "").trim();

  if (!name || !email || !message)
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (name.length > 120 || email.length > 200 || message.length > 5000)
    return NextResponse.json({ error: "That's a bit too long." }, { status: 400 });

  const ip =
    (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ipHash = hashIp(ip);

  const supabase = createAdminClient();

  // Rate limit (DB-based → works across serverless instances).
  const since = new Date(Date.now() - RATE_WINDOW_S * 1000).toISOString();
  const { count } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if ((count ?? 0) >= RATE_MAX)
    return NextResponse.json(
      { error: "Too many messages — please try again later." },
      { status: 429 },
    );

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    message,
    source: "contact",
    ip_hash: ipHash,
    consent_at: new Date().toISOString(),
  });
  if (error)
    return NextResponse.json(
      { error: "Something went wrong — please email me directly." },
      { status: 500 },
    );

  return NextResponse.json({ ok: true });
}
