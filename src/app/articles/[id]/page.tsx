import { getArticleIds, getArticle } from "@/lib";
import { MarkdownParser } from "./components";
import { AnimateEntrance, Container } from "@/components";
import { notFound } from "next/navigation";
import path from "path";

export default async function Article({ params }: { params: { id: string } }) {
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
  const articleList = articles.map((article) => ({ id: article.id }));
  return articleList;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const safeId = path.basename(id);
  const article = getArticle(safeId);
  return {
    title: article.title || "Untitled Article",
  };
}
