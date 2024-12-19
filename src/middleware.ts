import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const excludedPaths = [
  //   '/_next/static/',
  //   '/favicon.ico',
  //   '/_next/',
  //   '/public/',
  //   '/assets/',
  //   '/fonts.googleapis.com/',
  //   '/fonts.gstatic.com/',
  //   '/api',
  // ];

  // // If the request is for excluded paths, allow it
  // for (const path of excludedPaths) {
  //   if (pathname.startsWith(path)) {
  //     return NextResponse.next();
  //   }
  // }

  // // If the path starts with /auth (like login or register), allow the request
  // if (pathname.startsWith("/auth")) {
  //   return NextResponse.next();
  // }

  // // Check if the token exists
  // const token = request.cookies.get('RID')?.value;

  // // If no token and the path isn't /auth, redirect to /auth/login
  // if (!token) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  // // If the token exists, allow the request to proceed
  // return NextResponse.next();
}

// Middleware matcher to exclude certain paths
export const config = {
  matcher: ['/((?!_next/static|favicon.ico|public/).*)'],
};
