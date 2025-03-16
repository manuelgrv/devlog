"use client";
import "katex/dist/katex.min.css";
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
        remarkPlugins={[
          remarkGfm,
          remarkMath,
          remarkDirective,
          remarkDirectiveRehype,
        ]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h1
              {...props}
              className="text-lg sm:text-xl md:text-3xl my-4 text-gruvbox-neutral_blue dark:text-gruvbox-bright_red"
            />
          ),
          h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h2
              {...props}
              className="text-lg sm:text-xl md:text-2xl my-4 text-gruvbox-neutral_orange dark:text-gruvbox-bright_orange"
            />
          ),
          h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h3
              {...props}
              className="text-lg sm:text-xl my-4 text-gruvbox-faded_yellow dark:text-gruvbox-bright_yellow"
            />
          ),
          h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h4
              {...props}
              className="text-lg my-4 text-gruvbox-bright_green dark:text-gruvbox-bright_green"
            />
          ),
          h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h5
              {...props}
              className="text-md my-4 text-gruvbox-bright_blue dark:text-gruvbox-bright_blue"
            />
          ),
          p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
            <p {...props} className="text-justify mb-4" />
          ),
          a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2"
            />
          ),
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
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
          img: (props) => {
            return (
              <Image
                {...props}
                src={`/api/images?article=${article.path}&img=${props.src}`}
                alt={props.alt || ""}
                width={600}
                height={400}
                className="my-2 block mx-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            );
          },
          yt: ({ id }: { id: string }) => <YoutubeVideo id={id} />,
          ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
            <ol {...props} className="list-decimal ml-6 space-y-1 mb-4" />
          ),
          ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
            <ul {...props} className="list-disc ml-6 space-y-1 mb-4" />
          ),
          admonition: (props: AdmonitionType) => <Admonition {...props} />,
          table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
            <div className="overflow-x-auto my-4">
              <table
                {...props}
                className="w-full border-collapse text-sm text-gruvbox-dark0 dark:text-gruvbox-light0 border border-gruvbox-dark2 dark:border-gruvbox-gray_244"
              />
            </div>
          ),
          th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
            <th
              {...props}
              className="px-3 py-2 text-left text-xs font-bold text-gruvbox-dark0 dark:text-gruvbox-light0 uppercase tracking-wider border border-gruvbox-dark2 dark:border-gruvbox-gray_244"
            />
          ),
          tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr
              {...props}
              className="border border-gruvbox-dark2 dark:border-gruvbox-gray_244"
            />
          ),
          td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
            <td
              {...props}
              className="px-3 py-2 border border-gruvbox-dark2 dark:border-gruvbox-gray_244"
            />
          ),
        }}
      >
        {article.content}
      </Markdown>
    </Container>
  );
}
