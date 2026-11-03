import type { Metadata } from "next";
import { BookOpenCheck, FilePlus2 } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { WikiSearch } from "@/components/community/WikiSearch";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Community Wiki", description: "Search and help write the Origin Ascendants community wiki." };

export default async function WikiPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Community wiki" eyebrow="Knowledge, shared" icon="book-open" description="Member-written guides, references and community knowledge—made better together." /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const [{ data: categories, error: categoriesError }, { data: pages, error: pagesError }] = await Promise.all([
    supabase.from("wiki_categories").select("id,name,slug,description,sort_order").order("sort_order"),
    supabase.from("wiki_pages").select("id,slug,title,summary,category_id,updated_at").eq("status", "published").order("updated_at", { ascending: false }).limit(100),
  ]);
  if (categoriesError || pagesError) return <><PageHero title="Community wiki" eyebrow="Knowledge, shared" icon="book-open" /><section className="container-x py-12"><CommunityError message={categoriesError?.message ?? pagesError?.message ?? "Could not load wiki pages."} /></section></>;

  return (
    <>
      <PageHero title={<>The community <span className="text-gradient-sky">wiki.</span></>} eyebrow="Knowledge, shared" icon="book-open" description="Find practical guides, learn how the community works and add what you know so others can benefit." scene="observatory" tone="arcane">
        <Button href="/wiki/new" icon={<FilePlus2 className="size-4" />}>Write an article</Button>
      </PageHero>
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[minmax(0,1.8fr)_minmax(15rem,0.7fr)]">
        <div>
          <Card className="p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-aether/10 text-aether"><BookOpenCheck className="size-5" /></span>
              <div><p className="text-xs font-semibold tracking-wider text-aether uppercase">Shared knowledge</p><h2 className="font-display text-xl font-bold text-white">Browse articles</h2></div>
            </div>
            <WikiSearch pages={pages ?? []} categories={categories ?? []} />
          </Card>
        </div>
        <aside className="space-y-5">
          <Card className="p-5">
            <h2 className="font-display text-lg font-bold text-white">Categories</h2>
            <ul className="mt-4 space-y-2">
              {(categories ?? []).map((category) => <li key={category.id}><a href={`/wiki/category/${category.slug}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-mist/70 transition-colors hover:bg-white/5 hover:text-white"><span>{category.name}</span><span className="text-xs text-mist/35">→</span></a></li>)}
            </ul>
          </Card>
          <Card tone="arcane" className="p-5">
            <p className="text-xs font-semibold tracking-[0.18em] text-arcane uppercase">Open knowledge</p>
            <h2 className="mt-3 font-display text-lg font-bold text-white">Every edit is part of the story.</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist/70">Pages keep their revision history, so contributors can improve articles while preserving earlier versions.</p>
          </Card>
        </aside>
      </section>
    </>
  );
}
