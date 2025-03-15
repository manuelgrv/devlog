import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const articleDirectory: string = path.join(process.cwd(), "articles/");

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse request parameters
    const params = req.nextUrl.searchParams;
    const articleId = params.get("article");
    const imageId = params.get("img");

    // Validate query parameters
    if (!articleId || !imageId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    // Build the image path
    const imagePath: string = path.join(articleDirectory, articleId, imageId);

    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Read the image file
    const image = fs.readFileSync(imagePath);

    // Infer content type from file extension (basic handling)
    const ext = path.extname(imageId).toLowerCase();
    const contentType = getContentType(ext);

    if (!contentType) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 415 },
      );
    }

    // Return the image with proper headers
    return new NextResponse(image, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Helper function to determine content type
function getContentType(ext: string): string | null {
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || null;
}
