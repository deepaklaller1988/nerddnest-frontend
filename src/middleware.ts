import {  NextResponse } from "next/server";

export function middleware() {
  "ytu"
//   const { pathname } = request.nextUrl;

//   if (
//     pathname.startsWith("/_next") || 
//     pathname.startsWith("/static") || 
//     pathname.startsWith("/favicon.ico") ||
//     /\.(ico|png|jpg|jpeg|svg|css|js|woff2|woff|ttf|eot)$/i.test(pathname) 
//   ) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get("authToken");
//   if (!token && !pathname.startsWith("/auth")) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

  return NextResponse.next();
}
