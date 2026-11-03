import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WikiArticleView } from "@/components/wiki/WikiArticleView";
import { getWikiArticle, mechanics } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return mechanics.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getWikiArticle("mechanics", slug);
  return article ? { title: article.title, description: article.summary } : {};
}

export default async function MechanicPage({ params }: Params) {
  const { slug } = await params;
  const article = getWikiArticle("mechanics", slug);
  if (!article) notFound();
  return <WikiArticleView article={article} />;
}
