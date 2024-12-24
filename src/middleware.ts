import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(ico|png|jpg|jpeg|svg|css|js|woff2|woff|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("RID");

  const activationToken = searchParams.get("token");
  const activationType = searchParams.get("type");

  if (activationType === "activation" && activationToken) {
    return NextResponse.next();
  }

  if (!token && !pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
