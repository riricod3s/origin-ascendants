import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { AdminPanel } from "@/components/community/AdminPanel";
import { PageHero } from "@/components/ui/PageHero";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Community administration", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Community administration" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");
  const { data: currentProfile, error: currentProfileError } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (currentProfileError) return <><PageHero title="Community administration" /><section className="container-x py-12"><CommunityError message={currentProfileError.message} /></section></>;
  if (currentProfile?.role !== "moderator" && currentProfile?.role !== "administrator") {
    return <><PageHero title="Staff only" /><section className="container-x py-12"><p className="rounded-2xl border border-solar/20 bg-solar/5 p-5 text-sm text-solar">This area is for community moderators and administrators.</p></section></>;
  }

  const [
    { data: members, error: membersError, count: memberCount },
    { data: reports, error: reportsError, count: reportCount },
    { data: threads, error: threadsError, count: threadCount },
    { data: posts, error: postsError, count: postCount },
    { data: wikiPages, error: wikiError, count: pageCount },
    { data: badges, error: badgesError },
    auditResult,
  ] = await Promise.all([
    supabase.from("profiles").select("id,username,display_name,role,reputation,avatar_url", { count: "exact" }).order("created_at", { ascending: false }).limit(50),
    supabase.from("content_reports").select("id,target_type,target_id,reason,status,created_at", { count: "exact" }).in("status", ["open", "reviewing"]).order("created_at", { ascending: false }).limit(50),
    supabase.from("forum_threads").select("id,title,status,pinned,locked,created_at", { count: "exact" }).order("created_at", { ascending: false }).limit(30),
    supabase.from("forum_posts").select("id,body,status,created_at", { count: "exact" }).order("created_at", { ascending: false }).limit(30),
    supabase.from("wiki_pages").select("id,slug,title,status,updated_at", { count: "exact" }).order("updated_at", { ascending: false }).limit(30),
    supabase.from("badges").select("id,name,description").order("name"),
    currentProfile.role === "administrator"
      ? supabase.from("audit_logs").select("id,action,target_type,details,created_at").order("created_at", { ascending: false }).limit(40)
      : Promise.resolve({ data: [], error: null }),
  ]);
  const resultError = membersError ?? reportsError ?? threadsError ?? postsError ?? wikiError ?? badgesError ?? auditResult.error;
  if (resultError) return <><PageHero title="Community administration" /><section className="container-x py-12"><CommunityError message={resultError.message} /></section></>;
  const targetIds = (type: string) => [...new Set((reports ?? []).filter((report) => report.target_type === type).map((report) => report.target_id))];
  const [reportedThreads, reportedPosts, reportedWikiPages, reportedProfiles] = await Promise.all([
    targetIds("thread").length ? supabase.from("forum_threads").select("id,title").in("id", targetIds("thread")) : Promise.resolve({ data: [], error: null }),
    targetIds("post").length ? supabase.from("forum_posts").select("id,body,thread_id").in("id", targetIds("post")) : Promise.resolve({ data: [], error: null }),
    targetIds("wiki_page").length ? supabase.from("wiki_pages").select("id,slug,title").in("id", targetIds("wiki_page")) : Promise.resolve({ data: [], error: null }),
    targetIds("profile").length ? supabase.from("profiles").select("id,username,display_name").in("id", targetIds("profile")) : Promise.resolve({ data: [], error: null }),
  ]);
  const targetError = reportedThreads.error ?? reportedPosts.error ?? reportedWikiPages.error ?? reportedProfiles.error;
  if (targetError) return <><PageHero title="Community administration" /><section className="container-x py-12"><CommunityError message={targetError.message} /></section></>;
  const threadTargets = new Map((reportedThreads.data ?? []).map((thread) => [thread.id, { label: thread.title, href: `/forum/${thread.id}` }]));
  const postTargets = new Map((reportedPosts.data ?? []).map((post) => [post.id, { label: `Reply: ${post.body.slice(0, 100)}`, href: `/forum/${post.thread_id}` }]));
  const wikiTargets = new Map((reportedWikiPages.data ?? []).map((page) => [page.id, { label: page.title, href: `/wiki/${page.slug}` }]));
  const profileTargets = new Map((reportedProfiles.data ?? []).map((profile) => [profile.id, { label: profile.display_name || profile.username, href: `/members/${profile.username}` }]));
  const enrichedReports = (reports ?? []).map((report) => {
    const targets = report.target_type === "thread" ? threadTargets
      : report.target_type === "post" ? postTargets
      : report.target_type === "wiki_page" ? wikiTargets
      : profileTargets;
    const target = targets.get(report.target_id);
    return { ...report, target_label: target?.label ?? "Content unavailable", target_href: target?.href ?? null };
  });

  return (
    <>
      <PageHero title="Community administration" eyebrow="Staff workspace" icon="shield" description="Manage member roles, review reports and keep community content healthy." scene="observatory" tone="arcane" />
      <section className="container-x py-12">
        <AdminPanel
          currentUserId={user.id}
          isAdministrator={currentProfile.role === "administrator"}
          members={members ?? []}
          reports={enrichedReports}
          threads={threads ?? []}
          posts={posts ?? []}
          wikiPages={wikiPages ?? []}
          badges={badges ?? []}
          audit={auditResult.data ?? []}
          metrics={{ members: memberCount ?? 0, threads: threadCount ?? 0, posts: postCount ?? 0, pages: pageCount ?? 0, reports: reportCount ?? 0 }}
        />
      </section>
    </>
  );
}
