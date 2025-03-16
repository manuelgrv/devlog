import clsx from "clsx";
import { Calendar1Icon, GlassesIcon, PinIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { type ArticleCardData } from "@/lib";

export default function ArticleCard({
  path,
  title,
  excerpt,
  date,
  tags,
  featured,
}: ArticleCardData): ReactElement {
  return (
    <div
      className={clsx(
        // General styling
        "overflow-hidden",
        "shadow-[0px_0px_5px_1px_rgba(0,128,255,0.5)]",
        "hover:shadow-2xl",
        "rounded-lg",
        "transition-all duration-300 ease-in-out", // Smooth transition
        "hover:shadow-[0px_0px_30px_10px_rgba(0,128,128,0.3)]", // Custom blurry glow
        "border-2",
        // Featured and non featured variants
        // light theme
        "bg-gruvbox-light1/35",
        "border-gruvbox-light4/50",
        "shadow-gruvbox-dark1/25",
        // dark theme
        "dark:bg-gruvbox-dark1/50",
        "dark:border-gruvbox-neutral_yellow/15",
        "dark:shadow-gruvbox-light1/15",
      )}
    >
      <div className={clsx("w-full", "p-6", "flex", "flex-col")}>
        <div
          className={clsx(
            "flex",
            "flex-nowrap",
            "align-middle",
            "space-x-1",
            "items-center",
          )}
        >
          {featured ? <PinIcon size={24} className="pb-1" /> : <></>}
          <Link
            scroll={false}
            href={`articles/${path}`}
            className={clsx("text-xl font-semibold pb-1")}
          >
            {title}
          </Link>
        </div>
        <div className="flex flex-nowrap overflow-hidden align-middle items-center">
          <Calendar1Icon size={13} className="pr-1" />
          <p className="text-xs text-opacity-50 mr-4">
            {date.toISOString().split("T")[0]}
          </p>
          {/* TODO: Make tags to be filters for Articles page. */}
          <div className="text-xs text-opacity-50 flex flex-nowrap space-x-2">
            {tags.map((tag: string, idx: number, tl: string[]) => {
              const len = tl.length - 1;
              const sep = idx == len ? "" : "\u00B7";
              return (
                <div className="flex flex-nowrap space-x-2" key={idx}>
                  <span className="underline decoration-dotted">{`#${tag}`}</span>
                  <span>{`${sep}`}</span>
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <p className={clsx("text-md line-clamp-5")}>{excerpt}</p>
        <br />
        <div className="w-full flex flex-nowrap items-center justify-end">
          <Link
            href={`articles/${path}`}
            className="flex items-center space-x-2 text-sm"
          >
            <GlassesIcon size={16} /> <span>Keep reading...</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
