import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MessageCircle, Send } from "lucide-react";
import { CommunityAvatar } from "@/components/community/CommunityAvatar";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Private Messages", robots: { index: false, follow: false } };

export default async function MessagesPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Private messages" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/messages");
  const { data: messages, error } = await supabase.from("private_messages").select("id,sender_id,recipient_id,subject,body,read_at,created_at").or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`).order("created_at", { ascending: false }).limit(50);
  if (error) return <><PageHero title="Private messages" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  const otherIds = [...new Set((messages ?? []).map((message) => message.sender_id === user.id ? message.recipient_id : message.sender_id))];
  const { data: profiles, error: profilesError } = otherIds.length ? await supabase.from("profiles").select("id,username,display_name,avatar_url").in("id", otherIds) : { data: [], error: null };
  if (profilesError) return <><PageHero title="Private messages" /><section className="container-x py-12"><CommunityError message={profilesError.message} /></section></>;
  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  return (
    <>
      <PageHero title="Private messages" eyebrow="Member-to-member messages" icon="message-circle" description="Keep private conversations respectful and never share sensitive account details." scene="observatory">
        <Button href="/members" icon={<Send className="size-4" />}>Find a member</Button>
      </PageHero>
      <section className="container-x py-12">
        <Card className="mx-auto max-w-3xl p-6 sm:p-8">
          {(messages ?? []).length ? <ul className="divide-y divide-white/8">{messages?.map((message) => {
            const other = profileById.get(message.sender_id === user.id ? message.recipient_id : message.sender_id);
            const incoming = message.recipient_id === user.id;
            return <li key={message.id} className="py-4 first:pt-0 last:pb-0"><div className="flex items-start gap-3"><CommunityAvatar name={other?.display_name || other?.username || "Member"} url={other?.avatar_url} size="sm" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-white">{message.subject}</p>{incoming && !message.read_at && <span className="rounded-full bg-aether/10 px-2 py-0.5 text-[0.6rem] font-semibold text-aether">New</span>}</div><p className="mt-1 text-sm text-mist/65">{incoming ? "From" : "To"} <TransitionLink href={`/members/${other?.username ?? ""}`} className="text-mist hover:text-aether">{other?.display_name || other?.username || "Member"}</TransitionLink></p><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist/55">{message.body}</p><p className="mt-2 text-xs text-mist/35">{new Date(message.created_at).toLocaleString()}</p>{incoming && !message.read_at && <MarkMessageRead messageId={message.id} />}</div></div></li>;
          })}</ul> : <div className="py-10 text-center"><MessageCircle className="mx-auto size-9 text-aether/70" /><p className="mt-3 font-semibold text-white">No private messages yet.</p><p className="mt-1 text-sm text-mist/55">Visit a member profile to start a conversation.</p></div>}
        </Card>
      </section>
    </>
  );
}

function MarkMessageRead({ messageId }: { messageId: string }) {
  return <TransitionLink href={`/messages/${messageId}`} className="mt-2 inline-flex text-xs font-semibold text-aether hover:text-white">Open message →</TransitionLink>;
}
