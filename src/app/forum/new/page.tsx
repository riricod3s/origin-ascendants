import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ForumThreadForm } from "@/components/community/ForumThreadForm";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Start a discussion", robots: { index: false, follow: false } };

export default async function NewThreadPage({ searchParams }: { searchParams: Promise<{ wiki?: string }> }) {
  const { wiki } = await searchParams;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Start a discussion" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/forum/new");
  const [{ data: categories, error: categoryError }, { data: wikiPage, error: wikiError }] = await Promise.all([
    supabase.from("forum_categories").select("id,name").order("sort_order"),
    wiki ? supabase.from("wiki_pages").select("id,title").eq("id", wiki).maybeSingle() : Promise.resolve({ data: null, error: null }),
  ]);
  if (categoryError || wikiError) return <><PageHero title="Start a discussion" /><section className="container-x py-12"><CommunityError message={categoryError?.message ?? wikiError?.message ?? "Could not load discussion details."} /></section></>;
  if (wiki && !wikiPage) return <><PageHero title="Start a discussion" /><section className="container-x py-12"><CommunityError message="The wiki page for this discussion could not be found." /></section></>;

  return (
    <>
      <PageHero title={wikiPage ? `Discuss: ${wikiPage.title}` : "Start a discussion"} eyebrow="Community forums" icon="message-circle" description="Write a clear title and add the context others need to join in." breadcrumbs={[{ label: "Forums", href: "/forum" }, { label: "New discussion" }]} />
      <section className="container-x -mt-5 pb-20">
        <Card className="relative z-10 mx-auto max-w-3xl p-6 sm:p-9">
          {wikiPage && <p className="mb-5 rounded-xl border border-aether/15 bg-aether/5 p-3 text-sm text-mist/70">This thread will be linked to the wiki article’s discussion page.</p>}
          <ForumThreadForm categories={categories ?? []} userId={user.id} wikiPageId={wikiPage?.id} />
        </Card>
      </section>
    </>
  );
}
