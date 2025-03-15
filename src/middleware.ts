import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const theme = request.cookies.get("theme")?.value || "light";
  const response = NextResponse.next();

  if (!request.cookies.has("theme")) {
    response.cookies.set("theme", theme, {
      path: "/",
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60,
    });
  }
  return response;
}
