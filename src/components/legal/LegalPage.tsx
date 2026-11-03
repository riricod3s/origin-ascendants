import { PageHero } from "@/components/ui/PageHero";
import { RichContent } from "@/components/content/RichContent";
import { TableOfContents } from "@/components/content/TableOfContents";
import { getToc } from "@/lib/toc";
import { renderInline } from "@/lib/inline";
import type { LegalDocument } from "@/types/content";

interface LegalPageProps {
  document: LegalDocument;
  breadcrumb: string;
}

export function LegalPage({ document, breadcrumb }: LegalPageProps) {
  const blocks = document.sections.flatMap((section) => [{ type: "h2" as const, text: section.title }, ...section.content]);
  const toc = getToc(blocks);

  return (
    <>
      <PageHero
        title={document.title}
        eyebrow="The fine print, in plain language"
        icon="scroll-text"
        description={`Last updated ${document.lastUpdated}. Please read this document carefully before using Origin Ascendants services.`}
        scene="observatory"
        seed={document.title.length * 9}
        tone="arcane"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: breadcrumb }]}
      />
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 lg:py-20">
        <article className="min-w-0">
          <div className="mb-10 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-mist sm:p-7">
            {document.intro.map((paragraph, index) => <p key={index} className="leading-7">{renderInline(paragraph)}</p>)}
          </div>
          <RichContent blocks={blocks} />
        </article>
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <TableOfContents items={toc} />
        </aside>
      </div>
    </>
  );
}
