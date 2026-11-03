"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { MarkdownComposer } from "@/components/community/MarkdownComposer";
import { createClient } from "@/lib/supabase/browser";

export function ForumReplyForm({ threadId, userId, locked }: { threadId: string; userId: string; locked: boolean }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy(true);
    const { error: insertError } = await supabase.from("forum_posts").insert({
      thread_id: threadId,
      author_id: userId,
      body: body.trim(),
    });
    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }
    setBody("");
    setBusy(false);
    router.refresh();
  }

  if (locked) return <p className="rounded-xl border border-solar/20 bg-solar/5 p-4 text-sm text-solar">This discussion is locked. New replies are disabled.</p>;

  return (
    <form onSubmit={submit} className="space-y-4">
      <MarkdownComposer value={body} onChange={setBody} userId={userId} label="Write a reply" placeholder="Add something helpful to the conversation…" />
      {error && <p role="alert" className="text-sm text-ember">{error}</p>}
      <button disabled={busy || !body.trim()} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-night transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        {busy && <LoaderCircle className="size-4 animate-spin" />}
        Reply
      </button>
    </form>
  );
}
