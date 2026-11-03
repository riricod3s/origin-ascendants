import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { WikiPageForm } from "@/components/community/WikiPageForm";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Edit wiki article", robots: { index: false, follow: false } };

export default async function EditWikiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Edit article" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/wiki/${encodeURIComponent(slug)}/edit`);
  const [{ data: page, error: pageError }, { data: categories, error: categoriesError }, { data: viewerProfile, error: viewerError }] = await Promise.all([
    supabase.from("wiki_pages").select("id,slug,title,summary,content,category_id,created_by,locked").eq("slug", slug).maybeSingle(),
    supabase.from("wiki_categories").select("id,name").order("sort_order"),
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
  ]);
  if (pageError || categoriesError || viewerError) return <><PageHero title="Edit article" /><section className="container-x py-12"><CommunityError message={pageError?.message ?? categoriesError?.message ?? viewerError?.message ?? "Could not load the article."} /></section></>;
  if (!page) notFound();
  const canEdit = !page.locked && (
    user.id === page.created_by
    || viewerProfile?.role === "trusted_editor"
    || viewerProfile?.role === "moderator"
    || viewerProfile?.role === "administrator"
  );
  if (!canEdit) {
    return <><PageHero title="Edit article" /><section className="container-x py-12"><p className="rounded-2xl border border-solar/20 bg-solar/5 p-5 text-sm text-solar">You do not have permission to edit this page.</p></section></>;
  }

  return (
    <>
      <PageHero title="Edit article" eyebrow="Community wiki" icon="book-open" description="Your edits are attributed and the previous version remains available in the history." breadcrumbs={[{ label: "Community Wiki", href: "/wiki" }, { label: page.title, href: `/wiki/${page.slug}` }, { label: "Edit" }]} />
      <section className="container-x -mt-5 pb-20"><Card className="relative z-10 mx-auto max-w-3xl p-6 sm:p-9"><WikiPageForm page={page} categories={categories ?? []} userId={user.id} /></Card></section>
    </>
  );
}
