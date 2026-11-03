"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { MarkdownComposer } from "@/components/community/MarkdownComposer";
import { createClient } from "@/lib/supabase/browser";

type Category = { id: string; name: string };
type ExistingPage = { id: string; slug: string; title: string; summary: string; content: string; category_id: string };

function makeSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
}

export function WikiPageForm({
  categories,
  userId,
  page,
}: {
  categories: Category[];
  userId: string;
  page?: ExistingPage;
}) {
  const router = useRouter();
  const [content, setContent] = useState(page?.content ?? "");
  const [slug, setSlug] = useState(page?.slug ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const summary = String(form.get("summary") ?? "").trim();
    const categoryId = String(form.get("category") ?? "");
    const finalSlug = makeSlug(slug || title);
    if (title.length < 3 || !finalSlug || !content.trim()) {
      setError("Add a title, a valid URL slug and page content.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy(true);
    if (page) {
      const { error: updateError } = await supabase.from("wiki_pages").update({
        title,
        slug: finalSlug,
        summary,
        category_id: categoryId,
        content: content.trim(),
        updated_by: userId,
      }).eq("id", page.id);
      if (updateError) {
        setError(updateError.message);
        setBusy(false);
        return;
      }
      router.push(`/wiki/${finalSlug}`);
    } else {
      const { error: insertError } = await supabase.from("wiki_pages").insert({
        title,
        slug: finalSlug,
        summary,
        category_id: categoryId,
        content: content.trim(),
        created_by: userId,
        updated_by: userId,
      });
      if (insertError) {
        setError(insertError.message);
        setBusy(false);
        return;
      }
      router.push(`/wiki/${finalSlug}`);
    }
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block text-sm font-medium text-mist">
        Page title
        <input name="title" defaultValue={page?.title} required minLength={3} maxLength={160} onChange={(event) => { if (!page) setSlug(makeSlug(event.target.value)); }} className="mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none placeholder:text-mist/35 focus:border-aether/60" placeholder="A clear, descriptive title" />
      </label>
      <label className="block text-sm font-medium text-mist">
        Page URL
        <span className="mt-2 flex items-center rounded-xl border border-white/10 bg-night/60 px-4 text-sm text-mist/45">
          /wiki/<input value={slug} onChange={(event) => setSlug(makeSlug(event.target.value))} required maxLength={100} className="w-full bg-transparent py-3 pl-1 text-white outline-none" placeholder="page-slug" />
        </span>
      </label>
      <label className="block text-sm font-medium text-mist">
        Category
        <select name="category" required defaultValue={page?.category_id ?? ""} className="mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none focus:border-aether/60">
          <option value="" disabled>Choose a category</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium text-mist">
        Summary
        <textarea name="summary" defaultValue={page?.summary} maxLength={500} rows={2} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none placeholder:text-mist/35 focus:border-aether/60" placeholder="A short overview to help readers find this page" />
      </label>
      <div>
        <p className="mb-2 text-sm font-medium text-mist">Article</p>
        <MarkdownComposer value={content} onChange={setContent} userId={userId} label="Wiki page content" placeholder="Write a helpful community reference in Markdown…" maxLength={100000} />
      </div>
      {error && <p role="alert" className="rounded-xl border border-ember/25 bg-ember/5 p-3 text-sm text-ember">{error}</p>}
      <button disabled={busy || categories.length === 0} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aether to-arcane px-6 font-semibold text-night transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        {busy && <LoaderCircle className="size-4 animate-spin" />}
        {page ? "Save changes" : "Publish wiki page"}
      </button>
    </form>
  );
}
