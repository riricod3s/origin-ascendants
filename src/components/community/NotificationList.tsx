"use client";

import { useState } from "react";
import { Bell, Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { TransitionLink } from "@/components/layout/TransitionLink";

type Notice = { id: string; kind: string; title: string; body: string; href: string | null; read_at: string | null; created_at: string };

export function NotificationList({ notifications }: { notifications: Notice[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  async function markRead(id: string) {
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusyId(id);
    setError("");
    const { error: updateError } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    if (updateError) setError(updateError.message);
    else router.refresh();
    setBusyId("");
  }

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-ember">{error}</p>}
      {notifications.length ? (
        <ul className="space-y-3">
          {notifications.map((notice) => (
            <li key={notice.id} className={`rounded-2xl border p-5 ${notice.read_at ? "border-white/8 bg-white/[0.02]" : "border-aether/20 bg-aether/[0.045]"}`}>
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-aether/10 text-aether"><Bell className="size-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{notice.title}</p>
                  {notice.body && <p className="mt-1 text-sm leading-relaxed text-mist/70">{notice.body}</p>}
                  <p className="mt-2 text-xs text-mist/40">{new Date(notice.created_at).toLocaleString()}</p>
                  {notice.href && <TransitionLink href={notice.href} className="mt-3 inline-flex text-xs font-semibold text-aether hover:text-white">View activity →</TransitionLink>}
                </div>
                {!notice.read_at && <button type="button" onClick={() => void markRead(notice.id)} disabled={busyId === notice.id} aria-label="Mark as read" className="rounded-lg p-2 text-mist/50 transition-colors hover:bg-white/8 hover:text-white disabled:opacity-50">{busyId === notice.id ? <LoaderCircle className="size-4 animate-spin" /> : <Check className="size-4" />}</button>}
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="rounded-2xl border border-white/8 p-8 text-center text-sm text-mist/60">You’re all caught up.</p>}
    </div>
  );
}
