import { ArticleGrid, AnimateEntrance } from "@/components";
import { HomeHeader } from "./components";
import { getLatestArticleList } from "@/lib";

export default async function Home() {
  const latestArticles = getLatestArticleList();

  return (
    <AnimateEntrance>
      <HomeHeader />
      <ArticleGrid articles={latestArticles} home={true} />
    </AnimateEntrance>
  );
}
