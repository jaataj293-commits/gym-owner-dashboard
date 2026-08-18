import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Temporary testing setup:
  // Redirect the homepage to the dashboard.
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the dashboard without login for now.
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
