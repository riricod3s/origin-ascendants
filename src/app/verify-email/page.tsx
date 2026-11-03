import type { Metadata } from "next";
import { MailCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { TransitionLink } from "@/components/layout/TransitionLink";

export const metadata: Metadata = { title: "Verify your email", robots: { index: false, follow: false } };

export default function VerifyEmailPage() {
  return (
    <>
      <PageHero title="Check your inbox" eyebrow="One last step" icon="mail" description="Verify your email address to activate your account." align="center" tone="aether" />
      <section className="container-x -mt-5 pb-20">
        <Card className="relative z-10 mx-auto max-w-xl p-8 text-center sm:p-10">
          <MailCheck className="mx-auto size-12 text-aether" />
          <h2 className="mt-5 font-display text-2xl font-bold text-white">Your community account is almost ready.</h2>
          <p className="mt-3 leading-relaxed text-mist/75">
            Open the verification link in the email from Origin Ascendants. Once verified, return here and sign in. If the email does not arrive, check your spam folder or try registering again with the same address.
          </p>
          <TransitionLink href="/login" className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Go to sign in
          </TransitionLink>
        </Card>
      </section>
    </>
  );
}
