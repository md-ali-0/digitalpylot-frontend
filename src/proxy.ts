import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt, DecryptedSession } from "./lib/session";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("accessToken")?.value;

  if (pathname === "/") {
    return cookie
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  let session: DecryptedSession | null = null;

  if (cookie) {
    try {
      session = await decrypt(cookie);
    } catch (error) {
      console.log("Token decode error:", error);
    }
  }
  if (!session?.userId) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.next();
    }
    const loginUrl = new URL(`/auth/signin?redirect=${pathname}`, req.url);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("session");
    return res;
  }

  if (session?.userId && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
