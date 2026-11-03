"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, LogOut, UserRound, UserPlus } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { createClient } from "@/lib/supabase/browser";

export function AccountNavActions({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUserId(session?.user.id ?? null);
    });
    void supabase.auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError) setError("Could not check the current sign-in state.");
      setUserId(data.user?.id ?? null);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError(signOutError.message);
        return;
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not sign out.");
      return;
    }
    setUserId(null);
    onNavigate?.();
    router.refresh();
  }

  const compactClass = mobile
    ? "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-mist transition-colors hover:bg-white/[0.06] hover:text-white"
    : "rounded-full px-3 py-2 text-sm font-medium text-mist transition-colors hover:text-white";

  return (
    <div className={mobile ? "space-y-1" : "flex items-center gap-2"}>
      {userId ? (
        <>
          <TransitionLink href="/account" onClick={onNavigate} className={compactClass}>
            {mobile && <UserRound className="size-4" />}Account
          </TransitionLink>
          <TransitionLink href="/notifications" onClick={onNavigate} aria-label="Notifications" className={compactClass}>
            <Bell className="size-4" />{mobile && "Notifications"}
          </TransitionLink>
          <button type="button" onClick={() => void signOut()} className={mobile ? compactClass : "rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-mist/70 transition-colors hover:border-ember/30 hover:text-ember"}>
            {mobile && <LogOut className="size-4" />}Sign out
          </button>
        </>
      ) : (
        <>
          <TransitionLink href="/login" onClick={onNavigate} className={compactClass}>Sign in</TransitionLink>
          <TransitionLink href="/register" onClick={onNavigate} className={mobile ? compactClass : "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-night transition-opacity hover:opacity-90"}>
            {mobile && <UserPlus className="size-4" />}Join the community
          </TransitionLink>
        </>
      )}
      {error && <p role="alert" className={mobile ? "px-3 text-xs text-ember" : "absolute mt-12 max-w-60 text-xs text-ember"}>{error}</p>}
    </div>
  );
}
