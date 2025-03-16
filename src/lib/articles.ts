import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleCardData {
  id: string;
  path: string;
  title: string;
  tags: string[];
  excerpt: string;
  date: Date;
  featured: boolean;
}

const articleDirectory: string = path.join(process.cwd(), "articles/");

function paginateArray<T>(arr: T[], itemsPerPage: number): Record<number, T[]> {
  const result: Record<number, T[]> = {};
  for (let i = 0; i < arr.length; i += itemsPerPage) {
    const page = i / itemsPerPage + 1;
    result[page] = arr.slice(i, i + itemsPerPage);
  }
  return result;
}

// Returns an aray of objects that contain posts metadata for the grid of posts.
export function getArticleList(): Record<number, ArticleCardData[]> {
  const articles = fs.readdirSync(articleDirectory);

  const articleData = articles.reduce<ArticleCardData[]>(
    (
      acc: ArticleCardData[],
      articleDir: string,
      id: number,
    ): ArticleCardData[] => {
      const articlePath = path.join(articleDirectory, articleDir, "article.md");
      try {
        const postContent = fs.readFileSync(articlePath, "utf8");
        const { data, excerpt } = matter(postContent, {
          excerpt_separator: "<!-- sep -->",
        });

        acc.push({
          id: id.toString(),
          path: articleDir,
          title: data.title,
          tags:
            Array.isArray(data.tags) &&
            data.tags.every((t) => typeof t === "string")
              ? data.tags
              : [data.tags],
          excerpt: excerpt ? excerpt : "",
          date: data.date,
          featured: data.featured,
        });
        return acc;
      } catch (error) {
        console.error(`Error processing post at ${articlePath}:`, error);
        return acc;
      }
    },
    [],
  );

  const featuredBoost = 31_557_600_000 * 975;

  articleData.sort((a: ArticleCardData, b: ArticleCardData): number => {
    const dateA = (a.date?.valueOf() ?? 0) + (a.featured ? featuredBoost : 0);
    const dateB = (b.date?.valueOf() ?? 0) + (b.featured ? featuredBoost : 0);
    return dateB - dateA;
  });

  return paginateArray(articleData, 6);
}

// Returns array of the 4 most recent articles to show on the home page + featured articles.
export function getLatestArticleList(): Record<number, ArticleCardData[]> {
  const latestArticles = getArticleList()["1"].slice(0, 4);
  return paginateArray(latestArticles, 6);
}

export function getArticleIds(): { id: string }[] {
  const paths = fs.readdirSync(articleDirectory);
  return paths.map((articleDir: string): { id: string } => ({
    id: articleDir,
  }));
}

export interface ArticleData {
  path?: string;
  title?: string;
  date?: Date;
  tags?: string[];
  excerpt?: string;
  content?: string;
  featured?: boolean;
}

export function getArticle(id: string): ArticleData {
  const fullPath = path.join(articleDirectory, id, "article.md");

  try {
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content, excerpt } = matter(fileContent, {
      sections: true,
      excerpt_separator: "<!-- sep -->",
    });

    return {
      path: id,
      title: data.title,
      date: data.date,
      tags:
        Array.isArray(data.tags) &&
        data.tags.every((t) => typeof t === "string")
          ? data.tags
          : [data.tags],
      excerpt: excerpt,
      content: content,
      featured: data.featured,
    };
  } catch (error) {
    console.error(`Error fetching post "${id}":`, error);
    return {};
  }
}
