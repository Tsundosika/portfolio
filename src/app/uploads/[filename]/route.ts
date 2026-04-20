import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const MIME: Record<string, string> = {
  jpg:  "image/jpeg",
  jpeg: "image/jpeg",
  png:  "image/png",
  gif:  "image/gif",
  webp: "image/webp",
  avif: "image/avif",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (filename.includes("..") || filename.includes("/")) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const file = await readFile(join(process.cwd(), "public/uploads", filename));
    const ext  = filename.split(".").pop()?.toLowerCase() ?? "jpg";
    return new NextResponse(file, {
      headers: {
        "Content-Type": MIME[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
