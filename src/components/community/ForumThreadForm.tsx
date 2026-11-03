"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { MarkdownComposer } from "@/components/community/MarkdownComposer";
import { createClient } from "@/lib/supabase/browser";

type Category = { id: string; name: string };

export function ForumThreadForm({
  categories,
  userId,
  wikiPageId,
}: {
  categories: Category[];
  userId: string;
  wikiPageId?: string;
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const categoryId = String(form.get("category") ?? "");
    if (title.length < 5 || body.trim().length < 1) {
      setError("Add a title and some details before posting.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy(true);
    const { data, error: insertError } = await supabase
      .from("forum_threads")
      .insert({
        title,
        body: body.trim(),
        category_id: categoryId,
        author_id: userId,
        wiki_page_id: wikiPageId ?? null,
      })
      .select("id")
      .single();
    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }
    router.push(`/forum/${data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {wikiPageId && <input type="hidden" name="wiki_page_id" value={wikiPageId} />}
      <label className="block text-sm font-medium text-mist">
        Category
        <select name="category" required defaultValue="" className="mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none focus:border-aether/60">
          <option value="" disabled>Choose a category</option>
          {categories.filter((category) => category.name !== "Announcements").map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium text-mist">
        Title
        <input name="title" required minLength={5} maxLength={180} className="mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none placeholder:text-mist/35 focus:border-aether/60" placeholder="What would you like to discuss?" />
      </label>
      <div>
        <p className="mb-2 text-sm font-medium text-mist">Details</p>
        <MarkdownComposer value={body} onChange={setBody} userId={userId} placeholder="Share context, ideas, or a question…" />
      </div>
      {error && <p role="alert" className="rounded-xl border border-ember/25 bg-ember/5 p-3 text-sm text-ember">{error}</p>}
      <button disabled={busy || categories.length === 0} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aether to-arcane px-6 font-semibold text-night transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        {busy && <LoaderCircle className="size-4 animate-spin" />}
        Publish discussion
      </button>
    </form>
  );
}
