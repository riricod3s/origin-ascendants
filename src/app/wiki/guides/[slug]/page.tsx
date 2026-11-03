import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WikiArticleView } from "@/components/wiki/WikiArticleView";
import { getWikiArticle, guides } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getWikiArticle("guides", slug);
  return article ? { title: article.title, description: article.summary } : {};
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const article = getWikiArticle("guides", slug);
  if (!article) notFound();
  return <WikiArticleView article={article} />;
}
