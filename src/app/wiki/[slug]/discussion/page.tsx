import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageSquareText } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ForumThreadList } from "@/components/community/ForumThreadList";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Wiki page discussion" };

export default async function WikiDiscussionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Wiki discussion" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: page, error: pageError } = await supabase.from("wiki_pages").select("id,title").eq("slug", slug).maybeSingle();
  if (pageError) return <><PageHero title="Wiki discussion" /><section className="container-x py-12"><CommunityError message={pageError.message} /></section></>;
  if (!page) notFound();
  const { data: threads, error } = await supabase.from("forum_threads").select("id,title,reply_count,last_activity_at,pinned,category_id,author_id").eq("wiki_page_id", page.id).eq("status", "published").order("last_activity_at", { ascending: false });
  if (error) return <><PageHero title="Wiki discussion" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  const ids = [...new Set((threads ?? []).map((thread) => thread.author_id))];
  const [{ data: categories, error: categoriesError }, { data: profiles, error: profilesError }] = await Promise.all([
    supabase.from("forum_categories").select("id,name,slug"),
    ids.length ? supabase.from("profiles").select("id,username,display_name").in("id", ids) : Promise.resolve({ data: [], error: null }),
  ]);
  if (categoriesError || profilesError) return <><PageHero title="Wiki discussion" /><section className="container-x py-12"><CommunityError message={categoriesError?.message ?? profilesError?.message ?? "Could not load discussion details."} /></section></>;

  return (
    <>
      <PageHero title="Article discussion" eyebrow="Community wiki" icon="message-circle" description={`Conversations connected to “${page.title}”.`} breadcrumbs={[{ label: "Community Wiki", href: "/wiki" }, { label: page.title, href: `/wiki/${slug}` }, { label: "Discussion" }]}>
        <Button href={`/forum/new?wiki=${page.id}`} icon={<MessageSquareText className="size-4" />}>Start a discussion</Button>
      </PageHero>
      <section className="container-x py-12"><Card className="p-6 sm:p-8"><ForumThreadList threads={threads ?? []} categories={categories ?? []} profiles={profiles ?? []} /></Card></section>
    </>
  );
}
