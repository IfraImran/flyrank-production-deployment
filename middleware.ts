import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const requests = new Map<string, number>();

export function middleware(request: NextRequest) {
  const ip = request.ip ?? "unknown";
  const count = requests.get(ip) || 0;

  if (count > 100) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  requests.set(ip, count + 1);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
