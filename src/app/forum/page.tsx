import type { Metadata } from "next";
import { ArrowRight, MessageSquarePlus } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ForumThreadList } from "@/components/community/ForumThreadList";
import { ForumSearchForm } from "@/components/community/ForumSearchForm";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Community Forums", description: "Join discussions, share ideas and connect with the Origin Ascendants community." };

export default async function ForumPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Community forums" eyebrow="Talk, share, connect" icon="message-circle" description="A welcoming place for questions, community projects and member conversations." /><section className="container-x py-12"><CommunitySetupNotice /></section></>;

  const [{ data: categories, error: categoriesError }, { data: threads, error: threadsError }] = await Promise.all([
    supabase.from("forum_categories").select("id,name,slug,description,sort_order").order("sort_order"),
    supabase.from("forum_threads").select("id,title,reply_count,last_activity_at,pinned,category_id,author_id").eq("status", "published").order("pinned", { ascending: false }).order("last_activity_at", { ascending: false }).limit(25),
  ]);
  if (categoriesError || threadsError) return <><PageHero title="Community forums" eyebrow="Talk, share, connect" icon="message-circle" /><section className="container-x py-12"><CommunityError message={categoriesError?.message ?? threadsError?.message ?? "Could not load discussions."} /></section></>;

  const profileIds = [...new Set((threads ?? []).map((thread) => thread.author_id))];
  const { data: profiles, error: profilesError } = profileIds.length
    ? await supabase.from("profiles").select("id,username,display_name").in("id", profileIds)
    : { data: [], error: null };
  if (profilesError) return <><PageHero title="Community forums" eyebrow="Talk, share, connect" icon="message-circle" /><section className="container-x py-12"><CommunityError message={profilesError.message} /></section></>;

  return (
    <>
      <PageHero title="Community forums" eyebrow="Talk, share, connect" icon="message-circle" description="Ask questions, share your projects and shape the community together." scene="skycity" tone="aether">
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <ForumSearchForm />
          <Button href="/forum/new" icon={<MessageSquarePlus className="size-4" />}>Start a discussion</Button>
        </div>
      </PageHero>
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,0.8fr)]">
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">The conversation</p><h2 className="mt-2 font-display text-2xl font-bold text-white">Latest discussions</h2></div>
            <span className="text-xs text-mist/45">{threads?.length ?? 0} recent</span>
          </div>
          <ForumThreadList threads={threads ?? []} categories={categories ?? []} profiles={profiles ?? []} />
        </Card>
        <aside className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-xl font-bold text-white">Browse categories</h2>
            <ul className="mt-4 space-y-2">
              {(categories ?? []).map((category) => (
                <li key={category.id}>
                  <TransitionLink href={`/forum/category/${category.slug}`} className="group flex items-center justify-between rounded-xl border border-white/6 px-3 py-3 transition-colors hover:border-aether/20 hover:bg-white/[0.03]">
                    <span><span className="block text-sm font-medium text-white">{category.name}</span><span className="mt-0.5 block text-xs text-mist/50">{category.description}</span></span>
                    <ArrowRight className="size-4 shrink-0 text-mist/35 transition-transform group-hover:translate-x-1 group-hover:text-aether" />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </Card>
          <Card tone="arcane" className="p-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-arcane uppercase">Community first</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">Keep it kind and constructive.</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist/75">Share feedback respectfully, protect private information and report content that needs moderator attention.</p>
            <TransitionLink href="/terms-of-service" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-aether hover:text-white">Community guidelines <ArrowRight className="size-4" /></TransitionLink>
          </Card>
        </aside>
      </section>
    </>
  );
}
