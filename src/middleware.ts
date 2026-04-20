import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.method !== "POST") return NextResponse.next();

  const origin = request.headers.get("origin");
  if (!origin) return NextResponse.next();

  const originHost = origin.includes("://")
    ? origin.split("://")[1]
    : origin;

  const headers = new Headers(request.headers);
  headers.set("x-forwarded-host", originHost);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
