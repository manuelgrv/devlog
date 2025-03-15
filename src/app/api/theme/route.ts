import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { theme } = await request.json();
  const response = NextResponse.json({ success: true });
  response.cookies.set("theme", theme, {
    path: "/",
    httpOnly: false,
    maxAge: 365 * 24 * 60 * 60,
  });
  return response;
}
