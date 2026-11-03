"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export function WikiRevisionActions({
  pageId,
  revision,
  userId,
  disabled,
}: {
  pageId: string;
  revision: { version: number; title: string; summary: string; category_id: string; content: string };
  userId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function rollback() {
    if (!window.confirm(`Restore version ${revision.version}? This will create a new revision containing its contents.`)) return;
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy(true);
    setError("");
    const { error: updateError } = await supabase.from("wiki_pages").update({
      title: revision.title,
      summary: revision.summary,
      category_id: revision.category_id,
      content: revision.content,
      updated_by: userId,
    }).eq("id", pageId);
    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }
    router.push("/wiki");
    router.refresh();
  }

  return (
    <div>
      <button type="button" onClick={() => void rollback()} disabled={disabled || busy} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-mist/70 transition-colors hover:border-aether/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
        <RotateCcw className="size-3.5" /> {busy ? "Restoring…" : "Restore"}
      </button>
      {error && <p role="alert" className="mt-2 text-xs text-ember">{error}</p>}
    </div>
  );
}
