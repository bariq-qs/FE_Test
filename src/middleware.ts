import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth");
  if (!token?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  } return NextResponse.next()
}

export const config = {
  matcher: ["/jm/:path*"],
};
