"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  initialTheme: Theme;
  children: React.ReactNode;
}

export default function ThemeProvider({
  initialTheme,
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 1. On mount, read localStorage. If it exists, override theme if mismatch.
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  // 2. Listen for local storage changes from other tabs.
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === "theme" && e.newValue) {
        setTheme(e.newValue as Theme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(e.newValue as Theme);
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 3. Toggling the theme updates cookie for
  async function toggleTheme() {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });
    }, 300);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
