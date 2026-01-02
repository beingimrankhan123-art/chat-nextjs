import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // if (!token && pathname.startsWith("/chat")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (token && pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/chat", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/login"],
};
