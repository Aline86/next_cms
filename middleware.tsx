import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Running middleware on:", pathname);
  const isProtectedRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";

  const token = request.cookies.get("token")?.value;
  const result = await decrypt(token);

  // If trying to access protected route and not authenticated, redirect to login
  if (isProtectedRoute && !result) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Allow request to continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
