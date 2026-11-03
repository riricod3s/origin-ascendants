import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, BookOpen, CalendarDays, MessageCircle, MessageSquare } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { CommunityAvatar } from "@/components/community/CommunityAvatar";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return { title: `${username} | Community Member` };
}

export default async function MemberProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Member profile" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: profile, error: profileError } = await supabase.from("profiles").select("id,username,display_name,bio,avatar_url,role,reputation,created_at").ilike("username", username).maybeSingle();
  if (profileError) return <><PageHero title="Member profile" /><section className="container-x py-12"><CommunityError message={profileError.message} /></section></>;
  if (!profile) notFound();

  const [
    { count: threadCount, error: threadCountError },
    { count: postCount, error: postCountError },
    { count: pageCount, error: pageCountError },
    { data: badges, error: badgesError },
    { data: activity, error: activityError },
  ] = await Promise.all([
    supabase.from("forum_threads").select("id", { count: "exact", head: true }).eq("author_id", profile.id).eq("status", "published"),
    supabase.from("forum_posts").select("id", { count: "exact", head: true }).eq("author_id", profile.id).eq("status", "published"),
    supabase.from("wiki_pages").select("id", { count: "exact", head: true }).eq("created_by", profile.id).eq("status", "published"),
    supabase.from("user_badges").select("awarded_at,badges(name,description,icon)").eq("user_id", profile.id).order("awarded_at", { ascending: false }),
    supabase.from("activity_events").select("id,kind,summary,href,created_at").eq("actor_id", profile.id).order("created_at", { ascending: false }).limit(12),
  ]);
  const dataError = threadCountError ?? postCountError ?? pageCountError ?? badgesError ?? activityError;
  if (dataError) return <><PageHero title={profile.display_name || profile.username} /><section className="container-x py-12"><CommunityError message={dataError.message} /></section></>;

  return (
    <>
      <PageHero title={profile.display_name || profile.username} eyebrow={`@${profile.username}`} icon="users" description={profile.bio || "A member of the Origin Ascendants community."} />
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          <Card className="flex flex-wrap items-center gap-5 p-6 sm:p-8">
            <CommunityAvatar name={profile.display_name || profile.username} url={profile.avatar_url} size="lg" />
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-bold text-white">{profile.display_name || profile.username}</h2>
              <p className="mt-1 text-sm text-mist/55">@{profile.username} · {profile.role.replace("_", " ")}</p>
              <p className="mt-3 flex items-center gap-2 text-xs text-mist/45"><CalendarDays className="size-3.5" /> Member since {new Date(profile.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
            </div>
            <Button href={`/messages/new?to=${encodeURIComponent(profile.username)}`} size="sm" icon={<MessageCircle className="size-4" />}>Message</Button>
          </Card>
          <Card className="p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3"><MessageSquare className="size-5 text-aether" /><h2 className="font-display text-xl font-bold text-white">Recent activity</h2></div>
            {(activity ?? []).length ? <ul className="divide-y divide-white/8">{activity?.map((item) => <li key={item.id} className="py-4 first:pt-0 last:pb-0"><p className="text-sm text-mist/80">{item.summary}</p><p className="mt-1 text-xs text-mist/40">{new Date(item.created_at).toLocaleString()}</p></li>)}</ul> : <p className="text-sm text-mist/55">No public activity yet.</p>}
          </Card>
        </div>
        <aside className="space-y-5">
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">Community contributions</p>
            <div className="mt-4 space-y-4">
              <Contribution icon={<MessageCircle className="size-4" />} label="Discussions" value={threadCount ?? 0} />
              <Contribution icon={<MessageSquare className="size-4" />} label="Forum replies" value={postCount ?? 0} />
              <Contribution icon={<BookOpen className="size-4" />} label="Wiki pages" value={pageCount ?? 0} />
              <Contribution icon={<Award className="size-4" />} label="Reputation" value={profile.reputation} />
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-display text-lg font-bold text-white">Badges</h2>
            {(badges ?? []).length ? <ul className="mt-4 space-y-3">{badges?.map((entry, index) => {
              const badge = Array.isArray(entry.badges) ? entry.badges[0] : entry.badges;
              return <li key={`${entry.awarded_at}-${index}`} className="flex items-start gap-3"><span className="grid size-9 place-items-center rounded-xl bg-solar/10 text-solar"><Award className="size-4" /></span><span><span className="block text-sm font-semibold text-white">{badge?.name ?? "Community badge"}</span><span className="mt-0.5 block text-xs text-mist/50">{badge?.description}</span></span></li>;
            })}</ul> : <p className="mt-3 text-sm text-mist/55">No badges yet.</p>}
          </Card>
          <TransitionLink href="/members" className="inline-flex items-center gap-2 px-2 text-sm font-semibold text-aether hover:text-white">Back to members <UsersRoundIcon /></TransitionLink>
        </aside>
      </section>
    </>
  );
}

function Contribution({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <p className="flex items-center gap-3 text-sm"><span className="text-aether">{icon}</span><span className="flex-1 text-mist/65">{label}</span><span className="font-semibold text-white">{value.toLocaleString()}</span></p>;
}

function UsersRoundIcon() {
  return <span aria-hidden="true">→</span>;
}
