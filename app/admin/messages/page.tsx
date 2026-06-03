import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { MessageList, type Lead } from "@/components/MessageList";

export const metadata = { title: "Messages" };

async function deleteLead(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  if (id) {
    await supabase.from("leads").delete().eq("id", id);
    revalidatePath("/admin/messages");
  }
}

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
        <MessageList leads={leads} deleteAction={deleteLead} />
      )}
    </main>
  );
}
