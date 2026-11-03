import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileClock } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { WikiRevisionActions } from "@/components/community/WikiRevisionActions";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Wiki revision history", robots: { index: false, follow: false } };

export default async function WikiHistoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Revision history" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const [{ data: page, error: pageError }, { data: { user } }] = await Promise.all([
    supabase.from("wiki_pages").select("id,title,revision").eq("slug", slug).maybeSingle(),
    supabase.auth.getUser(),
  ]);
  if (pageError) return <><PageHero title="Revision history" /><section className="container-x py-12"><CommunityError message={pageError.message} /></section></>;
  if (!page) notFound();
  const { data: revisions, error } = await supabase.from("wiki_revisions").select("id,version,title,summary,category_id,content,author_id,created_at").eq("page_id", page.id).order("version", { ascending: false });
  if (error) return <><PageHero title="Revision history" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  const authorIds = [...new Set((revisions ?? []).map((revision) => revision.author_id))];
  const { data: authors, error: authorsError } = authorIds.length ? await supabase.from("profiles").select("id,username,display_name").in("id", authorIds) : { data: [], error: null };
  if (authorsError) return <><PageHero title="Revision history" /><section className="container-x py-12"><CommunityError message={authorsError.message} /></section></>;
  const authorById = new Map((authors ?? []).map((author) => [author.id, author]));

  return (
    <>
      <PageHero title="Revision history" eyebrow="Community wiki" icon="clock" description={<>Every published version of <span className="font-semibold text-white">{page.title}</span> is preserved.</>} breadcrumbs={[{ label: "Community Wiki", href: "/wiki" }, { label: page.title, href: `/wiki/${slug}` }, { label: "History" }]} />
      <section className="container-x py-12">
        <ul className="mx-auto max-w-3xl space-y-4">
          {(revisions ?? []).map((revision) => {
            const author = authorById.get(revision.author_id);
            return (
              <li key={revision.id}>
                <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-aether/10 text-aether"><FileClock className="size-5" /></span>
                    <div><p className="font-display font-bold text-white">{revision.title} <span className="text-aether">· v{revision.version}</span></p><p className="mt-1 text-xs text-mist/50">Edited by {author?.display_name || author?.username || "Community member"} · {new Date(revision.created_at).toLocaleString()}</p></div>
                  </div>
                  {user && revision.version !== page.revision && <WikiRevisionActions pageId={page.id} revision={revision} userId={user.id} />}
                  {revision.version === page.revision && <span className="rounded-full bg-verdant/10 px-3 py-1 text-xs font-semibold text-verdant">Current</span>}
                </Card>
              </li>
            );
          })}
          {(revisions ?? []).length === 0 && <li><Card className="p-6 text-center text-sm text-mist/60">No revision history is available for this page.</Card></li>}
        </ul>
      </section>
    </>
  );
}
