import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Private message", robots: { index: false, follow: false } };

export default async function PrivateMessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Private message" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/messages");
  const { data: message, error } = await supabase.from("private_messages").select("id,sender_id,recipient_id,subject,body,read_at,created_at").eq("id", id).maybeSingle();
  if (error) return <><PageHero title="Private message" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  if (!message || (message.sender_id !== user.id && message.recipient_id !== user.id)) notFound();
  if (message.recipient_id === user.id && !message.read_at) {
    const { error: updateError } = await supabase.from("private_messages").update({ read_at: new Date().toISOString() }).eq("id", id);
    if (updateError) return <><PageHero title={message.subject} /><section className="container-x py-12"><CommunityError message={updateError.message} /></section></>;
  }
  const otherId = message.sender_id === user.id ? message.recipient_id : message.sender_id;
  const { data: other, error: profileError } = await supabase.from("profiles").select("username,display_name").eq("id", otherId).maybeSingle();
  if (profileError) return <><PageHero title={message.subject} /><section className="container-x py-12"><CommunityError message={profileError.message} /></section></>;
  const sender = message.sender_id === user.id ? "You" : other?.display_name || other?.username || "Community member";

  return (
    <>
      <PageHero title={message.subject} eyebrow="Private message" icon="message-circle" description={`${sender} · ${new Date(message.created_at).toLocaleString()}`} />
      <section className="container-x py-12"><Card className="mx-auto max-w-2xl p-6 sm:p-9"><div className="flex items-start gap-3"><MessageCircle className="mt-1 size-5 shrink-0 text-aether" /><p className="whitespace-pre-wrap leading-relaxed text-mist/85">{message.body}</p></div></Card></section>
    </>
  );
}
