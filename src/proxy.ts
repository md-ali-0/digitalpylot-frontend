import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTE_PERMISSION_MAP } from "./constants/permissions";
import { decrypt, DecryptedSession } from "./lib/session";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Standard exclusions for static assets, api, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/403") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("accessToken")?.value;

  let session: DecryptedSession | null = null;
  if (cookie) {
    try {
      session = await decrypt(cookie);
    } catch (error) {
      console.log("Token decode error:", error);
    }
  }

  const isAuthPage = pathname.startsWith("/auth");

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (session?.userId && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If not authenticated and not on auth page, redirect to signin
  if (!session?.userId && !isAuthPage) {
    const loginUrl = new URL(`/auth/signin`, req.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }
    const res = NextResponse.redirect(loginUrl);
    // Cleanup stale auth cookies before redirecting back to signin.
    res.cookies.delete("session");
    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");
    return res;
  }

  if (session?.userId && !isAuthPage) {
    const matchedRoute = [...ROUTE_PERMISSION_MAP]
      .sort((a, b) => b.path.length - a.path.length)
      .find((route) => pathname === route.path || (route.path !== "/" && pathname.startsWith(route.path + "/")));

    if (matchedRoute) {
      const userPermissions = session.permissions || [];
      if (!userPermissions.includes(matchedRoute.permission)) {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth-side-banner.png|auth-side-dashboard.png).*)",
  ],
};
