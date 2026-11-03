"use client";

import { useEffect, useState } from "react";
import { Flag, Heart, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { TransitionLink } from "@/components/layout/TransitionLink";

export function ForumActions({ postId, userId, initialCount }: { postId: string; userId: string | null; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loadingReaction, setLoadingReaction] = useState(!!userId);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    if (!supabase) {
      void Promise.resolve().then(() => {
        setMessage("The community service is not configured.");
        setLoadingReaction(false);
      });
      return;
    }
    let active = true;
    void supabase.from("post_reactions").select("post_id").eq("post_id", postId).eq("user_id", userId).eq("reaction", "like").maybeSingle().then(({ data, error }) => {
      if (!active) return;
      if (error) setMessage(error.message);
      else setLiked(!!data);
      setLoadingReaction(false);
    });
    return () => { active = false; };
  }, [postId, userId]);

  async function toggleLike() {
    setMessage("");
    if (!userId) {
      setMessage("Sign in to react to posts.");
      return;
    }
    const supabase = createClient();
    if (!supabase) return;
    setBusy(true);
    if (liked) {
      const { error } = await supabase.from("post_reactions").delete().eq("post_id", postId).eq("user_id", userId).eq("reaction", "like");
      if (error) setMessage(error.message);
      else { setLiked(false); setCount((current) => Math.max(0, current - 1)); }
    } else {
      const { error } = await supabase.from("post_reactions").insert({ post_id: postId, user_id: userId, reaction: "like" });
      if (error) setMessage(error.message);
      else { setLiked(true); setCount((current) => current + 1); }
    }
    setBusy(false);
  }

  async function report() {
    setMessage("");
    if (!userId) {
      setMessage("Sign in to report a post.");
      return;
    }
    const reason = window.prompt("Briefly describe why this post should be reviewed:");
    if (!reason) return;
    if (reason.trim().length < 8) {
      setMessage("Please provide at least 8 characters so moderators can understand the report.");
      return;
    }
    const supabase = createClient();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("content_reports").insert({ reporter_id: userId, target_type: "post", target_id: postId, reason: reason.trim() });
    setMessage(error ? error.message : "Report sent to the moderation team.");
    setBusy(false);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => void toggleLike()} disabled={busy || (!!userId && loadingReaction)} aria-pressed={liked} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${liked ? "border-blush/30 bg-blush/10 text-blush" : "border-white/10 text-mist/65 hover:border-white/20 hover:text-white"}`}>
        {busy ? <LoaderCircle className="size-3.5 animate-spin" /> : <Heart className={`size-3.5 ${liked ? "fill-current" : ""}`} />}
        {count}
      </button>
      <button type="button" onClick={() => void report()} disabled={busy} className="inline-flex items-center gap-1.5 text-xs text-mist/45 transition-colors hover:text-ember disabled:opacity-50">
        <Flag className="size-3.5" /> Report
      </button>
      {!userId && <TransitionLink href="/login" className="text-xs text-aether hover:text-white">Sign in</TransitionLink>}
      {message && <span role="status" className="w-full text-xs text-mist/70">{message}</span>}
    </div>
  );
}
