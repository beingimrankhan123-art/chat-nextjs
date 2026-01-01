import { NextResponse } from "next/server";

export function proxy(request) {
  const isAuth = request.cookies.get("auth")?.value === "true";
  const { pathname } = request.nextUrl;

  // 🚫 Not logged in → block chat
  if (!isAuth && pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Logged in → block login
  // if (isAuth && pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/chat", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/login"],
};
