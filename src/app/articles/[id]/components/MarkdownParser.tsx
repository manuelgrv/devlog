"use client";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";
import { ArticleData } from "@/lib";
import { Admonition, YoutubeVideo } from "./";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import { AdmonitionType } from "./Admonition";
import { Container } from "@/components";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  gruvboxDark,
  gruvboxLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeProvider";

export default function MarkdownParser({ article }: { article: ArticleData }) {
  const { theme } = useTheme();
  return (
    <Container className="px-6 flex-col max-w-sm md:max-w-3xl">
      <Markdown
        children={article.content}
        remarkPlugins={[
          remarkGfm,
          remarkMath,
          remarkDirective,
          remarkDirectiveRehype,
        ]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={
          {
            h1: ({ children }: any) => (
              <h1 className="text-lg sm:text-xl md:text-3xl my-4 text-gruvbox-neutral_blue dark:text-gruvbox-bright_red">
                {children}
              </h1>
            ),
            h2: ({ children }: any) => (
              <h2 className="text-lg sm:text-xl md:text-2xl my-4 text-gruvbox-neutral_orange dark:text-gruvbox-bright_orange">
                {children}
              </h2>
            ),
            h3: ({ children }: any) => (
              <h3 className="text-lg sm:text-xl my-4 text-gruvbox-faded_yellow dark:text-gruvbox-bright_yellow">
                {children}
              </h3>
            ),
            h4: ({ children }: any) => (
              <h4 className="text-lg my-4 text-gruvbox-bright_green dark:text-gruvbox-bright_green">
                {children}
              </h4>
            ),
            h5: ({ children }: any) => (
              <h1 className="text-md my-4 text-gruvbox-bright_blue dark:text-gruvbox-bright_blue">
                {children}
              </h1>
            ),
            p: ({ children }: any) => (
              <p className="text-justify mb-4">{children}</p>
            ),
            a({ children, ...props }: any) {
              return (
                <a
                  target="_blank"
                  className="underline decoration-dotted underline-offset-2"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <div className="text-sm my-6">
                  <SyntaxHighlighter
                    style={theme === "dark" ? gruvboxDark : gruvboxLight}
                    PreTag="div"
                    language={match[1]}
                    customStyle={{ fontFamily: "monospace" }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={clsx(
                    "bg-gruvbox-light1 dark:bg-gruvbox-dark1 ",
                    className,
                  )}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            img: ({ src, alt }: any) => {
              return (
                <Image
                  src={`/api/images?article=${article.path}&img=${src}`}
                  alt={alt || ""}
                  width={600}
                  height={400}
                  className=" my-2 block mx-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              );
            },
            yt: ({ id }: { id: string }) => <YoutubeVideo id={id} />,
            ol: ({ children }: any) => (
              <ol className="list-decimal ml-6 space-y-1 mb-4">{children}</ol>
            ),
            ul: ({ children }: any) => (
              <ul className="list-disc ml-6 space-y-1 mb-4">{children}</ul>
            ),
            admonition: ({ type, title, children }: AdmonitionType) => (
              <Admonition type={type} title={title} children={children} />
            ),
            table: ({ children }: any) => (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse text-sm text-gruvbox-dark0 dark:text-gruvbox-light0 border border-gruvbox-dark2 dark:border-gruvbox-gray_244">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }: any) => (
              <th className="px-3 py-2 text-left text-xs font-bold text-gruvbox-dark0 dark:text-gruvbox-light0 uppercase tracking-wider border border-gruvbox-dark2 dark:border-gruvbox-gray_244">
                {children}
              </th>
            ),
            tr: ({ children }: any) => (
              <tr className="border border-gruvbox-dark2 dark:border-gruvbox-gray_244">
                {children}
              </tr>
            ),
            td: ({ children }: any) => (
              <td className="px-3 py-2 border border-gruvbox-dark2 dark:border-gruvbox-gray_244">
                {children}
              </td>
            ),
          } as any // INFO: Using this because fucking typescript complains about the yt component
        }
      />
    </Container>
  );
}
