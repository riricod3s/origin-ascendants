import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Bell, BookOpen, MessageCircle, Settings2, ShieldCheck, Users } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ProfileEditForm } from "@/components/community/ProfileEditForm";
import { SignOutButton } from "@/components/community/SignOutButton";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Your account", robots: { index: false, follow: false } };

export default async function AccountPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Your account" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");
  const [{ data: profile, error: profileError }, { count: unread, error: notificationsError }] = await Promise.all([
    supabase.from("profiles").select("id,username,display_name,bio,avatar_url,role,reputation").eq("id", user.id).maybeSingle(),
    supabase.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null),
  ]);
  if (profileError || notificationsError) return <><PageHero title="Your account" /><section className="container-x py-12"><CommunityError message={profileError?.message ?? notificationsError?.message ?? "Could not load your account."} /></section></>;
  if (!profile) return <><PageHero title="Your account" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;

  return (
    <>
      <PageHero title="Your account" eyebrow={`Welcome, ${profile.display_name || profile.username}`} icon="users" description="Manage your public profile and find your community activity." />
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.7fr)]">
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-aether/10 text-aether"><Settings2 className="size-5" /></span><div><h2 className="font-display text-xl font-bold text-white">Edit your profile</h2><p className="mt-1 text-xs text-mist/50">Your profile is public to the community.</p></div></div>
          <ProfileEditForm userId={user.id} initial={profile} />
          <div className="mt-7 border-t border-white/8 pt-5"><SignOutButton /></div>
        </Card>
        <aside className="space-y-5">
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">Account status</p>
            <div className="mt-4 space-y-3 text-sm text-mist/70">
              <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-verdant" /> {profile.role.replace("_", " ")}</p>
              <p>{profile.reputation} reputation</p>
              <p>{user.email_confirmed_at ? "Email verified" : "Email verification pending"}</p>
            </div>
          </Card>
          <Card className="space-y-1 p-3">
            <AccountLink href={`/members/${profile.username}`} icon={<Users className="size-4" />} label="View public profile" />
            <AccountLink href="/notifications" icon={<Bell className="size-4" />} label={unread ? `Notifications (${unread})` : "Notifications"} />
            <AccountLink href="/messages" icon={<MessageCircle className="size-4" />} label="Private messages" />
            <AccountLink href="/forum" icon={<MessageCircle className="size-4" />} label="Your community forums" />
            <AccountLink href="/wiki" icon={<BookOpen className="size-4" />} label="Community wiki" />
            {(profile.role === "administrator" || profile.role === "moderator") && <AccountLink href="/admin" icon={<ShieldCheck className="size-4" />} label="Moderation panel" />}
          </Card>
          <p className="px-2 text-xs leading-relaxed text-mist/45">Connected account: {user.email ?? "Discord"}</p>
        </aside>
      </section>
    </>
  );
}

function AccountLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return <TransitionLink href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-mist/75 transition-colors hover:bg-white/5 hover:text-white">{icon}{label}</TransitionLink>;
}
