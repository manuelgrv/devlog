import { Container } from "@/components";
import Link from "next/link";
import Avatar from "./Avatar";
import clsx from "clsx";

export default function HomeHeader() {
  return (
    <div>
      <Container className="items-center">
        <div className={clsx("w-1/3", "ml-8", "sm:ml-10")}>
          <Avatar />
        </div>
        <div className="w-2/3">
          <h1
            className={clsx(
              "text-2xl",
              "sm:text-4xl",
              "text-gruvbox-faded_blue",
              "dark:text-gruvbox-bright_red",
            )}
          >
            manuel.grv
          </h1>
          <span className="text-md">devlog</span>
        </div>
      </Container>
      <Container className="px-4 flex-col mb-6">
        <p className="text-justify">
          Hey, I&#39;m <strong>Manuel</strong>. This is my devlog, kinda
          outdated, barely maintained. I write about things that interest me,
          personal projects, and stuff I&#39;m learning. I&#39;m into software
          development, data science, product design, and music.
          <br />
          <br />
        </p>
        <h2
          className={clsx(
            "text-lg",
            "sm:text-xl",
            "font-semibold",
            "text-gruvbox-faded_aqua",
            "dark:text-gruvbox-bright_orange",
          )}
        >
          Latest Articles
        </h2>
      </Container>
    </div>
  );
}
