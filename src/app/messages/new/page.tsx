import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { MessageComposer } from "@/components/community/MessageComposer";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "New private message", robots: { index: false, follow: false } };

export default async function NewMessagePage({ searchParams }: { searchParams: Promise<{ to?: string }> }) {
  const { to } = await searchParams;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="New message" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/messages/new");
  const username = to?.trim();
  if (!username || !/^[A-Za-z0-9_]{3,24}$/.test(username)) notFound();
  const { data: recipient, error } = await supabase.from("profiles").select("id,username,display_name").ilike("username", username).maybeSingle();
  if (error) return <><PageHero title="New message" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  if (!recipient || recipient.id === user.id) notFound();
  return (
    <>
      <PageHero title="New private message" eyebrow="Member-to-member" icon="message-circle" description="Reach out thoughtfully. A short subject helps the recipient understand your message." />
      <section className="container-x -mt-5 pb-20"><Card className="relative z-10 mx-auto max-w-2xl p-6 sm:p-9"><MessageComposer senderId={user.id} recipientId={recipient.id} recipientName={recipient.display_name || recipient.username} /></Card></section>
    </>
  );
}
