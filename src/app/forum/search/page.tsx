import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ForumSearchForm } from "@/components/community/ForumSearchForm";
import { ForumThreadList } from "@/components/community/ForumThreadList";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Search Forums", robots: { index: false, follow: false } };

export default async function ForumSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim().slice(0, 100) ?? "";
  if (!query) redirect("/forum");
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Search forums" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const pattern = `%${query.replace(/[\\%_]/g, "\\$&")}%`;
  const [{ data: threads, error }, { data: categories, error: categoriesError }] = await Promise.all([
    supabase.from("forum_threads").select("id,title,reply_count,last_activity_at,pinned,category_id,author_id").eq("status", "published").ilike("title", pattern).order("last_activity_at", { ascending: false }).limit(50),
    supabase.from("forum_categories").select("id,name,slug"),
  ]);
  if (error || categoriesError) return <><PageHero title="Search forums" /><section className="container-x py-12"><CommunityError message={error?.message ?? categoriesError?.message ?? "Could not search discussions."} /></section></>;
  const ids = [...new Set((threads ?? []).map((thread) => thread.author_id))];
  const { data: profiles, error: profilesError } = ids.length ? await supabase.from("profiles").select("id,username,display_name").in("id", ids) : { data: [], error: null };
  if (profilesError) return <><PageHero title="Search forums" /><section className="container-x py-12"><CommunityError message={profilesError.message} /></section></>;

  return (
    <>
      <PageHero title="Search the forums" eyebrow="Community forums" icon="search" description={`Results for “${query}”.`}>
        <ForumSearchForm defaultValue={query} />
      </PageHero>
      <section className="container-x py-12"><Card className="p-6 sm:p-8"><p className="mb-5 text-xs text-mist/50">{threads?.length ?? 0} matching discussions</p><ForumThreadList threads={threads ?? []} categories={categories ?? []} profiles={profiles ?? []} /></Card></section>
    </>
  );
}
