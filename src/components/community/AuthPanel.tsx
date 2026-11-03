import { DiscordIcon } from "@/components/icons/BrandIcons";
import { AuthForm } from "@/components/community/AuthForm";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { TransitionLink } from "@/components/layout/TransitionLink";

type AuthMode = "login" | "register" | "forgot" | "reset";

const COPY: Record<AuthMode, { title: string; description: string; alt?: string; altHref?: string }> = {
  login: { title: "Sign in", description: "Pick up where you left off.", alt: "New here? Create an account", altHref: "/register" },
  register: { title: "Create your account", description: "Join the conversations and help build a useful community wiki.", alt: "Already a member? Sign in", altHref: "/login" },
  forgot: { title: "Password help", description: "We'll send a secure reset link if the address belongs to an account.", alt: "Return to sign in", altHref: "/login" },
  reset: { title: "Set a new password", description: "Choose a unique password for your community account.", alt: "Return to sign in", altHref: "/login" },
};

export function AuthPanel({ mode }: { mode: AuthMode }) {
  const copy = COPY[mode];
  return (
    <>
      <PageHero
        title={copy.title}
        eyebrow="Origin Ascendants Community"
        icon="users"
        description={copy.description}
        scene="isles"
        tone="aether"
        align="center"
      />
      <section className="container-x -mt-5 pb-20">
        <Card tone="aether" className="relative z-10 mx-auto max-w-lg p-6 sm:p-9">
          {mode === "register" && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#5865F2]/20 bg-[#5865F2]/[0.07] p-4">
              <DiscordIcon className="mt-0.5 size-5 shrink-0 text-[#9ba4ff]" />
              <p className="text-sm leading-relaxed text-mist/80">
                Use email with verification, or continue with Discord. Both options create a community profile.
              </p>
            </div>
          )}
          <AuthForm mode={mode} />
          {copy.alt && copy.altHref && (
            <p className="mt-6 text-center text-sm text-mist/65">
              <TransitionLink href={copy.altHref} className="font-medium text-aether transition-colors hover:text-white">{copy.alt}</TransitionLink>
            </p>
          )}
          {mode === "login" && (
            <p className="mt-4 text-center text-sm text-mist/60">
              <TransitionLink href="/forgot-password" className="hover:text-aether">Forgot your password?</TransitionLink>
            </p>
          )}
          <p className="mt-7 border-t border-white/8 pt-5 text-center text-xs leading-relaxed text-mist/50">
            By continuing, you agree to our <TransitionLink href="/terms-of-service" className="underline underline-offset-2 hover:text-mist">Terms</TransitionLink> and <TransitionLink href="/privacy-policy" className="underline underline-offset-2 hover:text-mist">Privacy Policy</TransitionLink>.
          </p>
        </Card>
      </section>
    </>
  );
}
