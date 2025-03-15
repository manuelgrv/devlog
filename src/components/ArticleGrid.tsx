"use client";

import { ArticleCard, Pagination, Container } from "@/components";
import { ArticleCardData } from "@/lib";
import clsx from "clsx";
import React, { ReactElement, useState } from "react";

interface ArticlesProps {
  articles: Record<number, ArticleCardData[]>;
  home: boolean;
}

export default function ArticleGrid({
  articles,
  home,
}: ArticlesProps): ReactElement {
  let [page, setPage] = useState(1);

  const pageList = Object.keys(articles).map(Number);
  const totalPages = pageList.length;
  const displayedArticles = home ? articles[1] : articles[page] || [];

  return (
    <Container className="flex-col space-y-8">
      {home ? (
        <></>
      ) : (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
      <div className={clsx("px-4", "space-y-8", "mb-16")}>
        {displayedArticles.map((article, idx) => (
          <ArticleCard key={idx} {...article} />
        ))}
      </div>
    </Container>
  );
}
