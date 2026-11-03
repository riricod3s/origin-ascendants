"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DiscordIcon } from "@/components/icons/BrandIcons";
import { Turnstile } from "@/components/community/Turnstile";
import { createClient } from "@/lib/supabase/browser";
import { safeInternalPath } from "@/lib/supabase/redirect";

type AuthMode = "login" | "register" | "forgot" | "reset";

const INPUT = "mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-mist/40 focus:border-aether/60 focus:ring-2 focus:ring-aether/15";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  const handleCaptcha = useCallback((token: string) => setCaptcha(token), []);
  const needsCaptcha = mode === "register";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!supabase) {
      setError("Accounts are temporarily unavailable because the authentication service is not configured.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    setBusy(true);

    try {
      if (mode === "register") {
        const username = String(form.get("username") ?? "").trim();
        if (!/^[A-Za-z0-9_]{3,24}$/.test(username)) {
          setError("Choose a username with 3–24 letters, numbers or underscores.");
          return;
        }
        if (!captcha) {
          setError("Complete the CAPTCHA before creating your account.");
          return;
        }
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            captchaToken: captcha,
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/account`,
            data: { username, display_name: username },
          },
        });
        if (authError) throw authError;
        setMessage("Check your inbox for the verification link. You must verify your email before signing in.");
      } else if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        const nextPath = safeInternalPath(new URLSearchParams(window.location.search).get("next"), window.location.origin);
        router.replace(nextPath);
        router.refresh();
      } else if (mode === "forgot") {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });
        if (authError) throw authError;
        setMessage("If an account exists for that email, a password reset link is on its way.");
      } else {
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        setMessage("Your password has been updated. You can now sign in with it.");
        router.replace("/login");
        router.refresh();
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The request could not be completed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function signInWithDiscord() {
    if (!supabase) {
      setError("Accounts are temporarily unavailable because the authentication service is not configured.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const nextPath = safeInternalPath(new URLSearchParams(window.location.search).get("next"), window.location.origin);
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}` },
      });
      if (authError) setError(authError.message);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Discord sign-in could not be started.");
    } finally {
      setBusy(false);
    }
  }

  const title = {
    login: "Welcome back",
    register: "Join the community",
    forgot: "Reset your password",
    reset: "Choose a new password",
  }[mode];

  return (
    <div>
      <form onSubmit={submit} className="space-y-5">
        {mode === "register" && (
          <label className="block text-sm font-medium text-mist">
            Username
            <input name="username" required minLength={3} maxLength={24} pattern="[A-Za-z0-9_]+" autoComplete="username" className={INPUT} placeholder="SkyBuilder" />
            <span className="mt-1 block text-xs text-mist/55">3–24 letters, numbers or underscores.</span>
          </label>
        )}

        {mode !== "reset" && (
          <label className="block text-sm font-medium text-mist">
            Email address
            <input name="email" type="email" required autoComplete="email" className={INPUT} placeholder="you@example.com" />
          </label>
        )}

        {mode !== "forgot" && (
          <label className="block text-sm font-medium text-mist">
            {mode === "reset" ? "New password" : "Password"}
            <input
              name="password"
              type="password"
              required
              minLength={10}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className={INPUT}
              placeholder="At least 10 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        )}

        {needsCaptcha && <Turnstile onToken={handleCaptcha} />}

        {error && <p role="alert" className="rounded-xl border border-ember/25 bg-ember/5 p-3 text-sm text-ember">{error}</p>}
        {message && <p role="status" className="rounded-xl border border-verdant/25 bg-verdant/5 p-3 text-sm text-verdant">{message}</p>}

        <button
          type="submit"
          disabled={busy || (needsCaptcha && !captcha)}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-aether to-arcane px-6 font-semibold text-night transition-[transform,opacity,box-shadow] hover:-translate-y-0.5 hover:shadow-glow-aether disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Please wait…" : title}
        </button>
      </form>

      {(mode === "login" || mode === "register") && (
        <div className="mt-6">
          <div className="relative my-5 text-center text-xs text-mist/50 before:absolute before:top-1/2 before:right-0 before:left-0 before:border-t before:border-white/10">
            <span className="relative bg-night px-3">or continue with</span>
          </div>
          <button type="button" onClick={signInWithDiscord} disabled={busy} className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-[#5865F2]/10 font-semibold text-white transition-colors hover:bg-[#5865F2]/20 disabled:opacity-50">
            <DiscordIcon /> Discord
          </button>
        </div>
      )}
    </div>
  );
}
