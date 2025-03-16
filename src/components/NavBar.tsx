"use client";

import clsx from "clsx";
import ThemeButton from "./ThemeButton";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

type LinkItem = {
  text: string;
  link: string;
};

function LinkGroup({ links }: { links: LinkItem[] }): ReactElement {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "hidden",
        "sm:flex",
        "sm:w-1/3",
        "justify-center",
        "space-x-2",
        "flex-nowrap",
      )}
    >
      {links.map(
        (link: LinkItem): ReactElement => (
          <div
            key={link.text}
            className={clsx(
              "group",
              "flex-1",
              "text-center",
              theme === "dark"
                ? "hover:bg-gruvbox-dark1"
                : "hover:bg-gruvbox-light0_hardest",
              "transition-colors duration-200",
              "rounded-md",
            )}
          >
            <Link
              scroll={true}
              href={link.link}
              className={clsx(
                "block",
                "py-2",
                "px-4",
                theme === "dark"
                  ? "!text-gruvbox-light1"
                  : "!text-gruvbox-dark1",
                "transition-colors duration-200",
                "font-medium",
              )}
            >
              {link.text}
            </Link>
          </div>
        ),
      )}
    </div>
  );
}

export default function NavBar(): React.ReactElement {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuActive = useRef<HTMLDivElement | null>(null);

  const linkList = [
    { text: "Home", link: "/" },
    { text: "Articles", link: "/articles" },
    { text: "Vault", link: "/" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuActive.current && !menuActive.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={clsx(
        "w-full",
        "bg-transparent",
        "fixed",
        "backdrop-blur-md",
        "border-b",
        "border-opacity-25",
        "transition-[border-color] duration-500 ease-in-out",
        scrolled ? "border-b-gruvbox-gray_245" : "border-b-transparent",
      )}
    >
      <div
        className={clsx(
          "container",
          "max-w-3xl",
          "mx-auto",
          "flex",
          "flex-nowrap",
          "justify-between",
          "items-center",
          "p-2",
          "z-50",
        )}
      >
        {/*Left Column*/}
        <div className="w-1/2 sm:w-1/3 flex flex-nowrap pl-3">
          <span className="text-left px-1">
            <Link
              href="/"
              className="text-gruvbox-dark2 dark:text-gruvbox-light2"
            >
              manuel.grv
            </Link>
          </span>
          <Image src="/bird.svg" height={16} width={16} alt="pajareto" />
        </div>
        {/*Center Column*/}
        <LinkGroup links={linkList} />
        {/*Right Column*/}
        <div className="w-1/2 sm:w-1/3 text-right flex-nowrap justify-between space-x-1">
          <a
            href="https://www.github.com/manuelrodval"
            target="_blank"
            className="text-gruvbox-dark2 dark:text-gruvbox-light2 cursor-pointer"
          >
            <button
              className={clsx(
                "py-3",
                "px-3",
                "rounded",
                "transition-[background] duration-200 ease-in-out",
                "cursor-pointer",
                theme === "dark"
                  ? "hover:bg-gruvbox-dark1"
                  : "hover:bg-gruvbox-light0_hardest",
              )}
            >
              <Github size={16} />
            </button>
          </a>
          <ThemeButton />
          <div
            className="relative inline-block text-left group"
            ref={menuActive}
          >
            <button
              className={clsx(
                "sm:hidden",
                "py-3",
                "px-3",
                "rounded",
                "transition-[background] duration-200 ease-in-out",
                theme === "dark"
                  ? "hover:bg-gruvbox-dark1"
                  : "hover:bg-gruvbox-light0_hardest",
              )}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Menu size={16} />
            </button>
            {open && (
              <div
                className={clsx(
                  "absolute",
                  "right-0",
                  "mt-2",
                  "w-56",
                  "origin-top-right",
                  "bg-gruvbox-light0_hardest",
                  "dark:bg-gruvbox-dark1",
                  "border",
                  "border-gruvbox-dark2",
                  "rounded-md",
                  "shadow-lg",
                  "transition-all duration-200",
                )}
              >
                <div className="py-1">
                  {linkList.map((link) => (
                    <a
                      key={link.text}
                      href={link.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gruvbox-light0_hard dark:hover:bg-gruvbox-dark0"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
