import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ForumThreadList } from "@/components/community/ForumThreadList";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug.replaceAll("-", " ")} forum` };
}

export default async function ForumCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Forum category" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: category, error: categoryError } = await supabase.from("forum_categories").select("id,name,slug,description").eq("slug", slug).maybeSingle();
  if (categoryError) return <><PageHero title="Forum category" /><section className="container-x py-12"><CommunityError message={categoryError.message} /></section></>;
  if (!category) notFound();

  const { data: threads, error } = await supabase.from("forum_threads").select("id,title,reply_count,last_activity_at,pinned,category_id,author_id").eq("status", "published").eq("category_id", category.id).order("pinned", { ascending: false }).order("last_activity_at", { ascending: false }).limit(50);
  if (error) return <><PageHero title={category.name} /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  const ids = [...new Set((threads ?? []).map((thread) => thread.author_id))];
  const { data: profiles, error: profilesError } = ids.length ? await supabase.from("profiles").select("id,username,display_name").in("id", ids) : { data: [], error: null };
  if (profilesError) return <><PageHero title={category.name} /><section className="container-x py-12"><CommunityError message={profilesError.message} /></section></>;

  return (
    <>
      <PageHero title={category.name} eyebrow="Forum category" icon="message-circle" description={category.description} breadcrumbs={[{ label: "Forums", href: "/forum" }, { label: category.name }]} />
      <section className="container-x py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-mist/60">{threads?.length ?? 0} discussions</p>
          <Button href="/forum/new">Start a discussion</Button>
        </div>
        <Card className="p-6 sm:p-8"><ForumThreadList threads={threads ?? []} categories={[category]} profiles={profiles ?? []} /></Card>
      </section>
    </>
  );
}
