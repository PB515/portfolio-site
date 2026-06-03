import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Messages" };

type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // RLS allows only the authenticated admin to read leads.
  const { data } = await supabase
    .from("leads")
    .select("id,name,email,message,created_at")
    .order("created_at", { ascending: false });
  const leads = (data ?? []) as Lead[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
      <p className="mt-2 text-sm text-muted">Contact-form submissions.</p>

      {leads.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          No messages yet.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {leads.map((l) => (
            <li key={l.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-foreground">{l.name}</span>
                <span className="text-xs text-muted">
                  {new Date(l.created_at).toLocaleString()}
                </span>
              </div>
              <a
                href={`mailto:${l.email}`}
                className="text-sm text-primary hover:text-primary-hover"
              >
                {l.email}
              </a>
              <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">
                {l.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
