import {  NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/static") || 
    pathname.startsWith("/favicon.ico") ||
    /\.(ico|png|jpg|jpeg|svg|css|js|woff2|woff|ttf|eot)$/i.test(pathname) 
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken");
  console.log("Token:", token);
  console.log("Pathname:", pathname);
  
  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}