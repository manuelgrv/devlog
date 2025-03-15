"use client";

import { useTheme } from "@/context/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

export default function ThemeButton(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "py-3",
        "px-3",
        "rounded",
        "transition-colors duration-200 ease-in-out",
        theme === "dark"
          ? "hover:bg-gruvbox-dark1"
          : "hover:bg-gruvbox-light0_hardest",
      )}
    >
      {theme === "dark" ? (
        <Sun
          strokeWidth={3}
          size={16}
          className="text-gruvbox-neutral_yellow"
        />
      ) : (
        <Moon strokeWidth={3} size={16} className="text-gruvbox-neutral_blue" />
      )}
    </button>
  );
}
