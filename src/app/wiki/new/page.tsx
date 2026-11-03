import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { WikiPageForm } from "@/components/community/WikiPageForm";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Write a wiki article", robots: { index: false, follow: false } };

export default async function NewWikiPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Write an article" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/wiki/new");
  const { data: categories, error } = await supabase.from("wiki_categories").select("id,name").order("sort_order");
  if (error) return <><PageHero title="Write an article" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;

  return (
    <>
      <PageHero title="Write an article" eyebrow="Community wiki" icon="book-open" description="Share information that will help other members. Your work is attributed and revision history is preserved." breadcrumbs={[{ label: "Community Wiki", href: "/wiki" }, { label: "New article" }]} />
      <section className="container-x -mt-5 pb-20">
        <Card className="relative z-10 mx-auto max-w-3xl p-6 sm:p-9"><WikiPageForm categories={categories ?? []} userId={user.id} /></Card>
      </section>
    </>
  );
}
