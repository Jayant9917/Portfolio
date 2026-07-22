import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const { slug } = await request.json();

  if (!slug) {
    return new NextResponse("Slug is required", { status: 400 });
  }

  return NextResponse.json({ views: 0 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new NextResponse("Slug is required", { status: 400 });
  }

  return NextResponse.json({ views: 0 });
}
