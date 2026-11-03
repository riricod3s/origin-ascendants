"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export function MessageComposer({ senderId, recipientId, recipientName }: { senderId: string; recipientId: string; recipientName: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const subject = String(form.get("subject") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy(true);
    const { error: insertError } = await supabase.from("private_messages").insert({
      sender_id: senderId,
      recipient_id: recipientId,
      subject,
      body,
    });
    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }
    router.push("/messages");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <p className="text-sm text-mist/65">To <span className="font-semibold text-white">{recipientName}</span></p>
      <label className="block text-sm font-medium text-mist">Subject<input name="subject" required minLength={1} maxLength={160} className="mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none focus:border-aether/60" /></label>
      <label className="block text-sm font-medium text-mist">Message<textarea name="body" required minLength={1} maxLength={10000} rows={8} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none focus:border-aether/60" placeholder="Write a respectful private message…" /></label>
      {error && <p role="alert" className="rounded-xl border border-ember/25 bg-ember/5 p-3 text-sm text-ember">{error}</p>}
      <button disabled={busy} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-night transition-opacity hover:opacity-90 disabled:opacity-50">{busy && <LoaderCircle className="size-4 animate-spin" />}Send message</button>
    </form>
  );
}
