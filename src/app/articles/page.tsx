import { AnimateEntrance } from "@/components";
import { ReactElement } from "react";
import { Container, ArticleGrid } from "@/components";
import clsx from "clsx";
import { getArticleList } from "@/lib";

export default function Articles(): ReactElement {
  let records = getArticleList();

  return (
    <AnimateEntrance>
      <Container className="flex-col space-y-4">
        <div className="flex-col px-4">
          <h1
            className={clsx(
              "text-xl",
              "sm:text-2xl",
              "text-gruvbox-faded_blue",
              "dark:text-gruvbox-bright_red",
            )}
          >
            Articles
          </h1>
          <p className="text-justify">
            Articles about various topics. You can click on tags to filter them
            by topic or search for an specifyc keyword here:
          </p>
        </div>
        <ArticleGrid home={false} articles={records} />
      </Container>
    </AnimateEntrance>
  );
}
