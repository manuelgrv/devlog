import type { Metadata } from "next";
import ThemeProvider from "@/context/ThemeProvider";
import { cookies } from "next/headers";
import "./globals.css";
import { Inter } from "next/font/google";
import { Footer, NavBar } from "@/components";

export const metadata: Metadata = {
  title: "manuel's devlog",
  description: "terrible code all around",
  icons: {
    icon: "/bird.svg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type Theme = "light" | "dark";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("theme")?.value;
  const initialTheme: Theme =
    cookieValue === "dark" || cookieValue === "light" ? cookieValue : "light";

  return (
    <html lang="en" className={`${initialTheme} ${inter}`}>
      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <NavBar />
          <div className="w-full min-h-screen flex flex-col pt-20 mb-16">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
