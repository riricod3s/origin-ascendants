import { ArticleLayout, FactsPanel } from "@/components/content/ArticleLayout";
import { neighbours, PrevNext } from "@/components/content/PrevNext";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { resolveRefs, wikiArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { DIFFICULTY_LABEL, seedFrom, TONE_SCENE } from "@/lib/labels";
import { cn } from "@/lib/cn";
import type { WikiArticle } from "@/types/content";

const CATEGORY_META = {
  guides: { label: "Guides", singular: "Guide" },
  mechanics: { label: "Mechanics", singular: "Mechanic" },
} as const;

/** Full page for a guide or mechanics article. */
export function WikiArticleView({ article }: { article: WikiArticle }) {
  const meta = CATEGORY_META[article.category];
  const siblings = wikiArticles.filter((item) => item.category === article.category);
  const { prev, next } = neighbours(siblings, siblings.findIndex((item) => item.slug === article.slug));
  const related = resolveRefs(article.related);
  const base = `/wiki/${article.category}`;

  return (
    <>
      <PageHero
        title={article.title}
        eyebrow={`Wiki ${meta.singular}`}
        icon={article.icon}
        description={article.summary}
        tone={article.tone}
        scene={TONE_SCENE[article.tone]}
        seed={seedFrom(article.slug)}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wiki", href: "/wiki" }, { label: meta.label, href: base }, { label: article.title }]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone={article.tone} icon="signpost">{DIFFICULTY_LABEL[article.difficulty]}</Badge>
          <Badge tone="arcane" icon="clock" variant="outline">{article.readingMinutes} min read</Badge>
          <Badge tone="aether" icon="calendar" variant="outline">Updated {formatDate(article.updated)}</Badge>
        </div>
      </PageHero>

      <ArticleLayout
        blocks={article.content}
        footer={
          <>
            <RelatedLinks items={related} />
            <PrevNext label={`More ${meta.label.toLowerCase()}`} prev={prev && { title: prev.title, href: `${base}/${prev.slug}` }} next={next && { title: next.title, href: `${base}/${next.slug}` }} />
          </>
        }
        aside={
          <>
            <FactsPanel
              tone={article.tone}
              facts={[
                { label: "Difficulty", value: DIFFICULTY_LABEL[article.difficulty], icon: "signpost" },
                { label: "Reading time", value: `${article.readingMinutes} minutes`, icon: "clock" },
                { label: "Last updated", value: formatDate(article.updated, "long"), icon: "calendar" },
              ]}
            />
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-mist/80">#{tag}</span>
                ))}
              </div>
            )}
            <nav aria-label={`All ${meta.label.toLowerCase()}`} className="surface rounded-2xl p-4">
              <p className="px-1 text-xs font-semibold tracking-[0.2em] text-aether uppercase">All {meta.label.toLowerCase()}</p>
              <ul className="mt-3 space-y-0.5">
                {siblings.map((item) => {
                  const current = item.slug === article.slug;
                  return (
                    <li key={item.slug}>
                      <TransitionLink
                        href={`${base}/${item.slug}`}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
                          current ? "bg-aether/10 font-medium text-white" : "text-mist hover:bg-white/[0.05] hover:text-white",
                        )}
                      >
                        <Icon name={item.icon} className={cn("size-4", current ? "text-aether" : "text-mist/60")} />
                        <span className="truncate">{item.title}</span>
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        }
      />
    </>
  );
}
