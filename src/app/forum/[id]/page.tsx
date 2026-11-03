import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, Pin, LockKeyhole } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ForumActions } from "@/components/community/ForumActions";
import { ForumReplyForm } from "@/components/community/ForumReplyForm";
import { MarkdownContent } from "@/components/community/MarkdownContent";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) return { title: "Discussion" };
  const { data } = await supabase.from("forum_threads").select("title").eq("id", id).maybeSingle();
  return { title: data?.title ?? "Discussion" };
}

export default async function ThreadPage({ params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Discussion" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const [{ data: thread, error: threadError }, { data: { user } }] = await Promise.all([
    supabase.from("forum_threads").select("id,title,body,author_id,category_id,wiki_page_id,pinned,locked,reply_count,created_at,status").eq("id", id).maybeSingle(),
    supabase.auth.getUser(),
  ]);
  if (threadError) return <><PageHero title="Discussion" /><section className="container-x py-12"><CommunityError message={threadError.message} /></section></>;
  if (!thread || thread.status !== "published") notFound();

  const [{ data: posts, error: postsError }, { data: category }] = await Promise.all([
    supabase.from("forum_posts").select("id,body,author_id,created_at,updated_at").eq("thread_id", id).eq("status", "published").order("created_at"),
    supabase.from("forum_categories").select("name,slug").eq("id", thread.category_id).maybeSingle(),
  ]);
  if (postsError) return <><PageHero title={thread.title} /><section className="container-x py-12"><CommunityError message={postsError.message} /></section></>;
  const profileIds = [...new Set([thread.author_id, ...(posts ?? []).map((post) => post.author_id)])];
  const { data: profiles, error: profilesError } = await supabase.from("profiles").select("id,username,display_name,role").in("id", profileIds);
  if (profilesError) return <><PageHero title={thread.title} /><section className="container-x py-12"><CommunityError message={profilesError.message} /></section></>;
  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
  const { data: reactions, error: reactionsError } = posts?.length
    ? await supabase.from("post_reactions").select("post_id").in("post_id", posts.map((post) => post.id)).eq("reaction", "like")
    : { data: [], error: null };
  if (reactionsError) return <><PageHero title={thread.title} /><section className="container-x py-12"><CommunityError message={reactionsError.message} /></section></>;

  const author = profileById.get(thread.author_id);
  const { data: wikiPage } = thread.wiki_page_id
    ? await supabase.from("wiki_pages").select("slug,title").eq("id", thread.wiki_page_id).maybeSingle()
    : { data: null };
  return (
    <>
      <PageHero title={thread.title} eyebrow={category?.name ?? "Community discussion"} icon="message-circle" description={<>Started by {author?.display_name || author?.username || "a community member"} · {new Date(thread.created_at).toLocaleDateString()}</>} breadcrumbs={[{ label: "Forums", href: "/forum" }, ...(category ? [{ label: category.name, href: `/forum/category/${category.slug}` }] : []), { label: "Discussion" }]} />
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          <Card className="p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {thread.pinned && <span className="inline-flex items-center gap-1.5 rounded-full bg-solar/10 px-3 py-1 text-xs font-semibold text-solar"><Pin className="size-3" /> Pinned</span>}
              {thread.locked && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-mist/65"><LockKeyhole className="size-3" /> Locked</span>}
              {wikiPage && <TransitionLink href={`/wiki/${wikiPage.slug}`} className="rounded-full bg-aether/10 px-3 py-1 text-xs font-semibold text-aether">Wiki: {wikiPage.title}</TransitionLink>}
            </div>
            <MarkdownContent content={thread.body} />
          </Card>
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white">{thread.reply_count} {thread.reply_count === 1 ? "reply" : "replies"}</h2>
            {(posts ?? []).map((post) => {
              const profile = profileById.get(post.author_id);
              const likes = (reactions ?? []).filter((reaction) => reaction.post_id === post.id).length;
              return (
                <Card key={post.id} className="p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <TransitionLink href={`/members/${profile?.username ?? ""}`} className="font-semibold text-white hover:text-aether">{profile?.display_name || profile?.username || "Community member"}</TransitionLink>
                      {profile?.role && profile.role !== "member" && <span className="ml-2 rounded-full bg-aether/10 px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider text-aether uppercase">{profile.role.replace("_", " ")}</span>}
                      <p className="mt-1 text-xs text-mist/45">{new Date(post.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <MarkdownContent content={post.body} />
                  <div className="mt-5 border-t border-white/8 pt-4"><ForumActions postId={post.id} userId={user?.id ?? null} initialCount={likes} /></div>
                </Card>
              );
            })}
          </div>
          {user ? (
            <Card className="p-5 sm:p-7"><h2 className="mb-4 font-display text-xl font-bold text-white">Join the conversation</h2><ForumReplyForm threadId={thread.id} userId={user.id} locked={thread.locked} /></Card>
          ) : (
            <Card className="flex flex-wrap items-center justify-between gap-4 p-5"><p className="text-sm text-mist/75">Sign in to add a reply.</p><TransitionLink href="/login" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-night">Sign in</TransitionLink></Card>
          )}
        </div>
        <aside className="space-y-5">
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">About this thread</p>
            <div className="mt-4 space-y-3 text-sm text-mist/70">
              <p className="flex items-center gap-2"><MessageCircle className="size-4 text-aether" /> {thread.reply_count} replies</p>
              <p>Started {new Date(thread.created_at).toLocaleDateString()}</p>
              {author && <p>By <TransitionLink href={`/members/${author.username}`} className="text-white hover:text-aether">{author.display_name || author.username}</TransitionLink></p>}
            </div>
          </Card>
          <Card tone="arcane" className="p-5"><h2 className="font-display font-bold text-white">Keep it welcoming.</h2><p className="mt-2 text-sm leading-relaxed text-mist/70">Be constructive, assume good intent and report anything that needs a moderator.</p></Card>
        </aside>
      </section>
    </>
  );
}
