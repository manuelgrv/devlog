import { getArticleIds, getArticle } from "@/lib";
import { MarkdownParser } from "./components";
import { AnimateEntrance } from "@/components";
import { notFound } from "next/navigation";
import path from "path";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function Article({ params }: ArticlePageProps) {
  const { id } = await params;
  const safeId = path.basename(id);
  const allowedIds = getArticleIds().map((item) => item.id);

  if (!allowedIds.includes(safeId)) {
    notFound();
  }

  const article = getArticle(safeId);

  if (!article.content) {
    notFound();
  }

  return (
    <AnimateEntrance>
      <MarkdownParser article={article} />
    </AnimateEntrance>
  );
}

export function generateStaticParams() {
  const articles = getArticleIds();
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;
  const safeId = path.basename(id);
  const article = getArticle(safeId);
  return {
    title: article.title || "Untitled Article",
  };
}
