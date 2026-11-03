import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { WikiPageList } from "@/components/community/WikiPageList";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug.replaceAll("-", " ")} wiki` };
}

export default async function WikiCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Wiki category" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: category, error: categoryError } = await supabase.from("wiki_categories").select("id,name,slug,description").eq("slug", slug).maybeSingle();
  if (categoryError) return <><PageHero title="Wiki category" /><section className="container-x py-12"><CommunityError message={categoryError.message} /></section></>;
  if (!category) notFound();
  const { data: pages, error } = await supabase.from("wiki_pages").select("id,slug,title,summary,category_id,updated_at").eq("category_id", category.id).eq("status", "published").order("updated_at", { ascending: false });
  if (error) return <><PageHero title={category.name} /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;

  return (
    <>
      <PageHero title={category.name} eyebrow="Wiki category" icon="book-open" description={category.description} breadcrumbs={[{ label: "Community Wiki", href: "/wiki" }, { label: category.name }]} />
      <section className="container-x py-12"><Card className="p-6 sm:p-8"><WikiPageList pages={pages ?? []} categories={[category]} /></Card></section>
    </>
  );
}
