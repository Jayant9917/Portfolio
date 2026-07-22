import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "API route is healthy.",
    timestamp: new Date().toISOString(),
  });
}
