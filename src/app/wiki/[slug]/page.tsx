import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock3, FileClock, MessageSquareText, PencilLine } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { MarkdownContent } from "@/components/community/MarkdownContent";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return { title: "Wiki article" };
  const { data } = await supabase.from("wiki_pages").select("title,summary").eq("slug", slug).maybeSingle();
  return { title: data?.title ?? "Wiki article", description: data?.summary ?? undefined };
}

export default async function WikiArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Wiki article" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: page, error } = await supabase.from("wiki_pages").select("id,slug,title,summary,content,category_id,created_by,updated_by,revision,created_at,updated_at,locked").eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) return <><PageHero title="Wiki article" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  if (!page) notFound();

  const [{ data: category }, { data: author }, { data: editor }, { data: { user } }] = await Promise.all([
    supabase.from("wiki_categories").select("name,slug").eq("id", page.category_id).maybeSingle(),
    supabase.from("profiles").select("username,display_name").eq("id", page.created_by).maybeSingle(),
    supabase.from("profiles").select("username,display_name").eq("id", page.updated_by).maybeSingle(),
    supabase.auth.getUser(),
  ]);
  const { data: viewerProfile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    : { data: null };
  const canEdit = !!user && !page.locked && (
    user.id === page.created_by
    || viewerProfile?.role === "trusted_editor"
    || viewerProfile?.role === "moderator"
    || viewerProfile?.role === "administrator"
  );

  return (
    <>
      <PageHero title={page.title} eyebrow={category?.name ?? "Community wiki"} icon="book-open" description={page.summary} breadcrumbs={[{ label: "Community Wiki", href: "/wiki" }, ...(category ? [{ label: category.name, href: `/wiki/category/${category.slug}` }] : []), { label: page.title }]} />
      <section className="container-x grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <Card className="p-6 sm:p-9">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-5">
            <p className="flex items-center gap-2 text-xs text-mist/50"><Clock3 className="size-3.5" /> Updated {new Date(page.updated_at).toLocaleDateString()} · Version {page.revision}</p>
            <div className="flex flex-wrap gap-2">
              <Button href={`/wiki/${page.slug}/discussion`} size="sm" variant="secondary" icon={<MessageSquareText className="size-3.5" />}>Discussion</Button>
              {canEdit && <Button href={`/wiki/${page.slug}/edit`} size="sm" variant="ghost" icon={<PencilLine className="size-3.5" />}>Edit</Button>}
            </div>
          </div>
          <MarkdownContent content={page.content} />
        </Card>
        <aside className="space-y-5">
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">Page details</p>
            <div className="mt-4 space-y-4 text-sm">
              <div><p className="text-xs text-mist/45">Originally written by</p><p className="mt-1 text-white">{author?.display_name || author?.username || "Community member"}</p></div>
              <div><p className="text-xs text-mist/45">Last edited by</p><p className="mt-1 text-white">{editor?.display_name || editor?.username || "Community member"}</p></div>
              <div><p className="text-xs text-mist/45">First published</p><p className="mt-1 text-white">{new Date(page.created_at).toLocaleDateString()}</p></div>
            </div>
            <TransitionLink href={`/wiki/${page.slug}/history`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aether hover:text-white"><FileClock className="size-4" /> Revision history</TransitionLink>
          </Card>
          <Card tone="arcane" className="p-5"><h2 className="font-display font-bold text-white">Help improve this page.</h2><p className="mt-2 text-sm leading-relaxed text-mist/70">Have a correction or more to add? Edit this article or start a discussion with other contributors.</p></Card>
        </aside>
      </section>
    </>
  );
}
