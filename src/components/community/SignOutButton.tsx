"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signOut() {
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy(true);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      setBusy(false);
      return;
    }
    router.replace("/");
    router.refresh();
  }

  return <div><button type="button" onClick={() => void signOut()} disabled={busy} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-mist transition-colors hover:border-ember/30 hover:text-ember disabled:opacity-50"><LogOut className="size-4" />{busy ? "Signing out…" : "Sign out"}</button>{error && <p role="alert" className="mt-2 text-xs text-ember">{error}</p>}</div>;
}
